<script lang="ts" setup>
useHead({
  title: "株式会社Forma",
  htmlAttrs: {
    lang: "en",
  }
});
</script>
<template>
  <div>
    <!-- <ColorSwitcher /> -->
    <!-- <Demos /> -->
    <NuxtRouteAnnouncer />
    <div class="global-background">
      <NuxtPage />
    </div>
  </div>
</template>
<style scoped>
.global-background {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('./img/background.png');
}
</style>