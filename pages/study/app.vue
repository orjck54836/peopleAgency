<script lang="ts" setup>
/**
 * 皓學日語 App 宣傳頁（/study/app）。
 *
 * 這一頁用的是 App 本身的設計語言（酒紅／米白／金、大圓角、殼層堆疊），
 * 跟官網其他頁不同，所以不套官網的 Header／Footer，自己帶導覽和頁尾。
 * 樣式全部掛在 .hg-app 底下、class 一律 hg- 開頭，避免跟 Bootstrap 的
 * .btn／.card／.nav 互相影響。
 */
const localePath = useLocalePath()

const { track } = useGtag()

const PAGE_PATH = '/study/app'
const PAGE_URL = absoluteUrl(PAGE_PATH)
const OG_IMAGE = absoluteUrl('/images/haogaku-app/og.jpg')
// 結構化資料用乾淨的商店網址；頁面上的下載按鈕用 storeHref（可能帶行銷活動參數）
const APP_STORE_URL = appStoreUrl()
const route = useRoute()
// 從文章的 App 入口點進來時網址會帶 ?from=<文章 slug>，下載連結就用它當行銷活動代碼，
// 在 App Store Connect 看得到是哪一篇文章帶來的下載。
// 在 onMounted 才換掉：伺服器端的 HTML 可能被 CloudFront 快取，不能讓某一篇的代碼被別人共用。
const storeHref = ref(appStoreUrl())
onMounted(() => {
  const from = typeof route.query.from === 'string' ? route.query.from : ''
  if (from) storeHref.value = appStoreUrl(from)
})

const title = '皓學日語 App｜學日文 App：83 個日本生活情境＋AI 口說教練'
const description = '給台灣人的日語學習 App。從便利商店結帳到職場敬語，83 個日本生活情境、近 500 堂課（N5〜N2），加上能用說的練會話的 AI 日語教練。課程全部免費，iPhone 現已上架。'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: PAGE_URL,
  ogImage: OG_IMAGE,
  ogImageAlt: '皓學日語 App：在日本用得到的日語',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: OG_IMAGE,
})

useHead({
  meta: [
    // iPhone Safari 會在頁面頂端顯示「在 App Store 開啟」的橫幅
    { name: 'apple-itunes-app', content: `app-id=${APP_STORE_ID}` },
  ],
  link: [
    // 這一頁只有繁中內容：/ja、/en 底下看到的是同一份中文，
    // canonical 一律指回中文版，避免被當成三份重複內容（做法與情報文章相同）
    { key: 'canonical', rel: 'canonical', href: PAGE_URL },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    // 日文內容用的明體
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500;700&display=swap' },
  ],
  script: [
    {
      // App 本身的結構化資料：Google 與 AI 搜尋用它判斷「這是什麼 App、哪個平台、多少錢」。
      // 沒有放評分（aggregateRating）——目前沒有真實的評分數據，不能自己填。
      key: 'ld-app',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        '@id': `${PAGE_URL}#app`,
        name: '皓學日語',
        alternateName: ['皓學日語 App', 'Haogaku Japanese'],
        description,
        url: PAGE_URL,
        image: OG_IMAGE,
        screenshot: ['home', 'themes', 'lesson', 'report', 'reading', 'vocab'].map((n) =>
          absoluteUrl(`/images/haogaku-app/screen-${n}.jpg`),
        ),
        operatingSystem: 'iOS',
        applicationCategory: 'EducationalApplication',
        applicationSubCategory: '日語學習',
        inLanguage: 'zh-Hant-TW',
        installUrl: APP_STORE_URL,
        downloadUrl: APP_STORE_URL,
        isAccessibleForFree: true,
        publisher: { '@id': 'https://www.forma-global.com/#organization' },
        audience: { '@type': 'Audience', audienceType: '想學日語的台灣人：赴日旅遊、打工度假、留學、工作' },
        featureList: [
          '83 個日本生活情境主題，分 13 大類',
          '初級（N5〜N4）249 堂、進階（N3〜N2）249 堂',
          '每個主題四步驟：基本說法、道地說法、情境練習、AI 實戰會話',
          'AI 日語教練：可語音輸入、雲端語音朗讀、會話分析報告',
          '41 篇原創日文讀物',
          '單字本與間隔複習',
          '五十音表、筆順與手寫練習',
          '每日流行語、今日計畫、等級與排行榜',
        ],
        offers: [
          { '@type': 'Offer', name: '免費版', price: '0', priceCurrency: 'TWD', description: '所有課程、讀物、五十音、單字複習、排行榜免費；AI 會話每天 5 次' },
          { '@type': 'Offer', name: '標準版（月繳）', price: '150', priceCurrency: 'TWD', description: 'AI 會話每天 60 次、會話分析每天 10 份' },
          { '@type': 'Offer', name: '高級版（月繳）', price: '350', priceCurrency: 'TWD', description: 'AI 會話每天 150 次、會話分析每天 20 份' },
        ],
      }),
    },
  ],
})

// 常見問題：畫面和 FAQ 結構化資料共用這一份
const faqs = [
  {
    q: '要不要錢？',
    a: '下載免費，所有課程、讀物、五十音、單字複習和排行榜也都免費。付費方案買的只有 AI 會話和雲端語音的用量，免費版每天也有 5 次 AI 會話可以用。',
  },
  {
    q: '適合什麼程度？',
    a: '從零開始到 N2 左右都適合。完全沒學過可以先從五十音表開始；初級課程對應 N5〜N4，進階課程對應 N3〜N2，在主題頁上方隨時可以切換。',
  },
  {
    q: '有 Android 版嗎？',
    a: '目前先上 iOS，請用 iPhone 從 App Store 下載。',
  },
  {
    q: '怎麼取消訂閱？',
    a: '訂閱由 Apple 管理，請在 iPhone 的「設定 → Apple 帳號 → 訂閱」裡選擇皓學日語後取消。取消後當期仍可用到期末。提醒一下，刪除 App 並不會自動取消訂閱。',
  },
  {
    q: 'AI 的用量用完了會怎樣？',
    a: 'AI 會話會暫停到隔天，用量重新計算後就能繼續。語音朗讀會自動改用手機內建的語音，音質普通一些，但課程照樣可以學。',
  },
  {
    q: '我只是要去日本玩幾天，用得到嗎？',
    a: '用得到。出發前挑飲食、交通、購物幾個主題，先學基本說法，再跟 AI 教練把點餐、問路走過一次，到了當地會比較敢開口。',
  },
  {
    // 「日文初學者 App」「零基礎學日文」這類搜尋字，原本整頁只有「適合什麼程度」一題沾到邊
    q: '完全零基礎、連五十音都不會，可以用嗎？',
    a: '可以。App 裡有完整的五十音表，附筆順動畫和手寫練習，平假名片假名都能從零開始。五十音還不熟的時候，課程裡的句子都標了假名，可以邊學單字邊把音記起來。順序建議是：五十音表 → 初級（N5）的飲食、交通主題 → 再開始跟 AI 教練練口說。',
  },
  {
    // 「日檢 App」「N5 App」：講清楚能用在哪、不能用在哪，避免下載後期待落差
    q: '可以當日檢 N5、N4 的學習 App 嗎？',
    a: '可以用來累積單字、句型和聽說的底子——初級課程對應 N5〜N4，進階對應 N3〜N2，單字本和間隔複習也能用來背考試範圍的字。但它沒有模擬試題和文法題庫，真的要考日檢，建議搭配一本題庫或考古題一起用。',
  },
  {
    // 「學日文 App 推薦」是這一頁最想排上的搜尋字，用問答把差異講清楚，AI 搜尋也最常直接引用這種段落
    q: '跟其他學日文 App 有什麼不同？',
    a: '多數學日文 App 練的是單字和選擇題；皓學日語是照在日本真的會遇到的 83 個生活情境排的，每個主題最後都會跟 AI 教練用說的把對話走完，練的是開口。介面和解說全部是繁體中文。如果目標只有日檢考試，它沒有模擬考題庫，建議再搭配日檢題庫。',
  },
]

// FAQ 下方的延伸閱讀：讓搜尋引擎從 App 頁走到對應的教學文章，文章那邊也都連回這一頁
const guides = [
  { title: '學日文 App 怎麼選？台灣人自學日語的 5 個挑選重點', path: '/study/information/learn-japanese-app-guide' },
  { title: '五十音怎麼背最快？平假名、片假名兩週背完的方法', path: '/study/information/how-to-learn-gojuon' },
  { title: '一個人怎麼練日文口說？用 AI 練日文會話的方法與限制', path: '/study/information/japanese-speaking-practice-ai' },
  { title: '日本便利商店結帳日文：店員會問的 7 句話', path: '/study/information/japanese-konbini-checkout' },
  { title: '日檢 N5 到 N2 要讀多久？台灣人的 JLPT 讀書計畫', path: '/study/information/jlpt-study-plan' },
  { title: '日文自我介紹怎麼說？語言學校、打工面試、職場初日的範例', path: '/study/information/japanese-self-introduction' },
  { title: '服務業接客敬語：いらっしゃいませ到お会計，打工必備的日文', path: '/work/information/japanese-customer-service-keigo' },
]

useFaqSchema(faqs)
useBreadcrumbSchema([
  { name: '首頁', path: '/' },
  { name: '日本留學', path: '/study' },
  { name: '皓學日語 App', path: PAGE_PATH },
])

// ---------- 行為追蹤（GA4；Facebook Pixel 有載入時一併送）----------
/** 連結所在的區塊，寫在外層的 data-place 上（nav／hero／sticky_dock／final_cta／footer_links） */
const placementOf = (el: Element) => el.closest('[data-place]')?.getAttribute('data-place') ?? 'other'

