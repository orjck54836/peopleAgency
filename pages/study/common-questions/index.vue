<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const { t } = useI18n()
useSeoMeta({
  title: '常見問題｜皓學/FORMA留學・就職代辦',
  description: '整理日本留學與赴日工作最常被詢問的問題，包含費用、簽證、申請流程、落地支援等，幫助你出發前做好充足準備。',
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

const studyFaqs = [
  {
    q: '我沒有學過日文，可以去日本留學嗎？',
    a: '如果是選擇短期遊學（免簽入境），完全可以從零基礎（五十音）開始!\n\n但如果您計畫申請 6 個月以上的長期留學（學生簽證），因應日本入管局最新的審查政策，過去的「150小時學習證明」已不適用。\n\n目前申請長期簽證，建議至少需具備日檢 N5 以上證書（或通過學校的日語面試評估）。',
  },
  {
    q: '短期遊學跟長期留學有什麼差別？',
    a: '兩者最主要的差異在於「就讀時間」、「簽證類型」以及「核心目的」。您可以根據自己的規劃進行選擇：',
    list: [
      { title: '短期遊學（2 週 ～ 3 個月）', desc: '適合想利用寒暑假、特休或轉職過渡期，快速提升日語口說並體驗日本日常的人。最大的優勢在於不需要申請繁複的留學簽證，只要持台灣護照（觀光免簽 90 天）即可輕鬆出發，是無負擔體驗日本生活的第一步。' },
      { title: '長期留學（6 個月 ～ 2 年）', desc: '適合目標是將日語提升至流利水準（日檢 N2／N1 以上），或計劃未來在日本升學、就職的規劃者。此方式需要申請「留學」在留資格（學生簽證）。除了能享有完整的升學或就職輔導，還能合法從事兼職打工（每週 28 小時以內），深入融入日本社會並補貼生活開銷。' },
    ],
  },
  {
    q: '我該如何選擇適合自己的語言學校？',
    a: '選擇學校的核心在於您的「留學目的」與「個人偏好」。建議您可以從以下幾個維度來評估：',
    list: [
      { title: '教學風格', desc: '重視日常會話實用性，還是偏重升學與日檢備考的升學型學校。' },
      { title: '城市與生活機能', desc: '喜愛東京、大阪等資源豐富的大都市，還是偏好物價較親民、生活步調舒適的地方城市。' },
      { title: '國籍比例', desc: '希望與世界各國的國際學生一同交流，還是注重華語圈學生的互助環境。' },
    ],
  },
  {
    q: '代辦費用怎麼計算？有哪些費用需要準備？',
    a: '皓學提供免費的代辦服務，我們不收取任何額外的代辦手續費。所有留學學費皆與日本學校官方收費標準完全同步，直接由學生支付給學校，絕無隱藏費用。您需要準備的費用主要包含：',
    list: [
      { title: '學校規費', desc: '學費、選考料（報名費）、入學金與教材費。' },
      { title: '生活開銷', desc: '住宿費用、基本生活費、機票與海外保險。' },
    ],
  },
  {
    q: '宿舍費用包含在學費裡嗎？',
    a: '不包含，住宿費用需要另外支付。\n\n日本各學校提供的宿舍型態非常多元，每個月的費用大約落在 3 萬至 9 萬日圓不等，具體金額會依據您選擇的城市區域、單人房或多人房型而有所不同。\n\n除了學校宿舍外，我們也有長期合作且免保證人的日本當地租屋體系與學生公寓夥伴。\n\n我們的顧問會在申請前，根據您的預算為您詳細說明所有的住宿選擇與費用明細。',
    list: null,
  },
  {
    q: '申請簽證需要多久時間？過件率高嗎？',
    a: '日本留學簽證（在留資格認定證明書，簡稱 COE）的審查通常需要 2 至 3 個月。\n\n為了確保時程充裕，我們強烈建議在預計入學日期的 5 到 6 個月前開始著手準備申請流程。\n\n日本入管局對於長期簽證的審查非常嚴謹，過件的關鍵在於「留學理由書」的撰寫邏輯，以及「財力證明（經費支付書）」的資料完整度。\n\n只要配合顧問的規劃依序準備，絕大多數學生都能順利取得簽證，無需過度擔心過件率。',
    list: null,
  },
  {
    q: '留學期間生病怎麼辦？日本的健保費用高嗎？',
    a: '持有長期留學簽證（6個月以上）的學生，依法都必須加入日本的「國民健康保險」。\n\n加入後，醫療費用通常只需自行負擔 30%，基本的看診、拿藥與牙科治療都包含在內。國民健康保險的保費是以個人前一年的在日收入計算。\n\n由於留學生剛到日本時沒有前一年的申報所得，保費通常會獲得大幅度減免，每個月大約僅需支付 1,000 至 2,000 日圓左右。\n\n在行前說明會中，也會詳細教導大家抵達日本後如何到區役所辦理健保登記。',
    list: null,
  },
  {
    q: '在日本就學其間可以打工嗎？',
    a: '可以。只要您持有長期留學簽證，並在入境機場或事後向入管局申請「資格外活動許可」，即可合法打工。根據日本法規，留學生每週的打工時數上限為 28 小時（學校寒暑假期間每日可達 8 小時，每週上限 40 小時）。\n\n目前日本各地的基本時薪依地區有所不同，例如東京、大阪等大都市約在 1,100 至 1,300 日圓之間，地方城市則約在 950 至 1,050 日圓。打工不僅能補貼日常伙食費，更是快速提升日語口說與融入日本社會的絕佳機會。',
    list: null,
  },
  {
    q: '語言學校畢業後可以留在日本工作嗎？',
    a: '可以。但能否順利取得日本工作簽證，主要取決於您的「學歷背景」與「日語能力」：',
    list: [
      { title: '學歷背景要求', desc: '您必須具備台灣的大專院校（專科、大學或研究所）以上學歷，或在日本取得專門學校以上的學位。' },
      { title: '日語能力要求', desc: '根據日本入管局最新規定，若您未來的目標職缺涉及需要與人溝通的業務（如營業、翻譯、商務客服、餐飲飯店管理等），且受僱於日本中小企業，在申請工作簽證時，將會強制要求提交相當於日檢 N2（CEFR B2）以上的日語能力證明。' },
    ],
  },
]

const workFaqs = [
  {
    q: '我沒有日文能力，可以申請日本工作嗎？',
    a: '部分職缺（如製造業、農業、漁業等特定技能職種）對日語要求相對較低，但仍建議具備基本的生活日語能力（N4 以上）。FORMA在媒合工作前會評估你的語言程度，並提供適合的職缺方向與行前日語建議。',
  },
  {
    q: '特定技能跟技術・人文・國際業務簽證有什麼差別？',
    a: '特定技能是針對特定 12 個產業開放的工作簽證，適合藍領或技術性工作，需要通過技能測試與日語測試。技術・人文・國際業務簽證則是白領工作簽證，適合在日本企業從事業務、工程、翻譯等職務，通常需要大學學歷。皓學會依你的背景推薦最適合的路線。',
  },
  {
    q: '透過 FORMA找工作需要收費嗎？',
    a: 'FORMA針對求職者提供免費諮詢與媒合服務，不向求職者收取介紹費。我們的收費對象為日本企業端，確保求職者的利益不受影響。',
  },
  {
    q: '日本工作的薪資水準大概是多少？',
    a: '依職種與地區而異。製造業特定技能約 18～25 萬日圓／月；IT、商務類白領職種約 25～40 萬日圓以上。東京薪資普遍高於地方城市，但生活費也相對較高。FORMA媒合時會提供薪資範圍參考，讓你綜合評估。',
  },
  {
    q: '在日本工作需要準備哪些文件？',
    a: '主要文件包含：護照、學歷證明（日文翻譯版）、職務經歷書（類似履歷，格式有別於台灣習慣）、以及就職後的在留資格申請文件。FORMA提供文件準備指導，包含職務經歷書的撰寫建議，讓申請更順利。',
  },
  {
    q: '家人可以一起去日本嗎？',
    a: '持有工作簽證的本人可以申請「家族滯在」資格，讓配偶和未成年子女同住日本。家族滯在者本身也可以在一定條件下申請工作許可。FORMA可以協助規劃家庭同行的簽證安排。',
  },
  {
    q: '需要通過哪些測試才能申請特定技能簽證？',
    a: '特定技能（一號）需要通過兩項測試：日語能力測試（JLPT N4 以上或 JFT-Basic）和各職種的技能評量測試。部分職種（如介護、飲食製造等）有特定的測試機構和考試日程，FORMA可以協助確認考試資訊與準備方向。',
  },
  {
    q: '在日本工作多久後可以申請永住？',
    a: '一般情況下，持續合法居留 10 年（其中 5 年以上為就勞在留資格）可申請永住。特定技能二號持有者在滿足條件後也可申請。高度人才（高度専門職）則有加速取得永住的優惠規定。FORMA可依你的情況規劃長期簽證路徑。',
  },
]

// study line: fixed
const faqs = studyFaqs
const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <!-- Page Hero -->
  <section class="faq-hero">
    <div class="faq-hero-inner">
      <h1 class="faq-hero-title">常見問題</h1>
      <p class="faq-hero-sub">整理日本留學與赴日工作最常被詢問的問題，幫助你出發前做好充足準備。</p>
    </div>
  </section>

  <main class="faq-page">
    <!-- FAQ 列表 -->
    <div class="faq-body">
      <div class="faq-list">
        <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ 'faq-item--open': openIndex === i }">
          <button type="button" class="faq-question" :aria-expanded="openIndex === i" @click="toggle(i)">
            <span class="faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="faq-q-text">{{ faq.q }}</span>
            <span class="faq-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="3,6 8,11 13,6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>
          </button>

          <div class="faq-answer-wrap" :class="{ open: openIndex === i }">
            <div class="faq-answer">
              <div class="faq-answer-wrap" :class="{ open: openIndex === i }">
                  <p v-if="faq.a">{{ faq.a }}</p>
                  <ul v-if="faq.list" class="faq-answer-list">
                    <li v-for="(item, j) in faq.list" :key="j">
                      <strong>{{ item.title }}</strong>：{{ item.desc }}
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 側欄 CTA -->
      <aside class="faq-aside">
        <div class="aside-card">
          <p class="aside-eyebrow">還有其他疑問？</p>
          <h3 class="aside-title">直接諮詢我們的顧問</h3>
          <p class="aside-body">無論是留學申請流程、費用規劃，還是赴日工作的簽證問題，我們的顧問都能為你解答。</p>
          <NuxtLink to="/contact" class="aside-btn">免費諮詢 →</NuxtLink>
        </div>

        <div class="aside-card aside-card--light">
          <p class="aside-eyebrow">快速連結</p>
          <ul class="aside-links">
            <li>
              <NuxtLink to="/study/schools">查看合作學校</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/study/information">留學情報專欄</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/study/short-term">短期遊學介紹</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/study/long-term">長期留學介紹</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/study/university">升學進修介紹</NuxtLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>

  </main>


  <Footer />
</template>

<style scoped>
/* ── Hero ── */
.faq-hero {
  background: var(--c-primary);
  padding: 4rem 2rem;
  text-align: center;
}

.faq-hero-inner {
  max-width: 600px;
  margin: 0 auto;
}

.faq-hero-eyebrow {

  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.6rem;
}

.faq-hero-title {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.25;
  margin: 0 0 0.75rem;
}

.faq-hero-sub {

  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
  margin: 0;
}

/* ── Page ── */
.faq-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
}

