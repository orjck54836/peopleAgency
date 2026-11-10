/**
 * IndexNow 金鑰驗證檔。
 * Bing（以及使用 Bing 索引的 ChatGPT 搜尋、Copilot）、Yandex、Naver、Seznam
 * 透過 IndexNow 接收「這些網址更新了」的通知；提交前它們會來讀這個檔確認網域所有權。
 * 根目錄的檔案在 CloudFront 上會落到 Lambda，所以用伺服器路由輸出（同 robots.txt）。
 * 這把金鑰不是機密：它本來就必須公開在網站上。提交腳本：scripts/indexnow.mjs
 */
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return 'f1b8095ebda9b004c4f76f9f12f9aac2'
})