/** 整頁的點擊統一在最外層攔：下載、LINE、Instagram 各送一個事件 */
const onRootClick = (e: MouseEvent) => {
  const link = (e.target as HTMLElement | null)?.closest?.('a')
  if (!link) return
  const href = link.getAttribute('href') ?? ''
  const placement = placementOf(link)
  if (href.includes('apps.apple.com')) {
    // 這一頁最重要的轉換：點了 App Store 下載
    track('app_store_click', { placement, page: PAGE_PATH })
    ;(window as any).fbq?.('trackCustom', 'AppStoreClick', { placement })
  } else if (href.includes('line.me')) {
    // 沿用官網既有的 LINE 事件名稱，報表才會算在一起
    track('line_consult_click', { event_category: 'engagement', event_label: `app_page_${placement}` })
  } else if (href.includes('instagram.com')) {
    track('social_click', { network: 'instagram', placement, page: PAGE_PATH })
  }
}

// 掛在 summary 的點擊上而不是 details 的 toggle：第一題預設展開，載入時也會觸發 toggle，會被誤算成有人點開
const onFaqClick = (question: string, e: Event) => {
  const details = (e.currentTarget as HTMLElement).parentElement as HTMLDetailsElement | null
  // 點下去的當下還沒展開，代表這一下是要打開
  if (details && !details.open) track('app_faq_open', { question })
}

// 手機底部下載列：滑過 Hero 的按鈕後才出現，到頁尾的下載區塊就收起來
const dockVisible = ref(false)
const root = ref<HTMLElement | null>(null)
const heroCta = ref<HTMLElement | null>(null)
const endCard = ref<HTMLElement | null>(null)
// 進場動畫要等 JS 接手後才啟用：沒有 JS 或使用者關閉動態效果時，內容照常直接顯示
const animReady = ref(false)
let observers: IntersectionObserver[] = []

/** 數字從 0 跳到目標值（Hero 底下那排統計） */
const countUp = (el: HTMLElement) => {
  const target = Number(el.dataset.count)
  const duration = 1400
  const t0 = performance.now()
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration)
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(async () => {
  if (!('IntersectionObserver' in window) || !root.value) return

  if (heroCta.value && endCard.value) {
    let pastHero = false
    let atEnd = false
    const update = () => (dockVisible.value = pastHero && !atEnd)
    const heroObserver = new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0
      update()
    })
    const endObserver = new IntersectionObserver(([entry]) => {
      atEnd = entry.isIntersecting
      update()
    })
    heroObserver.observe(heroCta.value)
    endObserver.observe(endCard.value)
    observers.push(heroObserver, endObserver)
  }

  const seen = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        track('app_section_view', { section: (entry.target as HTMLElement).dataset.section })
        seen.unobserve(entry.target)
      }
    },
    // 以「區塊碰到畫面中線」為準；用比例門檻的話，比畫面高很多的區塊會永遠達不到
    { rootMargin: '-45% 0px -45% 0px' },
  )
  root.value.querySelectorAll('[data-section]').forEach((el) => seen.observe(el))
  observers.push(seen)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // 捲動進場：元素進到畫面才加上 hg-in，只播一次
  animReady.value = true
  await nextTick()
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.classList.add('hg-in')
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp)
        reveal.unobserve(el)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  root.value.querySelectorAll('[data-rv]').forEach((el) => reveal.observe(el))
  observers.push(reveal)
})

onBeforeUnmount(() => observers.forEach((o) => o.disconnect()))
</script>