/* ── Tab ── */
.faq-tabs {
  display: flex;
  gap: 0;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 2rem;
  width: fit-content;
}

.faq-tab {
  padding: 0.75rem 1.8rem;
  border: none;
  background: var(--c-surface);
  color: var(--c-text-secondary);

  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  border-right: 1px solid var(--c-border);
}

.faq-tab:last-child {
  border-right: none;
}

.faq-tab:hover {
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
}

.faq-tab--active {
  background: var(--c-primary);
  color: #fff;
}

/* ── Body ── */
.faq-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  align-items: flex-start;
}

/* ── FAQ 列表 ── */
.faq-list {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-item--open {
  background: var(--c-bg);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.1rem 1.3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);
}

.faq-question:hover {
  background: var(--c-primary-muted);
}

.faq-num {

  font-weight: 700;
  color: var(--c-primary);
  flex-shrink: 0;
  width: 24px;
  opacity: 0.6;
}

.faq-item--open .faq-num {
  opacity: 1;
}

.faq-q-text {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--c-text);
  line-height: 1.4;
  flex: 1;
}

.faq-item--open .faq-q-text {
  color: var(--c-primary-dark);
}

.faq-answer p {
  white-space: pre-line;
}

.faq-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  transition: transform var(--transition-base);
}

.faq-icon svg {
  width: 16px;
  height: 16px;
  display: block;
}

