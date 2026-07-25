export function useGtag() {
  function track(eventName: string, params?: Record<string, any>) {
    if (process.server) return
    if (typeof window === 'undefined' || !window.gtag) return
    window.gtag('event', eventName, params)
  }

  function trackPageview(path: string) {
    const config = useRuntimeConfig()
    const gaId = config.public.gaId
    if (process.server) return
    if (typeof window === 'undefined' || !window.gtag || !gaId) return
    window.gtag('config', gaId, { page_path: path })
  }

  return { track, trackPageview }
}