<script lang="ts" setup>
const { locale } = useI18n()
const route = useRoute()
const baseUrl = 'https://www.forma-global.com'
const { applyHreflang } = useHreflang()
applyHreflang()

const { currentLine } = useBrandLine()

const router = useRouter()
const { trackPageview } = useGtag()

router.afterEach((to) => {
  trackPageview(to.fullPath)
})

useHead({
  titleTemplate: '%s | 皓學',
  htmlAttrs: {
    lang: locale,
    class: computed(() => `line-${currentLine.value}`)
  },
  link: [
    {
      rel: 'canonical',
      href: computed(() => `${baseUrl}${route.path}`)
    }
  ],
  meta: [
    { name: 'theme-color', content: '#ffffff' }
  ],
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-RKNCTYCV3V',
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-RKNCTYCV3V');
      `,
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '皓學/FORMA',
        alternateName: ['HAOGAKU', 'FORMA Global', '新福爾摩沙國際有限公司'],
        url: 'https://www.forma-global.com',
        logo: 'https://www.forma-global.com/images/haogaku-logo.svg',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Chinese', 'Japanese', 'English'],
          email: 'info@forma-global.com',
        },
        areaServed: ['TW', 'JP'],
        serviceType: ['留學代辦', '語言學校媒合', '日本就職支援'],
      }),
    },
  ],
})
</script>

<template>
  <div class="page-wrapper" :class="`line-${currentLine}`">
    <UApp>
      <NuxtRouteAnnouncer />
      <div class="global-background">
        <NuxtPage :key="$route.fullPath" />
      </div>
      <LineFloatBtn />
    </UApp>
  </div>
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