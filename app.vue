<script lang="ts" setup>
const { locale } = useI18n()
const route = useRoute()
const baseUrl = 'https://www.forma-global.com'
const { applyHreflang } = useHreflang()
applyHreflang()

const { currentLine } = useBrandLine()

// 分頁標題的品牌字尾跟著服務線走：留學線是「皓學」，就職線是「FORMA」
const brandSuffix = computed(() => (currentLine.value === 'work' ? 'FORMA' : '皓學'))
// og:locale 跟著目前語系，不要日文、英文頁也宣告成 zh_TW
const ogLocale = computed(() => ({ ja: 'ja_JP', en: 'en_US' } as Record<string, string>)[locale.value] ?? 'zh_TW')

// ── GA4 ──
// 這裡是全站唯一載入 GA 的地方（以前 plugins/gtag.client.ts 也載一次，
// 還把 window.gtag 蓋成「push 陣列」的版本——gtag.js 只認 arguments 物件，
// 結果正式站上所有自訂事件（例如 LINE 諮詢點擊）都被悄悄丟掉）。
//
// 換頁的 page_view 不在這裡手動送：GA4 資料串流的「加強型評估 → 網頁瀏覽 →
// 根據瀏覽記錄事件的網頁變更」已開啟，gtag.js 會在 pushState 時自動送出。
// 手動再送一次會讓每次換頁被算成兩次瀏覽。
const GA_ID = 'G-RKNCTYCV3V'
// 本機開發不送資料，避免 localhost 的瀏覽混進正式報表
const gaScripts = import.meta.dev
  ? []
  : [
      { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true },
      {
        key: 'ga-init',
        innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `,
      },
    ]

useHead({
  titleTemplate: (title) => (title ? `${title} | ${brandSuffix.value}` : '皓學/FORMA｜日本留遊學・就職代辦'),
  htmlAttrs: {
    lang: locale,
    class: computed(() => `line-${currentLine.value}`)
  },
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: computed(() => `${baseUrl}${route.path}`)
    }
  ],
  meta: [
    { name: 'theme-color', content: '#ffffff' },
    { property: 'og:locale', content: ogLocale },
  ],
  script: [
    ...gaScripts,
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['Organization', 'ProfessionalService'],
            '@id': 'https://www.forma-global.com/#organization',
            name: '皓學/FORMA',
            alternateName: ['皓學', 'HAOGAKU', 'FORMA Global', '新福爾摩沙國際有限公司'],
            legalName: '新福爾摩沙國際有限公司',
            url: 'https://www.forma-global.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.forma-global.com/images/logo-forma.png',
              caption: '皓學/FORMA',
            },
            image: 'https://www.forma-global.com/images/og-default.png',
            description:
              '皓學／FORMA 是台日雙邊經營的日本留學與就職代辦公司，提供日本語言學校申請、留學簽證代辦、短期遊學、日本就職與特定技能簽證媒合，以及抵日後的租屋、開戶、打工等在地支援。代辦服務零手續費，學費與日本學校官方收費完全同步。',
            email: 'info@forma-global.com',
            telephone: '+886-4-2223-3958',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '市府路39號9樓之1',
              addressLocality: '西區',
              addressRegion: '臺中市',
              addressCountry: 'TW',
            },
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                availableLanguage: ['zh-Hant', 'ja', 'en'],
                email: 'info@forma-global.com',
                telephone: '+886-4-2223-3958',
                url: 'https://www.forma-global.com/contact',
                areaServed: ['TW', 'JP'],
              },
            ],
            sameAs: [
              'https://line.me/R/ti/p/@forma_global',
              'https://www.instagram.com/forma_global_connect/',
              'https://www.threads.com/@forma_global_connect',
              'https://www.facebook.com/people/Forma%E4%BA%BA%E6%9D%90%E7%B4%B9%E4%BB%8B%E7%95%99%E5%AD%A6%E3%82%A8%E3%83%BC%E3%82%B8%E3%82%A7%E3%83%B3%E3%83%88/61586054817873/',
            ],
            areaServed: [
              { '@type': 'Country', name: '台灣' },
              { '@type': 'Country', name: '日本' },
            ],
            knowsLanguage: ['zh-Hant', 'ja', 'en'],
            knowsAbout: [
              '日本留學',
              '日本語言學校申請',
              '日本留學簽證',
              '在留資格認定證明書',
              '短期遊學',
              '日本就職',
              '特定技能簽證',
              '技術人文知識國際業務簽證',
              '日本租屋',
              '留學生打工規定',
            ],
            serviceType: [
              '日本留學代辦',
              '語言學校媒合',
              '留學簽證申請協助',
              '短期遊學安排',
              '日本就職支援',
              '特定技能簽證代辦',
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: '皓學／FORMA 服務項目',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '日本長期留學代辦（6 個月～2 年，學生簽證）',
                    url: 'https://www.forma-global.com/study/long-term',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '日本短期遊學（2 週～3 個月，觀光免簽）',
                    url: 'https://www.forma-global.com/study/short-term',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '升學進修規劃（語言學校銜接專門學校與大學）',
                    url: 'https://www.forma-global.com/study/university',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: '赴日就職與特定技能簽證媒合',
                    url: 'https://www.forma-global.com/work',
                  },
                },
              ],
            },
          },
          {
            '@type': 'WebSite',
            '@id': 'https://www.forma-global.com/#website',
            url: 'https://www.forma-global.com',
            name: '皓學/FORMA 日本留遊學・就職代辦',
            description:
              '台灣人赴日留學與就職的專業代辦服務，透明收費、台日雙邊在地支援。',
            publisher: { '@id': 'https://www.forma-global.com/#organization' },
            inLanguage: ['zh-Hant-TW', 'ja-JP', 'en-US'],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <div class="page-wrapper" :class="`line-${currentLine}`">
      <UApp>
        <NuxtRouteAnnouncer />
        <div class="global-background">
          <NuxtPage :key="$route.fullPath" />
        </div>
        <LineFloatBtn />
      </UApp>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.global-background {
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>