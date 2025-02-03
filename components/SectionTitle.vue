<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Props
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});

const sectionTitleRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const element = sectionTitleRef.value;

  if (element) {
    const fromAnimation = gsap.from(element, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: element,
        start: "top bottom", // Adjust as needed
      },
    });

    const toAnimation = gsap.to(element, {
      "--height": "100%",
      delay: 0.5,
      scrollTrigger: {
        trigger: element,
        start: "top bottom", // Adjust as needed
      },
    });

    // Clean up animations and ScrollTriggers
    onBeforeUnmount(() => {
      fromAnimation.kill();
      toAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });
  }
});
</script>

<template>
  <div ref="sectionTitleRef" class="section-title text-capitalize">
    <h4>{{ subtitle }}</h4>
    <h2>{{ title }}</h2>
  </div>
</template>

<style lang="scss">
// section title
.section-title {
  padding-left: 32px;
  padding-top: 24px;
  position: relative;
  @media (min-width: 1200px) {
    padding-top: 36px;
    padding-left: 60px;
  }
  padding-bottom: 20px;
  --height: 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    height: var(--height);
    width: 2px;
    background-color: rgb(var(--black));
  }
  &:dir(ltr) {
    &::before {
      left: 0;
    }
  }
  &:dir(rtl) {
    padding-left: 0;
    padding-right: 32px;
    @media (min-width: 1200px) {
      padding-left: 0;
      padding-right: 60px;
    }
    &::before {
      right: 0;
    }
  }
  h4 {
    font-size: 16px;
    margin-bottom: 8px;
    @media (min-width: 1200px) {
      font-size: 24px;
    }
    font-weight: 500;
  }
  h2 {
    font-size: 22px;
    @media (min-width: 576px) {
      font-size: 28px;
    }
    @media (min-width: 576px) {
      font-size: 40px;
    }
    @media (min-width: 1200px) {
      font-size: 55px;
    }
    @media (min-width: 1400px) {
      font-size: 80px;
    }
    font-weight: 600;
  }
  margin-bottom: 42px;
}
</style>
