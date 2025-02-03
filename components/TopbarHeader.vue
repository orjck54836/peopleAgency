<script setup lang="ts">
defineProps<{
  navOpen: boolean;
  toggleNav: () => void;
  closeNav: () => void;
}>();
const navLinks = [
  { id: "top", label: "top" },
  { id: "about_me", label: "about me" },
  { id: "services", label: "my services" },
  { id: "attainments", label: "skills" },
  { id: "fun_facts", label: "facts" },
  { id: "experience", label: "experiences" },
  { id: "projects", label: "projects" },
  { id: "how_i_work", label: "how i work" },
  { id: "testimonials", label: "testimonials" },
  { id: "contact", label: "contact" },
];
</script>
<template>
  <header class="header-topbar">
    <div class="container d-flex align-items-center justify-content-between">
      <NuxtLink to="/">
        <img src="/images/logo.png" alt="logo" />
      </NuxtLink>

      <div class="d-flex gap-2 gap-sm-3 align-items-center">
        <a class="d-flex gap-2 align-items-center" href="mailto:emily@devis.com"> <PhosphorIconEnvelope /> emily@devis.com </a>
        <button @click="toggleNav" class="bg-transparent border-0">
          <div :class="{ open: navOpen }" class="nav-icon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </div>
    <nav :class="{ opened: navOpen }" class="navigation-topbar" id="navigation">
      <ul>
        <li v-for="(link, i) in navLinks" :key="link.id" class="nav-link" @click="closeNav">
          <a :href="'#' + link.id" :class="{ active: i === 0 }">
            <span class="text">{{ link.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <div @click="closeNav" class="nav-overlay"></div>
  </header>
</template>

<style lang="scss">
.header-topbar {
  padding: 14px 0;
  width: 100%;
  z-index: 10;
  left: 0;
  right: 0;
  background-color: rgb(var(--primary));
  position: fixed;
  img {
    max-width: 100%;
  }
  .nav-icon {
    width: 30px;
    height: 16px;
    z-index: 15;
    padding: 2px;
    top: -3px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
    span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: rgb(var(--black));
      opacity: 1;
      left: 0;
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;
    }
  }
  .nav-icon span:nth-child(1) {
    top: 0px;
  }

  .nav-icon span:nth-child(2) {
    top: 10px;
  }

  .nav-icon span:nth-child(3) {
    top: 20px;
  }

  .nav-icon.open span:nth-child(1) {
    top: 10px;
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg);
    background-color: rgb(var(--white));
  }

  .nav-icon.open span:nth-child(2) {
    opacity: 0;
    left: -60px;
  }

  .nav-icon.open span:nth-child(3) {
    top: 10px;
    background-color: rgb(var(--white));
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
}
</style>
