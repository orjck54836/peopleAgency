<script setup lang="ts">
import { onMounted } from "vue"
import gsap from "gsap"
import logo from "/images/logo.png";
onMounted(() => {
  gsap.from(".fade-up", {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: "power2.out"
  })
})

const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};
const closeNav = () => {
  navOpen.value = false;
};
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav">
    <div>
      <NuxtLink to="/">
        <img :src="logo" alt="logo" />
      </NuxtLink>
    </div>
  </Header>
  <section class="internship-page">
    <!-- Hero -->
    <div class="hero-section fade-up">
      <h1 class="title">技能実習制度（Technical Internship）</h1>
      <p class="subtitle">將有意願的外國人才引入日本現場，實現技能傳承與人力補充的雙贏模式</p>
    </div>

    <!-- 什麼是技能實習 -->
    <div class="fade-up intro">
      <h2>什麼是技能實習？</h2>
      <p>
        技能實習制度是為了讓發展中國家的年輕人學習日本的先進技術與知識，並在回國後將其活用於母國的產業發展。
        日本企業可透過此制度引進已具備一定專業技能與日語能力的實習生，進行為期1~5年的在日實習工作。
      </p>
    </div>

    <!-- 制度特色 -->
    <div class="fade-up features">
      <h2>制度優勢</h2>
      <ul>
        <li>▶ 實習生多為 20~30 歲青壯人口，穩定性高</li>
        <li>▶ 勞動意願強烈，且具備相關產業經驗</li>
        <li>▶ 招募流程透明、由政府認可之機構協助控管</li>
        <li>▶ 可選擇多種產業類別（如製造、建築、農業等）</li>
      </ul>
    </div>

    <!-- 流程介紹 -->
    <div class="fade-up process">
      <h2>導入流程</h2>
      <ol>
        <li>1. 諮詢並確認實習需求與條件</li>
        <li>2. 由越南、印尼、菲律賓等來源國篩選候選人</li>
        <li>3. 安排面試與專業審查</li>
        <li>4. 辦理入國相關簽證與培訓</li>
        <li>5. 正式配屬至貴公司，並定期進行追蹤與支援</li>
      </ol>
    </div>

    <!-- CTA -->
    <div class="fade-up cta">
      <NuxtLink to="/contact" class="cta-button">
        立即諮詢，規劃實習人力配置
      </NuxtLink>
    </div>
  </section>
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <ContactIcon />
  <Footer />
</template>

<style lang="scss" scoped>
.internship-page {
  padding: 60px 20px;
  max-width: 960px;
  margin: 0 auto;
  .hero-section {
    text-align: center;
    margin-bottom: 60px;
    .title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .subtitle {
      font-size: 1.2rem;
      color: #666;
    }
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: #333;
  }
  p, ul, ol {
    font-size: 1rem;
    line-height: 1.6;
    color: #444;
    margin-bottom: 2rem;
  }
  ul li, ol li {
    margin-bottom: 0.75rem;
  }

  .cta {
    text-align: center;
    margin-top: 40px;
    .cta-button {
      background-color: #a37251;
      color: white;
      padding: 12px 28px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.3s ease;
      &:hover {
        background-color: #8a5f41;
      }
    }
  }
}
</style>