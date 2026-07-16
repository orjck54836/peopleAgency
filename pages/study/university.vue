<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const { t } = useI18n()

useSeoMeta({
  title: '升學進修｜日本專門學校・大學申請｜皓學',
  description: '以取得日本學位或專業資格為目標，進入專門學校、大學或研究所就讀。皓學提供從語言學校銜接升學的完整規劃與申請代辦服務。',
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

const sections = [
  {
    icon: '',
    title: '什麼是升學進修？',
    body: '升學進修是指在日本完成基礎語言學習後，進一步報考並就讀日本的專門學校、大學或大學院（研究所），以取得正式學歷或專業技術文憑的留學規劃，修業年限通常為 2 年至 4 年。與一般語言學校相比，升學進修能讓學生深入鑽研特定專業領域（如動漫、設計、商學或理工），並取得國際認可的學位、畢業後，學生不僅具備高度的專業技能與日語能力，更能大幅提升在日本當地就職的競爭力，順利將學生簽證轉換為「技術・人文知識・國際業務」等工作簽證，正式立足日本職場。',
    list: null,
  },
  {
    icon: '',
    title: '適合哪些人？',
    body: '',
    list: [
      { title: '追求專業技能的實踐者', desc: '計畫就讀專門學校，學習動漫、設計、製藥、IT 或美容等一技之長，為未來躍進打下堅實的實務基礎。' },
      { title: '嚮往日本大學的學子', desc: '希望進入日本的高等教育體系，體驗完整的大學生活，並取得具備國際競爭力的學士學位。' },
      { title: '深造學術領域的研究者', desc: '目標為日本的大學院（研究所），針對特定學術領域進行深入的專業研究，追求碩士或博士學位。' },
      { title: '放眼日本職場的規劃者', desc: '期許畢業後能直接留在日本企業就職，透過日本在地學歷與學校的產學合作資源，順利接軌日本職場。' },
    ],
  },
  {
    icon: '',
    title: '課程特色',
    body: '日本的高等教育機構以嚴謹的學術訓練與高度的產學合作聞名。專門學校著重於「即戰力」的培養，提供業界一線專家的實務指導與資源豐富的企業實習機會；大學與大學院則提供完整的研究資源與學術環境。培養具備獨立思考與問題解決能力的高階人才。在準備升學的階段，除了需具備 JLPT N2 或 N1 的日語實力，課程準備重點會放在日本留學考試（EJU）、校內考（筆試與小論文）及教授面試的密集特訓，透過系統化的推考規劃與專業輔導，學生能精準掌握各校招生標準，強化學術寫作與邏輯表達力，進而錄取理想的學術殿堂。',
    list: null,
  },
  {
    icon: '',
    title: '申請流程與時程',
    body: '為了順利考取理想學校，升學進修的準備期間通常需要提前 8 至 12 個月啟動：',
    list: [
      { title: '入學（通常為 4 月）的前一年夏秋季', desc: '學生需先考取 EJU 或 JLPT 門檻成績，並於秋冬季（入學前 4 至 6 個月）提交錄取書與研究生書等書面資料進行「出願（提出申請）」。' },
      { title: '通過審查與校內考後', desc: '學校會於入學前 2 至 3 個月寄發合格通知書。確認就讀並繳費後，已在日學生須辦理在留資格變更；從台灣直接報名的學生，則依標準流程取得 COE 並換發留學簽證。' },
      { title: '最後約 3 個月底前', desc: '安排妥當住宿與機票，即可赴日迎接 4 月開學。' },
    ],
  },
  {
    icon: '',
    title: '費用參考',
    body: '升學進修的修業時間通常為 2 年至 4 年（專門學校與大學院約 2 年，大學約 4 年），學生需依據報考學校性質評估預算：',
    list: [
      { title: '學費與雜費', desc: '國公立大學每年約 50 萬～80 萬日圓；私立大學或專門學校每年約 90 萬～150 萬日圓（約折合台幣 18 萬～30 萬元，理科或醫藥相關學科系通常較高）。' },
      { title: '住宿費用', desc: '每年約 40 萬～100 萬日圓（約折合台幣 8 萬～20 萬元）。' },
      { title: '預估總花費', desc: '加上機票與當地基本生活開銷，一整年的整體預算約落在台幣 50 萬～85 萬元之間（依學校性質、就讀城市與個人消費習慣而異）。' },
    ],
  },
  {
    icon: '',
    title: '申請必備文件',
    body: '日本各高等教育機構需提交嚴謹且完整的書面審查資料。基本資料部分，學生需準備護照影本、個人近照、入學願書以及詳盡的志望理由書（就讀動機）。在學歷與能力證明方面，必須提供最高學歷之畢業證書與歷年成績單正本，並附上近期取得的語言能力證明（如 JLPT 證書、EJU 成績單，部分大學亦要求 TOEFL 或 TOEIC 英文成績）。此外，若申請大學院（研究所），學生還需額外準備專屬的「研究計畫書」以及指導教授的推薦函；若申請藝術或設計類專門學校，則通常需要提交個人作品集。經費支付證明（存款證明與經費支付人的在職證明）亦是審查簽證與入學資格的重要依據。',
    list: null,
  },
  {
    icon: '',
    title: '貼心小提醒',
    body: '日本的大學與專門學校絕大多數以春季（4 月）為正式入學季，且各校的「出願（申請）期間」非常短暫且嚴格，通常集中在入學前一年的秋至冬季。由於準備過程涉及繁複的考試報名、研究計畫撰寫與學校聯繫，建議學生在預計升學的 8 至 12 個月前開始聯繫專業諮詢顧問，並及早確認目標校系與報考資格，以利為學生量身規劃最紮實打的升學策略與時程！',
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
      <p class="mode-sub">從語言學校到專門學校、大學，皓學 全程規劃陪你升學</p>
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
      <h2 class="mode-schools-title">推薦升學學校</h2>
      <p class="mode-schools-sub">以下為皓學精選的升學進修合作學校</p>
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
        <button class="btn-more" @click="goToAllSchools">查看全部專門學校 →</button>
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
  color: var(--c-text-muted);
  margin-bottom: 2rem;
}

.mode-section-text p {
  white-space: pre-line;
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
