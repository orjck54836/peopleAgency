<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

// 接收父層傳來的 props
defineProps<{
  navOpen: boolean;
  toggleNav: () => void;
  classes?: string;
}>();

// i18n 設定
const { locale, locales } = useI18n();

// 可用語言選單
const availableLocales = computed(() =>
  locales.value.map((l) => ({
    code: l.code,
    name: l.code === 'en' ? 'English' : l.code === 'zh-tw' ? '繁體中文' : '日本語'
  }))
);

// 取得當前語言名稱
const currentLanguageName = computed(() => {
  const current = availableLocales.value.find((l) => l.code === locale.value);
  return current ? current.name : 'Language';
});

// 切換語言
const switchLang = (lang: string) => {
  locale.value = lang;
};
</script>

<template>
  <header class="header">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <NuxtLink to="/" :class="classes">
        <img src="/images/logo.png" alt="logo" />
      </NuxtLink>

      <!-- 語言切換下拉選單 -->
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="languageDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ currentLanguageName }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="languageDropdown">
          <li v-for="locale in availableLocales" :key="locale.code">
            <button class="dropdown-item" @click="switchLang(locale.code)">
              {{ locale.name }}
            </button>
          </li>
        </ul>
      </div>

      <button @click="toggleNav" class="bg-transparent border-0 d-xl-none">
        <div :class="{ open: navOpen }" class="nav-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  padding: 14px 0;
  width: 100%;
  z-index: 1050;
  left: 0;
  right: 0;
  backdrop-filter: blur(3px);
  position: fixed;
  img {
    max-width: 100%;
  }
  .nav-icon {
    width: 36px;
    height: 22px;
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
    z-index: 15;
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
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
    background-color: rgb(var(--white));
  }
}
</style>