<template>
  <div ref="root" class="hg-app" :class="{ 'hg-js': animReady }" @click="onRootClick">
    <!-- 共用圖示 -->
    <svg width="0" height="0" style="position:absolute" aria-hidden="true">
      <symbol id="i-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11M7 11l5 5 5-5M5 20h14"/></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5c0 4-3.6 7-8 7-1 0-2-.2-2.900-.5L5 19.500l1-3.300C4.700 15 4 13.300 4 11.500c0-4 3.600-7 8-7s8 3 8 7z"/></symbol>
      <symbol id="i-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.500 11a6.500 6.500 0 0 0 13 0M12 17.500V21"/></symbol>
      <symbol id="i-role" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.500 20c1-3.500 4-5.500 7.500-5.500s6.500 2 7.500 5.500"/></symbol>
      <symbol id="i-sound" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10v4h3l5 4V6L7 10H4zM16 9a4 4 0 0 1 0 6M18.500 6.500a8 8 0 0 1 0 11"/></symbol>
      <symbol id="i-chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20V11M12 20V4M19 20v-6"/></symbol>
      <symbol id="i-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5M6.5 10v9.5h11V10"/></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.500"/><path d="M3.500 12h17M12 3.500c2.500 2.500 2.500 14.500 0 17M12 3.500c-2.500 2.500-2.500 14.500 0 17"/></symbol>
      <symbol id="i-photo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round"><rect x="3.500" y="3.500" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7h.010"/></symbol>
    </svg>

    <header class="hg-nav" data-place="nav">
      <div class="hg-wrap">
        <div class="hg-nav-left">
          <!-- 回官網首頁：這一頁沒有套官網的 Header，要自己留一條回去的路 -->
          <NuxtLink class="hg-home" :to="localePath('/')" aria-label="回官網首頁">
            <svg aria-hidden="true"><use href="#i-home"/></svg><span>官網首頁</span>
          </NuxtLink>
        <a class="hg-brand" href="#top" aria-label="皓學日語">
          <img src="/images/haogaku-logo.svg" alt="" width="42" height="42">
          <span><b>皓學日語</b><small>Haogaku</small></span>
        </a>
        </div>
        <nav class="hg-nav-links" aria-label="頁面導覽">
          <a href="#themes">情境主題</a>
          <a href="#coach">AI 教練</a>
          <a href="#plans">方案</a>
          <a href="#faq">常見問題</a>
        </nav>
        <a class="hg-btn hg-btn-white hg-btn-sm" :href="storeHref" target="_blank" rel="noopener">下載 App</a>
      </div>
    </header>

    <main id="top">

      <!-- 1. Hero -->
      <section class="hg-hero" data-section="hero">
        <div class="hg-hero-card" data-place="hero">
          <div class="hg-hero-text">
            <p class="hg-hero-eyebrow"><span class="hg-live"><i aria-hidden="true"></i>iPhone 現已上架</span>給台灣人的日語 App</p>
            <h1><span>在日本</span><span>用得到的日語</span></h1>
            <p class="hg-hero-ja hg-ja" lang="ja">日本で、ちゃんと使える日本語。</p>
            <p class="hg-hero-lead">從便利商店結帳到職場敬語，83 個日本生活情境一次學會。想開口的時候，AI 日語教練隨時陪你練。</p>
            <div ref="heroCta" class="hg-hero-cta">
              <a class="hg-btn hg-btn-white" :href="storeHref" target="_blank" rel="noopener">
                <svg><use href="#i-down"/></svg>App Store 免費下載
              </a>
              <a class="hg-btn hg-btn-ghost" href="https://line.me/R/ti/p/@forma_global" target="_blank" rel="noopener">
                <svg><use href="#i-chat"/></svg>加 LINE 諮詢
              </a>
            </div>
            <p class="hg-hero-note">課程全部免費・目前支援 iPhone</p>
          </div>
          <div class="hg-hero-visual">
            <div class="hg-phone">
              <img src="/images/haogaku-app/screen-home.jpg" alt="皓學日語 App 首頁：接著上次的課程、五十音、AI 教練與單字複習" width="598" height="1300" fetchpriority="high">
            </div>
            <!-- 手機旁邊飄著的兩張小卡，純裝飾 -->
            <div class="hg-chip hg-chip-a" aria-hidden="true"><span class="hg-tag hg-tag-gold">今日</span><span class="hg-ja" lang="ja">エモい</span></div>
            <div class="hg-chip hg-chip-b" aria-hidden="true"><svg><use href="#i-mic"/></svg><span>用說的就可以</span></div>
          </div>
          <ul class="hg-hero-stats" data-rv="none">
            <li><b data-count="83">83</b><span>個生活情境</span></li>
            <li><b data-count="498">498</b><span>堂課</span></li>
            <li><b data-count="41">41</b><span>篇原創讀物</span></li>
          </ul>
        </div>
        <!-- 跑馬燈：在日本會聽到、會說到的句子，純裝飾 -->
        <div class="hg-marquee" aria-hidden="true" lang="ja"><div class="hg-marquee-track"><span>いらっしゃいませ</span><span>お会計お願いします</span><span>袋はいりません</span><span>乗り換えはどこですか</span><span>よろしくお願いします</span><span>お疲れ様です</span><span>なるほど</span><span>温めますか</span><span>予約した者ですが</span><span>おすすめは何ですか</span><span>いらっしゃいませ</span><span>お会計お願いします</span><span>袋はいりません</span><span>乗り換えはどこですか</span><span>よろしくお願いします</span><span>お疲れ様です</span><span>なるほど</span><span>温めますか</span><span>予約した者ですが</span><span>おすすめは何ですか</span></div></div>
      </section>

      <!-- 2. 情境主題 -->
      <section class="hg-sec hg-sec-cream" id="themes" data-section="themes">
        <div class="hg-wrap">
          <header class="hg-sec-head" data-rv>
            <span class="hg-ja" lang="ja">テーマ</span>
            <h2>83 個真的會用到的主題</h2>
            <p>不是照文法書的順序排，是照你在日本會遇到的場景排。要去旅遊就先學點餐和搭車，要打工度假就從租屋和面試開始。</p>
          </header>

          <div class="hg-levels" data-rv>
            <div>
              <h3>兩種程度，近 500 堂課</h3>
              <p>在主題頁上方切換程度，內容就跟著變。同一個場景，初級先學會把話說出口，進階再學怎麼說得得體。</p>
              <div class="hg-level-pills">
                <div class="hg-level-pill"><b>初級</b><span>N5〜N4</span><strong>249<small>堂</small></strong></div>
                <div class="hg-level-pill"><b>進階</b><span>N3〜N2</span><strong>249<small>堂</small></strong></div>
              </div>
            </div>
            <div class="hg-phone">
              <img src="/images/haogaku-app/screen-themes.jpg" alt="主題頁：居住分類下的飯店住宿、找房子、搬家與水電網路、垃圾分類" width="598" height="1300" loading="lazy">
            </div>
          </div>

          <ul class="hg-cats">
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">食</span><div><h3>飲食</h3><p>餐廳點餐、居酒屋、便利商店結帳</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">交</span><div><h3>交通</h3><p>買票、轉車、問路、搭計程車</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">住</span><div><h3>居住</h3><p>飯店入住、找房子、垃圾分類</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">買</span><div><h3>購物</h3><p>問尺寸、免稅、退換貨</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">手</span><div><h3>生活手續</h3><p>區役所、銀行、郵局</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">医</span><div><h3>健康</h3><p>看病、藥局、緊急狀況</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">働</span><div><h3>工作</h3><p>打工、面試、職場溝通</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">敬</span><div><h3>敬語</h3><p>尊敬語、謙讓語、服務業敬語</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">友</span><div><h3>人際社交</h3><p>自我介紹、邀約、婉拒</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">遊</span><div><h3>休閒娛樂</h3><p>動漫、溫泉、演唱會</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">季</span><div><h3>季節文化</h3><p>賞花、祭典、過年</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">心</span><div><h3>情緒表達</h3><p>開心、抱怨、安慰人</p></div></li>
            <li class="hg-card hg-cat" data-rv><span class="hg-cat-glyph" lang="ja">話</span><div><h3>道地口語</h3><p>流行語、相槌、關西腔</p></div></li>
            <li class="hg-card hg-cat hg-cat-more" data-rv><b>13 大類</b><p>從落地第一天到在日本上班，會遇到的場景都排好了。</p></li>
          </ul>
        </div>
      </section>

      <!-- 3. 學習路徑 -->
      <section class="hg-sec hg-sec-white" id="path" data-section="path">
        <div class="hg-wrap hg-path">
          <div>
            <header class="hg-sec-head" data-rv>
              <span class="hg-ja" lang="ja">まなびかた</span>
              <h2>每個主題，四步學到能開口</h2>
              <p>先學會說，再學說得像日本人，接著聽懂對方，最後真的講一次。</p>
            </header>
            <ol class="hg-steps">
              <li class="hg-step" data-rv>
                <h3>基本說法</h3>
                <p>這個場景一定會用到的句子，先把話說出口。</p>
                <span class="hg-ja" lang="ja">これをください。</span>
              </li>
              <li class="hg-step" data-rv>
                <h3>道地說法</h3>
                <p>日本人實際會怎麼講，以及對誰可以這樣講。</p>
                <span class="hg-ja" lang="ja">これ、お願いします。</span>
              </li>
              <li class="hg-step" data-rv>
                <h3>情境練習</h3>
                <p>聽懂對方說的話，選出最自然的回應。</p>
                <span class="hg-ja" lang="ja">「袋はご利用ですか？」</span>
              </li>
              <li class="hg-step hg-step-ai" data-rv>
                <h3>AI 實戰會話</h3>
                <p>AI 扮演店員、房東或面試官，跟你把整段對話走完。</p>
                <span class="hg-ja" lang="ja">いらっしゃいませ。</span>
              </li>
            </ol>
          </div>
          <div class="hg-phone hg-path-phone" data-rv="scale">
            <img src="/images/haogaku-app/screen-lesson.jpg" alt="道地說法課程：そうなんだ、なるほど、確かに的意思與用法差異" width="598" height="1300" loading="lazy">
          </div>
        </div>
      </section>

      <!-- 4. AI 日語教練 -->
      <section class="hg-sec hg-sec-shell" id="coach" data-section="coach">
        <div class="hg-wrap">
          <header class="hg-sec-head" data-rv>
            <span class="hg-ja" lang="ja">AI コーチ</span>
            <h2>AI 日語教練</h2>
            <p>背了很多句子，站到櫃檯前還是說不出口？那就先在這裡講過一次。</p>
          </header>

          <div class="hg-ai-card" data-rv>
            <div>
              <h3>可以開口說，<br>講錯也不尷尬</h3>
              <p>教練會依照主題扮演情境裡的角色跟你對話。什麼時候想練都可以，一句話重講幾次也沒關係。</p>
              <ul class="hg-ai-points">
                <li><svg><use href="#i-role"/></svg><div><b>扮演情境裡的角色</b><span>店員、房東、面試官，跟著你選的主題換。</span></div></li>
                <li><svg><use href="#i-mic"/></svg><div><b>用說的就可以</b><span>語音輸入，不用打字，練的就是開口這件事。</span></div></li>
                <li><svg><use href="#i-sound"/></svg><div><b>回覆會唸給你聽</b><span>自然的雲端語音，語速可以調慢。</span></div></li>
              </ul>
            </div>

            <!-- 對話示意（之後可換成 App 實際會話截圖，建議尺寸 1206×2622） -->
            <div class="hg-chat" data-rv="none" role="img" aria-label="AI 會話示意：在便利商店結帳時，店員詢問便當要不要加熱，以及袋子需要付費">
              <div class="hg-chat-top">
                <b>便利商店結帳</b>
                <span class="hg-tag hg-tag-gold">AI 實戰會話</span>
              </div>
              <p class="hg-chat-who">店員</p>
              <div class="hg-bubble hg-bubble-ai">
                <span class="hg-ja" lang="ja">いらっしゃいませ。お弁当は温めますか？</span>
                <small>歡迎光臨。便當要加熱嗎？</small>
              </div>
              <p class="hg-chat-who hg-me">你</p>
              <div class="hg-bubble hg-bubble-me">
                <span class="hg-ja" lang="ja">はい、お願いします。あと、袋もください。</span>
                <small>好，麻煩你。另外也請給我袋子。</small>
              </div>
              <p class="hg-chat-who">店員</p>
              <div class="hg-bubble hg-bubble-ai">
                <span class="hg-ja" lang="ja">かしこまりました。袋は有料ですが、よろしいですか？</span>
                <small>好的。袋子要收費，可以嗎？</small>
              </div>
              <div class="hg-chat-bar">
                <span class="hg-chat-mic"><svg><use href="#i-mic"/></svg>按一下，用說的<i class="hg-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></i></span>
                <span class="hg-tag">語速 0.8×</span>
              </div>
            </div>
          </div>

          <div class="hg-report">
            <div class="hg-report-text" data-rv>
              <h3>講完之後，有一份會話分析</h3>
              <p>不是只給一個分數。報告會告訴你哪裡講得好、哪裡可以更好，還會把這場會話值得記下來的句子整理給你。</p>
              <ul class="hg-report-list">
                <li class="hg-tag hg-tag-glass">能力分析</li>
                <li class="hg-tag hg-tag-glass">做得好的地方</li>
                <li class="hg-tag hg-tag-glass">可以更好的地方</li>
                <li class="hg-tag hg-tag-glass">這場會話要記的句子</li>
              </ul>
            </div>
            <div class="hg-phone" data-rv="scale">
              <img src="/images/haogaku-app/screen-report.jpg" alt="會話分析報告：總分，以及文法、流暢度、禮貌程度、用詞四項能力分析" width="598" height="1300" loading="lazy">
            </div>
          </div>
        </div>
      </section>

      <!-- 5. 讀物・單字本・五十音・流行語 -->
      <section class="hg-sec hg-sec-gray" id="more" data-section="more">
        <div class="hg-wrap">
          <header class="hg-sec-head" data-rv>
            <span class="hg-ja" lang="ja">まいにち</span>
            <h2>每天打開，都有東西可以看</h2>
            <p>上課之外，還有讀的、背的、寫的。這些全部免費。</p>
          </header>
          <ul class="hg-extras">
            <li class="hg-card hg-extra" data-rv>
              <div class="hg-extra-shot"><img src="/images/haogaku-app/screen-reading.jpg" alt="日文小品〈拉麵店的暗號〉閱讀畫面" style="object-position: 50% 10%" loading="lazy"></div>
              <div class="hg-extra-body">
                <span class="hg-ja" lang="ja">よみもの</span>
                <h3>日文小品</h3>
                <p>41 篇原創讀物，小說、隨筆、文化、時事四類。寫的是現代日本人會寫的文字，每天推薦一篇。</p>
              </div>
            </li>
            <li class="hg-card hg-extra" data-rv>
              <div class="hg-extra-shot"><img src="/images/haogaku-app/screen-vocab.jpg" alt="單字本：自己加單字與收藏的單字列表" style="object-position: 50% 8%" loading="lazy"></div>
              <div class="hg-extra-body">
                <span class="hg-ja" lang="ja">ことば</span>
                <h3>單字本＋間隔複習</h3>
                <p>課程裡的單字一鍵收藏，App 照記憶曲線排複習時間。自己加單字也行，打中文也可以，AI 會補上讀音、意思和例句。</p>
              </div>
            </li>
            <li class="hg-card hg-extra" data-rv>
              <div class="hg-extra-shot"><img src="/images/haogaku-app/screen-kana.jpg" alt="五十音練習：か 的筆順示範" style="object-position: 50% 34%" loading="lazy"></div>
              <div class="hg-extra-body">
                <span class="hg-ja" lang="ja">ごじゅうおん</span>
                <h3>五十音表</h3>
                <p>點了就唸。あ行有筆順和手寫練習，完全沒學過也能從這裡開始。</p>
              </div>
            </li>
            <li class="hg-card hg-extra" data-rv>
              <div class="hg-extra-shot"><img src="/images/haogaku-app/screen-trends.jpg" alt="今日流行語：エモい，很有感覺、很觸動" style="object-position: 50% 76%" loading="lazy"></div>
              <div class="hg-extra-body">
                <span class="hg-ja" lang="ja">はやりことば</span>
                <h3>每日流行語</h3>
                <p>100 個日本年輕人真的在講的詞，每天輪一個，附例句和中文意思。</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- 6. 等級與排行榜 -->
      <section class="hg-sec hg-sec-white" id="level" data-section="level">
        <div class="hg-wrap hg-level-row">
          <header class="hg-sec-head" data-rv>
            <span class="hg-ja" lang="ja">きょうの予定</span>
            <h2>每天都有一點進度感</h2>
            <p>首頁的今日計畫會直接告訴你今天要做的三件事。做完就有 XP，越難的練習給得越多，從 Lv.1 一路升到 Lv.10。想跟別人比一比可以加入排行榜，不想比也完全沒關係。還有每日提醒，幫你記得今天還沒練。</p>
          </header>
          <!-- 示意區塊（之後可換成等級／排行榜截圖，建議尺寸 1206×2622） -->
          <div class="hg-xp" data-rv role="img" aria-label="等級與今日計畫示意：等級 4，今日計畫包含一堂課、複習單字、一場 AI 會話">
            <div class="hg-xp-top"><b>Lv.4</b><span class="hg-tag hg-tag-gold">今日</span></div>
            <div class="hg-xp-bar"><i></i></div>
            <div class="hg-xp-meta"><span>距離 Lv.5</span><span>XP</span></div>
            <ul class="hg-today">
              <li class="hg-done">上一堂課</li>
              <li class="hg-done">複習單字</li>
              <li>一場 AI 會話</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 7. 方案 -->
      <section class="hg-sec hg-sec-cream" id="plans" data-section="plans">
        <div class="hg-wrap">
          <header class="hg-sec-head" data-rv>
            <span class="hg-ja" lang="ja">プラン</span>
            <h2>課程全部免費</h2>
            <p>付費買的只有 AI 會話和雲端語音的用量。想多練口說的時候再升級就好。</p>
          </header>

          <div class="hg-free-banner" data-rv>
            <h3>三種方案都包含全部內容</h3>
            <p>83 個主題的所有課程、日文小品、五十音、單字本與複習、排行榜，不管哪個方案都能用。</p>
          </div>

          <div class="hg-plans">
            <article class="hg-card hg-plan" data-rv>
              <h3>免費版</h3>
              <p class="hg-plan-price">免費</p>
              <p class="hg-plan-tagline">先把課程學起來，AI 會話每天也能試幾句。</p>
              <dl>
                <div><dt>課程・讀物・五十音・單字本</dt><dd>全部</dd></div>
                <div><dt>AI 會話</dt><dd>每天 5 次</dd></div>
                <div><dt>雲端朗讀</dt><dd>每月約 100 句</dd></div>
                <div><dt>會話分析</dt><dd>每天 1 份</dd></div>
              </dl>
            </article>

            <article class="hg-card hg-plan hg-plan-std" data-rv>
              <div class="hg-plan-head"><h3>標準版</h3><span class="hg-tag hg-tag-gold">每天練一點</span></div>
              <p class="hg-plan-price">NT$150<small>／月</small></p>
              <p class="hg-plan-tagline">適合每天輕鬆練習對話的人來增加語感</p>
              <dl>
                <div><dt>課程・讀物・五十音・單字本</dt><dd>全部</dd></div>
                <div><dt>AI 會話</dt><dd>每天 60 次<small>約 4〜6 場完整會話</small></dd></div>
                <div><dt>雲端朗讀</dt><dd>每月約 1,330 句</dd></div>
                <div><dt>會話分析</dt><dd>每天 10 份</dd></div>
              </dl>
            </article>

            <article class="hg-card hg-plan hg-plan-pro" data-rv>
              <h3>高級版</h3>
              <p class="hg-plan-price">NT$350<small>／月</small></p>
              <p class="hg-plan-tagline">適合想讓口說語感突飛猛進，提升自己的人</p>
              <dl>
                <div><dt>課程・讀物・五十音・單字本</dt><dd>全部</dd></div>
                <div><dt>AI 會話</dt><dd>每天 150 次<small>約 12 場</small></dd></div>
                <div><dt>雲端朗讀</dt><dd>每月約 3,330 句</dd></div>
                <div><dt>會話分析</dt><dd>每天 20 份</dd></div>
              </dl>
            </article>
          </div>
          <p class="hg-price-note" data-rv>方案為月繳。實際價格以 App Store 顯示為準</p>
        </div>
      </section>

      <!-- 8. FAQ -->
      <section class="hg-sec hg-sec-gray" id="faq" data-section="faq">
        <div class="hg-wrap">
          <header class="hg-sec-head" data-rv>
            <span class="hg-ja" lang="ja">よくある質問</span>
            <h2>常見問題</h2>
          </header>
          <div class="hg-faq">
            <details v-for="(faq, i) in faqs" :key="faq.q" :open="i === 0" data-rv>
              <summary @click="onFaqClick(faq.q, $event)">{{ faq.q }}</summary>
              <p>{{ faq.a }}</p>
            </details>
          </div>
          <nav class="hg-guides" aria-label="日語學習指南" data-rv>
            <h3>日語學習指南</h3>
            <ul>
              <li v-for="g in guides" :key="g.path"><NuxtLink :to="localePath(g.path)">{{ g.title }}</NuxtLink></li>
            </ul>
          </nav>
        </div>
      </section>

      <!-- 9. 結尾 CTA 與 Footer -->
      <footer class="hg-sec hg-sec-shell hg-end" data-section="final_cta">
        <div class="hg-wrap">
          <div ref="endCard" class="hg-end-card" data-rv data-place="final_cta">
            <img src="/images/haogaku-logo.svg" alt="" width="72" height="72" loading="lazy">
            <h2>去日本之前，先練過一次</h2>
            <p>課程全部免費，下載就能開始。</p>
            <div class="hg-hero-cta">
              <a class="hg-btn hg-btn-white" :href="storeHref" target="_blank" rel="noopener">
                <svg><use href="#i-down"/></svg>App Store 免費下載
              </a>
              <a class="hg-btn hg-btn-ghost" href="https://line.me/R/ti/p/@forma_global" target="_blank" rel="noopener">
                <svg><use href="#i-chat"/></svg>加 LINE 諮詢
              </a>
            </div>
          </div>

          <div class="hg-links" data-place="footer_links">
            <a class="hg-link-card" data-rv href="https://line.me/R/ti/p/@forma_global" target="_blank" rel="noopener">
              <svg><use href="#i-chat"/></svg>
              <div><b>LINE 官方帳號</b><span>問課程、問留學，真人回覆</span></div>
            </a>
            <a class="hg-link-card" data-rv href="https://www.instagram.com/haogaku_japanese_agency/" target="_blank" rel="noopener">
              <svg><use href="#i-photo"/></svg>
              <div><b>Instagram</b><span>每日一句、日本生活與學員心得</span></div>
            </a>
            <NuxtLink class="hg-link-card" data-rv :to="localePath('/study')">
              <svg><use href="#i-globe"/></svg>
              <div><b>皓學官網</b><span>實體課程、師資與留學代辦</span></div>
            </NuxtLink>
          </div>

          <div class="hg-legal">
            <span>© 皓學 Haogaku・Forma Global</span>
            <nav aria-label="法務連結">
              <NuxtLink :to="localePath('/')">官網首頁</NuxtLink>
              <NuxtLink :to="localePath('/study/terms')">服務條款</NuxtLink>
              <NuxtLink :to="localePath('/study/privacy')">隱私權政策</NuxtLink>
              <NuxtLink :to="localePath('/study/support')">技術支援</NuxtLink>
            </nav>
          </div>
        </div>
      </footer>
    </main>

    <!-- 手機底部下載列：滑過 Hero 的按鈕後才出現 -->
    <div class="hg-dock" data-place="sticky_dock" :class="{ 'hg-show': dockVisible }" :aria-hidden="!dockVisible">
      <div class="hg-dock-brand">
        <img src="/images/haogaku-logo.svg" alt="" width="38" height="38">
        <div><b>皓學日語</b><span>課程全部免費</span></div>
      </div>
      <a class="hg-btn hg-btn-wine hg-btn-sm" :tabindex="dockVisible ? 0 : -1" :href="storeHref" target="_blank" rel="noopener">下載 App</a>
    </div>
  </div>
