<script setup lang="ts">
import logo from "/images/logo.png";


const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};
const closeNav = () => {
  navOpen.value = false;
};
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav">
    <div>
      <NuxtLink to="/">
        <img :src="logo" alt="logo" />
      </NuxtLink>
    </div>
  </Header>
  <!-- main content -->
  <main>
    <!-- Blog Details -->
    <div class="container">
      <Contact />
    </div>
  </main>
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>

<style lang="scss"></style>
