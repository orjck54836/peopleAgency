// scripts/indexnow.mjs
// 部署後執行：node scripts/indexnow.mjs
// 讀正式站的 sitemap，把所有網址提交給 IndexNow（Bing / Copilot / ChatGPT 搜尋等）。
// Google 不支援 IndexNow，Google 那邊請到 Search Console 提交 sitemap。
const HOST = 'www.forma-global.com'
const KEY = 'f1b8095ebda9b004c4f76f9f12f9aac2'
const SITE = `https://${HOST}`

async function locs(url) {
  const xml = await (await fetch(url)).text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

const keyCheck = await fetch(`${SITE}/${KEY}.txt`)
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error('❌ 金鑰檔還沒上線（先部署），已中止')
  process.exit(1)
}

const urls = new Set()
for (const sm of await locs(`${SITE}/sitemap_index.xml`)) {
  for (const u of await locs(sm)) urls.add(u)
}
const urlList = [...urls].filter((u) => u.startsWith(SITE))
console.log(`準備提交 ${urlList.length} 個網址`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
})
console.log(res.status, res.statusText, res.status === 200 || res.status === 202 ? '✅ 已接受' : await res.text())
