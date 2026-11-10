/**
 * 送 GA4 自訂事件。
 * GA 本身在 app.vue 載入；換頁的 page_view 由 GA4 加強型評估自動送出，
 * 所以這裡不提供手動送 pageview 的函式（手動再送會重複計算）。
 */
export function useGtag() {
  function track(eventName: string, params?: Record<string, any>) {
    if (import.meta.server) return
    if (typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', eventName, params)
  }

  return { track }
}
