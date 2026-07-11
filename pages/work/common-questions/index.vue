<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)


useSeoMeta({
  title: '常見問題｜FORMA 留學・就職代辦',
  description: '整理日本留學與赴日工作最常被詢問的問題，包含費用、簽證、申請流程、落地支援等，幫助你出發前做好充足準備。',
})

const studyFaqs = [
  {
    q: '我沒有學過日文，可以去日本留學嗎？',
    a: '完全可以。許多語言學校提供從零基礎開始的入門課程，只要你有學習的意願，學校會依程度分班，讓你從最基礎的五十音開始學起。FORMA 也會在行前幫你規劃日文學習建議，讓你到日本後能更快進入狀況。',
  },
  {
    q: '短期遊學跟長期留學有什麼差別？',
    a: '短期遊學通常是 2 週到 3 個月，以觀光簽證入境，不需要辦理學生簽證，適合想先體驗日本生活或利用假期學語言的人。長期留學則是 6 個月以上，需要申請「留學」在留資格，可以合法打工，適合想深度學習日語或準備升學的學生。',
  },
  {
    q: '代辦費用怎麼計算？有哪些費用需要準備？',
    a: 'FORMA 首辦免代辦費，與日本學校同步收費，不收取任何額外代辦費用。需要準備的費用包含：學費、入學金、宿舍費用，以及機票和生活費。每所學校的費用明細我們都會在送件前完整說明，讓你清楚掌握預算。',
  },
  {
    q: '申請簽證需要多久時間？過件率高嗎？',
    a: '在留資格認定證明書（COE）的審查通常需要 1～3 個月。FORMA 提供專業的留學理由書與財力證明指導，大幅提升簽證過件率。我們建議在預計入學日期的 4～6 個月前開始申請流程，避免時程緊迫。',
  },
  {
    q: '到日本之後如果遇到問題，可以找誰幫忙？',
    a: '這正是 FORMA「台日雙邊支援」的核心承諾。在台灣有顧問協助行前申請，抵達日本後，我們在當地有協力夥伴，可以協助你辦理手機門號、銀行開戶、找租屋，讓你落地後不是一個人摸索。',
  },
  {
    q: '語言學校畢業後可以在日本工作嗎？',
    a: '語言學校的學生簽證本身不能直接轉為工作簽證，但你可以在日本進一步升學（專門學校或大學），取得學位後申請就職。FORMA 也提供一條龍輔導，從留學期間的打工介紹，到畢業後的日本正職職缺媒合，全程支援。',
  },
  {
    q: '宿舍費用包含在學費裡嗎？',
    a: '不包含，宿舍費用需要另外支付。各學校宿舍型態不同，費用從 3 萬到 8 萬日圓不等，視地區與房型而定。部分學校提供學生宿舍，也有學校協助媒合附近的學生公寓或寄宿家庭，FORMA 會在申請前說明所有費用明細。',
  },
  {
    q: '在日本可以打工嗎？',
    a: '持有留學在留資格的學生，可以申請「資格外活動許可」，每週打工上限為 28 小時（寒暑假期間可達 40 小時）。時薪依地區不同，東京約 1,100～1,300 日圓，地方城市約 900～1,050 日圓，有助於補貼部分生活費。',
  },
]

const workFaqs = [
  {
    q: '我沒有日文能力，可以申請日本工作嗎？',
    a: '部分職缺（如製造業、農業、漁業等特定技能職種）對日語要求相對較低，但仍建議具備基本的生活日語能力（N4 以上）。FORMA 在媒合工作前會評估你的語言程度，並提供適合的職缺方向與行前日語建議。',
  },
  {
    q: '特定技能跟技術・人文・國際業務簽證有什麼差別？',
    a: '特定技能是針對特定 12 個產業開放的工作簽證，適合藍領或技術性工作，需要通過技能測試與日語測試。技術・人文・國際業務簽證則是白領工作簽證，適合在日本企業從事業務、工程、翻譯等職務，通常需要大學學歷。FORMA 會依你的背景推薦最適合的路線。',
  },
  {
    q: '透過 FORMA 找工作需要收費嗎？',
    a: 'FORMA 針對求職者提供免費諮詢與媒合服務，不向求職者收取介紹費。我們的收費對象為日本企業端，確保求職者的利益不受影響。',
  },
  {
    q: '日本工作的薪資水準大概是多少？',
    a: '依職種與地區而異。製造業特定技能約 18～25 萬日圓／月；IT、商務類白領職種約 25～40 萬日圓以上。東京薪資普遍高於地方城市，但生活費也相對較高。FORMA 媒合時會提供薪資範圍參考，讓你綜合評估。',
  },
  {
    q: '在日本工作需要準備哪些文件？',
    a: '主要文件包含：護照、學歷證明（日文翻譯版）、職務經歷書（類似履歷，格式有別於台灣習慣）、以及就職後的在留資格申請文件。FORMA 提供文件準備指導，包含職務經歷書的撰寫建議，讓申請更順利。',
  },
  {
    q: '家人可以一起去日本嗎？',
    a: '持有工作簽證的本人可以申請「家族滯在」資格，讓配偶和未成年子女同住日本。家族滯在者本身也可以在一定條件下申請工作許可。FORMA 可以協助規劃家庭同行的簽證安排。',
  },
  {
    q: '需要通過哪些測試才能申請特定技能簽證？',
    a: '特定技能（一號）需要通過兩項測試：日語能力測試（JLPT N4 以上或 JFT-Basic）和各職種的技能評量測試。部分職種（如介護、飲食製造等）有特定的測試機構和考試日程，FORMA 可以協助確認考試資訊與準備方向。',
  },
  {
    q: '在日本工作多久後可以申請永住？',
    a: '一般情況下，持續合法居留 10 年（其中 5 年以上為就勞在留資格）可申請永住。特定技能二號持有者在滿足條件後也可申請。高度人才（高度専門職）則有加速取得永住的優惠規定。FORMA 可依你的情況規劃長期簽證路徑。',
  },
]

