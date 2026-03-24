import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, 'file')!

  if (!file.endsWith('.pdf')) {
    throw createError({ statusCode: 404 })
  }

  // In production, PDFs are copied to .output/public/resume/ by the Dockerfile
  // In development, they would be in public/resume/ if generated locally
  const candidates = [
    join(process.cwd(), '.output/public/resume', file),
    join(process.cwd(), 'public/resume', file),
  ]

  for (const pdfPath of candidates) {
    try {
      const buffer = await readFile(pdfPath)
      setResponseHeader(event, 'Content-Type', 'application/pdf')
      setResponseHeader(event, 'Content-Disposition', `attachment; filename="${file}"`)
      return buffer
    } catch {
      continue
    }
  }

  throw createError({ statusCode: 404 })
})
