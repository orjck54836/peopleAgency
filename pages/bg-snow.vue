<script setup lang="ts">
const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};
const closeNav = () => {
  navOpen.value = false;
};
</script>
<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <!-- Snow background -->
  <div id="bg-snow">
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
    <div class="snowflake"></div>
  </div>
  <!-- content -->
  <main class="container-fluid">
    <div class="row gx-xxl-6">
      <div class="col col-xl-9" data-bs-spy="scroll" data-bs-target="#navigation">
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
#bg-snow {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  .snowflake {
    --size: 1vw;
    width: var(--size);
    height: var(--size);
    background: rgba($color: #fff, $alpha: 0.3);
    border-radius: 50%;
    position: absolute;
    top: -5vh;
  }

  @keyframes snowfall {
    0% {
      transform: translate3d(var(--left-ini), 0, 0);
    }
    100% {
      transform: translate3d(var(--left-end), 110vh, 0);
    }
  }

  @for $i from 1 through 50 {
    .snowflake:nth-child(#{$i}) {
      --size: #{random(5) * 0.2}vw;
      --left-ini: #{random(20) - 10}vw;
      --left-end: #{random(20) - 10}vw;
      left: #{random(100)}vw;
      animation: snowfall #{5 + random(10)}s linear infinite;
      animation-delay: -#{random(10)}s;
    }
  }

  /* added small blur every 6 snowflakes*/
  .snowflake:nth-child(6n) {
    filter: blur(1px);
  }
}
</style>