.faq-item--open .faq-icon {
  transform: rotate(180deg);
}

.faq-answer-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer-wrap.open {
  max-height: 400px;
}

.faq-answer {
  padding: 0 1.3rem 1.2rem 3.2rem;
  border-top: 1px solid var(--c-border);
}

.faq-answer p {
  line-height: 1.85;
  margin: 0;
  padding-top: 1rem;
}

.faq-answer-list {
  list-style: disc;
  padding-left: 1.4rem;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.faq-answer-list li {
  color: var(--c-text-secondary);
  line-height: 1.75;
}

.faq-answer-list li strong {
  color: var(--c-text);
  font-weight: 700;
}

/* ── 側欄 ── */
.faq-aside {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 80px;
}

.aside-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.4rem;
}

.aside-card--light {
  background: var(--c-bg-alt);
}

.aside-eyebrow {

  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--c-primary);
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

.aside-title {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 0.6rem;
}

.aside-body {

  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0 0 1.2rem;
}

.aside-btn {
  display: inline-block;
  background: var(--c-primary);
  color: var(--c-text-on-primary);

  font-weight: 700;
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.aside-btn:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
}

.aside-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.aside-links li {
  border-bottom: 1px solid var(--c-border);
}

.aside-links li:last-child {
  border-bottom: none;
}

.aside-links a {
  display: block;
  padding: 0.55rem 0;

  color: var(--c-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.aside-links a:hover {
  color: var(--c-primary);
}

/* ── RWD ── */
@media (max-width: 768px) {
  .faq-body {
    grid-template-columns: 1fr;
  }

  .faq-aside {
    position: static;
  }

  .faq-answer {
    padding: 0 1.2rem 1rem 1.2rem;
  }
}

@media (max-width: 480px) {
  .faq-hero {
    padding: 3rem 1.5rem;
  }

  .faq-page {
    padding: 2rem 1rem 4rem;
  }

  .faq-tabs {
    width: 100%;
  }

  .faq-tab {
    flex: 1;
    text-align: center;
  }
}
</style>