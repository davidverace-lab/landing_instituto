// Regenera los QR de los juegos:  node scripts/gen-qr.mjs https://dominio-de-produccion
// Requiere: npm i -D qrcode
import QRCode from 'qrcode'
import fs from 'fs'
const BASE = process.argv[2].replace(/\/$/, '')
const out = new URL('../public/qr/', import.meta.url).pathname
fs.mkdirSync(out, { recursive: true })
for (const [name, path] of [['portquest', '/portquest/'], ['terminalrally', '/terminalrally/']]) {
  const url = BASE + path
  const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 1, color: { dark: '#002E6D', light: '#FFFFFF' } })
  fs.writeFileSync(out + name + '.svg', svg)
  await QRCode.toFile(out + name + '.png', url, { errorCorrectionLevel: 'H', margin: 1, width: 1024, color: { dark: '#002E6D', light: '#FFFFFF' } })
  console.log(name, '->', url)
}
