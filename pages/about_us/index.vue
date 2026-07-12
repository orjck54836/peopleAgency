<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const isWorkLine = computed(() => route.path.startsWith('/work'))

useSeoMeta({
  title: computed(() => isWorkLine.value
    ? '關於我們｜FORMA 日本就職代辦'
    : '關於我們｜FORMA 日本留學代辦'
  ),
  description: '薪火相傳福爾摩沙國際有限公司（FORMA Global），提供台灣人赴日留學與就職的專業代辦服務，透明收費、台日雙邊支援，陪你實現日本夢。',
})

const studyValues = [
  {
    icon: '¥',
    title: '費用透明，零代辦費',
    desc: '首辦免代辦費，與日本學校同步收費，絕不收取隱藏費用。每一筆支出清楚說明，讓你安心出發。',
  },
  {
    icon: '🤝',
    title: '台日雙邊在地支援',
    desc: '台灣顧問協助行前申請，日本當地有協力夥伴陪你落地開戶、辦手機、找租屋，出國不變孤兒。',
  },
  {
    icon: '📄',
    title: '專業簽證指導',
    desc: '針對入管局的留學理由書與財力證明，提供顧問一對一修改，大幅提升在留資格認定證明書的過件率。',
  },
  {
    icon: '🎯',
    title: '精準媒合學校',
    desc: '依你的目標（語言學習、升學、體驗文化）精準推薦合適學校，40 所以上東京、京都、大阪合作校。',
  },
]

const workValues = [
  {
    icon: '🔍',
    title: '精準職缺媒合',
    desc: '依你的學歷、語言能力與職涯目標，媒合最適合的日本企業，不做廣撒網式推薦。',
  },
  {
    icon: '📋',
    title: '簽證全程輔導',
    desc: '從特定技能到技術・人文・國際業務簽證，提供完整的文件準備指導與申請支援。',
  },
  {
    icon: '🤝',
    title: '台日雙邊在地支援',
    desc: '台灣顧問協助行前準備，日本當地有協力夥伴協助生活安頓，讓你專心投入新工作。',
  },
  {
    icon: '🚀',
    title: '長期職涯規劃',
    desc: '不只幫你找到第一份工作，也關注你在日本的長期發展，提供職涯轉換與升遷的後續支援。',
  },
]

const values = computed(() => isWorkLine.value ? workValues : studyValues)

const team = [
  {
    name: 'Aiden Li',
    role: computed(() => isWorkLine.value ? '日本市場開發・就職顧問' : '日本留學顧問・系統開發'),
    desc: '擁有 JLPT N1 日語能力與就業服務乙級證照，曾任職日商台灣分公司，熟悉台日兩地的職場文化與留學生態。',
    tag: 'JLPT N1',
  },
]

const companyInfo = [
  { label: '公司名稱', value: '薪火相傳福爾摩沙國際有限公司' },
  { label: '英文名稱', value: 'FORMA Global Co., Ltd.' },
  { label: '成立年份', value: '2013 年' },
  { label: '服務項目', value: computed(() => isWorkLine.value ? '日本就職媒合・簽證申請代辦' : '日本留學申請代辦・學校媒合') },
  { label: '主要市場', value: '台灣、日本' },
  { label: '聯絡地址', value: '台灣台中市' },
]
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <!-- Hero -->
  <section class="about-hero">
    <div class="about-hero-inner">
      <p class="about-eyebrow">關於我們</p>
      <h1 class="about-title">
        {{ isWorkLine ? '陪你在日本找到屬於自己的位置' : '陪你把對日本的嚮往，變成真實的人生履歷' }}
      </h1>
      <p class="about-sub">
        {{ isWorkLine
          ? '薪火相傳福爾摩沙國際（FORMA），提供台灣人赴日就職的專業媒合與簽證代辦服務。'
          : '薪火相傳福爾摩沙國際（FORMA），提供台灣人日本留學的完整代辦與在地支援服務。' }}
      </p>
    </div>
  </section>

  <main class="about-page">

    <!-- 品牌故事 -->
    <section class="about-section">
      <div class="about-section-inner about-section-inner--2col">
        <div class="story-text">
          <h2 class="section-title">
            {{ isWorkLine ? '從台灣出發，在日本扎根' : '因為熱情，所以成立' }}
          </h2>
          <div class="story-body">
            <p>台灣人對日本文化一直有著深厚的情結，但很多時候，這份嚮往只停留在旅遊的幾天假期裡。「如果能真正生活在那裡，該有多好？」</p>
            <p>{{ isWorkLine
              ? '我們的創辦人擁有日商工作經驗，深刻理解台灣人想赴日工作時面臨的困境：不知道從哪裡找職缺、不清楚簽證該怎麼辦、也沒有人告訴你日本職場文化的眉眉角角。正因如此，我們決定成為這座橋梁。'
              : '正因為看見這份熱情，我們成立了這家代辦。我們不只幫你遞交表格，更想把在地經驗分享給你。從跨出台灣的第一步、適應當地環境，到畢業後開拓更多元的工作機會——這條路上，你不是一個人摸索。' }}
            </p>
          </div>
        </div>
        <div class="story-img-wrap">
          <img src="/images/hero.jpg" alt="FORMA 關於我們" class="story-img" />
        </div>
      </div>
    </section>

    <!-- 核心價值 -->
    <section class="about-section about-section--alt">
      <div class="about-section-inner">
        <h2 class="section-title">
          {{ '為什麼選擇我們？' }}
        </h2>
        <div class="value-grid">
          <div v-for="v in values" :key="v.title" class="value-card">
            <!-- <span class="value-icon">{{ v.icon }}</span> -->
            <h3 class="value-title">{{ v.title }}</h3>
            <p class="value-desc">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 公司資訊 -->
    <section class="about-section about-section--alt">
      <div class="about-section-inner">
        <h2 class="section-title">薪火相傳福爾摩沙國際有限公司</h2>
        <div class="company-table">
          <div v-for="item in companyInfo" :key="item.label" class="company-row">
            <span class="company-label">{{ item.label }}</span>
            <span class="company-val">{{ typeof item.value === 'object' ? item.value.value : item.value }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta">
      <h2>{{ isWorkLine ? '準備好在日本展開新的職涯了嗎？' : '準備好踏出前往日本的第一步了嗎？' }}</h2>
      <p>立即聯絡我們的顧問，免費諮詢最適合你的方案。</p>
      <NuxtLink to="/contact" class="cta-btn">免費諮詢，開始規劃</NuxtLink>
    </section>

  </main>

  <ContactIcon />
  <Footer />
</template>

<style scoped>
/* ── Hero ── */
.about-hero {
  background: var(--c-primary);
  padding: 4.5rem 2rem;
  text-align: center;
}

.about-hero-inner { max-width: 640px; margin: 0 auto; }

.about-eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin: 0 0 0.6rem;
}

