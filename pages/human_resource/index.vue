<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <!-- Hero 區塊 -->
  <section class="hero">
    <div class="hero-content">
      <h1>{{ $t('hero.title') }}</h1>
      <p>{{ $t('hero.subtitle') }}</p>
    </div>
  </section>

  <main class="main-content">
    <!-- 簽證類型 -->
    <section class="visa-section">
      <h2 class="section-title">{{ $t('visa.title') }}</h2>
      <p class="section-subtitle">{{ $t('visa.subtitle') }}</p>

      <div class="visa-list">
        <!-- 特定技能簽證 -->
        <div class="visa-item">
          <img src="../../public/images/human_resource/specialskill.jpg" :alt="$t('visa.special.alt')"
            class="visa-photo" />
          <div class="visa-text">
            <h3>{{ $t('visa.special.title') }}</h3>
            <p>{{ $t('visa.special.desc') }}</p>
          </div>
        </div>

        <!-- 技人文簽證 -->
        <div class="visa-item reverse">
          <img src="../../public/images/human_resource/it.jpg" :alt="$t('visa.engineer.alt')" class="visa-photo" />
          <div class="visa-text">
            <h3>{{ $t('visa.engineer.title') }}</h3>
            <p>{{ $t('visa.engineer.desc') }}</p>
          </div>
        </div>

        <!-- 技能實習 -->
        <div class="visa-item">
          <img src="../../public/images/human_resource/internship.jpg" :alt="$t('visa.intern.alt')"
            class="visa-photo" />
          <div class="visa-text">
            <h3>{{ $t('visa.intern.title') }}</h3>
            <p>{{ $t('visa.intern.desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 合作邀請 -->
    <section class="tree-radial">
      <div class="p-4 mb-4">
        <h2 class="tree-title">{{ $t('cooperation.title') }}</h2>
        <h4>{{ $t('cooperation.q1') }}</h4>
        <h4>{{ $t('cooperation.q2') }}</h4>
      </div>
      <div class="tree-wrapper">
        <svg v-if="!isMobile" class="tree-lines" :width="width" :height="height">
          <line v-for="(node, index) in nodes" :key="'line-' + index" :x1="center.x" :y1="center.y" :x2="node.x"
            :y2="node.y" stroke="#d1d5db" stroke-width="2" />
        </svg>
        <div class="tree-core" :style="!isMobile ? { left: center.x + 'px', top: center.y + 'px' } : {}">
          {{ $t('cooperation.core') }}
        </div>
        <div v-for="(node, index) in nodes" :key="'node-' + index" class="tree-node"
          :style="!isMobile ? { left: node.x + 'px', top: node.y + 'px' } : {}">
          <h4>{{ node.title }}</h4>
          <p>{{ node.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 為何雇用外籍人士 -->
    <section class="foreign-talent-section">
      <div class="content-container">
        <div class="text-block">
          <h2>{{ $t('foreign.title') }}</h2>
          <div class="visual-block">
            <img src="../../public/images/human_resource/hire_reason.jpg" :alt="$t('foreign.imageAlt')" />
          </div>
          <div class="audience-container">
            <div class="audience-block">
              <h3>{{ $t('foreign.employer.title') }}</h3>
              <ul class="benefits-list">
                <li>{{ $t('foreign.employer.point1') }}</li>
                <li>{{ $t('foreign.employer.point2') }}</li>
                <li>{{ $t('foreign.employer.point3') }}</li>
                <li>{{ $t('foreign.employer.point4') }}</li>
              </ul>
            </div>
            <div class="audience-block">
              <h3>{{ $t('foreign.jobseeker.title') }}</h3>
              <ul class="benefits-list">
                <li>{{ $t('foreign.jobseeker.point1') }}</li>
                <li>{{ $t('foreign.jobseeker.point2') }}</li>
                <li>{{ $t('foreign.jobseeker.point3') }}</li>
                <li>{{ $t('foreign.jobseeker.point4') }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 合作流程 -->
    <section class="flow-section">
      <h2 class="section-title">{{ $t('flow.title') }}</h2>
      <p class="section-subtitle">{{ $t('flow.subtitle') }}</p>

      <div class="flow-steps">
        <template v-for="(step, index) in flowSteps" :key="index">
          <!-- 單一步驟 -->
          <div class="flow-step">
            <div class="step-circle">{{ index + 1 }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>

          <!-- 箭頭 (最後一個不要顯示) -->
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
import { reactive, ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useI18n } from 'vue-i18n'

const navOpen = ref(false);
const toggleNav = () => (navOpen.value = !navOpen.value);
const closeNav = () => (navOpen.value = false);
const { t } = useI18n()

const width = 800;
const height = 600;
const center = { x: width / 2, y: height / 2, r: 250 };

const texts = computed(() => [
  { title: t('cooperation.nodes.node1.title'), desc: t('cooperation.nodes.node1.desc') },
  { title: t('cooperation.nodes.node2.title'), desc: t('cooperation.nodes.node2.desc') },
  { title: t('cooperation.nodes.node3.title'), desc: t('cooperation.nodes.node3.desc') },
  { title: t('cooperation.nodes.node4.title'), desc: t('cooperation.nodes.node4.desc') },
  { title: t('cooperation.nodes.node5.title'), desc: t('cooperation.nodes.node5.desc') }
])

// flowSteps 改成 computed，會隨語言切換更新
const flowSteps = computed(() => [
  { title: t('flow.steps[0].title'), desc: t('flow.steps[0].desc') },
  { title: t('flow.steps[1].title'), desc: t('flow.steps[1].desc') },
  { title: t('flow.steps[2].title'), desc: t('flow.steps[2].desc') },
  { title: t('flow.steps[3].title'), desc: t('flow.steps[3].desc') },
  { title: t('flow.steps[4].title'), desc: t('flow.steps[4].desc') }
])

watchEffect(() => {
  console.log('flowSteps:', t('flow.steps', { returnObjects: true }))
})

// 手機偵測
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

const nodes = computed(() => {
  if (isMobile.value) {
    return texts.value.map(t => ({ ...t }))
  } else {
    return texts.value.map((t, i) => {
      const angle = (-90 + i * (360 / texts.value.length)) * (Math.PI / 180)
      return {
        ...t,
        x: center.x + center.r * Math.cos(angle),
        y: center.y + center.r * Math.sin(angle),
      }
    })
  }
})
</script>

<style scoped>
/* Hero */
.hero {
  background-image: url('../../public/images/human_resource/handshake.jpg');
  background-size: cover;
  background-position: center 50%;
  color: #fff;
  text-align: center;
  padding: 6rem 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

/* Section 基本 */
.main-content section {
  padding: 1rem;
}

.main-content h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

/* 簽證卡片 */
.visa-section {
  padding: 5rem 2rem;
  text-align: center;
}

.visa-section {
  padding: 5rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
}

/* 漸進淡入＋上移 */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 底線強調 */
.section-title::after,
.tree-title::after,
.text-block h2::after {
  content: "";
  display: block;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, #e2942dad, #da9c1f9b);
  margin: 0.5rem auto 0;
  border-radius: 2px;
  animation: growLine 1s ease forwards;
  transform: scaleX(0);
}

/* 底線動畫 */
@keyframes growLine {
  100% {
    transform: scaleX(1);
  }
}

/* 副標題 */
.section-subtitle {
  font-size: 1.1rem;
  color: #4b5563;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
  animation: fadeIn 1.2s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}

/* list 容器 */
.visa-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

/* 單一簽證塊 */
.visa-item {
  display: flex;
  align-items: center;
  background: #fdfcfb;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 6px solid #dd240cae;
  /* 左側強調線 */
}

.visa-photo {
  width: 40%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.visa-item:nth-child(2) {
  background: #fdfcfb;
  border-left-color: #9333ea;
}

.visa-item:nth-child(3) {
  background: #fdfcfb;
  border-left-color: #06d9cb82;
}

.visa-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}

/* icon */
.visa-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  color: #2563eb;
  margin-top: 0.3rem;
  transition: transform 0.3s ease;
}

.visa-item:hover .visa-icon {
  transform: scale(1.2);
}

/* 文字區 */
.visa-text {
  text-align: left;
}

.visa-text h3 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
  display: inline-block;
  padding: 10px 18px;
  border-radius: 6px;

  /* 日系官網感：淡背景 + 細邊框 */
  background: #fdf7f2;
  /* 柔和米白色 */
  border: 1px solid #e5e7eb;
  /* 細灰框 */
  /* 加點層次 */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  /* 動態效果 */
  transition: all 0.3s ease;
}

.visa-text p {
  font-size: 1rem;
  color: #374151;
  line-height: 1.7;
  max-width: 600px;
}

/* 左右交錯 */
.visa-item.reverse {
  flex-direction: row-reverse;
  border-left: none;
  border-right: 6px solid #dabd8c;
}

/* 手機版 */
@media (max-width: 768px) {
  .visa-photo {
    width: 100%;
  }

  .visa-item,
  .visa-item.reverse {
    flex-direction: column;
    text-align: left;
    border-left: 4px solid #cb8112;
    border-right: none;
  }
}

/* 國籍範圍 */
.foreign-talent-section {
  padding: 5rem 0;
}

.content-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* 左側文字 */
.text-block {
  flex: 1;
  padding: 2rem;
  z-index: 2;
}

.text-block h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  text-align: left;
}

.benefits-list li {
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.6;
}

/* 右側斜切背景 */
.visual-block {
  flex: 1;
  background-size: cover;
  border-radius: 5px;
  min-height: 450px;
}

.audience-container {
  display: flex;
  justify-content: center;
}

.audience-block {
  margin: 2rem 0.5rem;
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  text-align: left;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.audience-block h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.audience-block ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
}

.audience-block li {
  font-size: 0.95rem;
  color: #374151;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .audience-container {
    flex-direction: column;
  }

  .audience-block {
    flex-direction: column;
    margin: 10px 0;
  }

  .content-container {
    flex-direction: column-reverse;
    /* 改為上下排列 */
  }

  .text-block {
    padding: 1.5rem;
    text-align: center;
    /* 手機版文字置中 */
  }

  .text-block h2 {
    font-size: 1.5rem;
    /* 標題縮小 */
  }

  .benefits-list {
    gap: 0.8rem;
  }

  .benefits-list li {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .visual-block {
    width: 100%;
    min-height: 200px;
    margin-top: 2rem;
  }
}

/* 流程時間軸 */
.flow-section {
  background-image: url('../../public/images/human_resource/flow_background.jpg');
  background-size: contain;
  padding: 8rem 2rem !important;
  text-align: center;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
  padding: 0;
}

.section-subtitle {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 3rem;
}

/* Flow 橫向容器 */
.flow-steps {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0.5rem;
  flex-wrap: wrap;
  min-width: 150px;
  margin: 0 auto;
  flex-wrap: nowrap;
}

/* 單一步驟 */
.flow-step {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.flow-step:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
}

/* step number */
.step-circle {
  width: 40px;
  height: 40px;
  margin: 0 auto 0.8rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #f35d49, #e5af63);
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 標題 */
.flow-step h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.5rem;
}

/* 內文 */
.flow-step p {
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
}

/* 箭頭樣式（桌機） */
.flow-arrow {
  display: flex;
  align-items: center;
}

.flow-arrow::after {
  content: "→";
  font-size: 1.5rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto 0;
}

/* 手機版：直排，箭頭改向下 */
@media (max-width: 768px) {
  .flow-steps {
    flex-direction: column;
    align-items: center;
  }

  .flow-arrow::after {
    content: "↓";
    margin: 0.5rem 0;
  }
}


@media (max-width: 768px) {
  .hero h1 {
    font-size: 1.8rem;
  }

  .mission-block {
    flex-direction: column;
  }
}

/* 合作邀請區 */
.partnership-section {
  background: linear-gradient(135deg, #f9fafb, #ffffff);
  padding: 5rem 2rem;
}

.partnership-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.partnership-text {
  flex: 1.2;
}

.partnership-text h2 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.partnership-text .intro {
  font-size: 1.1rem;
  color: #374151;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.why-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #9333ea;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

.why-title::after {
  content: "";
  display: block;
  width: 50%;
  height: 4px;
  background: linear-gradient(135deg, #d97706, #fbbf24);
  margin-top: 0.4rem;
  border-radius: 2px;
}

.advantages-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.advantage-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
}

.icon {
  font-size: 1.8rem;
  flex-shrink: 0;
}

.content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.3rem;
}

.content p {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
}

.partnership-img {
  flex: 1;
  text-align: center;
}

.partnership-img img {
  max-width: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* 響應式 */
@media (max-width: 900px) {
  .partnership-container {
    flex-direction: column;
  }

  .partnership-text {
    text-align: center;
  }

  .advantage-item {
    text-align: left;
  }
}

.tree-radial {
  background-image: url('../../public/images/human_resource/strengths_background.jpg');
  background-size: cover;
  padding: 4rem 2rem;
  text-align: center;
}

.tree-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: #1e3a8a;
}

.tree-wrapper {
  position: relative;
  margin: 0 auto;
  width: 800px;
  height: 600px;
}

/* SVG */
.tree-lines {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

/* 中心 */
.tree-core {
  position: absolute;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #e8820e, #eabf33e7);
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  padding: 1.2rem 2rem;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

/* 節點 */
.tree-node {
  position: absolute;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 12px;
  padding: 1rem 1.2rem;
  width: 200px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  text-align: left;
  z-index: 2;
}

.tree-node h4 {
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: #1e3a8a;
  margin-bottom: 0.4rem;
}

.tree-node p {
  font-size: 0.85rem;
  color: #4b5563;
  line-height: 1.4;
}

/* 手機版 */
@media (max-width: 768px) {
  .tree-wrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    /* 增加間距 */
  }

  .tree-core {
    position: relative;
    /* 清掉 absolute */
    transform: none;
    margin: 0 auto 1.5rem;
  }

  .tree-node {
    position: relative;
    /* 清掉 absolute */
    transform: none;
    margin: 0 auto;
    max-width: 320px;
    width: 90%;
    text-align: center;
  }
}
</style>