<script lang="ts" setup>
useHead({
  title: "FORMA台湾人材紹介",
  htmlAttrs: {
    lang: "ja",
  },
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },  // 16x16 or 32x32
  ],
  meta: [
    { name: 'theme-color', content: '#ffffff' }
  ],
  script: [
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-RKNCTYCV3V",
      async: true
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-RKNCTYCV3V');
      `
    },
  ]
});
</script>
<template>
  <div class="page-wrapper">
    <UApp>
      <NuxtRouteAnnouncer />
      <div class="global-background">
        <NuxtPage />
      </div>
    </UApp>
  </div>
</template>
<style scoped>
.global-background {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('./img/background.png');
  min-height: 100vh; /* 至少撐滿整個視窗高度 */
  display: flex;
  flex-direction: column;
}
</style>