</template>

<style>
/* 皓學日語 App 宣傳頁
   設計語言照 App 本身：大圓角、殼層堆疊、粗標題、一區只鋪一塊飽和色。 */

.hg-app {
  --wine: #8A2432;
  --shell: #2B1017;
  --cream: #F8F3EA;
  --gray: #F3F0EC;
  --white: #FFFFFF;
  --gold: #D9A441;
  --ink: #141012;
  --sub: #6F6568;

  --r-card: 28px;
  --r-inner: 24px;
  --pill: 999px;
  --shadow: 0 10px 30px rgba(43, 16, 23, 0.08), 0 2px 6px rgba(43, 16, 23, 0.04);
  --shadow-lift: 0 24px 60px rgba(43, 16, 23, 0.28);

  --sans: -apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
  --serif: "Noto Serif JP", "Noto Serif TC", "Hiragino Mincho ProN", "Songti TC", serif;
}

.hg-app *, .hg-app *::before, .hg-app *::after { box-sizing: border-box; }


.hg-app {
  margin: 0;
  background: var(--shell);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

/* 官網全域樣式會替標題和段落指定顏色與字體，這裡改回跟著所在的卡片走 */
.hg-app h1, .hg-app h2, .hg-app h3, .hg-app p, .hg-app li, .hg-app dt, .hg-app dd,
.hg-app span, .hg-app b, .hg-app strong, .hg-app small, .hg-app summary {
  color: inherit; font-family: inherit;
}

.hg-app img { display: block; max-width: 100%; }
.hg-app a { color: inherit; text-decoration: none; }
.hg-app h1, .hg-app h2, .hg-app h3, .hg-app p, .hg-app ul, .hg-app ol, .hg-app dl, .hg-app dd, .hg-app figure { margin: 0; padding: 0; }
.hg-app ul, .hg-app ol { list-style: none; }

.hg-app h1, .hg-app h2, .hg-app h3 { font-weight: 800; letter-spacing: -0.3px; line-height: 1.3; text-wrap: balance; }

/* 日文內容一律明體 */
.hg-app .hg-ja, .hg-app [lang="ja"] { font-family: var(--serif); font-weight: 500; letter-spacing: 0.02em; }

.hg-app .hg-wrap { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 20px; }

.hg-app :focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; border-radius: 12px; }

