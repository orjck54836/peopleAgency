/**
 * 結構化資料（JSON-LD）工具。
 *
 * 目的有兩個：
 * 1. SEO：讓 Google 產生 rich result（麵包屑、FAQ 展開、文章卡片）。
 * 2. GEO：ChatGPT / Perplexity / Gemini 這類生成式搜尋在抓頁面時，
 *    JSON-LD 是最容易被正確解析、拿去當答案來源的格式。
 */

const SITE_URL = 'https://www.forma-global.com'
const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

/** 把相對路徑補成絕對 URL（schema.org 與 og 都需要絕對網址） */
export function absoluteUrl(path?: string | null): string {
  if (!path) return SITE_URL
  if (/^https?:\/\//.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** 注入一段 JSON-LD */
function injectJsonLd(data: Record<string, any>, key: string) {
  useHead({
    script: [
      {
        key,
        type: 'application/ld+json',
        innerHTML: JSON.stringify(data),
      },
    ],
  })
}

/**
 * 每頁都該有的 og:url / canonical 補強。
 * app.vue 已經設了 canonical，這裡補 og:url 與頁面專屬 og:image。
 */
export function usePageUrlMeta(options: { image?: string | null } = {}) {
  const route = useRoute()
  const url = computed(() => absoluteUrl(route.path))

  useSeoMeta({
    ogUrl: () => url.value,
    ...(options.image
      ? {
          ogImage: absoluteUrl(options.image),
          twitterImage: absoluteUrl(options.image),
        }
      : {}),
  })
}

/** 麵包屑：Google 用來在搜尋結果顯示路徑，AI 用來理解頁面層級 */
export function useBreadcrumbSchema(items: Array<{ name: string; path?: string }>) {
  injectJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        ...(item.path ? { item: absoluteUrl(item.path) } : {}),
      })),
    },
    'ld-breadcrumb'
  )
}

/** FAQ：最容易被 AI 直接引用的格式，也可能在 Google 取得展開式結果 */
export function useFaqSchema(items: Array<{ q: string; a: string }>) {
  if (!items.length) return
  injectJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
    'ld-faq'
  )
}

/** 文章頁：Article + 作者 + 發佈日期，讓內容被當成可引用的來源 */
export function useArticleSchema(article: {
  title?: string | null
  description?: string | null
  path: string
  date?: string | null
  updated?: string | null
  author?: string | null
  cover?: string | null
  tags?: string[] | null
  section?: string | null
}) {
  injectJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${absoluteUrl(article.path)}#article`,
      headline: article.title ?? undefined,
      description: article.description ?? undefined,
      inLanguage: 'zh-Hant-TW',
      mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(article.path) },
      image: absoluteUrl(article.cover ?? '/images/og-default.png'),
      datePublished: article.date ?? undefined,
      // 有改寫過就用 updated，沒有就等同發佈日
      dateModified: article.updated ?? article.date ?? undefined,
      author: {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: article.author ?? '皓學/FORMA',
        url: SITE_URL,
      },
      publisher: { '@id': ORG_ID },
      ...(article.section ? { articleSection: article.section } : {}),
      ...(article.tags?.length ? { keywords: article.tags.join(', ') } : {}),
      isAccessibleForFree: true,
      // 讓語音助理／AI 知道這兩塊是頁面的重點摘要
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.article-title', '.article-body > p:first-of-type'],
      },
    },
    'ld-article'
  )
}

/** 服務頁：說明「誰、提供什麼服務、服務哪裡、多少錢」 */
export function useServiceSchema(service: {
  name: string
  description: string
  path: string
  serviceType: string[]
  freeOfCharge?: boolean
}) {
  injectJsonLd(
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${absoluteUrl(service.path)}#service`,
      name: service.name,
      description: service.description,
      serviceType: service.serviceType,
      provider: { '@id': ORG_ID },
      areaServed: [
        { '@type': 'Country', name: '台灣' },
        { '@type': 'Country', name: '日本' },
      ],
      availableLanguage: ['zh-Hant', 'ja', 'en'],
      audience: {
        '@type': 'Audience',
        audienceType: '想赴日留學或就職的台灣人',
      },
      ...(service.freeOfCharge
        ? {
            offers: {
              '@type': 'Offer',
              price: 0,
              priceCurrency: 'TWD',
              description: '代辦服務免費，學費與日本學校官方收費標準同步，無隱藏費用',
              availability: 'https://schema.org/InStock',
            },
          }
        : {}),
    },
    'ld-service'
  )
}

/**
 * 一般頁面的 SEO 一次設定：專屬 title / description（i18n 的 seo.pages.<key>）、
 * og / twitter 文案、og:url，以及麵包屑。
 *
 * 之前很多頁面直接沿用 seo.study 的標題與描述，搜尋引擎看到的是
 * 七八個「標題、描述完全相同」的網址，彼此搶同一組關鍵字。
 */
export function usePageSeo(key: string, crumbs?: Array<{ name: string; path?: string }>) {
  const { t } = useI18n()
  const title = () => t(`seo.pages.${key}.title`)
  const description = () => t(`seo.pages.${key}.description`)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
  })
  usePageUrlMeta()
  if (crumbs?.length) useBreadcrumbSchema(crumbs)
}

export { SITE_URL, ORG_ID, SITE_ID }
