<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

useSeoMeta({
  title: '升學進修｜日本專門學校・大學申請｜FORMA',
  description: '以取得日本學位或專業資格為目標，進入專門學校、大學或研究所就讀。FORMA 提供從語言學校銜接升學的完整規劃與申請代辦服務。',
})

const sections = [
  {
    icon: '',
    title: '什麼是升學進修？',
    body: '升學進修是指以進入日本專門學校、大學、大學院（研究所）或大學別科就讀為目標的留學方式。通常會先在語言學校就讀一年以上，取得足夠的日語能力（JLPT N2 以上）後，再申請目標學校入學。',
  },
  {
    icon: '',
    title: '適合哪些人？',
    body: '希望取得日本學位或國際認可的專業資格者；對動漫、設計、音樂、IT、料理、美容等專業技術有興趣，想在日本系統學習的人；考慮未來在日本就業，希望透過學歷增加競爭力的學生；有意申請研究所繼續深造的人。',
  },
  {
    icon: '',
    title: '升學路徑說明',
    body: '最常見的路徑是：語言學校 1～2 年（打好日語基礎）→ 專門學校或大學別科 2 年（專業技術或學術訓練）→ 畢業後就業或升學。部分大學也接受直接申請，但需要具備日語能力及一定的學業成績。',
  },
  {
    icon: '',
    title: '費用與時程參考',
    body: '專門學校年學費約 80～150 萬日圓，大學約 100～180 萬日圓，研究所約 80～160 萬日圓。生活費每月約 8～12 萬日圓（視地區而定）。整體規劃包含語言學校階段通常需要準備 3～5 年的時間。',
  },
  {
    icon: '',
    title: 'FORMA 如何協助你？',
    body: '我們提供升學路徑規劃諮詢、語言學校入學代辦、升學目標學校調查與申請協助、志望書（申請動機）撰寫指導、面試對策準備，以及赴日後的生活支援。讓你的升學之路有完整的陪伴與後盾。',
  },
]

const recommendedSchools = ref<any[]>([])

async function fetchSchools() {
  try {
    const res = await fetch('/api/schools')
    const json = await res.json()
    if (json.success) {
      recommendedSchools.value = json.data
        .filter((s: any) => s.type === '專門學校' || s.type === '短期大學')
        .slice(0, 3)
      if (recommendedSchools.value.length < 3) {
        const extra = json.data
          .filter((s: any) => s.type === '日本語學校')
          .slice(0, 3 - recommendedSchools.value.length)
        recommendedSchools.value = [...recommendedSchools.value, ...extra]
      }
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
  router.push({ path: '/study/schools', query: { type: '專門學校' } })
}
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <section class="mode-hero">
    <div class="mode-hero-inner">
      <p class="mode-tag">升學進修</p>
      <h1>在日本取得學位<br>為未來職涯奠基</h1>
      <p class="mode-sub">從語言學校到專門學校、大學，FORMA 全程規劃陪你升學</p>
    </div>
  </section>

  <main class="mode-wrapper">
    <div class="mode-chips">
      <span class="chip">取得日本學位</span>
      <span class="chip">專業資格認證</span>
      <span class="chip">就業直接銜接</span>
      <span class="chip">語言學校銜接</span>
      <span class="chip">2年以上</span>
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
      <h2 class="mode-schools-title">推薦升學學校</h2>
      <p class="mode-schools-sub">以下為 FORMA 精選的升學進修合作學校</p>
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
        <button class="btn-more" @click="goToAllSchools">查看全部專門學校 →</button>
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