/* ── 按鈕：一律膠囊 ── */
.hg-app .hg-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  min-height: 54px; padding: 0 26px;
  border-radius: var(--pill);
  font-weight: 800; font-size: 16px; letter-spacing: -0.2px;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;
  white-space: nowrap;
}
.hg-app .hg-btn:hover { transform: translateY(-2px); }
.hg-app .hg-btn:active { transform: translateY(0); }
.hg-app .hg-btn svg { width: 20px; height: 20px; flex: none; }
.hg-app .hg-btn-white { background: var(--white); color: var(--wine); box-shadow: 0 8px 22px rgba(20, 16, 18, 0.22); }
.hg-app .hg-btn-wine { background: var(--wine); color: var(--white); box-shadow: 0 8px 22px rgba(138, 36, 50, 0.3); }
.hg-app .hg-btn-ghost { background: rgba(255, 255, 255, 0.14); color: var(--white); }
.hg-app .hg-btn-ghost:hover { background: rgba(255, 255, 255, 0.22); }
.hg-app .hg-btn-soft { background: var(--gray); color: var(--ink); }
.hg-app .hg-btn-sm { min-height: 42px; padding: 0 18px; font-size: 14px; }

.hg-app .hg-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 5px 13px; border-radius: var(--pill);
  font-size: 13px; font-weight: 700; line-height: 1.5;
  background: var(--gray); color: var(--sub);
}
.hg-app .hg-tag-gold { background: var(--gold); color: var(--ink); }
.hg-app .hg-tag-glass { background: rgba(255, 255, 255, 0.16); color: var(--white); }

