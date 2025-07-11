// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
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
    'vue3-carousel-nuxt'
  ],
  app: {
    head: {
      link: [
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
        },
      ],
    },
  },
  i18n: {
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'all'
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json'
      },
      {
        code: 'zh-tw',
        iso: 'zh-TW',
        file: 'zh-tw.json'
      },
      {
        code: 'ja',
        iso: 'ja-JP',
        file: 'ja.json'
      }
    ],
    defaultLocale: 'ja',
    bundle: {
      optimizeTranslationDirective: false
    },
  },
  ssr: false,
  css: ["~/assets/css/style.css","@/public/scss/styles.scss", "@fortawesome/fontawesome-svg-core/styles.css"],
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
  },
  runtimeConfig: {
    public: {
      PUBLIC_KEY: process.env.NUXT_PUBLIC_KEY,
      SERVICE_ID: process.env.NUXT_SERVICE_ID,
      TEMPLATE_ID: process.env.NUXT_TEMPLATE_ID
    }
  }
});