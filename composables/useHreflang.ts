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

    locales.value.forEach((locale: any) => {
      const code = locale.code
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