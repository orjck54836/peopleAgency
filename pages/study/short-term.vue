<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const { t } = useI18n()

useSeoMeta({
  title: '短期遊學｜2週～3個月日本語言體驗｜皓學',
  description: '不需要長期簽證，彈性安排2週到3個月的日本短期遊學課程。透過皓學選擇適合的語言學校，快速提升日語口說能力並體驗日本生活。',
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

const sections = [
  {
    icon: '',
    title: '什麼是短期遊學？',
    body: '短期遊學是指在日本停留 2 週至 3 個月，以「語言學習」與「在地生活體驗」為核心的海外學習計畫。\n\n最大的優勢在於不需要申請繁複的長期學生簽證！學生只需持護照以觀光免簽（90 天）方式入境即可就讀。\n\n不論您是想在正式留學前先適應環境，還是想利用短暫假期為自己充電，這都是最輕鬆、最無負擔的圓夢首選。',
    list: null,
  },
  {
    icon: '',
    title: '適合哪些人？',
    body: '',
    list: [
      { title: '職涯充電的上班族', desc: '利用特休或轉職過渡期，在全日語環境中快速突破口說與聽力瓶頸。' },
      { title: '充實假期的在校生', desc: '利用寒暑假跳脫傳統課本，給自己來一場深度的日本在地生活體驗。' },
      { title: '嚮往日本的規劃者', desc: '在正式申請長期簽證前，親自體驗並確認自己是否適應當地的生活節奏。' },
      { title: '追求深度的日本迷', desc: '不滿足於走馬看花的觀光！像當地人一樣生活，在日常中探索日本文化。' },
    ],
  },
  {
    icon: '',
    title: '課程特色',
    body: '短期課程通常以「密集實戰日語」為主，採用每日 3～4 小時的精緻小班制教學（通常每班僅 4～10 人），讓您在沉浸式的全日語環境中，於短時間內獲得最大幅度的口說與聽力進步。\n\n除了扎實的課堂訓練，學校也定期規劃茶道、和服、校外參訪等豐富的日本文化體驗，並能與來自世界各地的國際學生交流，讓您的學習不止於課本，更能自然融入道地的日本日常與建立國際視野。',
    list: null,
  },
  {
    icon: '',
    title: '費用與時間參考',
    body: '短期課程時間非常彈性，您可以自由選擇 2 週至 12 週的學習長度：',
    list: [
      { title: '學費與雜費', desc: '約 5 萬～30 萬日圓（約折合台幣 1 萬～6 萬元）。' },
      { title: '住宿費用', desc: '約 3 萬～27 萬日圓（約折合台幣 6,000 ～ 5.6 萬元）。' },
      { title: '預估總花費', desc: '加上機票與當地基本生活開銷，整體預算約落在台幣 3.5 萬～28 萬元之間（依就讀週數、選擇城市與個人消費習慣而異）。' },
    ],
  },
  {
    icon: '',
    title: '貼心小提醒',
    body: '日本語言學校的短期課程入學時間，主要配合每季（每年 1、4、7、10 月）開班。由於各校的名額與宿舍有限，建議您預計出發前的 3 個月聯繫我們的專業顧問，為您規劃最順暢的入學時程！',
    list: null,
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
      <div v-for="(sec, i) in sections" :key="i" class="mode-section" :class="{ 'mode-section--alt': i % 2 === 1 }">
        <div class="mode-section-text">
          <h2>{{ sec.title }}</h2>
          <p v-if="sec.body">{{ sec.body }}</p>
          <ul v-if="sec.list" class="section-list">
            <li v-for="(item, j) in sec.list" :key="j">
              <strong>{{ item.title }}</strong>：{{ item.desc }}
            </li>
          </ul>
        </div>
      </div>
    </section>


    <section class="mode-schools">
      <h2 class="mode-schools-title">推薦語言學校</h2>
      <p class="mode-schools-sub">以下為皓學精選的長期留學合作語言學校</p>
      <div v-if="recommendedSchools.length" class="mode-schools-grid">
        <div v-for="school in recommendedSchools" :key="school.name" class="school-card"
          @click="goToSchool(school.name)">
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
.section-body {
  white-space: pre-line; 
  line-height: 1.7;
  color: #4a4a4a;
}

.section-list {
  list-style: disc;
  padding-left: 1.4rem;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.section-list li {
  color: var(--c-text-secondary);
  line-height: 1.75;
}

.section-list li strong {
  color: var(--c-text);
  font-weight: 700;
}

.mode-hero {
  background: linear-gradient(to bottom right, rgba(139, 26, 47, 0.85), rgba(92, 15, 30, 0.75)),
    url('/images/hero.jpg');
  background-size: cover;
  background-position: center;
  padding: 6rem 2rem;
  text-align: center;
  color: #fff;
}

.mode-hero-inner {
  max-width: 640px;
  margin: 0 auto;
}

.mode-section-text p {
  white-space: pre-line;
}

.mode-tag {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-full);
  padding: 0.3rem 1rem;
  
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
  color: rgba(255, 255, 255, 0.85);
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

.mode-section:last-child {
  border-bottom: none;
}

.mode-section--alt {
  background: var(--c-bg-alt);
}

.mode-section-icon {
  font-size: var(--text-3xl);
  flex-shrink: 0;
  width: 2.5rem;
  text-align: center;
  padding-top: 0.2rem;
}

.mode-section-text h2 {
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.6rem;
}

.mode-section-text p {
  color: var(--c-text-secondary);
  line-height: 1.8;
  margin: 0;
}

.mode-schools {
  border-top: 1px solid var(--c-border);
  padding-top: 3rem;
}

.mode-schools-title {
  font-weight: 700;
  color: var(--c-primary-dark);
  text-align: center;
  margin-bottom: 0.4rem;
}

.mode-schools-sub {
  text-align: center;
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

.school-card:hover {
  border-color: var(--c-primary);
}

.school-card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.school-card-body {
  padding: 1rem;
}

.school-card-body h3 {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 0.3rem;
}

.school-card-body p {
  
  color: var(--c-text-secondary);
  margin: 0 0 0.6rem;
}

.school-card-link {
  
  font-weight: 600;
  color: var(--c-primary);
}

.mode-schools-cta {
  display: flex;
  justify-content: center;
}

.btn-more {
  border: 1px solid var(--c-primary);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--c-primary);
  font-weight: 700;
  padding: 0.8rem 2rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.btn-more:hover {
  background: var(--c-primary);
  color: #fff;
}

@media (max-width: 768px) {
  .mode-hero-inner h1 {
    font-size: var(--text-3xl);
  }

  .mode-schools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .mode-hero {
    padding: 4rem 1.5rem;
  }

  .mode-hero-inner h1 {
    font-size: var(--text-2xl);
  }

  .mode-section {
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.5rem;
  }

  .mode-schools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
