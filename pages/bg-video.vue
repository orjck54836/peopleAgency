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

  <!-- Video background -->
  <div id="bg-video">
    <video src="/video-bg.mp4" loop autoPlay muted></video>
  </div>
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
#bg-video {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.1;
  }
}
</style>
