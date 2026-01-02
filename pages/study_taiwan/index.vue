<template>
    <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  
    <!-- Hero 區塊 -->
    <section class="hero">
      <div class="hero-content">
        <h1>{{ $t('taiwanStudy.hero.title') }}</h1>
        <p>{{ $t('taiwanStudy.hero.subtitle') }}</p>
      </div>
    </section>
  
    <main class="main-content">
  
      <!-- 課程介紹 -->
      <section class="visa-section">
        <h2 class="section-title">{{ $t('taiwanStudy.course.title') }}</h2>
        <p class="section-subtitle">{{ $t('taiwanStudy.course.subtitle') }}</p>
  
        <div class="visa-list">
          <!-- 中文會話＋文化體驗 -->
          <div class="visa-item">
            <img src="../../public/images/study_taiwan/book.jpg" :alt="$t('taiwanStudy.course.conversation.alt')" class="visa-photo" />
            <div class="visa-text">
              <h3>{{ $t('taiwanStudy.course.conversation.title') }}</h3>
              <p>{{ $t('taiwanStudy.course.conversation.desc') }}</p>
            </div>
          </div>
  
          <!-- 台灣文化＆生活體驗 -->
          <div class="visa-item reverse">
            <img src="../../public/images/study_taiwan/city_view.jpg" :alt="$t('taiwanStudy.course.culture.alt')" class="visa-photo" />
            <div class="visa-text">
              <h3>{{ $t('taiwanStudy.course.culture.title') }}</h3>
              <p>{{ $t('taiwanStudy.course.culture.desc') }}</p>
            </div>
          </div>
  
          <!-- 企業參訪・交流學習 -->
          <div class="visa-item">
            <img src="../../public/images/study_taiwan/company.jpg" :alt="$t('taiwanStudy.course.company.alt')" class="visa-photo" />
            <div class="visa-text">
              <h3>{{ $t('taiwanStudy.course.company.title') }}</h3>
              <p>{{ $t('taiwanStudy.course.company.desc') }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 為何選擇台灣 -->
      <section class="foreign-talent-section">
        <div class="content-container">
          <div class="text-block">
            <h2>{{ $t('taiwanStudy.reason.title') }}</h2>
            <div class="visual-block">
              <img src="../../public/images/study_taiwan/view.jpg" :alt="$t('taiwanStudy.reason.imageAlt')" />
            </div>
            <div class="audience-container">
              <div class="audience-block">
                <h3>{{ $t('taiwanStudy.reason.cultural.title') }}</h3>
                <ul class="benefits-list">
                  <li>{{ $t('taiwanStudy.reason.cultural.point1') }}</li>
                  <li>{{ $t('taiwanStudy.reason.cultural.point2') }}</li>
                  <li>{{ $t('taiwanStudy.reason.cultural.point3') }}</li>
                </ul>
              </div>
              <div class="audience-block">
                <h3>{{ $t('taiwanStudy.reason.learning.title') }}</h3>
                <ul class="benefits-list">
                  <li>{{ $t('taiwanStudy.reason.learning.point1') }}</li>
                  <li>{{ $t('taiwanStudy.reason.learning.point2') }}</li>
                  <li>{{ $t('taiwanStudy.reason.learning.point3') }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 課程流程 -->
      <section class="flow-section">
        <h2 class="section-title">{{ $t('taiwanStudy.flow.title') }}</h2>
        <p class="section-subtitle">{{ $t('taiwanStudy.flow.subtitle') }}</p>
  
        <div class="flow-steps">
          <template v-for="(step, index) in flowSteps" :key="index">
            <div class="flow-step">
              <div class="step-circle">{{ index + 1 }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
            <div v-if="index < flowSteps.length - 1" class="flow-arrow"></div>
          </template>
        </div>
      </section>
    </main>
  
    <ContactIcon />
    <Navigation :nav-open="navOpen" :close-nav="closeNav" />
    <Footer />
</template>
  
  <script lang="ts" setup>
  import { ref, computed, onMounted, onBeforeUnmount } from "vue";
  import { useI18n } from "vue-i18n";
  
  const navOpen = ref(false);
  const toggleNav = () => (navOpen.value = !navOpen.value);
  const closeNav = () => (navOpen.value = false);
  const { t } = useI18n();
  
  const flowSteps = computed(() => [
    { title: t('taiwanStudy.flow.steps[0].title'), desc: t('taiwanStudy.flow.steps[0].desc') },
    { title: t('taiwanStudy.flow.steps[1].title'), desc: t('taiwanStudy.flow.steps[1].desc') },
    { title: t('taiwanStudy.flow.steps[2].title'), desc: t('taiwanStudy.flow.steps[2].desc') },
    { title: t('taiwanStudy.flow.steps[3].title'), desc: t('taiwanStudy.flow.steps[3].desc') },
  ]);
  
  // 響應式判斷
  const isMobile = ref(false);
  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
  };
  onMounted(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", checkMobile);
  });
  </script>
  
  <style scoped>
  /* ====== 基本結構 ====== */
  :root {
    --jp-main: #e4b169; /* 主色 */
    --jp-bg: #f8f5f0; /* 柔米白背景 */
    --jp-text: #4a5568; /* 深灰字體 */
    --jp-border: #e5e7eb;
    --jp-accent: #f1d7a6;
    --jp-shadow: rgba(0, 0, 0, 0.05);
  }
  
  body {
    font-family: "Noto Sans JP", "Hiragino Sans", "游ゴシック体", sans-serif;
    background-color: var(--jp-bg);
    color: var(--jp-text);
    line-height: 1.8;
  }
  
  /* ====== Hero 區塊 ====== */
  .hero {
    background: linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.3)), url('../../public/images/study_taiwan/table.jpg');
    background-size: cover;
    background-position: center;
    color: #fff;
    text-align: center;
    padding: 8rem 2rem;
    letter-spacing: 0.04em;
  }
  
  .hero-content h1 {
    font-size: 2.4rem;
    font-weight: 800;
    margin-bottom: 1.2rem;
    text-shadow: 0 3px 6px rgba(0,0,0,0.3);
  }
  
  .hero-content p {
    font-size: 1.2rem;
    opacity: 0.95;
  }
  
  /* ====== 標題區 ====== */
  .section-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 1rem;
    position: relative;
  }
  
  .section-title::after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #e4b169, #f1d7a6);
    margin: 0.6rem auto 0;
    border-radius: 3px;
  }
  
  .section-subtitle {
    text-align: center;
    font-size: 1.05rem;
    color: #6b7280;
    margin-bottom: 3.5rem;
  }
  
  /* ====== 課程介紹卡片 ====== */
  .visa-section {
    background-color: #fff;
    border-top: 1px solid #f0ebe2;
    padding: 6rem 1.5rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .visa-list {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  
  .visa-item {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 30px var(--jp-shadow);
    overflow: hidden;
    transition: all 0.35s ease;
    border-left: 5px solid var(--jp-main);
  }
  
  .visa-item:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.1);
  }
  
  .visa-item.reverse {
    flex-direction: row-reverse;
    border-left: none;
    border-right: 5px solid var(--jp-main);
  }
  
  .visa-photo {
    width: 45%;
    object-fit: cover;
    height: 320px;
  }
  
  .visa-text {
    padding: 2rem;
    text-align: left;
  }
  
  .visa-text h3 {
    font-size: 1.4rem;
    color: #1f2937;
    font-weight: 700;
    margin-bottom: 0.8rem;
    border-left: 4px solid var(--jp-main);
    padding-left: 0.6rem;
  }
  
  .visa-text p {
    font-size: 1rem;
    color: #4b5563;
    line-height: 1.8;
  }
  
  /* 手機版 */
  @media (max-width: 768px) {
    .visa-item,
    .visa-item.reverse {
      flex-direction: column;
    }
    .visa-photo {
      width: 100%;
      height: 220px;
    }
    .visa-text {
      padding: 1.5rem;
      text-align: center;
    }
  }
  
  /* ====== 為何選擇台灣 ====== */
  .foreign-talent-section {
    background-color: var(--jp-bg);
    padding: 6rem 2rem;
  }
  
  .content-container {
    max-width: 1100px;
    margin: 0 auto;
  }
  
  .text-block h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .visual-block img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
    margin-bottom: 3rem;
  }
  
  .audience-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .audience-block {
    background: #fff;
    border-radius: 12px;
    padding: 2rem 1.5rem;
    width: 45%;
    min-width: 320px;
    box-shadow: 0 8px 20px var(--jp-shadow);
    border: 1px solid #f0edea;
    transition: transform 0.3s ease;
  }
  
  .audience-block:hover {
    transform: translateY(-5px);
  }
  
  .audience-block h3 {
    color: #b45309;
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  .benefits-list li {
    list-style: "◆ ";
    margin-left: 0.5rem;
    line-height: 1.7;
    color: #374151;
  }
  
  /* ====== 流程區 ====== */
  .flow-section {
    background: linear-gradient(180deg, #fffaf5, #f8f5f0);
    padding: 6rem 2rem;
    text-align: center;
  }
  
  .flow-steps {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.2rem;
    margin-top: 3rem;
  }
  
  .flow-step {
    background: #fff;
    border-radius: 12px;
    padding: 2rem 1.5rem;
    width: 230px;
    box-shadow: 0 6px 16px var(--jp-shadow);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid var(--jp-border);
  }
  
  .flow-step:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 26px rgba(0, 0, 0, 0.1);
  }
  
  .step-circle {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    background: linear-gradient(135deg, #f7b267, #f5c57a);
    color: #fff;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .flow-step h3 {
    color: #1f2937;
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .flow-step p {
    color: #4b5563;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .flow-arrow {
    content: "→";
    font-size: 1.6rem;
    color: #bdbdbd;
    display: flex;
    align-items: center;
  }
  
  .flow-arrow::after {
    content: "→";
    font-size: 1.6rem;
    color: #bdbdbd;
    display: flex;
    align-items: center;
    margin: auto;
  }
  
  @media (max-width: 768px) {
    .flow-steps {
      flex-direction: column;
      align-items: center;
    }
    .flow-step {
      width: 90%;
    }
    .flow-arrow::after {
      content: "↓";
      margin: 0.5rem 0;
    }
  }
  </style>
  
  