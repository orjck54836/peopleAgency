// scripts/generate-image-dims.mjs
// 掃描 public/images/information 底下的圖片，把寬高寫進 utils/image-dims.json。
// 文章內的 <img> 會依這份表補上 width / height，瀏覽器在圖片載入前就能預留空間，
// 版面不會跳動（CLS）。新增或更換文章圖片後重跑：node scripts/generate-image-dims.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const PUBLIC = 'public'
const ROOT = join(PUBLIC, 'images', 'information')
const OUT = 'utils/image-dims.json'

function pngSize(buf) {
  return [buf.readUInt32BE(16), buf.readUInt32BE(20)]
}

function jpegSize(buf) {
  let i = 2
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue }
    const marker = buf[i + 1]
    // SOF0–SOF15（扣掉 DHT / JPG / DAC）帶有影像尺寸
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return [buf.readUInt16BE(i + 7), buf.readUInt16BE(i + 5)]
    }
    i += 2 + buf.readUInt16BE(i + 2)
  }
  return null
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const dims = {}
for (const file of walk(ROOT).sort()) {
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue
  try {
    const buf = readFileSync(file)
    const size = ext === '.png' ? pngSize(buf) : jpegSize(buf)
    if (size) dims[file.slice(PUBLIC.length).split('\\').join('/')] = size
  } catch (e) {
    console.warn('略過', file, e.message)
  }
}

writeFileSync(OUT, JSON.stringify(dims, null, 0).replace(/],/g, '],\n') + '\n')
console.log(`✅ ${Object.keys(dims).length} 張圖片的尺寸已寫入 ${OUT}`)
