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
  <TopbarHeader :toggle-nav="toggleNav" :navOpen="navOpen" :close-nav="closeNav" />

  <main class="container">
    <div class="col-12" data-bs-spy="scroll" data-bs-target="#navigation">
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
