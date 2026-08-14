#!/usr/bin/env node

import 'dotenv/config';
import puppeteer from 'puppeteer';
import { spawn, execFileSync } from 'child_process';
import path from 'path';

const LOCALES = ['en', 'fr'];
const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;
const RESUME_DIR = path.join(process.cwd(), 'public', 'resume');
const SERVER_ENTRY = path.join(process.cwd(), '.output', 'server', 'index.mjs');

const PDF_CONFIG = {
  format: 'A4',
  printBackground: true,
  margin: {
    top: '10mm',
    right: '10mm',
    bottom: '10mm',
    left: '10mm'
  }
};

async function buildNuxt() {
  console.log('🔨 Building Nuxt app...');

  return new Promise((resolve, reject) => {
    const build = spawn('npx', ['nuxt', 'build'], {
      stdio: 'inherit',
      env: process.env
    });
    build.on('close', (code) => code === 0 ? resolve() : reject(new Error(`Nuxt build failed with code ${code}`)));
    build.on('error', reject);
  });
}

async function startServer() {
  console.log('🚀 Starting server...');

  const server = spawn('node', [SERVER_ENTRY], {
    env: {
      ...process.env,
      PORT: String(PORT),
      HOST: '127.0.0.1'
    },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, 6000);

    server.stdout.on('data', (data) => {
      const text = data.toString();
      if (text.includes('Listening') || text.includes('localhost') || text.includes(String(PORT))) {
        clearTimeout(timeout);
        resolve();
      }
    });

    server.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });

  console.log('✓ Server ready');
  return server;
}

async function generatePDF(locale) {
  const outputPath = path.join(RESUME_DIR, `resume_${locale}.pdf`);
  console.log(`\n📄 Generating PDF for ${locale.toUpperCase()}...`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    // A4 at 96 DPI = 794 × 1123 px
    await page.setViewport({ width: 794, height: 1123 });
    await page.goto(`${BASE_URL}/print/${locale}`, { waitUntil: 'networkidle2', timeout: 30000 });

    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve);
        });
      }));
    });

    await page.pdf({ ...PDF_CONFIG, path: outputPath });
    console.log(`✓ Generated ${outputPath}`);
  } finally {
    await browser.close();
  }

  return outputPath;
}

function printAtsExtraction(outputPath) {
  console.log(`\n--- ATS text extraction order (${path.basename(outputPath)}) ---`);
  try {
    const text = execFileSync('pdftotext', [outputPath, '-'], { encoding: 'utf-8' });
    console.log(text.split('\n').filter((line) => line.trim()).join('\n'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.warn('  pdftotext not found (apt install poppler-utils)');
    } else {
      console.warn(`  pdftotext failed: ${error.message}`);
    }
  }
}

async function main() {
  if (!process.env.NUXT_PUBLIC_LOGO_DEV_API_KEY) {
    console.warn('⚠️  NUXT_PUBLIC_LOGO_DEV_API_KEY is not set — logos may not appear in the generated PDFs.');
  }

  const showAts = process.argv.includes('--ats');

  console.log('🚀 Starting PDF generation...\n');

  let server = null;

  try {
    await buildNuxt();
    server = await startServer();

    for (const locale of LOCALES) {
      const outputPath = await generatePDF(locale);
      if (showAts) printAtsExtraction(outputPath);
    }

    console.log('\n✅ All PDFs generated successfully!');
    console.log(`📁 Output directory: ${RESUME_DIR}`);
    for (const locale of LOCALES) {
      console.log(`   - resume_${locale}.pdf`);
    }
  } catch (error) {
    console.error('\n❌ Error generating PDFs:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    if (server) {
      server.kill();
      console.log('🛑 Server stopped');
    }
  }
}

main();
