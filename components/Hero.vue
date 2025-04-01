<script lang="ts" setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import SplitType from "split-type";

// Ensure process.client to avoid running in SSR
const classes = ref(""); // Optional prop for custom classes

onMounted(() => {
  // GSAP animations
  gsap.from(".img-wrapper", { duration: 1.5, scale: 1.5, ease: "back", delay: 0.3, opacity: 0 });
  gsap.from(".work-btn", { duration: 1.2, scale: 0, opacity: 0, ease: "bounce" });
  gsap.from(".contact-btn", { duration: 1.2, scale: 0, opacity: 0, ease: "bounce" });

  const freelancerChars = new SplitType(".freelancer", { types: "chars" }).chars;
  const descChars = new SplitType(".description", { types: "chars" }).chars;

  gsap.from(freelancerChars, { duration: 1.5, rotateX: 180, opacity: 0, ease: "bounce", stagger: 0.05 });
  gsap.from(descChars, { duration: 1, rotateY: 180, stagger: 0.05 });
});
</script>

<template>
  <section id="top" class="hero" :class="classes">
    <div class="row gx-4 justify-content-center align-items-center">
      <!-- Hero Content -->
      <div class="col-12 col-md-6 col-xl-6 hero-content">
        <div>
          <h4 class="text-uppercase freelancer">{{ $t('frontPageTitle') }}</h4>
          <!-- <TypeWriter /> -->
          <p class="description">based in Los Angeles, California.</p>
        </div>

        <div class="d-flex gap-4">
          <NuxtLink to="/contact" class="btn contact-btn text-capitalize btn-outline-secondary">
            {{ $t('contactButton') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
// hero section
.hero {
  min-height: 100vh;
  background-image: url("../img/main-page/image.jpg");
  background-size: cover;
  &.hero-left-bar {
    min-height: 85vh;
    .next-chapter {
      @media (min-width: 992px) {
        padding-top: 80px;
      }
      padding-bottom: 40px;
    }
  }
  padding-top: 100px;
  @media (min-width: 1400px) {
    padding-top: 200px;
  }
  height: auto;
  .row {
    height: 100%;
    &:dir(rtl) {
      .hero-content {
        text-align: right;
      }
    }
    .hero-content {
      padding-top: 60px;
      padding-bottom: 60px;
    }
    h4,
    h4 .char {
      font-size: 22px;
      @media (min-width: 992px) {
        font-size: 40px;
      }
      margin-bottom: 8px;
      letter-spacing: 1px;
    }
    h1 {
      font-size: 40px;
      margin-bottom: 12px;
      @media (min-width: 768px) {
        margin-bottom: 20px;
        font-size: 70px;
      }
      @media (min-width: 1400px) {
        font-size: 100px;
      }
      font-weight: 600;
      letter-spacing: -1px;
    }
    p {
      font-size: 24px;
      font-weight: 500;
      letter-spacing: -1px;
      margin-bottom: 40px;
    }
    .img-wrapper {
      max-height: 416px;
      max-width: 416px;
      position: relative;
      &:hover {
        .waves-top,
        .waves-bottom {
          opacity: 0;
        }
      }
      .hero-img {
        border: 2px solid rgb(var(--black));
      }
    }
  }
  .next-chapter {
    padding-top: 30px;
    @media (min-width: 992px) {
      padding-top: 160px;
    }
  }
}
</style>
