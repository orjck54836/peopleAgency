<script lang="ts" setup>
const { locale } = useI18n()
const route = useRoute()

useHead({
  titleTemplate: '%s | 皓學',
  htmlAttrs: {
    lang: locale,
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon.png' },
    { rel: 'apple-touch-icon', href: '/favicon.png' },
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
  ],
})
</script>

<template>
  <div class="page-wrapper" :class="route.path.startsWith('/work') ? 'line-work' : 'line-study'">
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