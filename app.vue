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
    <UApp>
      <!-- <ColorSwitcher /> -->
      <!-- <Demos /> -->
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
}
</style>