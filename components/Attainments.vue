<script lang="ts" setup>
import ProgressChart from "~/components/ProgressChart.vue";
import SectionOverlayText from "~/components/SectionOverlayText.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillBar from "./SkillBar.vue";

gsap.registerPlugin(ScrollTrigger);

// Skill data
const skills = ref([
  { name: "Front-End Development", percentage: 90 },
  { name: "Back-End Development", percentage: 85 },
  { name: "Full-Stack Development", percentage: 88 },
  { name: "Database Management", percentage: 80 },
  { name: "Version Control", percentage: 95 },
  { name: "API Integration", percentage: 87 },
]);

const languageData = ref([
  { label: "French", progress: 95 },
  { label: "English", progress: 92 },
  { label: "Dutch", progress: 88 },
]);

// GSAP animations
onMounted(() => {
  gsap.from(".design-row-item", {
    opacity: 0,
    scale: 0,
    stagger: 0.2,
    duration: 1.5,
    ease: "back",
    scrollTrigger: {
      trigger: ".attainments",
      start: "top 60%",
      end: "top 20%",
    },
  });

  gsap.from(".developer-row", {
    opacity: 0,
    scale: 0,
    duration: 1.5,
    scrollTrigger: {
      trigger: ".design-row",
      start: "top 60%",
      end: "top 20%",
    },
  });

  gsap.from(".language-row-item", {
    opacity: 0,
    scale: 0,
    duration: 1.5,
    ease: "back",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".developer-row",
      start: "top 60%",
      end: "top 20%",
    },
  });
});
</script>
<template>
  <SectionOverlayText text="attainments" />
  <!-- Design Skills Section -->
  <div class="row pb-120 design-row">
    <div class="col-lg-4">
      <div class="section-title-sm design-row-item">
        <div class="top">
          <h2>Design Skills</h2>
          <span>Highlight My Expertise in:</span>
        </div>
        <span class="serial">01.-</span>
      </div>
    </div>
    <div class="col-12 col-lg-8">
      <div class="row">
        <div class="col-md-4 design-row-item">
          <div class="d-flex flex-column align-items-center mb-4">
            <div class="design-chart mb-4">
              <ProgressChart :progress="85" />
            </div>
            <button class="btn btn-outline-secondary px-5">Design</button>
          </div>
        </div>
        <div class="col-md-4 design-row-item">
          <div class="d-flex flex-column align-items-center mb-4">
            <div class="branding-chart mb-4">
              <ProgressChart :progress="90" />
            </div>
            <button class="btn btn-outline-secondary px-5">Branding</button>
          </div>
        </div>
        <div class="col-md-4 design-row-item">
          <div class="d-flex flex-column align-items-center mb-4">
            <div class="ecommerce-chart mb-4">
              <ProgressChart :progress="80" />
            </div>
            <button class="btn btn-outline-secondary px-5">Ecommerce</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Developer Skills Section -->
  <div class="row pb-120 developer-row">
    <div class="col-md-5 col-lg-4 offset-md-1 offset-lg-2">
      <div class="section-title-sm">
        <div class="top">
          <h2>Developer Skills</h2>
          <span>Highlight My Expertise in:</span>
        </div>
        <span class="serial">02.-</span>
      </div>
    </div>
    <div class="col-md-6">
      <div class="d-flex flex-column gap-3">
        <SkillBar v-for="(item, index) in skills" :key="index" :skill="item.name" :percentage="item.percentage" />
      </div>
    </div>
  </div>

  <!-- Language Skills Section -->
  <div class="row pb-120 language-row">
    <div class="col-lg-4">
      <div class="section-title-sm language-row-item">
        <div class="top">
          <h2>Language Skills</h2>
          <span>Highlight My Expertise in:</span>
        </div>
        <span class="serial">03.-</span>
      </div>
    </div>
    <div class="col-12 col-lg-8">
      <div class="row g-3">
        <div v-for="(item, index) in languageData" :key="index" class="col-12 col-sm-6 col-md-4 language-row-item">
          <div class="d-flex flex-column align-items-center mb-4">
            <div class="design-chart mb-4">
              <ProgressChart :progress="item.progress" />
            </div>
            <button class="btn btn-outline-secondary px-5">{{ item.label }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12">
    <a href="#fun_facts" class="d-flex gap-4 align-items-center next-chapter">
      <span class="page">04/11</span>
      <span class="next">Next Chapter</span>
      <span class="icon">
        <PhosphorIconArrowElbowRightDown />
      </span>
    </a>
  </div>
</template>

<style lang="scss">
/* attainments */
.attainments {
  padding: 60px 0;
  overflow-x: hidden;
  @media (min-width: 992px) {
    padding: 120px 0;
  }
  .section-title-overlay-text {
    top: 60px;
    &:dir(ltr) {
      left: 6%;
    }
    &:dir(ltr) {
      right: 6%;
    }
  }
  .section-title-sm {
    .top {
      &:dir(ltr) {
        padding: 20px 0 20px 32px;
        border-left: 2px solid rgb(var(--black));
      }
      &:dir(rtl) {
        padding: 20px 32px 20px 0;
        border-right: 2px solid rgb(var(--black));
      }
      h2 {
        margin-bottom: 12px;
        font-size: 28px;
        @media (min-width: 1400px) {
          font-size: 40px;
        }
        font-weight: 500;
      }
      span {
        @media (min-width: 1400px) {
          font-size: 20px;
        }
      }
    }
    .serial {
      color: rgba($color: #000000, $alpha: 0.5);
      @media (min-width: 992px) {
        transform: rotate(-90deg) translate(-24px, -8px);
      }
      transform: rotate(-90deg) translateX(-8px);
      font-size: 28px;
      @media (min-width: 992px) {
        font-size: 40px;
      }
      font-weight: 500;
      display: inline-block;
      margin-bottom: 40px;
    }
  }

  .skill {
    .progress {
      height: 3px;
      margin-top: 8px;
      background-color: rgb(var(--white));
      .progress-bar {
        background-color: rgb(var(--black));
        transition-duration: 4s;
        width: 0;
        animation-timing-function: ease-in-out;
      }
    }
  }

  .next-chapter {
    padding-top: 80px;
  }
}
</style>
