<script lang="ts" setup>
useHead({
  title: "株式会社Forma",
  htmlAttrs: {
    lang: "ja",
  }
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