// scripts/generate-news-json.mjs
// build 後執行：掃描 content/information 底下的 markdown，抽出 frontmatter，產生靜態 JSON
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const CONTENT_DIR = 'content/information'
const OUTPUT_DIR = '.output/public/api'
const OUTPUT_FILE = join(OUTPUT_DIR, 'latest-news.json')

// 簡易 frontmatter parser（不依賴外部套件）
function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!match) return {}
  const yaml = match[1]
  const data = {}
  for (const line of yaml.split('\n')) {
    const m = line.match(/^(\w+):\s*(.*)$/)
    if (!m) continue
    let [, key, val] = m
    val = val.trim()
    // 去引號
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    data[key] = val
  }
  return data
}

function scanDir(dir, line) {
  const fullDir = join(CONTENT_DIR, line)
  if (!existsSync(fullDir)) return []
  const files = readdirSync(fullDir).filter(f => f.endsWith('.md'))
  const articles = []
  for (const file of files) {
    const raw = readFileSync(join(fullDir, file), 'utf-8')
    const fm = parseFrontmatter(raw)
    if (!fm.title) continue
    // slug: 檔名去掉 .md
    const slug = file.replace(/\.md$/, '')
    articles.push({
      title: fm.title,
      description: fm.description || '',
      date: fm.date || '',
      cover: fm.cover || null,
      path: `/${line}/information/${slug}`,
    })
  }
  // 依日期新到舊排序
  articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
  return articles
}

const result = {
  study: scanDir('study', 'study'),
  work: scanDir('work', 'work'),
}

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })
writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), 'utf-8')
console.log(`✅ 已產生 ${OUTPUT_FILE}`)
console.log(`   study: ${result.study.length} 篇, work: ${result.work.length} 篇`)
