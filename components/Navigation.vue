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
const hiddenPaths = [
  '/contact',
  '/internship',
  '/human_resource',
  '/school',
  '/information',
  '/about_us',
]

const hideNav = computed(() => hiddenPaths.some(path => route.path.includes(path)))

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
  { index: "", text: "ourStoryTitle", href: "/about_us", active: false },
  // { index: "", text: "schoolTitle", href: "/school", active: false },
  { index: "", text: "humanResourceTitle", href: "/human_resource", active: false },
  { index: "", text: "informationTitle", href: "/information", active: false },
  { index: "", text: "commonQuestionTitle", href: "#common_questions", active: false },
]);
</script>

<template>
  <nav v-show="!hideNav" ref="navRef" :class="`navigation ${navOpen ? 'opened' : ''}`" id="navigation">
    <img src="/images/logo.png" class="mb-4 d-xl-none" alt="logo" />
    <ul>
      <li v-for="(item, index) in navItems" :key="index" @click="closeNav" class="nav-link">
        <a :href="item.href" :class="{ active: item.active }">
          <span>{{ item.index }}</span> <span class="text">{{ $t(item.text) }}</span>
        </a>
      </li>
    </ul>
    <div class="contact">

      <!-- Line 官方帳號 -->
      <div class="line-contact nav-link">
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE logo" width="24"
          height="24" />
        <a href="https://line.me/R/ti/p/@forma_global" target="_blank" rel="noopener noreferrer">
          Line Account
        </a>
      </div>
    </div>
    <!-- <div class="google-map-wrapper">
      <iframe width="100%" height="200" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.939320802105!2d139.76609781525802!3d35.68123628019509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c0b06c34b67%3A0x48e61f729a5c15b6!2z5p2x5Lqs6YO95p2x5Z-O!5e0!3m2!1szh-TW!2sjp!4v1720200000000!5m2!1szh-TW!2sjp"></iframe>
    </div> -->
  </nav>
  <!-- 直接在同層渲染 Overlay -->
  <div class="nav-overlay d-xl-none" @click.self="closeNav">
    <!-- overlay-content帶有彈出動畫 -->
    <transition name="slide-up">
      <div class="overlay-content">
        <transition-group tag="div" name="slide-up-items" class="overlay-nav-items">
          <div class="overlay-item" v-for="(item, index) in navItems" :key="item.text" @click="closeNav">
            <a :href="item.href" :class="{ active: item.active }">
              <span>{{ item.index }}</span> <span class="text">{{ $t(item.text) }}</span>
            </a>
          </div>
          <!-- 手機版 Line 官方帳號 -->
          <div class="overlay-line-contact">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="LINE logo" width="24"
              height="24" />
            <a href="https://line.me/R/ti/p/@forma_global" target="_blank" rel="noopener noreferrer">
              Line Account
            </a>
          </div>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.google-map-wrapper {
  width: 90%;
  margin: 10px auto;
  padding: 10px;
}

.line-contact {
  display: flex;
  font-weight: bolder;
  color: #00b900;
  gap: 2;

  a {
    margin-left: 10px;
  }
}

// navigation
.navigation {
  background: linear-gradient(to bottom right,
      rgba(220, 183, 119, 0.3),
      rgba(211, 166, 39, 0.25));
  backdrop-filter: blur(10px);
  // max-width: 300px;
  width: 15vw;
  height: fit-content;
  min-height: 75vh;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 100;
  text-align: center;
  padding-top: 2%;
  padding-bottom: 2%;
  border-radius: 20px;
  margin: 0 auto;

  /* 小螢幕 (<1200px) 下拉式 */
  @media (max-width: 1200px) {
    /* 預設收合: display: none */
    display: none;
    position: static;
    /* 不要 absolute/fixed */

    &.opened {
      display: block;
      /* user點Menu後展開 */
      background-color: rgb(var(--primary));
      padding: 20px;
    }
  }

  @media (min-width: 1200px) {
    position: fixed;
    top: 15%;

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
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;

    li>a {
      color: rgb(var(--black));
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      padding: 0.5vh 0;
      font-size: 2rem;
      font-weight: 500;

      &:dir(ltr) {
        border-left: 2px solid transparent;
      }

      &:dir(rtl) {
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
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
    padding: 20px;

    a {
      font-size: 16px;
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
    background-color: rgb(var(--primary));
    /* 你網站主色 */
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

    .overlay-line-contact {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: bold;
      color: #00b900;

      a {
        color: inherit;
        font-size: 18px;
      }
    }
  }

  .overlay-item {
    width: 100%;
    text-align: center;
    font-size: larger;
    padding-bottom: 10px;

    &:hover {
      border-bottom: 1px solid rgb(163, 48, 24);
    }
  }
}


.navigation.opened+.nav-overlay {
  opacity: 1;
  transform: translateX(0);
}

.navigation-left-bar.opened+.nav-overlay {
  opacity: 1;
  transform: translateX(0);
}

.navigation-sticky.opened+.nav-overlay {
  opacity: 1;
  transform: translateX(0);
}

.navigation-topbar.opened+.nav-overlay {
  opacity: 1;
  transform: translateX(0);
}
</style>
