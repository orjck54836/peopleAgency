/**
 * 皓學日語 App 的 App Store 連結。網站上所有「下載 App」的連結都從這裡產生。
 *
 * - 一律指向台灣區（/tw/）：/us/ 會先開美國區的頁面再跳轉，台灣使用者多一次載入。
 * - App Store Connect 的「行銷活動」連結：網址帶 pt（供應商代碼）和 ct（行銷活動代碼），
 *   App Store Connect → App 分析 → 行銷活動 就能看到每個 ct 帶來多少下載。
 *   pt 是帳號固定的代碼（App 分析 → 行銷活動 →「產生行銷活動連結」可以看到），
 *   填進 APP_STORE_PROVIDER_TOKEN 之後才會生效；空字串時連結不帶任何追蹤參數。
 */
export const APP_STORE_ID = '6830791694'

// App Store Connect 的供應商代碼（不是機密，本來就會出現在公開連結裡）
export const APP_STORE_PROVIDER_TOKEN = '128517967'

const BASE_URL = `https://apps.apple.com/tw/app/%E7%9A%93%E5%AD%B8%E6%97%A5%E8%AA%9E/id${APP_STORE_ID}`

/** ct 只收英數與連字號，Apple 的上限是 40 字元 */
function toCampaignToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').slice(0, 40).replace(/^-|-$/g, '')
}

/**
 * @param campaign 這次點擊的來源，例如文章的 slug。會轉成 ct；沒有 pt 時忽略。
 */
export function appStoreUrl(campaign?: string | null): string {
  if (!APP_STORE_PROVIDER_TOKEN) return BASE_URL
  const ct = toCampaignToken(campaign || 'web-app-page') || 'web-app-page'
  return `${BASE_URL}?pt=${APP_STORE_PROVIDER_TOKEN}&ct=${ct}&mt=8`
}
