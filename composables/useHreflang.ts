export function useHreflang() {
  const route = useRoute()
  const { locales, defaultLocale } = useI18n()
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl.replace(/\/$/, '')

  const rawPath = computed(() => {
    const path = route.path
    const prefixPattern = /^\/(ja|en)(\/|$)/
    return path.replace(prefixPattern, '/') || '/'
  })

  const hreflangLinks = computed(() => {
    const links: { rel: string; hreflang: string; href: string }[] = []

    // 情報文章目前只有中文內容：/ja、/en 底下同一篇的 canonical 已指回中文版，
    // 所以不能再宣告「這篇有日文版、英文版」，否則和 canonical 互相矛盾。
    const isArticle = /^\/(study|work)\/information\/[^/]+\/?$/.test(rawPath.value)

    locales.value.forEach((locale: any) => {
      const code = locale.code
      if (isArticle && code !== defaultLocale) return
      const iso = locale.iso
      let href = ''

      if (code === defaultLocale) {
        href = `${siteUrl}${rawPath.value}`
      } else {
        href = `${siteUrl}/${code}${rawPath.value === '/' ? '' : rawPath.value}`
      }

      links.push({ rel: 'alternate', hreflang: iso, href })
    })

    links.push({
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${siteUrl}${rawPath.value}`,
    })

    return links
  })

  function applyHreflang() {
    // 用 watchEffect 確保路由切換後自動更新
    watchEffect(() => {
      useHead({
        link: hreflangLinks.value,
      })
    })
  }

  return { applyHreflang }
}