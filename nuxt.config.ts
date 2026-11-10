// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'aws-lambda', // 針對 Lambda 最小化
    externals: {
      inline: [],          // 預設會 inline 太多，這裡盡量讓它 require 外部
    },
    rollupConfig: {
      output: {
        inlineDynamicImports: true,
      }
    },
    minify: true,
    sourceMap: false
  },
  content: {
    database: {
      type: 'sqlite',
      filename: '/tmp/contents.sqlite'
    },
    experimental: {
      sqliteConnector: 'native'
    }
  },
  runtimeConfig: {
    adminPassword: process.env.NUXT_ADMIN_PASSWORD,
    awsRegion: 'ap-northeast-3',
    ddb: {
      languageSchoolsTable: 'language_schools',
      schoolDetailsTable: 'haogaku_school_details', 
      studentsTable: 'haogaku_students',           
    },
    sesRegion: 'ap-northeast-3',
    mailFrom: 'info@forma-global.com',
    mailTo: 'info@forma-global.com',
    public: {
      siteUrl: 'https://www.forma-global.com/', // 可選，前端要用就放這
      PUBLIC_KEY: process.env.NUXT_PUBLIC_KEY,
      SERVICE_ID: process.env.NUXT_SERVICE_ID,
      TEMPLATE_ID: process.env.NUXT_TEMPLATE_ID,
      gaId: "G-RKNCTYCV3V",
    }
  },
  features: {
    // 預設會把全部 CSS 內嵌進每一頁的 HTML（每頁約 900 KB，而且 Lambda 回應沒有壓縮）。
    // 關掉後 CSS 走 /_nuxt/*.css：由 S3 + CloudFront 壓縮並長期快取，HTML 只剩幾十 KB。
    inlineStyles: false,
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "nuxt-phosphor-icons",
    "@nuxtjs/google-fonts",
    "nuxt-swiper",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    '@vesp/nuxt-fontawesome',
    '@nuxt/ui',
    // '@vite-pwa/nuxt' 已移除：/sw.js 在 CloudFront 上會落到 Lambda 變成 404，
    // Service Worker 從來沒有註冊成功過，只會在每次載入時多一筆失敗的請求。
    'vue3-carousel-nuxt',
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],
  site: {
    url: 'https://www.forma-global.com',
  },
  sitemap: {
    // 單一 sitemap.xml，和 robots.txt 的 Sitemap: 指向一致
    exclude: ['/admin/**', '/blogs', '/*/blogs'],
    // 補上 Markdown 文章等動態路由（見 server/api/__sitemap__/urls.ts）
    sources: ['/api/__sitemap__/urls'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
    },
  },
  app: {
    baseURL: '/',
    head: {
      titleTemplate: '%s｜皓學/FORMA日本留遊學・就職代辦',
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // 全站預設 description（頁面沒設時的 fallback）
        { name: 'description', content: '皓學/FORMA提供台灣人赴日留學與就職的專業代辦服務，透明收費、台日雙邊在地支援，陪你把對日本的嚮往變成真實的人生履歷。' },
        // Open Graph（社群分享）
        { property: 'og:site_name', content: '皓學/FORMA' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_TW' },
        { property: 'og:image', content: 'https://www.forma-global.com/images/og-default.png' },
        { property: 'og:image:alt', content: '皓學/FORMA 日本留遊學・就職代辦' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://www.forma-global.com/images/og-default.png' },
      ],
      link: [
        // 注意：CloudFront 只把 /images/* 與 /favicon.ico 導向 S3，
        // 根目錄的 /favicon.png 會落到 Lambda 變成 404，所以走 /images/ 底下。
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon.png' },
        { rel: 'apple-touch-icon', href: '/images/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600&display=swap',
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
          // 放在 <head> 又沒有 defer 會擋住整頁繪製（拖慢 LCP）
          defer: true,
        },
        // GA4 統一在 app.vue 註冊，這裡不要再放一份（會重複計算 pageview）
      ],
    },
  },
  i18n: {
    langDir: 'locales',
    strategy: 'prefix_except_default', // 從 no_prefix 改這裡
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'zh-TW', iso: 'zh-TW', file: 'zh.json' },
      { code: 'ja', iso: 'ja-JP', file: 'ja.json' }
    ],
    defaultLocale: 'zh-TW',
    fallbackLocale: 'zh-TW', // 注意:這個在 @nuxtjs/i18n v9 已移除,之後確認一下版本
    bundle: {
      optimizeTranslationDirective: false
    },
    baseUrl: 'https://www.forma-global.com',
  },
  css: ["~/assets/css/style.css", "~/assets/css/landing.css","@/public/scss/styles.scss", "@fortawesome/fontawesome-svg-core/styles.css"],
  ui: {
    colorMode: false
  },
  build: {
    // 讓 Nuxt 在打包時處理 @fortawesome/vue-fontawesome
    transpile: ['@fortawesome/vue-fontawesome'],
  },
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700],
    },
  },
  swiper: {
    modules: ['navigation', 'pagination', 'autoplay', 'scrollbar']
  }
});