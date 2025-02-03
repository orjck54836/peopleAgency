<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Props
defineProps({
  text: {
    type: String,
    required: true,
  },
});

const sectionTitleRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const element = sectionTitleRef.value;

  if (element) {
    const anim = gsap.fromTo(
      element,
      { y: "50%" },
      {
        y: "-50%",
        scrollTrigger: {
          trigger: ".about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Clean up animation and ScrollTriggers
    onBeforeUnmount(() => {
      anim.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });
  }
});
</script>

<template>
  <span ref="sectionTitleRef" class="section-title-overlay-text">
    {{ text }}
  </span>
</template>

<style lang="scss">
.section-title-overlay-text {
  color: rgb(var(--black));
  font-family: Poppins;
  font-size: 35px;
  @media (min-width: 576px) {
    font-size: 80px;
  }
  @media (min-width: 992px) {
    font-size: 100px;
  }
  @media (min-width: 1400px) {
    font-size: 120px;
  }
  @media (min-width: 1800px) {
    font-size: 160px;
  }
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 240px */
  text-transform: uppercase;
  opacity: 0.05;
  position: absolute;
  text-align: left;
  z-index: -1;
  top: 0;
  left: 0;
  &:dir(rtl) {
    left: auto;
    right: 0;
  }
}
</style>
