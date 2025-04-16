<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { onMounted, ref } from "vue";
import gsap from "gsap";
import SplitType from "split-type";

defineProps<{
  navOpen: boolean;
  classes?: string;
  toggleNav: () => void;
}>();

// i18n 設定
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter()

// 按鈕動畫
onMounted(() => {
  // GSAP animations
  gsap.from(".img-wrapper", { duration: 1.5, scale: 1.5, ease: "back", delay: 0.3, opacity: 0 });
  gsap.from(".work-btn", { duration: 1.2, scale: 0, opacity: 0, ease: "bounce" });
  gsap.from(".contact-btn", { duration: 1.2, scale: 0.5, opacity: 0.5, ease: "bounce" });

  const freelancerChars = new SplitType(".freelancer", { types: "chars" }).chars;
  const descChars = new SplitType(".description", { types: "chars" }).chars;

  gsap.from(freelancerChars, { duration: 1.5, rotateX: 180, opacity: 0, ease: "bounce", stagger: 0.05 });
  gsap.from(descChars, { duration: 1, rotateY: 180, stagger: 0.05 });
});

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
  // 1) 改變 locale
  locale.value = lang
  // 2) 生成該語系下的當前頁面路徑
  const path = switchLocalePath(lang)
  // 3) 若要切換到該路徑 (ex: "/en/contact")
  router.push(path)
};
</script>

<template>
  <header class="header">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <NuxtLink :to="localePath('/')" :class="classes">
        <img src="/images/logo.png" alt="logo" />
      </NuxtLink>
      <!-- 語言切換下拉選單 -->
      <div class="d-flex align-items-center">
        <NuxtLink :to="localePath('/contact')" class="contact-btn">
          {{ $t('contactButton') }}
        </NuxtLink>
        <div class="dropdown">
          <button
            class="dropdown-toggle"
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
        <button class="menu-btn" @click="toggleNav">
          <font-awesome-icon :icon="navOpen ? ['fas', 'x'] : ['fas', 'list']" />
        </button>
      </div>
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
  position: sticky;
  top: 0;
  z-index: 1000;
  img {
    max-width: 100%;
  }
  .contact-btn {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    background-color: rgb(var(--accent)); /* 淺金棕 */
    color: rgb(var(--contrast));         /* 暖灰木色文字 */
    border: none;
    border-radius: 6px;                  /* 輕微圓角，柔和感 */
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    /* 提供陰影與立體感 */
    box-shadow: 0 4px 6px rgba(var(--contrast), 0.2), 
                inset 0 0 0 rgba(0,0,0,0);

    &:hover {
      /* 改變背景與加深陰影 */
      background-color: rgba(var(--accent), 1); 
      box-shadow: 0 4px 10px rgba(var(--contrast), 0.5);
    }

    &:active {
      /* 按下時略微縮小或加深陰影，可看起來更有按壓感 */
      transform: scale(0.97);
      box-shadow: 0 2px 4px rgba(var(--contrast), 0.3);
    }
    /* 若與淺背景融合度不夠，可加點文字陰影或其他修飾 */
    text-shadow: 1px 1px 2px rgba(var(--background), 0.5);
    
    @media (max-width: 1200px) {
      display: none;
    }
  }
  .dropdown-menu {
    background-color: rgb(var(--background)); /* 柔和米白色背景 */
    border: 2px solid rgba(var(--contrast), 0.2); /* 細緻的邊框 */
    border-radius: 10px; /* 圓角，讓畫面更柔和 */
    box-shadow: 4px 4px 12px rgba(var(--contrast), 0.15), -4px -4px 12px rgba(var(--background), 0.2);
    overflow: hidden; /* 防止圓角溢出 */
    padding: 10px 0;
    min-width: 180px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  }

  /* 🔹 顯示選單時的動畫 */
  .dropdown-menu.show {
      opacity: 1;
      visibility: visible;
      transform: translateX(-10%) translateY(-10px);
  }

  /* 🔹 語言選項樣式 */
  .dropdown-menu li {
      list-style: none;
      padding: 8px 15px;
      font-size: 1rem;
      color: rgb(var(--contrast)); /* 文字用暖灰色 */
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
      text-align: center;
  }

  /* 🔹 選單懸停時的效果 */
  .dropdown-menu li:hover {
      background-color: rgba(var(--primary), 0.2); /* 柔和木質感懸停效果 */
      color: rgb(var(--secondary)); /* 變成較深的木色 */
      border-radius: 8px;
  }

  /* 🔹 選中的語言 */
  .dropdown-menu li.active {
      font-weight: bold;
      color: rgb(var(--secondary)); /* 蜂蜜棕 */
  }

  /* 🔹 下拉箭頭（美化開關按鈕） */
  .dropdown-toggle {
      background-color: transparent;
      border: none;
      color: rgb(var(--contrast));
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: color 0.3s ease-in-out;
  }

  /* 🔹 滑鼠懸停時變化 */
  .dropdown-toggle:hover {
      color: rgb(var(--secondary)); /* 深一點的木質色 */
  }

  /* 🔹 選單箭頭動畫 */
  .dropdown-toggle::after {
      content: "▼";
      font-size: 0.8rem;
      transition: transform 0.3s ease-in-out;
  }

  /* 🔹 當選單展開時箭頭旋轉 */
  .dropdown-menu.show + .dropdown-toggle::after {
      transform: rotate(180deg);
  }

  .dropdown-item:hover {
    background-color: rgba(var(--primary), 0.2); /* 柔和木質感懸停效果 */
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

  .menu-btn {
    display: none;
    /* 小螢幕 (<1200px) 下拉式 */
    @media (max-width: 1200px) {
      /* 固定尺寸，避免因icon大小不同而整個按鈕改變 */
      width: 48px;
      height: 48px;

      display: inline-flex;
      align-items: center;
      justify-content: center;

      background-color: #e0b080; /* 依照你的主題色 */
      border: 1px solid rgba(0,0,0,0.2);
      border-radius: 8px;
      cursor: pointer;

      /* transition 幫助 hover 效果 */
      transition: background-color 0.3s, box-shadow 0.3s;
    }
    &:hover {
      background-color: rgba(0,0,0,0.05);
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
  }
}
</style>