/* ── 頂部導覽 ── */
.hg-app .hg-nav { padding: 14px 0 12px; }
.hg-app .hg-nav .hg-wrap { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hg-app .hg-brand { display: flex; align-items: center; gap: 10px; color: var(--white); }
.hg-app .hg-brand img { width: 42px; height: 42px; border-radius: 50%; }
.hg-app .hg-brand b { display: block; font-family: var(--serif); font-weight: 700; font-size: 19px; letter-spacing: 0.06em; line-height: 1.2; }
.hg-app .hg-brand small { display: block; font-family: var(--serif); font-size: 11px; letter-spacing: 0.22em; color: rgba(255, 255, 255, 0.55); line-height: 1.2; }
.hg-app .hg-nav-links { display: none; gap: 26px; color: rgba(255, 255, 255, 0.78); font-size: 15px; font-weight: 600; }
.hg-app .hg-nav-links a:hover { color: var(--white); }

/* ── Hero：深殼 → 酒紅大卡 → 白面板 ── */
.hg-app .hg-hero { padding: 0 12px 56px; }
.hg-app .hg-hero-card {
  position: relative; overflow: hidden;
  max-width: 1120px; margin: 0 auto;
  background: var(--wine); color: var(--white);
  border-radius: var(--r-card);
  padding: 34px 22px 0;
}
.hg-app .hg-hero-eyebrow { color: rgba(255, 255, 255, 0.72); font-size: 15px; }
.hg-app .hg-hero h1 { font-size: clamp(36px, 10.4vw, 62px); line-height: 1.18; margin: 10px 0 8px; }
.hg-app .hg-hero h1 span { display: block; }
.hg-app .hg-hero-ja { font-size: 16px; color: rgba(255, 255, 255, 0.72); }
.hg-app .hg-hero-lead { margin-top: 18px; font-size: 17px; color: rgba(255, 255, 255, 0.9); max-width: 30em; }
.hg-app .hg-hero-cta { display: flex; flex-direction: column; gap: 12px; margin-top: 26px; }
.hg-app .hg-hero-note { margin-top: 14px; font-size: 13px; color: rgba(255, 255, 255, 0.66); }

.hg-app .hg-phone {
  position: relative;
  aspect-ratio: 598 / 1300;
  border-radius: 10.5% / 4.85%;
  overflow: hidden;
  background: var(--ink);
  box-shadow: 0 0 0 7px #1c1215, var(--shadow-lift);
}
.hg-app .hg-phone img { width: 100%; height: 100%; object-fit: cover; }

.hg-app .hg-hero-phone { width: min(68%, 290px); margin: 36px auto -34%; }

.hg-app .hg-hero-stats {
  position: relative; z-index: 2;
  margin: 0 -22px;
  background: var(--white); color: var(--ink);
  border-radius: var(--r-card) var(--r-card) 0 0;
  padding: 24px 14px 26px;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
  text-align: center;
}
.hg-app .hg-hero-stats b { display: block; font-size: 30px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; color: var(--wine); }
.hg-app .hg-hero-stats span { display: block; font-size: 13px; color: var(--sub); line-height: 1.5; }

/* ── 區段：大圓角一層一層往上疊 ── */
.hg-app .hg-sec {
  position: relative;
  border-radius: var(--r-card) var(--r-card) 0 0;
  margin-top: -28px;
  padding: 60px 0 92px;
}
.hg-app .hg-sec-cream { background: var(--cream); }
.hg-app .hg-sec-white { background: var(--white); }
.hg-app .hg-sec-gray { background: var(--gray); }
.hg-app .hg-sec-shell { background: var(--shell); color: var(--white); }

.hg-app .hg-sec-head { margin-bottom: 30px; }
.hg-app .hg-sec-head .hg-ja { display: block; font-size: 14px; color: var(--sub); margin-bottom: 2px; }
.hg-app .hg-sec-head h2 { font-size: clamp(28px, 7.4vw, 42px); }
.hg-app .hg-sec-head p { margin-top: 12px; color: var(--sub); max-width: 36em; }
.hg-app .hg-sec-shell .hg-sec-head .hg-ja, .hg-app .hg-sec-shell .hg-sec-head p { color: rgba(255, 255, 255, 0.66); }

.hg-app .hg-card { background: var(--white); border-radius: var(--r-card); box-shadow: var(--shadow); }

/* ── 情境主題 ── */
.hg-app .hg-levels {
  background: var(--wine); color: var(--white);
  border-radius: var(--r-card);
  padding: 28px 22px 0;
  overflow: hidden;
  display: grid; gap: 26px;
  margin-bottom: 18px;
}
.hg-app .hg-levels h3 { font-size: 24px; }
.hg-app .hg-levels p { margin-top: 10px; color: rgba(255, 255, 255, 0.86); }
.hg-app .hg-level-pills { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
.hg-app .hg-level-pill { background: rgba(255, 255, 255, 0.13); border-radius: var(--r-inner); padding: 16px 18px; }
.hg-app .hg-level-pill b { display: block; font-size: 19px; font-weight: 800; }
.hg-app .hg-level-pill span { display: block; font-size: 13px; color: rgba(255, 255, 255, 0.76); line-height: 1.5; }
.hg-app .hg-level-pill strong { display: block; margin-top: 8px; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.2; }
.hg-app .hg-level-pill strong small { font-size: 14px; font-weight: 700; margin-left: 3px; }
.hg-app .hg-levels .hg-phone { width: min(64%, 260px); margin: 0 auto -44%; }

.hg-app .hg-cats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.hg-app .hg-cat { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
.hg-app .hg-cat-glyph {
  width: 48px; height: 48px; flex: none;
  display: grid; place-items: center;
  border-radius: 16px;
  background: var(--gray); color: var(--wine);
  font-family: var(--serif); font-weight: 700; font-size: 24px; line-height: 1;
}
.hg-app .hg-cat h3 { font-size: 17px; }
.hg-app .hg-cat p { font-size: 13.5px; color: var(--sub); line-height: 1.55; margin-top: 2px; }
.hg-app .hg-cat-more { background: var(--shell); color: var(--white); justify-content: center; box-shadow: none; }
.hg-app .hg-cat-more b { font-size: 34px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.1; color: var(--gold); }
.hg-app .hg-cat-more p { color: rgba(255, 255, 255, 0.76); }

/* ── 學習路徑 ── */
.hg-app .hg-path { display: grid; gap: 28px; }
.hg-app .hg-steps { display: grid; gap: 12px; counter-reset: step; }
.hg-app .hg-step {
  position: relative;
  background: var(--gray); border-radius: var(--r-card);
  padding: 22px 22px 22px 78px;
}
.hg-app .hg-step::before {
  counter-increment: step; content: counter(step);
  position: absolute; left: 20px; top: 22px;
  width: 42px; height: 42px; border-radius: 50%;
  display: grid; place-items: center;
  background: var(--white); color: var(--wine);
  font-family: var(--serif); font-weight: 700; font-size: 19px;
  box-shadow: var(--shadow);
}
.hg-app .hg-step h3 { font-size: 19px; }
.hg-app .hg-step p { font-size: 15px; color: var(--sub); margin-top: 4px; }
.hg-app .hg-step .hg-ja { display: block; margin-top: 10px; font-size: 16px; color: var(--ink); }
.hg-app .hg-step-ai { background: var(--wine); color: var(--white); }
.hg-app .hg-step-ai p { color: rgba(255, 255, 255, 0.86); }
.hg-app .hg-step-ai .hg-ja { color: var(--white); }
.hg-app .hg-path-phone { display: none; }

/* ── AI 日語教練 ── */
.hg-app .hg-ai-card {
  background: var(--wine); color: var(--white);
  border-radius: var(--r-card);
  padding: 30px 22px 0;
  overflow: hidden;
}
.hg-app .hg-ai-card h3 { font-size: clamp(26px, 6.8vw, 36px); }
.hg-app .hg-ai-card > div > p { margin-top: 12px; color: rgba(255, 255, 255, 0.88); }
.hg-app .hg-ai-points { display: grid; gap: 12px; margin-top: 22px; }
.hg-app .hg-ai-points li { display: flex; gap: 12px; align-items: flex-start; }
.hg-app .hg-ai-points svg { width: 26px; height: 26px; flex: none; margin-top: 2px; }
.hg-app .hg-ai-points b { display: block; font-weight: 800; }
.hg-app .hg-ai-points span { display: block; font-size: 14.5px; color: rgba(255, 255, 255, 0.8); line-height: 1.6; }

.hg-app .hg-chat {
  margin: 30px -22px 0;
  background: var(--white); color: var(--ink);
  border-radius: var(--r-card) var(--r-card) 0 0;
  padding: 22px 18px 26px;
}
.hg-app .hg-chat-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 18px; }
.hg-app .hg-chat-top b { font-size: 15px; font-weight: 800; }
.hg-app .hg-bubble { max-width: 86%; padding: 12px 16px; border-radius: 22px; margin-top: 10px; }
.hg-app .hg-bubble .hg-ja { display: block; font-size: 16.5px; line-height: 1.65; }
.hg-app .hg-bubble small { display: block; margin-top: 4px; font-size: 12.5px; color: var(--sub); line-height: 1.5; }
.hg-app .hg-bubble-ai { background: var(--gray); border-bottom-left-radius: 8px; }
.hg-app .hg-bubble-me { background: var(--shell); color: var(--white); margin-left: auto; border-bottom-right-radius: 8px; }
.hg-app .hg-bubble-me small { color: rgba(255, 255, 255, 0.66); }
.hg-app .hg-chat-who { font-size: 12px; font-weight: 700; color: var(--sub); margin-top: 14px; }
.hg-app .hg-chat-who.hg-me { text-align: right; }
.hg-app .hg-chat-bar { display: flex; align-items: center; gap: 10px; margin-top: 20px; }
.hg-app .hg-chat-mic {
  flex: 1; min-height: 50px; border-radius: var(--pill);
  background: var(--gray); color: var(--ink);
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-weight: 800; font-size: 15px;
}
.hg-app .hg-chat-mic svg { width: 20px; height: 20px; color: var(--wine); }

.hg-app .hg-report { display: grid; gap: 24px; margin-top: 18px; align-items: center; }
.hg-app .hg-report-text {
  background: rgba(255, 255, 255, 0.07);
  border-radius: var(--r-card);
  padding: 26px 22px;
}
.hg-app .hg-report-text h3 { font-size: 24px; }
.hg-app .hg-report-text p { margin-top: 10px; color: rgba(255, 255, 255, 0.78); }
.hg-app .hg-report-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.hg-app .hg-report .hg-phone { width: min(66%, 270px); margin: 0 auto; }

/* ── 四張小卡 ── */
.hg-app .hg-extras { display: grid; gap: 14px; }
.hg-app .hg-extra { overflow: hidden; display: flex; flex-direction: column; }
.hg-app .hg-extra-shot { margin: 10px 10px 0; border-radius: var(--r-inner); overflow: hidden; aspect-ratio: 4 / 3; background: var(--gray); }
.hg-app .hg-extra-shot img { width: 100%; height: 100%; object-fit: cover; }
.hg-app .hg-extra-body { padding: 18px 20px 24px; }
.hg-app .hg-extra-body .hg-ja { display: block; font-size: 13px; color: var(--sub); }
.hg-app .hg-extra-body h3 { font-size: 21px; }
.hg-app .hg-extra-body p { margin-top: 8px; font-size: 15px; color: var(--sub); }

/* ── 等級與排行榜 ── */
.hg-app .hg-level-row { display: grid; gap: 22px; align-items: center; }
.hg-app .hg-xp {
  background: var(--shell); color: var(--white);
  border-radius: var(--r-card);
  padding: 24px 22px;
}
.hg-app .hg-xp-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hg-app .hg-xp-top b { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
.hg-app .hg-xp-bar { height: 12px; border-radius: var(--pill); background: rgba(255, 255, 255, 0.14); margin-top: 16px; overflow: hidden; }
.hg-app .hg-xp-bar i { display: block; width: 62%; height: 100%; border-radius: var(--pill); background: var(--gold); }
.hg-app .hg-xp-meta { display: flex; justify-content: space-between; margin-top: 8px; font-size: 13px; color: rgba(255, 255, 255, 0.66); }
.hg-app .hg-today { margin-top: 20px; display: grid; gap: 8px; }
.hg-app .hg-today li {
  display: flex; align-items: center; gap: 12px;
  background: rgba(255, 255, 255, 0.08); border-radius: var(--pill);
  padding: 10px 16px; font-size: 15px; font-weight: 600;
}
.hg-app .hg-today li::before { content: ""; width: 18px; height: 18px; flex: none; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.5); }
.hg-app .hg-today li.hg-done::before { background: var(--gold); border-color: var(--gold); }

/* ── 方案 ── */
.hg-app .hg-free-banner {
  background: var(--white); border-radius: var(--r-card); box-shadow: var(--shadow);
  padding: 22px; margin-bottom: 14px;
}
.hg-app .hg-free-banner h3 { font-size: 20px; }
.hg-app .hg-free-banner p { margin-top: 6px; color: var(--sub); font-size: 15px; }
.hg-app .hg-plans { display: grid; gap: 14px; }
.hg-app .hg-plan { padding: 26px 22px; display: flex; flex-direction: column; }
.hg-app .hg-plan h3 { font-size: 20px; }
.hg-app .hg-plan-price { margin-top: 8px; font-size: 38px; font-weight: 800; letter-spacing: -1px; line-height: 1.2; }
.hg-app .hg-plan-price small { font-size: 15px; font-weight: 700; letter-spacing: 0; margin-left: 4px; }
.hg-app .hg-plan-tagline { margin-top: 8px; font-size: 14.5px; color: var(--sub); min-height: 3.2em; }
.hg-app .hg-plan dl { margin-top: 18px; display: grid; gap: 8px; }
.hg-app .hg-plan dl > div {
  display: flex; justify-content: space-between; align-items: baseline; gap: 14px;
  background: var(--gray); border-radius: 18px; padding: 11px 16px;
}
.hg-app .hg-plan dt { font-size: 14px; color: var(--sub); flex: none; }
.hg-app .hg-plan dd { font-weight: 800; font-size: 15px; text-align: right; line-height: 1.45; }
.hg-app .hg-plan dd small { display: block; font-weight: 500; font-size: 12px; color: var(--sub); }
.hg-app .hg-plan-std { background: var(--wine); color: var(--white); box-shadow: 0 18px 44px rgba(138, 36, 50, 0.3); }
.hg-app .hg-plan-pro { background: var(--shell); color: var(--white); }
.hg-app .hg-plan-std .hg-plan-tagline, .hg-app .hg-plan-pro .hg-plan-tagline { color: rgba(255, 255, 255, 0.8); }
.hg-app .hg-plan-std dl > div, .hg-app .hg-plan-pro dl > div { background: rgba(255, 255, 255, 0.11); }
.hg-app .hg-plan-std dt, .hg-app .hg-plan-pro dt, .hg-app .hg-plan-std dd small, .hg-app .hg-plan-pro dd small { color: rgba(255, 255, 255, 0.72); }
.hg-app .hg-plan-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hg-app .hg-price-note { margin-top: 18px; font-size: 13px; color: var(--sub); text-align: center; }

/* ── FAQ ── */
.hg-app .hg-faq { display: grid; gap: 12px; max-width: 800px; }
/* 延伸閱讀：放在 FAQ 底下的一般文字連結，視覺上要比 FAQ 卡片輕，不搶下載按鈕 */
.hg-app .hg-guides { max-width: 800px; margin-top: 36px; }
.hg-app .hg-guides h3 { font-weight: 800; font-size: 17px; letter-spacing: -0.2px; margin: 0 0 12px; }
.hg-app .hg-guides ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.hg-app .hg-guides a { color: var(--wine); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; overflow-wrap: anywhere; }
.hg-app .hg-faq details { background: var(--white); border-radius: var(--r-card); box-shadow: var(--shadow); }
.hg-app .hg-faq summary {
  list-style: none; cursor: pointer;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 20px 22px; font-weight: 800; font-size: 17px; letter-spacing: -0.2px;
  border-radius: var(--r-card);
}
.hg-app .hg-faq summary::-webkit-details-marker { display: none; }
.hg-app .hg-faq summary::after {
  content: ""; flex: none; width: 34px; height: 34px; border-radius: 50%;
  background: var(--gray) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238A2432' stroke-width='2.6' stroke-linecap='round'%3E%3Cpath d='M12 6v12M6 12h12'/%3E%3C/svg%3E") center / 16px no-repeat;
  transition: transform 0.2s ease;
}
.hg-app .hg-faq details[open] summary::after { transform: rotate(45deg); }
.hg-app .hg-faq details p { padding: 0 22px 22px; color: var(--sub); }

/* ── 結尾 CTA 與 Footer ── */
.hg-app .hg-end { padding-bottom: 60px; }
.hg-app .hg-end-card {
  background: var(--wine); color: var(--white);
  border-radius: var(--r-card);
  padding: 36px 22px; text-align: center;
}
.hg-app .hg-end-card img { width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 16px; }
.hg-app .hg-end-card h2 { font-size: clamp(28px, 7.6vw, 42px); }
.hg-app .hg-end-card p { margin: 10px auto 0; color: rgba(255, 255, 255, 0.86); max-width: 28em; }
.hg-app .hg-end-card .hg-hero-cta { align-items: stretch; max-width: 420px; margin-left: auto; margin-right: auto; }

.hg-app .hg-links { display: grid; gap: 12px; margin-top: 16px; }
.hg-app .hg-link-card {
  display: flex; align-items: center; gap: 14px;
  background: rgba(255, 255, 255, 0.07); border-radius: var(--r-card);
  padding: 18px 20px;
  transition: background-color 0.15s ease;
}
.hg-app .hg-link-card:hover { background: rgba(255, 255, 255, 0.12); }
.hg-app .hg-link-card svg { width: 26px; height: 26px; flex: none; color: var(--gold); }
.hg-app .hg-link-card b { display: block; font-weight: 800; }
.hg-app .hg-link-card span { display: block; font-size: 13.5px; color: rgba(255, 255, 255, 0.66); line-height: 1.5; }

.hg-app .hg-legal {
  margin-top: 34px; padding-bottom: 90px;
  display: flex; flex-direction: column; gap: 14px;
  font-size: 13.5px; color: rgba(255, 255, 255, 0.6);
}
.hg-app .hg-legal nav { display: flex; flex-wrap: wrap; gap: 8px 20px; }
.hg-app .hg-legal a:hover { color: var(--white); }

/* ── 手機底部下載列 ── */
.hg-app .hg-dock {
  position: fixed; left: 12px; right: 12px; bottom: calc(12px + env(safe-area-inset-bottom));
  z-index: 20;
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  background: var(--white); border-radius: var(--pill);
  padding: 8px 8px 8px 12px;
  box-shadow: 0 14px 40px rgba(20, 16, 18, 0.3);
  transform: translateY(160%); transition: transform 0.3s ease;
}
.hg-app .hg-dock.hg-show { transform: none; }
.hg-app .hg-dock-brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
.hg-app .hg-dock-brand img { width: 38px; height: 38px; border-radius: 50%; flex: none; }
.hg-app .hg-dock-brand b { display: block; font-weight: 800; font-size: 15px; line-height: 1.3; }
.hg-app .hg-dock-brand span { display: block; font-size: 12px; color: var(--sub); line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ── 平板以上 ── */
@media (min-width: 640px) {
  .hg-app .hg-hero-cta { flex-direction: row; flex-wrap: wrap; }
  .hg-app .hg-cats { grid-template-columns: repeat(3, 1fr); }
  .hg-app .hg-extras { grid-template-columns: repeat(2, 1fr); }
  .hg-app .hg-links { grid-template-columns: repeat(3, 1fr); }
  .hg-app .hg-end-card .hg-hero-cta { justify-content: center; max-width: none; }
  .hg-app .hg-legal { flex-direction: row; justify-content: space-between; align-items: center; }
}

@media (min-width: 900px) {
  .hg-app .hg-wrap { padding: 0 32px; }
  .hg-app .hg-nav-links { display: flex; }
  .hg-app .hg-hero { padding: 0 24px 80px; }
  .hg-app .hg-hero-card {
    padding: 64px 56px 0;
    display: grid; grid-template-columns: 1.15fr 0.85fr; column-gap: 40px;
    grid-template-areas: "text phone" "stats stats";
  }
  .hg-app .hg-hero-text { grid-area: text; padding-bottom: 64px; align-self: center; }
  .hg-app .hg-hero-phone { grid-area: phone; width: 300px; margin: 0 auto -150px; }
  .hg-app .hg-hero-stats { grid-area: stats; margin: 0 -56px; padding: 30px 56px 34px; }
  .hg-app .hg-hero-stats b { font-size: 40px; }
  .hg-app .hg-hero-stats span { font-size: 15px; }

  .hg-app .hg-sec { padding: 88px 0 120px; }
  .hg-app .hg-sec-head { margin-bottom: 40px; }

  .hg-app .hg-levels { grid-template-columns: 1.2fr 0.8fr; padding: 48px 48px 0; align-items: start; gap: 40px; }
  .hg-app .hg-levels > div:first-child { padding-bottom: 48px; }
  .hg-app .hg-levels h3 { font-size: 30px; }
  .hg-app .hg-levels .hg-phone { width: 260px; margin: 0 auto -230px; }
  .hg-app .hg-cats { grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .hg-app .hg-cat { padding: 20px; }

  .hg-app .hg-path { grid-template-columns: 1.25fr 0.75fr; gap: 56px; align-items: center; }
  .hg-app .hg-path-phone { display: block; width: 280px; margin: 0 auto; }

  .hg-app .hg-ai-card { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 56px 56px 0; align-items: end; }
  .hg-app .hg-ai-card > div:first-child { padding-bottom: 56px; align-self: center; }
  .hg-app .hg-chat { margin: 0; padding: 26px 26px 34px; }
  .hg-app .hg-report { grid-template-columns: 1fr 1fr; gap: 48px; margin-top: 24px; }
  .hg-app .hg-report-text { padding: 48px; }
  .hg-app .hg-report .hg-phone { width: 280px; }

  .hg-app .hg-extras { grid-template-columns: repeat(4, 1fr); }
  .hg-app .hg-level-row { grid-template-columns: 1fr 1fr; gap: 56px; }
  .hg-app .hg-level-row .hg-sec-head { margin-bottom: 0; }
  .hg-app .hg-plans { grid-template-columns: repeat(3, 1fr); align-items: stretch; }
  .hg-app .hg-free-banner { padding: 28px 32px; }
  .hg-app .hg-end-card { padding: 64px 40px; }
  .hg-app .hg-dock { display: none; }
  .hg-app .hg-legal { padding-bottom: 40px; }
}

@media (prefers-reduced-motion: reduce) {
    .hg-app .hg-btn, .hg-app .hg-dock, .hg-app .hg-faq summary::after { transition: none; }
}

/* 「13 大類」那格在寬螢幕補滿整列 */
@media (min-width: 640px) { .hg-app .hg-cat-more { grid-column: span 2; } }
@media (min-width: 900px) { .hg-app .hg-cat-more { grid-column: span 3; } }

/* ================= 視覺加強與動畫 ================= */

/* ── 導覽：捲動時貼在頂端 ── */
.hg-app .hg-nav {
  position: sticky; top: 0; z-index: 30;
  background: rgba(43, 16, 23, 0.82);
  -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
}

/* ── Hero：青海波紋樣（App 首頁暖簾上的那個花紋）＋手機後面的光暈 ── */
.hg-app .hg-hero-card::before, .hg-app .hg-end-card::before, .hg-app .hg-ai-card::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30' viewBox='0 0 60 30'%3E%3Cg fill='%238A2432' stroke='%23fff' stroke-opacity='.13' stroke-width='1.2'%3E%3Ccircle cx='30' cy='-15' r='30'/%3E%3Ccircle cx='30' cy='-15' r='22'/%3E%3Ccircle cx='30' cy='-15' r='14'/%3E%3Ccircle cx='30' cy='-15' r='6'/%3E%3Ccircle cx='0' cy='0' r='30'/%3E%3Ccircle cx='0' cy='0' r='22'/%3E%3Ccircle cx='0' cy='0' r='14'/%3E%3Ccircle cx='0' cy='0' r='6'/%3E%3Ccircle cx='60' cy='0' r='30'/%3E%3Ccircle cx='60' cy='0' r='22'/%3E%3Ccircle cx='60' cy='0' r='14'/%3E%3Ccircle cx='60' cy='0' r='6'/%3E%3Ccircle cx='30' cy='15' r='30'/%3E%3Ccircle cx='30' cy='15' r='22'/%3E%3Ccircle cx='30' cy='15' r='14'/%3E%3Ccircle cx='30' cy='15' r='6'/%3E%3Ccircle cx='0' cy='30' r='30'/%3E%3Ccircle cx='0' cy='30' r='22'/%3E%3Ccircle cx='0' cy='30' r='14'/%3E%3Ccircle cx='0' cy='30' r='6'/%3E%3Ccircle cx='60' cy='30' r='30'/%3E%3Ccircle cx='60' cy='30' r='22'/%3E%3Ccircle cx='60' cy='30' r='14'/%3E%3Ccircle cx='60' cy='30' r='6'/%3E%3Ccircle cx='30' cy='45' r='30'/%3E%3Ccircle cx='30' cy='45' r='22'/%3E%3Ccircle cx='30' cy='45' r='14'/%3E%3Ccircle cx='30' cy='45' r='6'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 30px;
  -webkit-mask-image: radial-gradient(120% 90% at 100% 0%, #000 0%, transparent 62%);
  mask-image: radial-gradient(120% 90% at 100% 0%, #000 0%, transparent 62%);
}
.hg-app .hg-end-card, .hg-app .hg-ai-card { position: relative; overflow: hidden; }
.hg-app .hg-end-card > *, .hg-app .hg-ai-card > * { position: relative; }
.hg-app .hg-hero-text { position: relative; z-index: 1; }

.hg-app .hg-hero-visual {
  position: relative; z-index: 1;
  width: min(68%, 290px); margin: 40px auto -34%;
  animation: hg-rise 1s cubic-bezier(0.2, 0.7, 0.2, 1) 0.25s both;
}
.hg-app .hg-hero-visual::before {
  content: ""; position: absolute; left: 50%; top: 4%;
  width: 190%; aspect-ratio: 1; transform: translateX(-50%);
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}
.hg-app .hg-hero-visual .hg-phone { animation: hg-float 7s ease-in-out 1.2s infinite; }

.hg-app .hg-chip {
  position: absolute; z-index: 2;
  display: flex; align-items: center; gap: 8px;
  padding: 9px 14px 9px 10px; border-radius: var(--pill);
  background: var(--white); color: var(--ink);
  font-size: 13.5px; font-weight: 800; white-space: nowrap; line-height: 1.4;
  box-shadow: 0 14px 34px rgba(20, 16, 18, 0.28);
}
.hg-app .hg-chip .hg-ja { font-size: 16px; font-weight: 700; }
.hg-app .hg-chip svg { width: 28px; height: 28px; padding: 5px; border-radius: 50%; background: var(--wine); color: var(--white); flex: none; }
.hg-app .hg-chip-a { left: -20%; top: -3.5%; animation: hg-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.9s both, hg-float 6s ease-in-out 1.7s infinite; }
.hg-app .hg-chip-b { right: -24%; top: 33%; animation: hg-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 1.1s both, hg-float 8s ease-in-out 1.9s infinite reverse; }

.hg-app .hg-live {
  display: inline-flex; align-items: center; gap: 7px;
  margin-right: 10px; padding: 4px 12px 4px 10px; border-radius: var(--pill);
  background: rgba(255, 255, 255, 0.14); color: var(--white);
  font-size: 13px; font-weight: 700; vertical-align: 1px;
}
.hg-app .hg-live i { position: relative; width: 8px; height: 8px; border-radius: 50%; background: var(--gold); }
.hg-app .hg-live i::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%; background: var(--gold);
  animation: hg-ping 2.2s ease-out infinite;
}

/* Hero 文字一行一行浮上來（純 CSS，載入就播） */
.hg-app .hg-hero-text > * { animation: hg-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.hg-app .hg-hero-text > :nth-child(2) { animation-delay: 0.08s; }
.hg-app .hg-hero-text > :nth-child(3) { animation-delay: 0.16s; }
.hg-app .hg-hero-text > :nth-child(4) { animation-delay: 0.24s; }
.hg-app .hg-hero-text > :nth-child(5) { animation-delay: 0.32s; }
.hg-app .hg-hero-text > :nth-child(6) { animation-delay: 0.4s; }
.hg-app .hg-hero-stats { animation: hg-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.5s both; }
.hg-app .hg-hero-stats b { font-variant-numeric: tabular-nums; }

/* ── 跑馬燈 ── */
.hg-app .hg-marquee {
  margin: 30px -12px 0; overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.hg-app .hg-marquee-track { display: flex; width: max-content; animation: hg-marquee 48s linear infinite; }
.hg-app .hg-marquee-track span {
  display: flex; align-items: center;
  font-family: var(--serif); font-weight: 500; font-size: 21px; white-space: nowrap;
  color: rgba(248, 243, 234, 0.34);
}
.hg-app .hg-marquee-track span::after {
  content: ""; width: 6px; height: 6px; margin: 0 26px; border-radius: 50%; background: var(--gold); opacity: 0.7;
}

/* ── 區段標題上的金色小記號 ── */
.hg-app .hg-sec-head::before {
  content: ""; display: block; width: 30px; height: 6px; margin-bottom: 16px;
  border-radius: var(--pill); background: var(--gold);
}

/* ── 卡片的互動 ── */
.hg-app .hg-cat, .hg-app .hg-extra, .hg-app .hg-plan { transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1), box-shadow 0.35s ease, opacity 0.8s ease; }
.hg-app .hg-cat-glyph { transition: background-color 0.3s ease, color 0.3s ease, transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1); }
.hg-app .hg-extra-shot img { transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1); }
@media (hover: hover) {
  .hg-app .hg-cat:not(.hg-cat-more):hover { transform: translateY(-5px); box-shadow: 0 20px 44px rgba(43, 16, 23, 0.14); }
  .hg-app .hg-cat:hover .hg-cat-glyph { background: var(--wine); color: var(--white); transform: rotate(-6deg) scale(1.06); }
  .hg-app .hg-extra:hover { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(43, 16, 23, 0.14); }
  .hg-app .hg-extra:hover .hg-extra-shot img { transform: scale(1.05); }
  .hg-app .hg-btn:hover svg { animation: hg-nudge 0.6s ease; }
}

/* ── 對話示意：泡泡依序出現、麥克風旁的聲波 ── */
.hg-app.hg-js .hg-chat > :not(.hg-chat-top) { opacity: 0; }
.hg-app.hg-js .hg-chat.hg-in > :not(.hg-chat-top) { animation: hg-pop 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.hg-app.hg-js .hg-chat.hg-in > :nth-child(2) { animation-delay: 0.2s; }
.hg-app.hg-js .hg-chat.hg-in > :nth-child(3) { animation-delay: 0.3s; }
.hg-app.hg-js .hg-chat.hg-in > :nth-child(4) { animation-delay: 1.2s; }
.hg-app.hg-js .hg-chat.hg-in > :nth-child(5) { animation-delay: 1.3s; }
.hg-app.hg-js .hg-chat.hg-in > :nth-child(6) { animation-delay: 2.2s; }
.hg-app.hg-js .hg-chat.hg-in > :nth-child(7) { animation-delay: 2.3s; }
.hg-app.hg-js .hg-chat.hg-in > :nth-child(8) { animation-delay: 3s; }
.hg-app .hg-bubble-ai { transform-origin: 0 100%; }
.hg-app .hg-bubble-me { transform-origin: 100% 100%; }

.hg-app .hg-wave { display: inline-flex; align-items: center; gap: 3px; height: 18px; margin-left: 4px; }
.hg-app .hg-wave i { width: 3px; height: 100%; border-radius: var(--pill); background: var(--wine); transform: scaleY(0.3); animation: hg-wave 1.1s ease-in-out infinite; }
.hg-app .hg-wave i:nth-child(2) { animation-delay: 0.12s; }
.hg-app .hg-wave i:nth-child(3) { animation-delay: 0.24s; }
.hg-app .hg-wave i:nth-child(4) { animation-delay: 0.36s; }
.hg-app .hg-wave i:nth-child(5) { animation-delay: 0.48s; }

/* ── 等級卡：進度條長出來 ── */
.hg-app.hg-js .hg-xp .hg-xp-bar i { width: 0; transition: width 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) 0.4s; }
.hg-app.hg-js .hg-xp.hg-in .hg-xp-bar i { width: 62%; }

/* ── 捲動進場 ── */
.hg-app.hg-js [data-rv]:not([data-rv="none"]) {
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--d, 0ms);
}
.hg-app.hg-js [data-rv="scale"] { transform: translateY(30px) scale(0.94); }
.hg-app.hg-js [data-rv].hg-in:not([data-rv="none"]) { opacity: 1; transform: none; }
/* 進場播完後把延遲歸零，hover 才不會慢半拍 */
.hg-app.hg-js .hg-cat.hg-in, .hg-app.hg-js .hg-extra.hg-in, .hg-app.hg-js .hg-plan.hg-in { transition-delay: 0ms; }
.hg-app.hg-js .hg-cat:not(.hg-in), .hg-app.hg-js .hg-extra:not(.hg-in), .hg-app.hg-js .hg-plan:not(.hg-in) { transition-delay: var(--d, 0ms); }

.hg-app .hg-cats > :nth-child(2n), .hg-app .hg-extras > :nth-child(2), .hg-app .hg-steps > :nth-child(2),
.hg-app .hg-plans > :nth-child(2), .hg-app .hg-links > :nth-child(2), .hg-app .hg-faq > :nth-child(2) { --d: 90ms; }
.hg-app .hg-extras > :nth-child(3), .hg-app .hg-steps > :nth-child(3), .hg-app .hg-plans > :nth-child(3),
.hg-app .hg-links > :nth-child(3), .hg-app .hg-faq > :nth-child(3) { --d: 180ms; }
.hg-app .hg-extras > :nth-child(4), .hg-app .hg-steps > :nth-child(4), .hg-app .hg-faq > :nth-child(4) { --d: 270ms; }

@media (min-width: 900px) {
  .hg-app .hg-hero-visual { grid-area: phone; width: 300px; margin: 0 auto -150px; }
  .hg-app .hg-chip { font-size: 14.5px; padding: 11px 18px 11px 12px; }
  .hg-app .hg-chip-a { left: -34%; }
  .hg-app .hg-chip-b { right: -30%; }
  .hg-app .hg-marquee { margin: 44px -24px 0; }
  .hg-app .hg-marquee-track span { font-size: 26px; }
  .hg-app .hg-cats > :nth-child(4n+2) { --d: 80ms; }
  .hg-app .hg-cats > :nth-child(4n+3) { --d: 160ms; }
  .hg-app .hg-cats > :nth-child(4n) { --d: 240ms; }
  /* 標準版是主推方案，桌機上稍微抬高一點 */
  .hg-app .hg-plan-std { position: relative; top: -14px; }
}

@keyframes hg-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: none; } }
@keyframes hg-float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -10px; } }
@keyframes hg-ping { 0% { transform: scale(1); opacity: 0.7; } 80%, 100% { transform: scale(3); opacity: 0; } }
@keyframes hg-marquee { to { transform: translateX(-50%); } }
@keyframes hg-pop { from { opacity: 0; transform: translateY(10px) scale(0.92); } to { opacity: 1; transform: none; } }
@keyframes hg-wave { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
@keyframes hg-nudge { 0%, 100% { transform: none; } 40% { transform: translateY(3px); } }

/* 使用者在系統關掉動態效果時，全部靜止、內容直接顯示 */
@media (prefers-reduced-motion: reduce) {
  .hg-app *, .hg-app *::before, .hg-app *::after { animation: none !important; transition: none !important; }
}

/* ── 回官網首頁 ── */
.hg-app .hg-nav-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
.hg-app .hg-home {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px; flex: none;
  width: 42px; height: 42px; border-radius: var(--pill);
  background: rgba(255, 255, 255, 0.14); color: var(--white);
  font-size: 14px; font-weight: 700; white-space: nowrap;
  transition: background-color 0.15s ease;
}
.hg-app .hg-home:hover { background: rgba(255, 255, 255, 0.24); color: var(--white); }
.hg-app .hg-home svg { width: 20px; height: 20px; flex: none; }
.hg-app .hg-home span { display: none; }
@media (min-width: 640px) {
  .hg-app .hg-home { width: auto; padding: 0 16px 0 13px; }
  .hg-app .hg-home span { display: inline; }
}

/* 這一頁自己有 LINE 諮詢按鈕和底部下載列，官網右下角的浮動 LINE 按鈕會疊在上面，所以在這頁收起來 */
html:has(.hg-app) .fab-stack { display: none; }
</style>
