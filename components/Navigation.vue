<script lang="ts" setup>
import { gsap } from "gsap";
import shuffleLetters from "shuffle-letters";
// Props
defineProps<{
  navOpen: boolean;
  closeNav: () => void;
}>();

const route = useRoute()
const navRef = ref<HTMLElement | null>(null);
const isContactPage = computed(() => route.path.includes('/contact'))
const isInternshipPage = computed(() => route.path.includes('/internship'))
const isSpecifiedSkilledPage = computed(() => route.path.includes('/specified-skilled'))
const isEngineerPage = computed(() => route.path.includes('/engineer'))

// Watch and handle class changes
onMounted(() => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        const target = mutation.target as HTMLElement;
        if (target.classList.contains("active")) {
          const textElement = target.querySelector(".text") as HTMLElement | null;
          if (textElement) {
            setTimeout(() => {
              shuffleLetters(textElement, { iterations: 5 });
            }, 100);
          }
        }
      }
    });
  });

  if (navRef.value) {
    observer.observe(navRef.value, { attributes: true, subtree: true, attributeFilter: ["class"] });
  }

  return () => observer.disconnect();
});

// GSAP animations
onMounted(() => {
  gsap.to(".navigation", { "--height": "100%", duration: 1, ease: "power1.inOut" });
  gsap.from(".nav-link", { duration: 0.8, delay: 0.5, opacity: 0, stagger: 0.1 });
});
const navItems = reactive([
  { index: "", text: "ourStoryTitle", href: "#our_story", active: false },
  { index: "", text: "servicesTitle", href: "#services", active: false },
  { index: "", text: "commonQuestionTitle", href: "#common_questions", active: false },
  { index: "", text: "blogs", href: "#blogs", active: false },
]);
</script>

<template>
  <nav v-show="!isContactPage && !isInternshipPage && !isSpecifiedSkilledPage && !isEngineerPage" ref="navRef" :class="`navigation ${navOpen ? 'opened' : ''}`" id="navigation">
    <img src="/images/logo.png" class="mb-4 d-xl-none" alt="logo" />
    <ul>
      <li v-for="(item, index) in navItems" :key="index" @click="closeNav" class="nav-link">
        <a :href="item.href" :class="{ active: item.active }">
          <span>{{ item.index }}</span> <span class="text">{{ $t(item.text) }}</span>
        </a>
      </li>
    </ul>
    <div class="contact">
      <nuxt-link href="mailto:emily@devis.com">xxxxxxxx</nuxt-link>
      <nuxt-link href="mailto:emily@devis.com">emily@devis.com</nuxt-link>
      <nuxt-link href="tel:+420652887351">+420 652 887 351</nuxt-link>
    </div>
  </nav>
   <!-- 直接在同層渲染 Overlay -->
   <div class="nav-overlay d-xl-none" @click.self="closeNav">
      <!-- overlay-content帶有彈出動畫 -->
      <transition name="slide-up">
        <div class="overlay-content">
          <transition-group
            tag="div"
            name="slide-up-items"
            class="overlay-nav-items"
          >
            <div
              class="overlay-item"
              v-for="(item, index) in navItems"
              :key="item.text"
              @click="closeNav"
            >
              <a :href="'/' + item.href">{{ $t(item.text) }}</a>
            </div>
          </transition-group>
        </div>
      </transition>
  </div>
</template>

<style lang="scss">
// navigation
.navigation {
  position: absolute;
  height: 90%;
  border-left: 1px solid rgb(207, 194, 194);
  
  /* 小螢幕 (<1200px) 下拉式 */
  @media (max-width: 1199px) {
    /* 預設收合: display: none */
    display: none;
    position: static; /* 不要 absolute/fixed */

    &.opened {
      display: block; /* user點Menu後展開 */
      background-color: rgb(var(--primary));
      padding: 20px;
    }
  }
  @media (min-width: 1200px) {
    position: fixed;
    top: 100px;
    &:dir(rtl) {
      left: 0;
      right: auto;
    }
    display: block;
    transform: translateX(0);
  }
  z-index: 100;
  &::before {
    content: "";
    position: absolute;
    top: 100px;
    @media (min-width: 1200px) {
      top: 0;
    }
    &:dir(ltr) {
      left: 0;
    }
    &:dir(rtl) {
      right: 0;
    }
    width: 2px;
    height: var(--height);
    background: rgb(var(--black));
    opacity: 0.3;
  }
  ul {
    list-style: none;
    @media (min-width: 1200px) {
      width: 300px;
    }
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
    li > a {
      color: rgb(var(--black));
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 30px;
      padding-top: 6px;
      padding-bottom: 6px;
      font-size: 20px;
      font-weight: 500;
      &:dir(ltr) {
        padding-left: 34px;
        border-left: 2px solid transparent;
      }
      &:dir(rtl) {
        padding-right: 34px;
        border-right: 2px solid transparent;
      }
      transition-duration: 300ms;

      display: block;
      position: relative;
      span {
        font-size: 16px;
      }
      &::after {
        transition-duration: 600ms;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: rgb(var(--black));
        opacity: 0.15;
        &:dir(rtl) {
          left: auto;
          right: 0;
        }
      }
      &:hover {
        &::after {
          animation: grow 600ms ease-in-out;
          width: 100%;
        }
        border-left: 2px solid rgb(var(--black));
        &:dir(rtl) {
          border-left: none;
          border-right: 2px solid rgb(var(--black));
        }
      }

      &.active {
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          animation: grow 600ms ease-in-out;
          height: 100%;
          background: rgb(var(--black));
          opacity: 0.15;
          &:dir(rtl) {
            left: auto;
            right: 0;
          }
        }
        border-left: 2px solid rgb(var(--black));
        &:dir(rtl) {
          border-left: none;
          border-right: 2px solid rgb(var(--black));
        }
      }
    }
  }
  .contact {
    padding-top: 20px;
    &:dir(ltr) {
      padding-left: 34px;
    }
    &:dir(rtl) {
      padding-right: 34px;
    }
    display: flex;
    flex-direction: column;
    gap: 8px;
    a {
      font-size: 18px;
      color: rgb(var(--black));
    }
  }
}

  .nav-overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 12;
    opacity: 0;
    transition-duration: 500ms;
    transform: translateX(100%);

    .overlay-content {
      background-color: rgb(var(--primary)); /* 你網站主色 */
      display: grid;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      padding: 1.5rem;
      opacity: 0.9;
      color: #fffcf1;
    }

    .overlay-item {
      width: 100%;
      text-align: left;
      font-size: larger;
      padding-bottom: 10px;
      &:hover {
        border-bottom: 1px solid black; 
      }
    }
  }

  .navigation.opened + .nav-overlay {
    opacity: 1;
    transform: translateX(0);
  }
  .navigation-left-bar.opened + .nav-overlay {
    opacity: 1;
    transform: translateX(0);
  }
  .navigation-sticky.opened + .nav-overlay {
    opacity: 1;
    transform: translateX(0);
  }
  .navigation-topbar.opened + .nav-overlay {
    opacity: 1;
    transform: translateX(0);
  }
</style>
