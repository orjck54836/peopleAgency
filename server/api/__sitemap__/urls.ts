import { queryCollection } from '@nuxt/content/server'
import type { SitemapUrl } from '#sitemap/types'

/**
 * 動態 sitemap 來源。
 *
 * 原本 sitemap 只收得到 pages/ 底下的靜態路由，
 * /study/information/[slug]、/work/information/[slug] 這些由 Markdown
 * 產生的文章頁完全沒有被收錄，等於文章不會被 Google 主動發現。
 * 這個 endpoint 把 content/ 底下的文章都補進 sitemap。
 */
export default defineSitemapEventHandler(async (event) => {
  const urls: SitemapUrl[] = []

  try {
    const docs = await queryCollection(event, 'content')
      .select('path', 'date')
      .all()

    for (const doc of docs ?? []) {
      const p = String(doc?.path ?? '')
      if (!p.startsWith('/information/')) continue

      // content/information/study/foo.md → /study/information/foo
      const m = p.match(/^\/information\/(study|work)\/(.+)$/)
      if (!m) continue

      const [, line, rawSlug] = m

      // 有些檔案用 foo.zh.md / foo.ja.md / foo.en.md 的命名。
      // @nuxt/content 會把後綴保留在 path 裡（/information/work/visa-guide.zh），
      // 所以 slug 必須原樣輸出——把 .zh 去掉會指向一個查不到文章、
      // 只會顯示空狀態的網址（200 的軟 404）。
      // 這裡只排除 .ja / .en，避免同一篇文章出現多個重複網址。
      if (/\.(ja|en)$/.test(rawSlug)) continue
      const slug = rawSlug

      urls.push({
        loc: `/${line}/information/${slug}`,
        lastmod: (doc as any)?.date ? new Date((doc as any).date).toISOString() : undefined,
        changefreq: 'monthly',
        priority: 0.8,
      })
    }
  } catch (e) {
    // sitemap 不該因為內容查詢失敗而整張壞掉
    console.error('[sitemap] 無法載入文章列表：', e)
  }

  // 重要的服務頁手動提高權重
  const priorityPages: Array<[string, number]> = [
    ['/', 1.0],
    ['/study', 0.9],
    ['/work', 0.9],
    ['/study/schools', 0.9],
    ['/study/short-term', 0.9],
    ['/study/long-term', 0.9],
    ['/study/university', 0.8],
    ['/study/common-questions', 0.8],
    ['/study/information', 0.8],
    ['/work/common-questions', 0.8],
    ['/work/information', 0.8],
    ['/study/support', 0.7],
    ['/study/about_us', 0.6],
    ['/work/about_us', 0.6],
    ['/contact', 0.7],
  ]

  for (const [loc, priority] of priorityPages) {
    urls.push({ loc, priority, changefreq: 'weekly' })
  }

  return urls
})
