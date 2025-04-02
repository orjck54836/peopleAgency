// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["nuxt-phosphor-icons", "@nuxtjs/google-fonts", "nuxt-swiper", "@vueuse/nuxt", "@nuxtjs/i18n"],
  app: {
    head: {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
        },
      ],
    },
  },
  i18n: {
    langDir: 'locales',
    strategy: 'prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
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
    defaultLocale: 'ja'
  },
  ssr: false,
  css: ["@/public/scss/styles.scss"],
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