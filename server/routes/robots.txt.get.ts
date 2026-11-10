/**
 * robots.txt 由 Nitro 直接提供。
 *
 * 為什麼不是放在 public/：
 * 這個站是 CloudFront + S3（靜態）+ Lambda（SSR）的組合，
 * CloudFront 只把 /images/* 與 /favicon.ico 之類的路徑導向 S3，
 * 根目錄的 .txt 沒有對應的 cache behavior，會落到 Lambda。
 * 檔案放在 public/ 雖然會同步上 S3，但實際請求拿不到（404）。
 * 所以改由伺服器路由輸出，這也是這個檔案現在唯一的來源。
 */
const ROBOTS = `# ── 皓學 / FORMA (forma-global.com) ──
# 一般搜尋引擎
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin
Disallow: /api/
Disallow: /_nuxt/
Disallow: /*?*utm_
Disallow: /*?*fbclid

# ── AI / 生成式搜尋引擎（GEO）──
# 明確允許，讓 ChatGPT、Claude、Perplexity、Gemini 等能引用本站內容
User-agent: GPTBot
Allow: /
Disallow: /admin/

User-agent: OAI-SearchBot
Allow: /
Disallow: /admin/

User-agent: ChatGPT-User
Allow: /
Disallow: /admin/

User-agent: ClaudeBot
Allow: /
Disallow: /admin/

User-agent: Claude-SearchBot
Allow: /
Disallow: /admin/

User-agent: Claude-User
Allow: /
Disallow: /admin/

User-agent: PerplexityBot
Allow: /
Disallow: /admin/

User-agent: Perplexity-User
Allow: /
Disallow: /admin/

User-agent: Google-Extended
Allow: /
Disallow: /admin/

User-agent: Applebot
Allow: /
Disallow: /admin/

User-agent: Applebot-Extended
Allow: /
Disallow: /admin/

User-agent: Bingbot
Allow: /
Disallow: /admin/

User-agent: cohere-ai
Allow: /
Disallow: /admin/

User-agent: meta-externalagent
Allow: /
Disallow: /admin/

# ── 無用途的爬蟲（省流量）──
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

# i18n 啟用後，模組產生的是多語系 sitemap 索引。
# /sitemap.xml 只是一個 meta refresh 的 HTML 頁，直接指向索引檔才是有效的 sitemap。
Sitemap: https://www.forma-global.com/sitemap_index.xml
`

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  return ROBOTS
})
