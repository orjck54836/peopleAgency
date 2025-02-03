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

const socialLinks = [
  { icon: "PhosphorIconFacebookLogo", href: "#" },
  { icon: "PhosphorIconInstagramLogo", href: "#" },
  { icon: "PhosphorIconTwitterLogo", href: "#" },
  { icon: "PhosphorIconLinkedinLogo", href: "#" },
];
</script>

<template>
  <Header :navOpen="navOpen" classes="d-xl-none" :toggleNav="toggleNav" />

  <div class="left-bar">
    <NuxtLink to="/">
      <img src="/images/icon.png" alt="" />
    </NuxtLink>
    <ul>
      <li v-for="social in socialLinks" :key="social.icon">
        <a :href="social.href">
          <component :is="social.icon" />
        </a>
      </li>
    </ul>
  </div>

  <div class="email-icon">
    <a href="mailto:chat@portify.com">
      <PhosphorIconEnvelope />
    </a>
  </div>

  <!-- main content -->
  <main>
    <div class="col-12" data-bs-spy="scroll" data-bs-target="#navigation">
      <!-- hero -->
      <div class="container">
        <Hero classes="hero-left-bar" />
      </div>

      <nav class="navigation-left-bar" :class="{ opened: navOpen }" id="navigation">
        <div class="scroll-down d-none d-xl-flex">
          <div class="scroll-anim">
            <span></span>
          </div>
          <p>Scroll Down</p>
        </div>

        <img src="/images/logo.png" class="d-xl-none mb-3" alt="" />

        <ul>
          <li v-for="item in navItems" :key="item.id" class="nav-link">
            <a :href="`#${item.id}`" :class="{ active: item.isActive }">
              <span class="text">{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="nav-overlay d-xl-none" @click="closeNav"></div>
      <div class="container">
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
    </div>
  </main>
</template>

<style lang="scss">
.left-bar {
  display: none;
  @media (min-width: 1200px) {
    display: flex;
  }
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 20px;
  border-right: 1px solid rgba($color: #000000, $alpha: 0.1);
  background-color: rgb(var(--primary));
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  ul {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    li {
      a {
        font-size: 1.4rem;
        width: 40px;
        height: 40px;
        border: 1px solid rgba($color: #000000, $alpha: 0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        transition-duration: 500ms;
        &:hover {
          background-color: rgb(var(--black));
          color: rgb(var(--white));
        }
      }
    }
  }
}
// navigation
.navigation-left-bar {
  position: sticky;
  background-color: rgb(var(--primary));
  --height: 0;
  border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  .scroll-down {
    .scroll-anim {
      height: 30px;
      width: 20px;
      border: 2px solid rgba($color: #000000, $alpha: 0.2);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      span {
        display: block;
        width: 3px;
        background-color: rgba($color: #000000, $alpha: 0.3);
        height: 6px;
        animation: goDown 2.5s ease-out infinite;
      }
    }
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    @media (min-width: 1400px) {
      padding: 12px 32px;
    }
    p {
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }
  }

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
    margin-left: 81px;
    display: flex;
    align-items: center;
    transform: translateX(0);
  }
  z-index: 100;
  ul {
    @media (min-width: 1200px) {
      border-left: 1px solid rgba($color: #000000, $alpha: 0.1);
    }
    list-style: none;
    padding: 12px;
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
      span {
        font-size: 14px;
      }
      @media (min-width: 1650px) {
        span {
          font-size: 16px;
        }
        padding: 6px 12px;
      }
      font-weight: 500;
      transition-duration: 300ms;
      display: block;
      position: relative;
      min-width: max-content;
      border-bottom: 2px solid transparent;
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
</style>
