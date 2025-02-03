<script setup lang="ts">
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/SectionTitle.vue";
import SectionOverlayText from "@/components/SectionOverlayText.vue";

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Define the experience items with their respective data
const experienceItems = ref([
  { date: "(2020 - Present)", title: "Senior Web Developer at TechCorp", description: "Spearheaded multiple web development projects, enhancing user experience and functionality. Led a team of developers to successfully launch high-traffic websites." },
  { date: "(2018 - 2020)", title: "Front-End Developer at WebSolutions", description: "Developed responsive and interactive front-end interfaces using HTML, CSS, and JavaScript. Collaborated closely with designers to implement visually appealing and user-friendly websites." },
  { date: "(2016 - 2018)", title: "Junior Developer at CreativeWorks", description: "Assisted in the development and maintenance of client websites. Gained hands-on experience with back-end technologies and database management." },
  { date: "(2014 - 2016)", title: "Freelance Web Developer", description: "Worked on various freelance projects, creating custom websites for clients across different industries. Improved problem-solving skills and adaptability to client needs." },
]);

// Variable for dynamic height
const height = ref("0%");

onMounted(() => {
  // GSAP Animations
  gsap.from(".experience-item", {
    opacity: 0,
    duration: 1,
    stagger: 0.5,
    scrollTrigger: {
      trigger: ".experience-item",
    },
  });

  gsap.utils.toArray(".experience-item").forEach((item) => {
    gsap.to(item as HTMLElement, {
      "--item-height": "100%",
      stagger: 0.5,
      delay: 0.5,
      scrollTrigger: {
        trigger: item as HTMLElement,
        start: "top 80%",
        end: "top 20%",
      },
    });
  });

  gsap.to(".experience-wrapper", {
    duration: 2,
    ease: "back",
    delay: 0.5,
    "--height": "100%",
    scrollTrigger: {
      trigger: ".experience-wrapper",
    },
  });
});
</script>
<template>
  <SectionOverlayText text="experiences" />
  <SectionTitle subtitle="Highlight My key Experiences" title="My Experience" />
  <div class="row pb-60">
    <div class="col-lg-10 col-xl-8">
      <div class="experience-wrapper d-flex flex-column" :style="{ '--height': height }">
        <div class="experience-item" v-for="(item, index) in experienceItems" :key="index">
          <h5>{{ item.date }}</h5>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>

      <a href="/resume.pdf" class="download-cv position-relative" download>
        <div class="waves-top-md"><span></span><span></span><span></span><span></span></div>
        <svg width="45" height="54" viewBox="0 0 45 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44 31.449L22.5 52.949L1 31.449L8.98204 23.3382L16.8353 31.449V0.550781H28.1647V31.449L36.018 23.3382L44 31.449Z" stroke="currentColor" />
        </svg>
        <div class="waves-bottom-md"><span></span><span></span><span></span><span></span></div>
      </a>
    </div>
  </div>

  <div class="col-12">
    <a href="#projects" class="d-flex gap-4 align-items-center next-chapter">
      <span class="page">06/11</span>
      <span class="next">Next Chapter</span>
      <span class="icon">
        <PhosphorIconArrowElbowRightDown />
      </span>
    </a>
  </div>
</template>

<style lang="scss">
/* experience */

.experience {
  padding-top: 60px;
  padding-bottom: 40px;
  @media (min-width: 1200px) {
    padding-top: 120px;
  }
  .section-title-overlay-text {
    top: 100px;
  }
  .experience-wrapper {
    margin-top: 30px;
    gap: 50px;
    --height: 0;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      &:dir(ltr) {
        left: 0;
      }
      &:dir(rtl) {
        right: 0;
      }
      width: 2px;
      height: var(--height);
      background-color: rgba($color: #000000, $alpha: 0.3);
    }
    @media (min-width: 1200px) {
      gap: 80px;
    }
    padding-bottom: 60px;
    .experience-item {
      position: relative;
      --item-height: 0;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        transform-origin: center;
        height: var(--item-height);
        width: 2px;
        background-color: rgb(var(--black));
      }
      &:dir(ltr) {
        padding-left: 32px;
        &::before {
          left: 0;
        }
      }
      &:dir(rtl) {
        padding-right: 32px;
        &::before {
          right: 0;
        }
      }
      h5 {
        font-size: 16px;
        @media (min-width: 1200px) {
          font-size: 20px;
        }
        font-weight: 500;
        margin-bottom: 4px;
      }
      h3 {
        font-size: 20px;
        @media (min-width: 992px) {
          font-size: 28px;
        }
        @media (min-width: 1400px) {
          font-size: 40px;
        }
        font-weight: 600;
        margin-bottom: 16px;
      }
      p {
        @media (min-width: 1400px) {
          font-size: 18px;
        }
        color: rgb(var(--black));
      }
    }
  }
  .download-cv {
    margin-top: 40px;
    margin-bottom: 40px;
    @media (min-width: 768px) {
      margin-top: 60px;
    }
    width: 132px;
    height: 132px;
    border: 1px solid rgb(var(--black));
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #000;
      svg {
        filter: brightness(0) invert(1);
      }
      .waves-bottom-md,
      .waves-top-md {
        opacity: 0;
      }
    }
  }
}
</style>
