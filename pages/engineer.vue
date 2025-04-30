<script setup lang="ts">
import { onMounted, ref } from "vue";
import gsap from "gsap";
import logo from "/images/logo.png";

onMounted(() => {
  gsap.from(".fade-up", {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "power2.out"
  });
});

const navOpen = ref(false);
const toggleNav = () => { navOpen.value = !navOpen.value; };
const closeNav = () => { navOpen.value = false; };
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav">
    <div>
      <NuxtLink to="/">
        <img :src="logo" alt="logo" />
      </NuxtLink>
    </div>
  </Header>

  <section class="engineer-page">
    <!-- Hero -->
    <div class="hero-section fade-up">
      <h1 class="title">{{ $t('engineerTitle') }}</h1>
    </div>

    <!-- 概要 -->
    <div class="fade-up intro">
      <h2>{{ $t('engineerWhat') }}</h2>
      <p>{{ $t('engineerDescription') }}</p>
    </div>

    <!-- 申請條件 -->
    <div class="fade-up requirements">
      <h2>{{ $t('engineerRequirementTitle') }}</h2>
      <ul>
        <li>● {{ $t('engineerRequirement1') }}</li>
        <li>● {{ $t('engineerRequirement2') }}</li>
        <li>● {{ $t('engineerRequirement3') }}</li>
      </ul>
    </div>

    <!-- 合適職種 -->
    <div class="fade-up jobtypes">
      <h2>{{ $t('engineerJobTypeTitle') }}</h2>
      <ul>
        <li>▶ {{ $t('engineerJobType1') }}</li>
        <li>▶ {{ $t('engineerJobType2') }}</li>
        <li>▶ {{ $t('engineerJobType3') }}</li>
        <li>▶ {{ $t('engineerJobType4') }}</li>
      </ul>
    </div>

    <!-- 流程介紹 -->
    <div class="fade-up flow">
      <h2>{{ $t('engineerFlowTitle') }}</h2>
      <ol>
        <li>1. {{ $t('engineerFlow1') }}</li>
        <li>2. {{ $t('engineerFlow2') }}</li>
        <li>3. {{ $t('engineerFlow3') }}</li>
        <li>4. {{ $t('engineerFlow4') }}</li>
        <li>5. {{ $t('engineerFlow5') }}</li>
      </ol>
    </div>

    <!-- 優勢 -->
    <div class="fade-up benefits">
      <h2>{{ $t('engineerBenefitTitle') }}</h2>
      <ul>
        <li>✔ {{ $t('engineerBenefit1') }}</li>
        <li>✔ {{ $t('engineerBenefit2') }}</li>
        <li>✔ {{ $t('engineerBenefit3') }}</li>
        <li>✔ {{ $t('engineerBenefit4') }}</li>
      </ul>
    </div>

    <!-- CTA -->
    <div class="fade-up cta">
      <NuxtLink to="/contact" class="cta-button">
        {{ $t('engineerCTA') }}
      </NuxtLink>
    </div>
  </section>

  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <ContactIcon />
  <Footer />
</template>

<style scoped lang="scss">
.engineer-page {
  padding: 60px 20px;
  max-width: 960px;
  margin: 0 auto;

  .hero-section {
    text-align: center;
    margin-bottom: 50px;
    .title {
      font-size: 2.6rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .subtitle {
      font-size: 1.3rem;
      color: #6b4c35;
    }
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p, ul, ol {
    font-size: 1rem;
    line-height: 1.7;
    color: #444;
    margin-bottom: 1.8rem;
  }

  ul li, ol li {
    margin-bottom: 0.75rem;
    list-style: none;
    position: relative;
    padding-left: 1.2em;
    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #a37251;
      font-weight: bold;
    }
  }

  .cta {
    text-align: center;
    margin-top: 60px;
    .cta-button {
      background-color: #a37251;
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: background 0.3s ease;
      &:hover {
        background-color: #8a5f41;
      }
    }
  }
}
</style>