// work line: fixed
const faqs = workFaqs
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
      <p class="faq-hero-eyebrow">常見問題</p>
      <h1 class="faq-hero-title">你想知道的，<br>我們都整理好了</h1>
      <p class="faq-hero-sub">整理日本留學與赴日工作最常被詢問的問題，幫助你出發前做好充足準備。</p>
    </div>
  </section>

  <main class="faq-page">
    <!-- FAQ 列表 -->
    <div class="faq-body">
      <div class="faq-list">
        <div
          v-for="(faq, i) in faqs"
          class="faq-item"
          :class="{ 'faq-item--open': openIndex === i }"
        >
          <button
            type="button"
            class="faq-question"
            :aria-expanded="openIndex === i"
            @click="toggle(i)"
          >
            <span class="faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="faq-q-text">{{ faq.q }}</span>
            <span class="faq-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline
                  points="3,6 8,11 13,6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>

          <div class="faq-answer-wrap" :class="{ open: openIndex === i }">
            <div class="faq-answer">
              <p>{{ faq.a }}</p>
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
            <li><NuxtLink to="/study/schools">查看合作學校</NuxtLink></li>
            <li><NuxtLink to="/study/information">留學情報專欄</NuxtLink></li>
            <li><NuxtLink to="/study/short-term">短期遊學介紹</NuxtLink></li>
            <li><NuxtLink to="/study/long-term">長期留學介紹</NuxtLink></li>
            <li><NuxtLink to="/study/university">升學進修介紹</NuxtLink></li>
          </ul>
        </div>
      </aside>
    </div>

  </main>

  <ContactIcon />
  <Footer />
</template>

<style scoped>
/* ── Hero ── */
.faq-hero {
  background: var(--c-primary);
  padding: 4rem 2rem;
  text-align: center;
}

.faq-hero-inner { max-width: 600px; margin: 0 auto; }

.faq-hero-eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
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
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.82);
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
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  border-right: 1px solid var(--c-border);
}

.faq-tab:last-child { border-right: none; }

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

.faq-item:last-child { border-bottom: none; }

.faq-item--open { background: var(--c-bg); }

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

.faq-question:hover { background: var(--c-primary-muted); }

.faq-num {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--c-primary);
  flex-shrink: 0;
  width: 24px;
  opacity: 0.6;
}

.faq-item--open .faq-num { opacity: 1; }

.faq-q-text {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--c-text);
  line-height: 1.4;
  flex: 1;
}

.faq-item--open .faq-q-text { color: var(--c-primary-dark); }

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

.faq-icon svg { width: 16px; height: 16px; display: block; }

.faq-item--open .faq-icon { transform: rotate(180deg); }

.faq-answer-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer-wrap.open { max-height: 400px; }

.faq-answer {
  padding: 0 1.3rem 1.2rem 3.2rem;
  border-top: 1px solid var(--c-border);
}

.faq-answer p {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.85;
  margin: 0;
  padding-top: 1rem;
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

.aside-card--light { background: var(--c-bg-alt); }

.aside-eyebrow {
  font-size: var(--text-xs);
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
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0 0 1.2rem;
}

.aside-btn {
  display: inline-block;
  background: var(--c-primary);
  color: var(--c-text-on-primary);
  font-size: var(--text-sm);
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

.aside-links li:last-child { border-bottom: none; }

.aside-links a {
  display: block;
  padding: 0.55rem 0;
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.aside-links a:hover { color: var(--c-primary); }

/* ── RWD ── */
@media (max-width: 768px) {
  .faq-body {
    grid-template-columns: 1fr;
  }

  .faq-aside { position: static; }

  .faq-answer { padding: 0 1.2rem 1rem 1.2rem; }
}

@media (max-width: 480px) {
  .faq-hero { padding: 3rem 1.5rem; }
  .faq-page { padding: 2rem 1rem 4rem; }
  .faq-tabs { width: 100%; }
  .faq-tab { flex: 1; text-align: center; }
}
</style>