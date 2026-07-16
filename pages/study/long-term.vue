<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const { t } = useI18n()

useSeoMeta({
  title: '長期留學｜6個月～2年語言學校留學｜皓學',
  description: '申請日本語言學校學生簽證，深度學習日語並融入當地生活，合法打工補貼生活費。皓學提供完整的長期留學申請代辦與支援服務。',
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

const sections = [
  {
    title: '什麼是長期留學？',
    body: '長期留學是指在日本就讀語言學校 6 個月至 2 年，並申請「留學」在留資格（學生簽證）的留學方式。與短期遊學相比，長期留學能讓您有充裕的時間將日語能力提升至流利水準、建立在地的社交與人脈網絡。\n\n更棒的是，您可以合法從事兼職打工（每週 28 小時以內），在實際體驗日本職場的同時，也能為自己賺取生活津貼。',
    list: null,
  },
  {
    title: '適合哪些人？',
    body: '',
    list: [
      { title: '目標明確的日語精進者', desc: '期許自己在全日語的沉浸式環境中，紮實地將日語實力提升至 N2、N1 以上的流利程度。' },
      { title: '計劃在日就職的開拓者', desc: '未來有志於在日本就業或轉職，希望先透過語言學校打好商務溝通基礎、適應日本職場文化。' },
      { title: '準備日本升學的準備者', desc: '計劃報考日本的大學、大學院（研究所）或專門學校，需要充裕的過渡期進行升學輔導與備考。' },
      { title: '追求深度的日本迷', desc: '想給自己一段完整的空白期，透過 1 到 2 年的在地生活深度融入日本社會，探索人生的下一階段。' },
    ],
  },
  {
    title: '課程特色',
    body: '長期課程通常以「全方位學術與實務日語」為核心，採用每日由淺入深的漸進式系統教學，帶領學生在沉浸式的全日語環境中，紮實奠定聽、說、讀、寫的直覺思維。\n\n在中高級階段，課程更靈活融入 JLPT 證照衝刺、商務日語與學術寫作等多元選修，精準對接個人生涯目標。\n\n學校亦提供專屬的一對一升學與就職輔導，從院校報考、履歷修改到模擬面試全程支援，並定期舉辦文化體驗與跨國交流活動，讓學生在精進語言的同時，能深度融入日本在地社會、累積實用人脈。',
    list: null,
  },
  {
    title: '申請流程與時程',
    body: '為了確保能順利取得簽證並如期入學，長期留學的申請通常需要提前 4 至 6 個月開始準備：',
    list: [
      { title: '入學前 4～6 個月', desc: '評估個人目標、確認報名期別、選定理想學校。' },
      { title: '入學前 3～4 個月', desc: '準備完整書面申請文件並送交學校審查。' },
      { title: '入學前 1～2 個月', desc: '學校代申請人向日本出入國在留管理局遞交申請，取得在留資格認定證明書（COE）。' },
      { title: '出發前 1 個月', desc: '持 COE 正本、護照與身分證等文件至日台交流協會辦理留學簽證，通常需要 2 至 5 個工作天。取得簽證並安排好住宿與機票後即可出發。' },
    ],
  },
  {
    title: '費用參考',
    body: '長期課程時間通常為 6 個月至 2 年，學生可以依據生涯規劃選擇合適的學習長度：',
    list: [
      { title: '學費與雜費', desc: '每年約 70 萬～90 萬日圓（約折合台幣 14 萬～18 萬元）。' },
      { title: '住宿費用', desc: '每年約 36 萬～100 萬日圓（約折合台幣 7.2 萬～20 萬元）。' },
      { title: '預估總花費', desc: '加上機票與當地基本生活開銷，一整年的整體預算約落在台幣 35 萬～60 萬元之間（依就讀城市、住宿類型與個人消費習慣而異）。' },
    ],
  },
  {
    title: '申請必備文件',
    body: '申請長期留學需提交完整的書面審查資料，所有文件皆需維持最新且正確的狀態：',
    list: [
      { title: '基本個人資料', desc: '護照影本、符合規定的個人近照、入學申請書以及詳細的留學理由書。' },
      { title: '學歷證明', desc: '最終學歷之畢業證書正本與歷年成績單正本。' },
      { title: '經費支付證明（財力證明）', desc: '通常建議台幣 80 萬至 100 萬元以上的存款證明，以及經費支付人的在職證明與年度所得證明（如扣繳憑單）。' },
    ],
  },
  {
    title: '皓學如何協助你？',
    body: '日本語言學校的長期課程入學時間，主要為每年的春季（4 月）與秋季（10 月），部分學校亦配合 1 月與 7 月開班。\n\n由於長期留學需要向日本政府申請在留資格，手續較為繁複，且各校的名額與宿舍有限，建議學生在預計出發前的 4 至 6 個月聯繫專業顧問，以利為學生規劃最順暢的簽證與入學時程！',
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
  line-height: 1.7;
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

.mode-section-text p {
  white-space: pre-line;
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
