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
  <!-- <Navigation :nav-open="navOpen" :close-nav="closeNav" class="gx-xxl-3"/> -->

  <!-- main content -->
  <main class="container-fluid">
    <div class="row">
      <div class="col-xl-10" data-bs-spy="scroll" data-bs-target="#navigation">
        <Hero />
        <AboutMe />
        <Services />
        <!-- Projects -->
        <section id="common_questions" class="projects section position-relative">
          <ClientOnly>
            <CommonQuestions />
          </ClientOnly>
        </section>
        <!-- VisaType -->
        <VisaType />
      </div>
      <div class="col-xl-2">
        <Navigation :nav-open="navOpen" :close-nav="closeNav" />
      </div>
    </div>
  </main>
  <ContactIcon />
  <Footer />
</template>

<style lang="scss" scoped>
  .bg{
    z-index: -5 !important;
  }
</style>
