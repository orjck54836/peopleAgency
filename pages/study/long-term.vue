<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const { t } = useI18n()

useSeoMeta({
  title: '長期留學｜6個月～2年語言學校留學｜FORMA',
  description: '申請日本語言學校學生簽證，深度學習日語並融入當地生活，合法打工補貼生活費。FORMA 提供完整的長期留學申請代辦與支援服務。',
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

const sections = [
  {
    icon: '',
    title: '什麼是長期留學？',
    body: '長期留學是指在日本就讀語言學校超過 6 個月，申請「留學」在留資格（學生簽證）的留學方式。有別於短期遊學，長期留學讓你有充裕的時間深度學習日語、建立在地人際網絡，並可合法從事打工（每週 28 小時以內）。',
  },
  {
    icon: '',
    title: '適合哪些人？',
    body: '目標是達到 N2 以上日語能力的學習者；希望深度體驗日本生活與文化的學生；計劃未來赴日工作、打算先打好語言基礎的人；考慮升學但還不確定方向，需要過渡準備期的人。',
  },
  {
    icon: '',
    title: '申請流程與時程',
    body: '長期留學的申請通常需要提前 4～6 個月準備。主要步驟包含：選定學校與入學期別 → 準備申請文件（護照、財力證明、學歷證明等）→ 學校審查 → 申請在留資格認定證明書（COE）→ 取得後至日台交流協會申辦簽證 → 抵日入學。',
  },
  {
    icon: '',
    title: '費用與生活',
    body: '以東京一年語言學校為例，學費約 70～90 萬日圓，住宿費約 6～10 萬日圓／月，生活費依個人習慣約 5～8 萬日圓／月。合法打工收入可補貼部分生活費。整體一年費用（含機票）約 150～250 萬台幣，視地區與生活方式而有所不同。',
  },
  {
    icon: '',
    title: 'FORMA 如何協助你？',
    body: '我們提供從選校、申請文件準備、在留資格申請到抵日後的生活諮詢一條龍服務。針對長期留學申請的財力證明、學歷審查、面試準備等細節，由專業顧問全程陪同，讓你的申請更順利、更有保障。',
  },
]

const recommendedSchools = ref<any[]>([])

async function fetchSchools() {
  try {
    const res = await fetch('/api/schools')
    const json = await res.json()
    if (json.success) {
      recommendedSchools.value = json.data
        .filter((s: any) => s.type === '日本語學校' || s.type === '高等學校')
        .slice(0, 3)
    }
  } catch (err) {
    console.error('❌ 無法取得學校資料：', err)
  }
}

onMounted(fetchSchools)

function goToSchool(name: string) {
  router.push(`/study/${encodeURIComponent(name)}`)
}

function goToAllSchools() {
  router.push({ path: '/study/schools', query: { type: '日本語學校' } })
}
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <section class="mode-hero">
    <div class="mode-hero-inner">
      <p class="mode-tag">長期留學</p>
      <h1>6 個月到 2 年<br>深度扎根日本生活</h1>
      <p class="mode-sub">申請學生簽證，合法打工，真正融入日本社會</p>
    </div>
  </section>

  <main class="mode-wrapper">
    <div class="mode-chips">
      <span class="chip">學生簽證（留學）</span>
      <span class="chip">合法打工 28hr/週</span>
      <span class="chip">語言深度學習</span>
      <span class="chip">升學銜接準備</span>
      <span class="chip">6個月～2年</span>
    </div>

    <section class="mode-sections">
      <div
        v-for="(sec, i) in sections"
        :key="i"
        class="mode-section"
        :class="{ 'mode-section--alt': i % 2 === 1 }"
      >
        <div class="mode-section-icon">{{ sec.icon }}</div>
        <div class="mode-section-text">
          <h2>{{ sec.title }}</h2>
          <p>{{ sec.body }}</p>
        </div>
      </div>
    </section>

    <section class="mode-schools">
      <h2 class="mode-schools-title">推薦語言學校</h2>
      <p class="mode-schools-sub">以下為 FORMA 精選的長期留學合作語言學校</p>
      <div v-if="recommendedSchools.length" class="mode-schools-grid">
        <div
          v-for="school in recommendedSchools"
          :key="school.name"
          class="school-card"
          @click="goToSchool(school.name)"
        >
          <img :src="school.image" :alt="school.name" class="school-card-img" />
          <div class="school-card-body">
            <h3>{{ school.name }}</h3>
            <p>{{ school.location }}</p>
            <span class="school-card-link">查看詳情 →</span>
          </div>
        </div>
      </div>
      <div class="mode-schools-cta">
        <button class="btn-more" @click="goToAllSchools">查看全部語言學校 →</button>
      </div>
    </section>
  </main>

  
  <Footer />
</template>

<style scoped>
.mode-hero {
  background: linear-gradient(to bottom right, rgba(139,26,47,0.85), rgba(92,15,30,0.75)),
    url('/images/hero.jpg');
  background-size: cover;
  background-position: center;
  padding: 6rem 2rem;
  text-align: center;
  color: #fff;
}
.mode-hero-inner { max-width: 640px; margin: 0 auto; }
.mode-tag { display: inline-block; border: 1px solid rgba(255,255,255,0.6); border-radius: var(--radius-full); padding: 0.3rem 1rem; font-size: var(--text-sm); font-weight: 600; margin-bottom: 1rem; color: #fff; }
.mode-hero-inner h1 { font-family: var(--font-serif); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; color: #fff; line-height: 1.3; margin: 0 0 1rem; }
.mode-sub { font-size: var(--text-lg); color: rgba(255,255,255,0.85); margin: 0; }
.mode-wrapper { max-width: 960px; margin: 0 auto; padding: 3rem 1.5rem 5rem; }
.mode-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 3rem; }
.chip { background: var(--c-primary-muted); color: var(--c-primary-dark); font-size: var(--text-sm); font-weight: 600; padding: 0.4rem 1rem; border-radius: var(--radius-full); border: 1px solid var(--c-border); }
.mode-sections { border: 1px solid var(--c-border); border-radius: var(--radius-md); overflow: hidden; margin-bottom: 4rem; }
.mode-section { display: flex; gap: 1.5rem; padding: 2rem; background: var(--c-surface); border-bottom: 1px solid var(--c-border); align-items: flex-start; }
.mode-section:last-child { border-bottom: none; }
.mode-section--alt { background: var(--c-bg-alt); }
.mode-section-icon { font-size: var(--text-3xl); flex-shrink: 0; width: 2.5rem; text-align: center; padding-top: 0.2rem; }
.mode-section-text h2 { font-family: var(--font-serif); font-size: var(--text-lg); font-weight: 700; color: var(--c-primary-dark); margin: 0 0 0.6rem; }
.mode-section-text p { font-size: var(--text-sm); color: var(--c-text-secondary); line-height: 1.8; margin: 0; }
.mode-schools { border-top: 1px solid var(--c-border); padding-top: 3rem; }
.mode-schools-title { font-family: var(--font-serif); font-size: var(--text-2xl); font-weight: 700; color: var(--c-primary-dark); text-align: center; margin-bottom: 0.4rem; }
.mode-schools-sub { text-align: center; font-size: var(--text-sm); color: var(--c-text-muted); margin-bottom: 2rem; }
.mode-schools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 2rem; }
.school-card { background: var(--c-surface); border: 1px solid var(--c-border); border-radius: var(--radius-md); overflow: hidden; cursor: pointer; transition: border-color var(--transition-fast); }
.school-card:hover { border-color: var(--c-primary); }
.school-card-img { width: 100%; height: 150px; object-fit: cover; display: block; }
.school-card-body { padding: 1rem; }
.school-card-body h3 { font-size: var(--text-base); font-weight: 700; color: var(--c-text); margin: 0 0 0.3rem; }
.school-card-body p { font-size: var(--text-sm); color: var(--c-text-secondary); margin: 0 0 0.6rem; }
.school-card-link { font-size: var(--text-sm); font-weight: 600; color: var(--c-primary); }
.mode-schools-cta { display: flex; justify-content: center; }
.btn-more { border: 1px solid var(--c-primary); border-radius: var(--radius-md); background: transparent; color: var(--c-primary); font-size: var(--text-sm); font-weight: 700; padding: 0.8rem 2rem; cursor: pointer; transition: background var(--transition-fast), color var(--transition-fast); }
.btn-more:hover { background: var(--c-primary); color: #fff; }
@media (max-width: 768px) { .mode-hero-inner h1 { font-size: var(--text-3xl); } .mode-schools-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .mode-hero { padding: 4rem 1.5rem; } .mode-hero-inner h1 { font-size: var(--text-2xl); } .mode-section { flex-direction: column; gap: 0.8rem; padding: 1.5rem; } .mode-schools-grid { grid-template-columns: 1fr; } }
</style>
