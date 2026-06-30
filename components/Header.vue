<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { computed, onMounted } from 'vue';
import gsap from "gsap";
import SplitType from "split-type";

defineProps<{
  navOpen: boolean;
  classes?: string;
  toggleNav: () => void;
}>();

const { setLocale, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const route = useRoute();

const isContactPage = computed(() => route.path.includes('/contact'));

// ---- 雙品牌線判斷：依路徑前綴決定目前所在品牌 ----
const currentLine = computed<'study' | 'work'>(() =>
  route.path.startsWith('/work') ? 'work' : 'study'
);

// 記住使用者選擇，供首頁重導使用
const lineCookie = useCookie<'study' | 'work'>('forma-line', { default: () => 'study' });

const switchLine = (target: 'study' | 'work') => {
  if (target === currentLine.value) return;
  lineCookie.value = target;
  router.push(localePath(`/${target}`));
};

// ---- 各線選單項目 ----
const studyNavItems = [
  { text: 'schoolTitle', href: '/study' },
  { text: 'studyTaiwanTitle', href: '/study/taiwan' },
  { text: 'informationTitle', href: '/study/information' },
  { text: 'ourStoryTitle', href: '/about_us' },
  { text: 'commonQuestionTitle', href: '/study#common_questions' },
];

const workNavItems = [
  { text: 'humanResourceTitle', href: '/work' },
  { text: 'informationTitle', href: '/work/information' },
  { text: 'ourStoryTitle', href: '/about_us' },
  { text: 'commonQuestionTitle', href: '/work#common_questions' },
];

const navItems = computed(() => (currentLine.value === 'work' ? workNavItems : studyNavItems));

// ---- i18n 語言切換 ----
const availableLocales = computed(() =>
  locales.value.map((l) => ({
    code: l.code,
    name: l.code === 'en' ? 'English' : l.code === 'zh' ? '繁體中文' : '日本語'
  }))
);

const currentLanguageName = computed(() => {
  const current = availableLocales.value.find((l) => l.code === locale.value);
  return current ? current.name : 'Language';
});

const switchLang = async (lang: string) => {
  await setLocale(lang);
  const path = switchLocalePath(lang);
  router.push(path);
};

// ---- 進場動畫 ----
onMounted(() => {
  gsap.from(".img-wrapper", { duration: 1.5, scale: 1.5, ease: "back", delay: 0.3, opacity: 0 });
  gsap.from(".work-btn", { duration: 1.2, scale: 0, opacity: 0, ease: "bounce" });
  gsap.from(".contact-btn", { duration: 1.2, scale: 0.5, opacity: 0.5, ease: "bounce" });
  gsap.from(".nav-link", { duration: 0.8, delay: 0.4, opacity: 0, stagger: 0.08 });

  const freelancerEl = document.querySelector(".freelancer");
  const descEl = document.querySelector(".description");
  if (freelancerEl) {
    const freelancerChars = new SplitType(".freelancer", { types: "chars" }).chars;
    gsap.from(freelancerChars, { duration: 1.5, rotateX: 180, opacity: 0, ease: "bounce", stagger: 0.05 });
  }
  if (descEl) {
    const descChars = new SplitType(".description", { types: "chars" }).chars;
    gsap.from(descChars, { duration: 1, rotateY: 180, stagger: 0.05 });
  }
});
</script>

<template>
  <header class="header" :class="`header--${currentLine}`">
    <div class="container-fluid d-flex align-items-center justify-content-between">
      <!-- Logo -->
      <NuxtLink :to="localePath(`/${currentLine}`)" :class="classes">
        <img src="../img/logo.png" alt="logo" class="logo-img" />
      </NuxtLink>

      <!-- 主選單（取代原右側 Navigation） -->
      <nav class="main-nav d-none d-xl-flex">
        <ul>
          <li v-for="item in navItems" :key="item.href" class="nav-link">
            <NuxtLink :to="localePath(item.href)">
              {{ $t(item.text) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="d-flex align-items-center header-actions">
        <!-- 雙品牌切換器 -->
        <div class="line-switcher" role="tablist" aria-label="業務線切換">
          <button
            type="button"
            class="line-switcher__btn"
            :class="{ active: currentLine === 'study' }"
            role="tab"
            :aria-selected="currentLine === 'study'"
            @click="switchLine('study')"
          >
            {{ $t('schoolTitle') }}
          </button>
          <button
            type="button"
            class="line-switcher__btn"
            :class="{ active: currentLine === 'work' }"
            role="tab"
            :aria-selected="currentLine === 'work'"
            @click="switchLine('work')"
          >
            {{ $t('humanResourceTitle') }}
          </button>
        </div>

        <NuxtLink v-if="!isContactPage" :to="localePath('/contact')" class="contact-btn">
          {{ $t('contactButton') }}
        </NuxtLink>

        <!-- 語言切換 -->
        <div class="dropdown">
          <button class="dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown"
            aria-expanded="false">
            {{ currentLanguageName }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="languageDropdown">
            <li v-for="l in availableLocales" :key="l.code">
              <button class="dropdown-item" @click="switchLang(l.code)">
                {{ l.name }}
              </button>
            </li>
          </ul>
        </div>

        <!-- 手機版選單開關 -->
        <button class="menu-btn d-xl-none" @click="toggleNav">
          <font-awesome-icon :icon="navOpen ? ['fas', 'x'] : ['fas', 'list']" />
        </button>
      </div>
    </div>

    <!-- 手機版下拉選單 -->
    <transition name="slide-down">
      <div v-if="navOpen" class="mobile-nav d-xl-none">
        <div class="mobile-line-switcher">
          <button
            type="button"
            :class="{ active: currentLine === 'study' }"
            @click="switchLine('study'); toggleNav()"
          >
            {{ $t('schoolTitle') }}
          </button>
          <button
            type="button"
            :class="{ active: currentLine === 'work' }"
            @click="switchLine('work'); toggleNav()"
          >
            {{ $t('humanResourceTitle') }}
          </button>
        </div>
        <ul>
          <li v-for="item in navItems" :key="item.href" @click="toggleNav">
            <NuxtLink :to="localePath(item.href)">
              {{ $t(item.text) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<style lang="scss">
// ---- 雙品牌色票（CSS variables，依 header--study / header--work 切換）----
.header {
  &.header--study {
    --line-bg-start: rgba(252, 227, 186, 0.5);
    --line-bg-end: rgba(255, 232, 197, 0.5);
    --line-accent: 211, 166, 39; // 金棕，呼應留學線
    --line-font: 'Playfair Display', serif;
  }

  &.header--work {
    --line-bg-start: rgba(210, 222, 230, 0.6);
    --line-bg-end: rgba(190, 205, 215, 0.5);
    --line-accent: 47, 79, 99; // 沉穩藍灰，呼應人資/企業線
    --line-font: 'Poppins', sans-serif;
  }
}

.logo-img {
  height: 60px;
  width: 140px;
  object-fit: cover;
}

.header {
  padding: 14px 0;
  width: 100%;
  z-index: 1050;
  left: 0;
  right: 0;
  backdrop-filter: blur(3px);
  background: linear-gradient(to right, var(--line-bg-start), var(--line-bg-end));
  position: sticky;
  top: 0;
  opacity: 1;
  font-family: var(--line-font);
  transition: background 0.4s ease;

  img {
    max-width: 100%;
  }

  .main-nav {
    ul {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    a {
      color: rgb(var(--black));
      font-weight: 500;
      font-size: 15px;
      text-transform: uppercase;
      position: relative;
      padding: 4px 0;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 2px;
        background: rgb(var(--line-accent));
        transition: width 0.3s ease;
      }

      &:hover::after,
      &.router-link-active::after {
        width: 100%;
      }
    }
  }

  .header-actions {
    gap: 14px;
  }

  // ---- 雙品牌切換器 ----
  .line-switcher {
    display: flex;
    border: 1px solid rgba(var(--line-accent), 0.5);
    border-radius: 999px;
    overflow: hidden;

    &__btn {
      border: none;
      background: transparent;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      color: rgb(var(--black));
      transition: background-color 0.25s ease, color 0.25s ease;

      &.active {
        background-color: rgb(var(--line-accent));
        color: #fff;
      }

      &:not(.active):hover {
        background-color: rgba(var(--line-accent), 0.15);
      }
    }

    @media (max-width: 1200px) {
      display: none;
    }
  }

  .mobile-line-switcher {
    display: flex;
    gap: 10px;
    padding: 12px 20px 4px;

    button {
      flex: 1;
      border: 1px solid rgba(var(--line-accent), 0.5);
      border-radius: 8px;
      background: transparent;
      padding: 10px;
      font-weight: 600;
      cursor: pointer;

      &.active {
        background-color: rgb(var(--line-accent));
        color: #fff;
      }
    }
  }

  .mobile-nav {
    background-color: rgb(var(--background));
    padding-bottom: 10px;

    ul {
      list-style: none;
      margin: 0;
      padding: 10px 20px;

      li {
        padding: 10px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);

        a {
          color: rgb(var(--black));
          font-weight: 500;
          font-size: 1.05rem;
        }
      }
    }
  }

  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.25s ease;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }

  .contact-btn {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    background-color: rgb(var(--line-accent));
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(var(--line-accent), 0.2);

    &:hover {
      background-color: rgba(var(--line-accent), 0.85);
      box-shadow: 0 4px 10px rgba(var(--line-accent), 0.5);
    }

    &:active {
      transform: scale(0.97);
      box-shadow: 0 2px 4px rgba(var(--line-accent), 0.3);
    }

    @media (max-width: 1200px) {
      display: none;
    }
  }

  .dropdown-menu {
    background-color: rgb(var(--background));
    border: 2px solid rgba(var(--line-accent), 0.2);
    border-radius: 10px;
    box-shadow: 4px 4px 12px rgba(var(--line-accent), 0.15), -4px -4px 12px rgba(var(--background), 0.2);
    overflow: hidden;
    padding: 10px 0;
    min-width: 180px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, transform 0.3s ease;
    display: block;
  }

  .dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }

  .dropdown-menu li {
    list-style: none;
    padding: 8px 15px;
    font-size: 1rem;
    color: rgb(var(--contrast));
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    text-align: center;
  }

  .dropdown-menu li:hover {
    background-color: rgba(var(--line-accent), 0.15);
    border-radius: 8px;
  }

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

    &::after {
      content: "▼";
      font-size: 0.8rem;
    }

    &:hover {
      color: rgb(var(--line-accent));
    }
  }

  .dropdown-item:hover {
    background-color: rgba(var(--line-accent), 0.15);
  }

  .menu-btn {
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(var(--line-accent), 0.8);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>