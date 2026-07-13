<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

useSeoMeta({
  title: '短期遊學｜2週～3個月日本語言體驗｜FORMA',
  description: '不需要長期簽證，彈性安排2週到3個月的日本短期遊學課程。透過 FORMA 選擇適合的語言學校，快速提升日語口說能力並體驗日本生活。',
})

const sections = [
  {
    icon: '',
    title: '什麼是短期遊學？',
    body: '短期遊學是指在日本停留 2 週至 3 個月，以語言學習為主要目的的海外學習體驗。不需要申請長期學生簽證，以觀光簽證或免簽入境即可，是第一次想嘗試日本留學的學生最常選擇的入門方式。',
  },
  {
    icon: '',
    title: '適合哪些人？',
    body: '想快速提升日語口說能力的社會人士、大學生；對日本文化有強烈興趣但還不確定是否長期留學；希望在正式申請長期簽證前先體驗日本生活的人；有固定假期但想充實運用的學生或上班族。',
  },
  {
    icon: '',
    title: '課程特色',
    body: '短期課程通常以「密集日語班」為主，每天上課 3～4 小時，配合小班制教學（4～10 人），讓你在短時間內獲得最大的語言進步。課外活動方面，許多學校也安排文化體驗、校外教學，幫助學生融入當地生活。',
  },
  {
    icon: '',
    title: '費用與時間參考',
    body: '以 4 週課程為例，學費約 5～8 萬日圓，加上住宿宿舍約 3～5 萬日圓，整體預算落在 20～35 萬台幣之間（含機票與生活費）。入學時間彈性，多數學校每週一或每月初皆可開課。',
  },
  {
    icon: '',
    title: 'FORMA 如何協助你？',
    body: '我們與日本多所語言學校保持長期合作關係，提供免費學校媒合諮詢、申請代辦、宿舍預訂協助，以及出發前的行前說明。讓你從選校到抵達日本，每一步都有人陪伴。',
  },
]

const recommendedSchools = ref<any[]>([])

async function fetchSchools() {
  try {
    const res = await fetch('/api/schools')
    const json = await res.json()
    if (json.success) {
      recommendedSchools.value = json.data
        .filter((s: any) => s.type === '日本語學校')
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
      <p class="mode-tag">短期遊學</p>
      <h1>用 2 週到 3 個月<br>踏出改變的第一步</h1>
      <p class="mode-sub">不需長期簽證，彈性安排，快速體驗日本語言與生活</p>
    </div>
  </section>

  <main class="mode-wrapper">
    <div class="mode-chips">
      <span class="chip">無需長期簽證</span>
      <span class="chip">彈性行程安排</span>
      <span class="chip">語言密集訓練</span>
      <span class="chip">文化生活體驗</span>
      <span class="chip">2週～3個月</span>
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
      <p class="mode-schools-sub">以下為 FORMA 精選的短期遊學合作語言學校</p>
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

.mode-tag {
  display: inline-block;
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: var(--radius-full);
  padding: 0.3rem 1rem;
  font-size: var(--text-sm);
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
}

.mode-hero-inner h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.3;
  margin: 0 0 1rem;
}

.mode-sub {
  font-size: var(--text-lg);
  color: rgba(255,255,255,0.85);
  margin: 0;
}

.mode-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.mode-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.chip {
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  font-size: var(--text-sm);
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--c-border);
}

.mode-sections {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 4rem;
}

.mode-section {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border);
  align-items: flex-start;
}

.mode-section:last-child { border-bottom: none; }
.mode-section--alt { background: var(--c-bg-alt); }

.mode-section-icon {
  font-size: var(--text-3xl);
  flex-shrink: 0;
  width: 2.5rem;
  text-align: center;
  padding-top: 0.2rem;
}

.mode-section-text h2 {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.6rem;
}

.mode-section-text p {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.8;
  margin: 0;
}

.mode-schools { border-top: 1px solid var(--c-border); padding-top: 3rem; }

.mode-schools-title {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--c-primary-dark);
  text-align: center;
  margin-bottom: 0.4rem;
}

.mode-schools-sub {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--c-text-muted);
  margin-bottom: 2rem;
}

.mode-schools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.school-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.school-card:hover { border-color: var(--c-primary); }
.school-card-img { width: 100%; height: 150px; object-fit: cover; display: block; }

.school-card-body { padding: 1rem; }
.school-card-body h3 { font-size: var(--text-base); font-weight: 700; color: var(--c-text); margin: 0 0 0.3rem; }
.school-card-body p { font-size: var(--text-sm); color: var(--c-text-secondary); margin: 0 0 0.6rem; }
.school-card-link { font-size: var(--text-sm); font-weight: 600; color: var(--c-primary); }

.mode-schools-cta { display: flex; justify-content: center; }

.btn-more {
  border: 1px solid var(--c-primary);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--c-primary);
  font-size: var(--text-sm);
  font-weight: 700;
  padding: 0.8rem 2rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.btn-more:hover { background: var(--c-primary); color: #fff; }

@media (max-width: 768px) {
  .mode-hero-inner h1 { font-size: var(--text-3xl); }
  .mode-schools-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .mode-hero { padding: 4rem 1.5rem; }
  .mode-hero-inner h1 { font-size: var(--text-2xl); }
  .mode-section { flex-direction: column; gap: 0.8rem; padding: 1.5rem; }
  .mode-schools-grid { grid-template-columns: 1fr; }
}
</style>
