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

  <!-- main content -->
  <main class="container-fluid">
    <div class="row gx-xxl-6">
      <div class="col col-xl-9" data-bs-spy="scroll" data-bs-target="#navigation">
        <Hero />
        <AboutMe />
        <Services />
        <!-- Projects -->
        <section id="common_questions" class="projects section position-relative">
          <ClientOnly>
            <CommonQuestions />
          </ClientOnly>
        </section>
        <!-- Blogs -->
        <!-- <Blogs /> -->
      </div>
    </div>
  </main>
</template>
