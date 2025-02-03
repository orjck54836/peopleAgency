<script setup lang="ts">
const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};
const closeNav = () => {
  navOpen.value = false;
};

const navItems = [
  { id: "top", text: "top", isActive: true },
  { id: "about_me", text: "about me", isActive: false },
  { id: "services", text: "my services", isActive: false },
  { id: "attainments", text: "skills", isActive: false },
  { id: "fun_facts", text: "facts", isActive: false },
  { id: "experience", text: "experiences", isActive: false },
  { id: "projects", text: "projects", isActive: false },
  { id: "how_i_work", text: "how i work", isActive: false },
  { id: "testimonials", text: "testimonials", isActive: false },
  { id: "contact", text: "contact", isActive: false },
];
</script>

<template>
  <Header :navOpen="navOpen" classes="d-xl-none" :toggle-nav="toggleNav" />

  <main class="container">
    <div class="col-12" data-bs-spy="scroll" data-bs-target="#navigation">
      <Hero classes="hero-left-bar" />

      <nav class="navigation-sticky" :class="{ opened: navOpen }" id="navigation">
        <NuxtLink to="/">
          <img src="/images/logo.png" class="d-xl-none d-xxl-block" height="40" alt="logo" />
        </NuxtLink>
        <ul>
          <li v-for="item in navItems" :key="item.id" class="nav-link">
            <a :href="`#${item.id}`" :class="{ active: item.isActive }">
              <span class="text">{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="nav-overlay d-xl-none" @click="closeNav"></div>
      <Hero />
      <AboutMe />
      <Services />
      <!-- Attainments -->
      <section id="attainments" class="attainments section position-relative">
        <ClientOnly>
          <Attainments />
        </ClientOnly>
      </section>
      <!-- Fun facts -->
      <section id="fun_facts" class="fun_facts section">
        <ClientOnly>
          <FunFacts />
        </ClientOnly>
      </section>
      <!-- Experience -->
      <section id="experience" class="experience section position-relative">
        <ClientOnly>
          <Experience />
        </ClientOnly>
      </section>
      <!-- Projects -->
      <section id="projects" class="projects section position-relative">
        <ClientOnly>
          <Projects />
        </ClientOnly>
      </section>
      <!-- How I Work -->
      <section id="how_i_work" class="how-i-work section position-relative">
        <ClientOnly>
          <HowIWork />
        </ClientOnly>
      </section>
      <!-- Blogs -->
      <Blogs />
      <!-- Testimonials -->
      <section id="testimonials" class="testimonials section position-relative">
        <ClientOnly>
          <Testimonials />
        </ClientOnly>
      </section>
      <!-- Contact -->
      <section id="contact" class="contact section position-relative">
        <ClientOnly>
          <Contact />
        </ClientOnly>
      </section>
    </div>
  </main>
</template>

<style lang="scss">
// navigation sticky
.navigation-sticky {
  position: sticky;
  background-color: rgb(var(--primary));
  --height: 0;
  @media (max-width: 1200px) {
    &:dir(ltr) {
      transform: translateX(-120%);
      left: 0;
    }
    &:dir(rtl) {
      transform: translateX(120%);
      right: 0;
    }
    transition-duration: 500ms;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    padding: 20px;
    top: 0;
    bottom: 0;
    position: fixed;
    max-width: 300px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    img {
      margin-bottom: 20px;
    }
  }
  &.opened {
    @media (max-width: 1200px) {
      transform: translateX(0);
      position: fixed;
      ul {
        display: flex;
        flex-direction: column;
      }
      background-color: rgb(var(--primary));
    }
  }
  @media (min-width: 1200px) {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    padding: 12px 0;
    justify-content: space-between;
    transform: translateX(0);
  }
  z-index: 100;
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    margin: 0;
    gap: 8px;
    position: relative;
    li > a {
      color: rgb(var(--black));
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      gap: 30px;
      padding: 5px 8px;
      font-size: 14px;
      @media (min-width: 1400px) {
        font-size: 20px;
        padding: 6px 12px;
      }
      font-weight: 500;
      transition-duration: 300ms;
      display: block;
      position: relative;
      min-width: max-content;
      border-bottom: 2px solid transparent;
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
      &::before {
        transition-duration: 600ms;
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 2px;
        background: rgb(var(--black));
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
        &::before {
          animation: grow 600ms ease-in-out;
          width: 100%;
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
        &::before {
          transition-duration: 600ms;
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 2px;
          background: rgb(var(--black));
          &:dir(rtl) {
            left: auto;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
