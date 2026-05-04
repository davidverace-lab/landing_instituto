import sharp from 'sharp'
import { readdir, mkdir, stat } from 'fs/promises'
import { join, relative, extname, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')
const OUTPUT_DIR = join(PUBLIC_DIR, 'webp')

const QUALITY = 80
const MAX_WIDTH = 1920

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      // Skip the webp output folder itself
      if (fullPath === OUTPUT_DIR) continue
      const sub = await walkDir(fullPath)
      files.push(...sub)
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase()
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        files.push(fullPath)
      }
    }
  }
  return files
}

async function processImage(inputPath) {
  // Compute relative path from PUBLIC_DIR
  const rel = relative(PUBLIC_DIR, inputPath)
  // Build output path: replace extension with .webp, place under OUTPUT_DIR
  const relWithoutExt = rel.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  const outputPath = join(OUTPUT_DIR, relWithoutExt)

  // Ensure output directory exists
  await mkdir(dirname(outputPath), { recursive: true })

  // Get input size
  const inputStat = await stat(inputPath)
  const inputKB = (inputStat.size / 1024).toFixed(1)

  // Convert with sharp
  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputPath)

  // Get output size
  const outputStat = await stat(outputPath)
  const outputKB = (outputStat.size / 1024).toFixed(1)

  console.log(`  ${rel}`)
  console.log(`    ${inputKB} KB → ${outputKB} KB  (ahorro: ${((1 - outputStat.size / inputStat.size) * 100).toFixed(0)}%)`)
}

async function main() {
  console.log('Escaneando imágenes en /public/ ...\n')
  const files = await walkDir(PUBLIC_DIR)
  console.log(`Encontradas: ${files.length} imágenes\n`)

  let totalInputBytes = 0
  let totalOutputBytes = 0

  for (const file of files) {
    try {
      const beforeStat = await stat(file)
      totalInputBytes += beforeStat.size
      await processImage(file)
      const rel = relative(PUBLIC_DIR, file).replace(/\.(jpg|jpeg|png)$/i, '.webp')
      const outputPath = join(OUTPUT_DIR, rel)
      const afterStat = await stat(outputPath)
      totalOutputBytes += afterStat.size
    } catch (err) {
      console.error(`  ERROR procesando ${file}: ${err.message}`)
    }
  }

  const totalInputKB = (totalInputBytes / 1024).toFixed(0)
  const totalOutputKB = (totalOutputBytes / 1024).toFixed(0)
  const totalInputMB = (totalInputBytes / 1024 / 1024).toFixed(1)
  const totalOutputMB = (totalOutputBytes / 1024 / 1024).toFixed(1)
  const savings = ((1 - totalOutputBytes / totalInputBytes) * 100).toFixed(0)

  console.log('\n────────────────────────────────────────────')
  console.log(`Total: ${files.length} imágenes procesadas`)
  console.log(`Antes:  ${totalInputKB} KB (${totalInputMB} MB)`)
  console.log(`Después: ${totalOutputKB} KB (${totalOutputMB} MB)`)
  console.log(`Ahorro: ${savings}%`)
  console.log('────────────────────────────────────────────')
}

main().catch(err => { console.error(err); process.exit(1) })
