<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Reactive references to track mouse position
const offsetX = ref(0);
const offsetY = ref(0);

// Mouse move event handler
const mouseMove = (e: MouseEvent) => {
  offsetX.value = (e.clientX - window.innerWidth / 2) * 0.01;
  offsetY.value = (e.clientY - window.innerHeight / 2) * 0.01;
};

onMounted(() => {
  // Add the mouse move event listener
  document.addEventListener("mousemove", mouseMove);

  // GSAP animations
  gsap.fromTo(
    ".section-title-overlay-text",
    { y: "50%" },
    {
      y: "-50%",
      scrollTrigger: {
        trigger: ".fun_facts",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  gsap.from(".fun-fact", {
    scale: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".fun-fact",
    },
  });
});
</script>
<template>
  <span class="section-title-overlay-text">my facts</span>
  <SectionTitle subtitle="Some interesting facts about me" title="Fun Facts" />

  <div class="row pb-60">
    <div class="col-sm-6 col-md-4 col-xl-3">
      <div class="fun-fact">
        <div class="numbers">
          <span class="number-outline-one" :style="{ transform: `translate(${offsetX / 2}px, ${offsetY / 2}px)` }"> 145 </span>
          <span class="number-outline-two" :style="{ transform: `translate(${offsetX}px, ${offsetY}px)` }"> 145 </span>
          <span class="number-main">145</span>
        </div>
        <p>Finished Projects</p>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 offset-md-1 col-xl-3">
      <div class="fun-fact">
        <div class="numbers">
          <span class="number-outline-one" :style="{ transform: `translate(${offsetX / 2}px, ${offsetY / 2}px)` }"> 128 </span>
          <span class="number-outline-two" :style="{ transform: `translate(${offsetX}px, ${offsetY}px)` }"> 128 </span>
          <span class="number-main">128</span>
        </div>
        <p>Happy Customers</p>
      </div>
    </div>
  </div>
  <div class="row pb-60">
    <div class="col-sm-6 col-md-4 offset-md-2 offset-xl-5 col-xl-3">
      <div class="fun-fact">
        <div class="numbers">
          <span class="number-outline-one" :style="{ transform: `translate(${offsetX / 2}px, ${offsetY / 2}px)` }"> 865 </span>
          <span class="number-outline-two" :style="{ transform: `translate(${offsetX}px, ${offsetY}px)` }"> 865 </span>
          <span class="number-main">865</span>
        </div>
        <p>Working Hours</p>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 offset-md-1 col-xl-3">
      <div class="fun-fact">
        <div class="numbers">
          <span class="number-outline-one" :style="{ transform: `translate(${offsetX / 2}px, ${offsetY / 2}px)` }"> 232 </span>
          <span class="number-outline-two" :style="{ transform: `translate(${offsetX}px, ${offsetY}px)` }"> 232 </span>
          <span class="number-main">232</span>
        </div>
        <p>Coffe Cups</p>
      </div>
    </div>
  </div>
  <div class="col-12">
    <a href="#experience" class="d-flex gap-4 align-items-center next-chapter">
      <span class="page">05/11</span>
      <span class="next">Next Chapter</span>
      <span class="icon">
        <PhosphorIconArrowElbowRightDown />
      </span>
    </a>
  </div>
</template>

<style lang="scss">
/* fun facts */
.fun_facts {
  position: relative;
  padding-bottom: 40px;
  padding-top: 20px;
  .fun-fact {
    position: relative;
    .numbers {
      z-index: 1;
      position: relative;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 2px solid rgb(var(--black));
      span {
        transition-duration: 300ms;
        font-size: 80px;
        @media (min-width: 992px) {
          font-size: 116px;
        }
        font-weight: 700;
        line-height: 120%;
      }
      .number-outline-one,
      .number-outline-two {
        position: absolute;
        top: 0;
        -webkit-text-stroke: 1px #000;
        -webkit-text-fill-color: transparent;
        transition-duration: 500ms;
      }
      // .number-outline-one {
      //   transform: rotate(3deg);
      // }
      // .number-outline-two {
      //   transform: rotate(-3deg);
      // }
    }
    p {
      font-size: 20px;
      font-weight: 500;
      color: rgb(var(--black));
    }
  }
  .next-chapter {
    padding-top: 90px;
  }
}
</style>
