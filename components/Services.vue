<script lang="ts" setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Service data array
const serviceData = ref([
  {
    id: 1,
    title: "UI/UX Design",
    description: ["Landing Pages", "User Flow", "Wireframing", "Prototyping", "Mobile App Design"],
  },
  {
    id: 2,
    title: "Development",
    description: ["Front-End Development", "Back-End Development", "Full-Stack Development", "Database Management", "API Integration Design"],
  },
  {
    id: 3,
    title: "Illustration",
    description: ["Character Design", "Icon Set", "Illustration Guide", "Illustration Set", "Motion Graphic Design"],
  },
  {
    id: 4,
    title: "App Development",
    description: ["Android App", "iOS App", "Wireframing", "Prototyping", "Mobile App Design"],
  },
]);

// GSAP animation logic
gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  setTimeout(() => {
    gsap.from(".service-card", {
      stagger: 0.2,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".services",
        start: "top 60%",
        end: "top 20%",
      },
    });
  }, 100);
});

const containerRef = ref(null);
</script>

<template>
  <section id="services" class="services section position-relative">
    <!-- 標題區（service Section） -->
    <section class="services-section">
      <h1 class="services-title">{{ $t('ourStoryTitle') }}</h1>
    </section>
    <!-- Swiper -->
    <ClientOnly>
      <swiper :slides-per-view="1" :space-between="24" loop :autoplay="{ delay: 5000 }" :pagination="{ clickable: true, el: '.service-pagination' }" :breakpoints="{ 768: { slidesPerView: 2, spaceBetween: 24 }, 1550: { slidesPerView: 3, spaceBetween: 24 } }" ref="containerRef" class="swiper service-swiper">
        <swiper-slide v-for="service in serviceData" :key="service.id" class="overflow-visible p-3" priority>
          <div class="service-card">
            <div class="card-inner"></div>
            <div class="content">
              <div class="number-circle">
                <div class="waves-top-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <h2>{{ service.id }}</h2>
                <div class="waves-bottom-sm">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <h4>{{ service.title }}</h4>
              <ul class="service-list">
                <li v-for="(item, index) in service.description" :key="index">
                  <PhosphorIconCaretDoubleRight />
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </swiper-slide>

        <div class="service-pagination"></div>
      </swiper>
    </ClientOnly>

    <!-- Next Chapter -->
    <!-- <div class="col-12">
      <a href="#attainments" class="d-flex gap-4 align-items-center next-chapter">
        <span class="page">03/11</span>
        <span class="next">Next Chapter</span>
        <PhosphorIconArrowElbowRightDown />
      </a>
    </div> -->
  </section>
</template>

<style lang="scss">
/* services section */
.services {
  margin-top: 60px;
  /* Services Section */
  .services-section {
    text-align: center;
    padding: 2rem 1rem 2rem;
    position: relative;
    background-image: url("../img/about-me/aboutme-title.jpg");
    background-size: cover;
  }

  /* 漸層標題設計 */
  .services-title {
    font-size: 3rem; /* 可調整字體大小 */
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
    color: #675a5a;
  }
  .services-subtitle {
    font-size: 1.25rem;
    color: #666;
  }
  @media (min-width: 992px) {
    margin-top: 120px;
  }
  padding-bottom: 40px;
  .section-title {
    padding-top: 60px;
  }
  .service-swiper {
    padding-bottom: 50px;
  }
  .service-pagination {
    display: flex;
    justify-content: center;
    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      opacity: 0.5;
      background-color: #fff;
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
  .next-chapter {
    margin-top: 50px;
    @media (min-width: 992px) {
      margin-top: 80px;
    }
  }
  .service-card {
    position: relative;
    padding: 16px;
    @media (min-width: 576px) {
      padding: 32px;
    }
    @media (min-width: 1200px) {
      padding: 50px;
    }
    border: 1px solid rgb(var(--black));
    .card-inner {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(var(--primary));
      z-index: 1;
    }
    .number-circle {
      .waves-top-sm,
      .waves-bottom-sm {
        opacity: 0;
      }
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      transition-duration: 500ms;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      border: 1px solid rgb(var(--black));
    }
    &:hover {
      &::before {
        transform: rotate(3.5deg);
        opacity: 1;
      }
      &::after {
        transform: rotate(-3.5deg);
        opacity: 1;
      }
      .number-circle {
        .waves-top-sm,
        .waves-bottom-sm {
          opacity: 1;
        }
      }
    }
    .content {
      position: relative;
      z-index: 2;
    }
    .number-circle {
      margin-bottom: 40px;
      width: 78px;
      height: 78px;
      border-radius: 50%;
      background-color: rgb(var(--primary));
      border: 1px solid rgb(var(--black));
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      h2 {
        font-size: 32px;
        font-weight: 500;
      }
    }
    h4 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 24px;
      padding-bottom: 8px;
      display: inline-block;
      border-bottom: 2px solid rgb(var(--black));
    }
    .service-list {
      list-style: none;
      padding-left: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      li {
        display: flex;
        align-items: center;
        gap: 12px;
        color: rgb(var(--black));
        svg {
          color: #343330;
        }
      }
    }
  }
}
</style>
