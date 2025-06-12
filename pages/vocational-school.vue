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

  <section class="specified-skill-page">
    <!-- Hero -->
    <div class="hero-section fade-up">
      <h1 class="title">{{ $t('specifiedSkillTitle') }}</h1>
    </div>

    <!-- 1. 什麼是特定技能 -->
    <div class="fade-up intro">
      <h2>{{ $t('specifiedSkillWhat') }}</h2>
      <p>{{ $t('specifiedSkillDescription') }}</p>
    </div>

    <!-- 2. 制度目的 -->
    <div class="fade-up purpose">
      <h2>{{ $t('specifiedSkillPurpose') }}</h2>
      <ul>
        <li>● {{ $t('specifiedSkillPurpose1') }}</li>
        <li>● {{ $t('specifiedSkillPurpose2') }}</li>
        <li>● {{ $t('specifiedSkillPurpose3') }}</li>
      </ul>
    </div>

    <!-- 3. 適用產業 -->
    <div class="fade-up industries">
      <h2>{{ $t('specifiedSkillPeriod') }}</h2>
      <p>{{ $t('specifiedSkillPeriodDescription') }}</p>
      <ul>
        <li>▶ {{ $t('specifiedSkillPeriod1') }}</li>
        <li>▶ {{ $t('specifiedSkillPeriod2') }}</li>
        <li>▶ {{ $t('specifiedSkillPeriod3') }}</li>
        <li>▶ {{ $t('specifiedSkillPeriod4') }}</li>
      </ul>
    </div>

    <!-- 4. 雇主責任 -->
    <div class="fade-up employer">
      <h2>{{ $t('specifiedSkillEmployerTitle') }}</h2>
      <ol>
        <li>1. {{ $t('specifiedSkillEmployer1') }}</li>
        <li>2. {{ $t('specifiedSkillEmployer2') }}</li>
        <li>3. {{ $t('specifiedSkillEmployer3') }}</li>
        <li>4. {{ $t('specifiedSkillEmployer4') }}</li>
      </ol>
    </div>

    <!-- 5. 導入流程 -->
    <div class="fade-up process">
      <h2>{{ $t('specifiedSkillFlowTitle') }}</h2>
      <ol>
        <li>1. {{ $t('specifiedSkillFlow1') }}</li>
        <li>2. {{ $t('specifiedSkillFlow2') }}</li>
        <li>3. {{ $t('specifiedSkillFlow3') }}</li>
        <li>4. {{ $t('specifiedSkillFlow4') }}</li>
        <li>5. {{ $t('specifiedSkillFlow5') }}</li>
      </ol>
    </div>

    <!-- 6. 合作優勢 -->
    <div class="fade-up benefits">
      <h2>{{ $t('specifiedSkillBenefitTitle') }}</h2>
      <ul>
        <li>✔ {{ $t('specifiedSkillBenefit1') }}</li>
        <li>✔ {{ $t('specifiedSkillBenefit2') }}</li>
        <li>✔ {{ $t('specifiedSkillBenefit3') }}</li>
        <li>✔ {{ $t('specifiedSkillBenefit4') }}</li>
      </ul>
    </div>

    <!-- CTA -->
    <div class="fade-up cta">
      <NuxtLink to="/contact" class="cta-button">
        {{ $t('specifiedSkillCTA') }}
      </NuxtLink>
    </div>
  </section>

  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <ContactIcon />
  <Footer />
</template>

<style scoped lang="scss">
.specified-skill-page {
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