.about-title {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.25;
  margin: 0 0 0.75rem;
}

.about-sub {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.82);
  line-height: 1.7;
  margin: 0;
}

/* ── Page ── */
.about-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

/* ── Section 共用 ── */
.about-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--c-border);
}

.about-section--alt {
  background: var(--c-bg-alt);
  margin: 0 -1.5rem;
  padding: 4rem 1.5rem;
}

.about-section-inner { max-width: 100%; }

.about-section-inner--2col {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
  align-items: center;
}

.section-eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-primary);
  margin: 0 0 0.6rem;
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800;
  color: var(--c-text);
  margin: 0 0 2rem;
  line-height: 1.3;
}

/* ── 品牌故事 ── */
.story-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.story-body p {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.85;
  margin: 0;
}

.story-img-wrap {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--c-border);
}

.story-img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
}

/* ── 核心價值 ── */
.value-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

.value-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.value-icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 0.75rem;
}

.value-title {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.5rem;
}

.value-desc {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* ── 團隊 ── */
.team-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.team-card {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.team-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--c-primary);
  color: #fff;
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.team-name-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.2rem;
}

.team-name {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
}

.team-tag {
  font-size: var(--text-xs);
  font-weight: 700;
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-sm);
}

.team-role {
  font-size: var(--text-sm);
  color: var(--c-primary);
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.team-desc {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* ── 公司資訊 ── */
.company-table {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.company-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  border-bottom: 1px solid var(--c-border);
  font-size: var(--text-sm);
}

.company-row:last-child { border-bottom: none; }

.company-label {
  padding: 0.9rem 1.2rem;
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  font-weight: 700;
  font-size: var(--text-xs);
  display: flex;
  align-items: center;
}

.company-val {
  padding: 0.9rem 1.2rem;
  background: var(--c-surface);
  color: var(--c-text-secondary);
  display: flex;
  align-items: center;
}

/* ── CTA ── */
.about-cta {
  text-align: center;
  padding: 4rem 0 0;
}

.about-cta h2 {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.75rem;
}

.about-cta p {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  margin: 0 0 1.5rem;
}

.cta-btn {
  display: inline-block;
  background: var(--c-primary);
  color: var(--c-text-on-primary);
  font-size: var(--text-sm);
  font-weight: 700;
  padding: 0.9rem 2.4rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.cta-btn:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
}

/* ── RWD ── */
@media (max-width: 900px) {
  .about-section-inner--2col {
    grid-template-columns: 1fr;
  }
  .story-img-wrap { max-width: 480px; }
  .value-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .about-hero { padding: 3.5rem 1.5rem; }
  .about-section { padding: 3rem 0; }
  .about-section--alt { padding: 3rem 1.5rem; }
  .team-card { flex-direction: column; gap: 1rem; }
  .company-row { grid-template-columns: 100px 1fr; }
}
</style>