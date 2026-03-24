#!/usr/bin/env node

import 'dotenv/config';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const RESUME_DIR = path.join(process.cwd(), 'public', 'resume');
const THEME_DIR = path.join(process.cwd(), 'packages', 'jsonresume-theme-gab');
const LOCALES = ['en', 'fr'];

const PDF_CONFIG = {
  format: 'A4',
  printBackground: true,
  margin: {
    top: '8mm',
    right: '8mm',
    bottom: '8mm',
    left: '8mm'
  }
};

async function buildTheme() {
  console.log('🔨 Building theme...');
  
  return new Promise((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], {
      cwd: THEME_DIR,
      stdio: 'inherit'
    });
    
    build.on('close', (code) => {
      if (code === 0) {
        console.log('✓ Theme built successfully');
        resolve();
      } else {
        reject(new Error(`Theme build failed with code ${code}`));
      }
    });
    
    build.on('error', reject);
  });
}

async function generatePDF(locale) {
  const resumePath = path.join(RESUME_DIR, `resume_${locale}.json`);
  const outputPath = path.join(RESUME_DIR, `resume_${locale}.pdf`);

  console.log(`\n📄 Generating PDF for ${locale.toUpperCase()}...`);
  console.log(`   Input: ${resumePath}`);
  console.log(`   Output: ${outputPath}`);

  // Read resume JSON
  const resume = JSON.parse(fs.readFileSync(resumePath, 'utf8'));
  
  // Inject logo.dev API key into meta
  resume.meta = {
    ...(resume.meta || {}),
    logoDevKey: process.env.LOGO_DEV_API_KEY
  };
  
  // Import built theme
  const { render } = await import(path.join(THEME_DIR, 'dist', 'index.js'));
  
  // Generate HTML using theme
  const html = render(resume);
  
  // Launch browser and generate PDF
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle2' });
    
    // Wait for images to load
    await page.evaluate(async () => {
      const images = Array.from(document.querySelectorAll('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', resolve); // Don't reject on error
        });
      }));
    });
    
    await page.pdf({ ...PDF_CONFIG, path: outputPath });
    console.log(`✓ Generated ${outputPath}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Starting PDF generation...\n');

  try {
    // Build theme first
    await buildTheme();
    
    // Generate PDFs for all locales
    for (const locale of LOCALES) {
      await generatePDF(locale);
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
  }
}

main();
