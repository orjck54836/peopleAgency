<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  gsap.fromTo(
    ".section-title-overlay-text",
    { y: "50%" },
    {
      y: "-50%",
      scrollTrigger: {
        trigger: ".how-i-work",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
  gsap.from(".more-info", {
    scale: 0,
    duration: 1.2,
    ease: "elastic",
    delay: 0.5,
    scrollTrigger: {
      trigger: ".more-info",
    },
  });
  gsap.from(".process", {
    stagger: 0.15,
    scale: 0,
    duration: 2.8,
    ease: "elastic",
    scrollTrigger: {
      trigger: ".process-list",
      start: "top 60%",
      end: "top 20%",
    },
  });
});
</script>
<template>
  <span class="section-title-overlay-text">How i Work</span>
  <SectionTitle subtitle="How I Work" title="My Working Process" />
  <div class="row pb-60 px-4 process-list justify-content-center">
    <div class="process col-6">
      <span class="circle position-absolute w-100 h-100"></span>
      <div>
        <p>01.</p>
        <p>idea</p>
      </div>
    </div>
    <div class="process col-6">
      <span class="circle-even position-absolute w-100 h-100"></span>
      <div>
        <p>02.</p>
        <p>sketch</p>
      </div>
    </div>
    <div class="process col-6">
      <span class="circle position-absolute w-100 h-100"></span>
      <div>
        <p>03.</p>
        <p>design</p>
      </div>
    </div>
    <div class="process col-6">
      <span class="circle-even position-absolute w-100 h-100"></span>
      <div>
        <p>04.</p>
        <p>develop</p>
      </div>
    </div>
    <div class="process col-6">
      <span class="circle position-absolute w-100 h-100"></span>
      <div>
        <p>05.</p>
        <p>text</p>
      </div>
    </div>
    <div class="process col-6">
      <span class="circle-even position-absolute w-100 h-100"></span>
      <div>
        <p>06.</p>
        <p>launch</p>
      </div>
    </div>
  </div>
  <div class="more-info d-flex flex-wrap align-items-center gap-5 gap-md-3">
    <p>Need More info? Please Get in touch</p>
    <span class="line"></span>
    <a href="#contact" class="arrow-down position-relative">
      <div class="waves-top-md">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <svg width="45" height="54" viewBox="0 0 45 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44 31.449L22.5 52.949L1 31.449L8.98204 23.3382L16.8353 31.449V0.550781H28.1647V31.449L36.018 23.3382L44 31.449Z" stroke="currentColor" />
      </svg>
      <div class="waves-bottom-md">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </a>
  </div>
  <div class="col-12">
    <a href="#testimonials" class="d-flex gap-4 align-items-center next-chapter">
      <span class="page">08/11</span>
      <span class="next">Next Chapter</span>
      <PhosphorIconArrowElbowRightDown />
    </a>
  </div>
</template>

<style lang="scss">
// how i work
.how-i-work {
  padding-top: 60px;
  padding-bottom: 40px;
  @media (min-width: 1200px) {
    padding-top: 120px;
  }
  .section-title-overlay-text {
    top: 120px;
  }
  .process-list {
    margin-top: 40px;
    margin-bottom: 60px;
    @media (min-width: 1200px) {
      margin-top: 80px;
    }
    display: flex;
    flex-wrap: wrap;
    .process {
      height: 200px;
      width: 200px;
      border-radius: 50%;
      position: relative;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background-color: rgb(var(--black));
        height: 9px;
        width: 9px;
      }
      .circle {
        position: relative;
        &::before,
        &::after {
          content: "";
          display: block;
          position: absolute;
          width: 100%;
          height: 50%;
          left: 0;
        }
        &::before {
          top: 0;
          border: 1px solid rgb(var(--black));
          border-bottom: none;
          border-top-left-radius: 216px;
          border-top-right-radius: 216px;
        }
        &::after {
          bottom: 0;
          border: 1px dashed rgb(var(--black));
          border-top: none;
          border-bottom-left-radius: 216px;
          border-bottom-right-radius: 216px;
        }
      }
      .circle-even {
        @extend .circle;
        &::before {
          border-style: dashed;
          border-bottom: none;
        }
        &::after {
          border-style: solid;
          border-top: none;
        }
      }
      p {
        font-size: 20px;
        font-weight: 500;
        text-transform: uppercase;
      }
    }
  }
}
</style>
