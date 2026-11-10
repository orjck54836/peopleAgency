<script lang="ts" setup>
/**
 * 網站首頁（/）。
 *
 * 原本這一頁只是依 cookie 把訪客 302 轉到 /study 或 /work，
 * 等於整個站最有權重的網址沒有任何內容：品牌字（皓學、FORMA、
 * 新福爾摩沙國際）與「日本留學代辦」這類大詞沒有頁面可以承接，
 * 外部連結進來的權重也無處累積。
 *
 * 這一頁改成真正的入口頁：說明公司是誰、兩條服務線分別是什麼、
 * 怎麼進行，並把連結分配到各個主要頁面與最新文章。
 */
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const swiperModules = [Navigation, Pagination, Autoplay]

const navOpen = ref(false)
const toggleNav = () => { navOpen.value = !navOpen.value }

const localePath = useLocalePath()
const { t, tm, rt } = useI18n()

// 首頁同時代表兩條線，視覺上固定用留學線的色票（酒紅），
// 工作線的卡片在卡片層級自己套 .line-work 取得深藍色票。
const lineCookie = useCookie<'study' | 'work'>('forma-line', { default: () => 'study' })
function rememberLine(line: 'study' | 'work') {
  lineCookie.value = line
}

// ── 最新情報：兩條線各取最新幾篇，首頁直接連到文章 ──
const { data: latestArticles } = await useAsyncData('home-latest', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/information/%')
    // 只取卡片需要的欄位：不 select 的話整篇文章內文都會被塞進頁面 payload
    .select('path', 'title', 'description', 'date', 'cover')
    .all()
)

function toPagePath(contentPath: string): string {
  const path = contentPath
    .replace('/information/study/', '/study/information/')
    .replace('/information/work/', '/work/information/')
  return localePath(path)
}

const newsItems = computed(() => {
  const list = (latestArticles.value ?? []) as any[]
  return list
    // 排除帶語言後綴的重複檔（foo.ja.md / foo.en.md）
    .filter((a) => !/\.(ja|en)$/.test(String(a.path ?? '')))
    .filter((a) => a.title && a.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
})

function formatDate(d?: string | null) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return String(d)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}

// ── FAQ：畫面上顯示的同一份資料，也餵給 FAQPage 結構化資料 ──
const faqItems = computed(() =>
  (tm('home.faq.items') as any[] ?? []).map((item: any) => ({
    q: rt(item.q),
    a: rt(item.a),
  }))
)

const openFaq = ref<number | null>(0)
const toggleFaq = (i: number) => { openFaq.value = openFaq.value === i ? null : i }

// ── Hero 輪播：自己做淡入淡出，第一張在 SSR 就輸出（LCP 不用等 JS） ──
const heroSlides = [
  '/images/home/hero-1.jpg',
  '/images/home/hero-2.jpg',
  '/images/home/hero-3.jpg',
  '/images/home/hero-4.jpg',
]
const HERO_INTERVAL = 6000
const heroIndex = ref(0)
const heroPaused = ref(false)
const reducedMotion = ref(false)
let heroTimer: ReturnType<typeof setInterval> | null = null

function stopHero() {
  if (heroTimer) clearInterval(heroTimer)
  heroTimer = null
}
function startHero() {
  stopHero()
  if (reducedMotion.value) return
  heroTimer = setInterval(() => {
    heroIndex.value = (heroIndex.value + 1) % heroSlides.length
  }, HERO_INTERVAL)
}
function goHero(i: number) {
  heroIndex.value = i
  if (!heroPaused.value) startHero()
}
function pauseHero() {
  heroPaused.value = true
  stopHero()
}
function resumeHero() {
  heroPaused.value = false
  startHero()
}

// LCP 是 hero 第一張圖：提早預載，不用等到解析到 <img> 才開始下載
useHead({
  link: [{ rel: 'preload', as: 'image', href: '/images/home/hero-1.jpg', fetchpriority: 'high' }],
})

// ── 城市輪播 ──
const cityImages = ['tokyo', 'osaka', 'fukuoka', 'hokkaido', 'nagoya', 'okayama']
const cities = computed(() =>
  (tm('home.cities.items') as any[] ?? []).map((item: any, i: number) => ({
    name: rt(item.name),
    en: rt(item.en),
    caption: rt(item.caption),
    img: `/images/home/city-${cityImages[i]}.jpg`,
  }))
)

// ── 捲動進場動畫 ──
// revealReady 在 mounted 後才打開：沒有 JS（或爬蟲）時內容維持可見。
const revealReady = ref(false)
let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startHero()

  if (reducedMotion.value || !('IntersectionObserver' in window)) return

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )
  const targets = document.querySelectorAll<HTMLElement>('.home [data-reveal]')
  // 已經在畫面內的先標記，避免打開 revealReady 的瞬間閃一下
  targets.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add('is-in')
    else revealObserver!.observe(el)
  })
  revealReady.value = true
})

onBeforeUnmount(() => {
  stopHero()
  revealObserver?.disconnect()
})

// ── SEO ──
useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription'),
  ogTitle: () => t('home.seoTitle'),
  ogDescription: () => t('home.seoDescription'),
  ogType: 'website',
})

usePageUrlMeta()

useFaqSchema(faqItems.value)

useHead({
  script: [
    {
      key: 'ld-home',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': 'https://www.forma-global.com/#webpage',
        url: 'https://www.forma-global.com/',
        name: '皓學/FORMA｜日本留學代辦・赴日就職支援',
        description:
          '台日雙邊經營的日本留學與就職代辦。語言學校申請、留學簽證、短期遊學、特定技能與工作簽證媒合，以及抵日後的在地支援。代辦零手續費。',
        inLanguage: 'zh-Hant-TW',
        isPartOf: { '@id': 'https://www.forma-global.com/#website' },
        about: { '@id': 'https://www.forma-global.com/#organization' },
        primaryImageOfPage: 'https://www.forma-global.com/images/og-default.png',
        // 首頁是兩條服務線的入口，明確列出讓搜尋引擎與 AI 理解站台結構
        mainEntity: {
          '@type': 'ItemList',
          name: '服務線',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: '日本留遊學代辦',
              url: 'https://www.forma-global.com/study',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: '赴日就職・特定技能簽證媒合',
              url: 'https://www.forma-global.com/work',
            },
          ],
        },
      }),
    },
  ],
})
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <main class="home" :class="{ 'reveal-on': revealReady }">
    <!-- ── Hero：全幅圖片輪播（淡入淡出 + 緩慢推近） ── -->
    <section class="home-hero" @mouseenter="pauseHero" @mouseleave="resumeHero">
      <div class="home-hero__slides" aria-hidden="true">
        <div v-for="(src, i) in heroSlides" :key="src" class="home-hero__slide"
          :class="{ 'is-active': heroIndex === i }">
          <img :src="src" alt="" :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : 'low'" decoding="async" />
        </div>
      </div>
      <div class="home-hero__shade" aria-hidden="true" />

      <div class="home-hero__inner">
        <p class="home-hero__eyebrow">{{ $t('home.hero.eyebrow') }}</p>
        <h1 class="home-hero__title">{{ $t('home.hero.h1') }}</h1>
        <p class="home-hero__lead">{{ $t('home.hero.lead') }}</p>

        <div class="home-hero__actions">
          <NuxtLink :to="localePath('/study')" class="home-btn home-btn--study" @click="rememberLine('study')">
            {{ $t('home.hero.ctaStudy') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/work')" class="home-btn home-btn--work" @click="rememberLine('work')">
            {{ $t('home.hero.ctaWork') }}
          </NuxtLink>
        </div>

        <p class="home-hero__note">{{ $t('home.hero.note') }}</p>
      </div>

      <div class="home-hero__dots">
        <button v-for="(src, i) in heroSlides" :key="src" type="button" class="home-hero__dot"
          :class="{ 'is-active': heroIndex === i, 'is-paused': heroPaused }"
          :aria-label="`${i + 1} / ${heroSlides.length}`" :aria-current="heroIndex === i ? 'true' : undefined"
          @click="goHero(i)">
          <span />
        </button>
      </div>
    </section>

    <!-- ── 兩條服務線 ── -->
    <section class="home-section" aria-labelledby="home-lines-heading">
      <h2 id="home-lines-heading" class="home-heading" data-reveal>{{ $t('home.lines.heading') }}</h2>
      <p class="home-subheading" data-reveal>{{ $t('home.lines.sub') }}</p>

      <div class="line-grid">
        <!-- 留學線 -->
        <article class="line-card line-study" data-reveal>
          <NuxtLink :to="localePath('/study')" class="line-card__media" tabindex="-1" aria-hidden="true"
            @click="rememberLine('study')">
            <img src="/images/home/card-study.jpg" alt="" loading="lazy" decoding="async" />
            <span class="line-card__tag">{{ $t('home.lines.study.tag') }}</span>
          </NuxtLink>
          <div class="line-card__content">
            <h3 class="line-card__title">{{ $t('home.lines.study.title') }}</h3>
            <p class="line-card__desc">{{ $t('home.lines.study.desc') }}</p>
            <ul class="line-card__list">
              <li>{{ $t('home.lines.study.b1') }}</li>
              <li>{{ $t('home.lines.study.b2') }}</li>
              <li>{{ $t('home.lines.study.b3') }}</li>
              <li>{{ $t('home.lines.study.b4') }}</li>
            </ul>
            <div class="line-card__links">
              <NuxtLink :to="localePath('/study')" class="line-card__cta" @click="rememberLine('study')">
                {{ $t('home.lines.study.cta') }} <span aria-hidden="true">→</span>
              </NuxtLink>
              <div class="line-card__sublinks">
                <NuxtLink :to="localePath('/study/short-term')">{{ $t('home.links.shortTerm') }}</NuxtLink>
                <NuxtLink :to="localePath('/study/long-term')">{{ $t('home.links.longTerm') }}</NuxtLink>
                <NuxtLink :to="localePath('/study/schools')">{{ $t('home.links.schools') }}</NuxtLink>
                <NuxtLink :to="localePath('/study/common-questions')">{{ $t('home.links.faq') }}</NuxtLink>
              </div>
            </div>
          </div>
        </article>

        <!-- 工作線：套 .line-work 取得深藍色票 -->
        <article class="line-card line-work" data-reveal style="--d: 120ms">
          <NuxtLink :to="localePath('/work')" class="line-card__media" tabindex="-1" aria-hidden="true"
            @click="rememberLine('work')">
            <img src="/images/home/card-work.jpg" alt="" loading="lazy" decoding="async" />
            <span class="line-card__tag">{{ $t('home.lines.work.tag') }}</span>
          </NuxtLink>
          <div class="line-card__content">
            <h3 class="line-card__title">{{ $t('home.lines.work.title') }}</h3>
            <p class="line-card__desc">{{ $t('home.lines.work.desc') }}</p>
            <ul class="line-card__list">
              <li>{{ $t('home.lines.work.b1') }}</li>
              <li>{{ $t('home.lines.work.b2') }}</li>
              <li>{{ $t('home.lines.work.b3') }}</li>
              <li>{{ $t('home.lines.work.b4') }}</li>
            </ul>
            <div class="line-card__links">
              <NuxtLink :to="localePath('/work')" class="line-card__cta" @click="rememberLine('work')">
                {{ $t('home.lines.work.cta') }} <span aria-hidden="true">→</span>
              </NuxtLink>
              <div class="line-card__sublinks">
                <NuxtLink :to="localePath('/work/information')">{{ $t('home.links.information') }}</NuxtLink>
                <NuxtLink :to="localePath('/work/about_us')">{{ $t('home.links.about') }}</NuxtLink>
                <NuxtLink :to="localePath('/work/common-questions')">{{ $t('home.links.faq') }}</NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ── 為什麼找我們 ── -->
    <section class="home-section home-section--alt" aria-labelledby="home-why-heading">
      <h2 id="home-why-heading" class="home-heading" data-reveal>{{ $t('home.why.heading') }}</h2>
      <div class="why-grid">
        <div v-for="n in 3" :key="n" class="why-card" data-reveal :style="`--d: ${(n - 1) * 110}ms`">
          <span class="why-card__num" aria-hidden="true">0{{ n }}</span>
          <h3 class="why-card__title">{{ $t(`home.why.i${n}t`) }}</h3>
          <p class="why-card__body">{{ $t(`home.why.i${n}b`) }}</p>
        </div>
      </div>
    </section>

    <!-- ── 服務概覽：全幅背景圖 ── -->
    <section class="home-band" aria-labelledby="home-facts-heading">
      <div class="home-band__inner">
        <h2 id="home-facts-heading" class="home-heading home-heading--light" data-reveal>
          {{ $t('home.facts.heading') }}
        </h2>
        <dl class="facts-grid">
          <div v-for="n in 4" :key="n" class="fact" data-reveal :style="`--d: ${(n - 1) * 90}ms`">
            <dt class="fact__key">{{ $t(`home.facts.k${n}`) }}</dt>
            <dd class="fact__val">{{ $t(`home.facts.v${n}`) }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- ── 城市輪播 ── -->
    <section class="home-section" aria-labelledby="home-cities-heading">
      <h2 id="home-cities-heading" class="home-heading" data-reveal>{{ $t('home.cities.heading') }}</h2>
      <p class="home-subheading" data-reveal>{{ $t('home.cities.sub') }}</p>

      <div class="home-carousel" data-reveal>
        <ClientOnly>
          <Swiper :modules="swiperModules" :slides-per-view="1.25" :space-between="14" :centered-slides="false"
            :loop="true" :grab-cursor="true" :navigation="true"
            :autoplay="reducedMotion ? false : { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }"
            :breakpoints="{
              560: { slidesPerView: 2.2, spaceBetween: 16 },
              900: { slidesPerView: 3.2, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 22 }
            }" class="city-swiper">
            <SwiperSlide v-for="city in cities" :key="city.en">
              <NuxtLink :to="localePath('/study/schools')" class="city-card">
                <img :src="city.img" :alt="city.name" loading="lazy" decoding="async" />
                <span class="city-card__body">
                  <span class="city-card__en">{{ city.en }}</span>
                  <span class="city-card__name">{{ city.name }}</span>
                  <span class="city-card__caption">{{ city.caption }}</span>
                </span>
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
          <template #fallback>
            <div class="city-fallback">
              <NuxtLink v-for="city in cities.slice(0, 4)" :key="city.en" :to="localePath('/study/schools')"
                class="city-card">
                <img :src="city.img" :alt="city.name" loading="lazy" decoding="async" />
                <span class="city-card__body">
                  <span class="city-card__en">{{ city.en }}</span>
                  <span class="city-card__name">{{ city.name }}</span>
                  <span class="city-card__caption">{{ city.caption }}</span>
                </span>
              </NuxtLink>
            </div>
          </template>
        </ClientOnly>
      </div>

      <div class="home-section__more">
        <NuxtLink :to="localePath('/study/schools')" class="home-link">
          {{ $t('home.cities.cta') }} <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>

    <!-- ── 流程 ── -->
    <section class="home-section home-section--alt" aria-labelledby="home-flow-heading">
      <h2 id="home-flow-heading" class="home-heading" data-reveal>{{ $t('home.flow.heading') }}</h2>
      <ol class="flow-list" data-reveal>
        <li v-for="n in 4" :key="n" class="flow-step" :style="`--i: ${n - 1}`">
          <span class="flow-step__num">{{ n }}</span>
          <div>
            <h3 class="flow-step__title">{{ $t(`home.flow.s${n}t`) }}</h3>
            <p class="flow-step__body">{{ $t(`home.flow.s${n}b`) }}</p>
          </div>
        </li>
      </ol>
    </section>

    <!-- ── 最新情報：輪播 ── -->
    <section v-if="newsItems.length" class="home-section" aria-labelledby="home-news-heading">
      <h2 id="home-news-heading" class="home-heading" data-reveal>{{ $t('home.news.heading') }}</h2>
      <p class="home-subheading" data-reveal>{{ $t('home.news.sub') }}</p>

      <div class="home-carousel home-carousel--news" data-reveal>
        <ClientOnly>
          <Swiper :modules="swiperModules" :slides-per-view="1.1" :space-between="16" :navigation="true"
            :pagination="{ clickable: true }" :breakpoints="{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 }
            }" class="news-swiper">
            <SwiperSlide v-for="article in newsItems" :key="article.path">
              <NuxtLink :to="toPagePath(article.path)" class="news-item">
                <div class="news-item__thumb">
                  <img v-if="article.cover" :src="String(article.cover)" :alt="String(article.title)" loading="lazy"
                    decoding="async" />
                  <div v-else class="news-item__thumb--empty" aria-hidden="true" />
                </div>
                <div class="news-item__body">
                  <time class="news-item__date" :datetime="String(article.date)">{{ formatDate(article.date) }}</time>
                  <h3 class="news-item__title">{{ article.title }}</h3>
                  <p class="news-item__desc">{{ article.description }}</p>
                  <span class="news-item__more">{{ $t('home.news.readMore') }} <span aria-hidden="true">→</span></span>
                </div>
              </NuxtLink>
            </SwiperSlide>
          </Swiper>
          <!-- 伺服器端輸出一般格狀清單：文章連結要留在初始 HTML 裡 -->
          <template #fallback>
            <div class="news-grid">
              <NuxtLink v-for="article in newsItems" :key="article.path" :to="toPagePath(article.path)"
                class="news-item">
                <div class="news-item__thumb">
                  <img v-if="article.cover" :src="String(article.cover)" :alt="String(article.title)" loading="lazy"
                    decoding="async" />
                  <div v-else class="news-item__thumb--empty" aria-hidden="true" />
                </div>
                <div class="news-item__body">
                  <time class="news-item__date" :datetime="String(article.date)">{{ formatDate(article.date) }}</time>
                  <h3 class="news-item__title">{{ article.title }}</h3>
                  <p class="news-item__desc">{{ article.description }}</p>
                </div>
              </NuxtLink>
            </div>
          </template>
        </ClientOnly>
      </div>

      <div class="home-section__more">
        <NuxtLink :to="localePath('/study/information')" class="home-link">
          {{ $t('home.news.all') }} <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>

    <!-- ── FAQ ── -->
    <section class="home-section home-section--alt" aria-labelledby="home-faq-heading">
      <h2 id="home-faq-heading" class="home-heading" data-reveal>{{ $t('home.faq.heading') }}</h2>
      <div class="faq-list" data-reveal>
        <div v-for="(item, i) in faqItems" :key="i" class="faq-item" :class="{ 'is-open': openFaq === i }">
          <h3 class="faq-item__q">
            <button type="button" :aria-expanded="openFaq === i" :aria-controls="`home-faq-a-${i}`"
              @click="toggleFaq(i)">
              <span>{{ item.q }}</span>
              <span class="faq-item__icon" aria-hidden="true" />
            </button>
          </h3>
          <!-- 答案不用 v-if：保持在 DOM 裡，搜尋引擎與 AI 才讀得到完整內容 -->
          <div :id="`home-faq-a-${i}`" class="faq-item__a" role="region">
            <div class="faq-item__a-inner">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 結尾 CTA ── -->
    <section class="home-cta">
      <div class="home-cta__inner" data-reveal>
        <h2 class="home-cta__title">{{ $t('home.cta.heading') }}</h2>
        <p class="home-cta__body">{{ $t('home.cta.body') }}</p>
        <NuxtLink :to="localePath('/contact')" class="home-btn home-btn--light">
          {{ $t('home.cta.btn') }}
        </NuxtLink>
      </div>
    </section>
  </main>

  <Footer />
</template>

<style scoped>
.home {
  background: var(--c-bg);
  overflow-x: clip;
}

/* ── 捲動進場：只有 JS 啟動後（.reveal-on）才先隱藏，沒有 JS 也看得到內容 ── */
.reveal-on [data-reveal] {
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 0.7s ease var(--d, 0ms),
    transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0ms),
    translate 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.reveal-on [data-reveal].is-in {
  opacity: 1;
  transform: none;
}

/* ── 區塊共用 ── */
.home-section {
  padding: 5rem 1.5rem;
}

.home-section--alt {
  background: var(--c-bg-alt);
}

.home-heading {
  position: relative;
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3.5vw, 2.2rem);
  font-weight: 800;
  color: var(--c-text);
  text-align: center;
  margin: 0 auto 0.75rem;
  padding-bottom: 1rem;
  max-width: 24em;
  line-height: 1.4;
}

.home-heading::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 44px;
  height: 3px;
  border-radius: 3px;
  background: var(--c-primary);
  transform: translateX(-50%);
}

.home-heading--light {
  color: #fff;
}

.home-heading--light::after {
  background: #fff;
  opacity: 0.7;
}

.home-subheading {
  text-align: center;
  color: var(--c-text-secondary);
  max-width: 42em;
  margin: 0 auto 2.5rem;
  line-height: 1.8;
}

.home-heading + .line-grid,
.home-heading + .why-grid,
.home-heading + .facts-grid,
.home-heading + .flow-list,
.home-heading + .faq-list {
  margin-top: 2.5rem;
}

.home-section__more {
  text-align: center;
  margin-top: 2.5rem;
}

.home-link {
  display: inline-block;
  color: var(--c-primary);
  font-weight: 700;
  text-decoration: none;
  border-bottom: 2px solid currentColor;
  padding-bottom: 0.15rem;
}

.home-link span {
  display: inline-block;
  transition: transform var(--transition-base);
}

.home-link:hover span {
  transform: translateX(4px);
}

/* ── Hero ── */
.home-hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: clamp(560px, 82vh, 780px);
  padding: 4.5rem 1.5rem 5.5rem;
  background: #1a0a0d;
  overflow: hidden;
  isolation: isolate;
}

.home-hero__slides,
.home-hero__slide,
.home-hero__shade {
  position: absolute;
  inset: 0;
}

.home-hero__slides {
  z-index: -2;
}

.home-hero__slide {
  opacity: 0;
  transition: opacity 1.4s ease;
}

.home-hero__slide.is-active {
  opacity: 1;
}

.home-hero__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.02);
}

/* 緩慢推近：只在目前這張播放，換張時自動重來 */
.home-hero__slide.is-active img {
  animation: hero-zoom 9s ease-out forwards;
}

@keyframes hero-zoom {
  from { transform: scale(1.02); }
  to { transform: scale(1.12); }
}

.home-hero__shade {
  z-index: -1;
  background:
    linear-gradient(90deg, rgba(20, 6, 10, 0.82) 0%, rgba(20, 6, 10, 0.55) 48%, rgba(20, 6, 10, 0.12) 100%),
    linear-gradient(0deg, rgba(20, 6, 10, 0.5) 0%, rgba(20, 6, 10, 0) 40%);
}

.home-hero__inner {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  color: #fff;
}

.home-hero__inner > * {
  max-width: 640px;
  animation: hero-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.home-hero__inner > :nth-child(2) { animation-delay: 0.12s; }
.home-hero__inner > :nth-child(3) { animation-delay: 0.24s; }
.home-hero__inner > :nth-child(4) { animation-delay: 0.36s; }
.home-hero__inner > :nth-child(5) { animation-delay: 0.48s; }

@keyframes hero-rise {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: none; }
}

.home-hero__eyebrow {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--radius-full);
  padding: 0.35rem 1rem;
  margin: 0 0 1.5rem;
}

.home-hero__title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 5.2vw, 3.4rem);
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
  margin: 0 0 1.25rem;
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
  text-wrap: balance;
}

.home-hero__lead {
  font-size: var(--text-base);
  line-height: 1.95;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 2.25rem;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.home-hero__note {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.78);
  margin: 1.75rem 0 0;
  line-height: 1.7;
}

.home-hero__dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1.75rem;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
}

.home-hero__dot {
  width: 44px;
  height: 20px;
  padding: 8px 0;
  background: none;
  border: none;
  cursor: pointer;
}

.home-hero__dot span {
  position: relative;
  display: block;
  height: 4px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.35);
  overflow: hidden;
}

.home-hero__dot span::after {
  content: '';
  position: absolute;
  inset: 0;
  background: #fff;
  transform: scaleX(0);
  transform-origin: left;
}

.home-hero__dot.is-active span::after {
  animation: hero-progress 6s linear forwards;
}

.home-hero__dot.is-paused span::after {
  animation-play-state: paused;
}

@keyframes hero-progress {
  to { transform: scaleX(1); }
}

/* ── 按鈕 ── */
.home-btn {
  display: inline-block;
  font-weight: 700;
  padding: 0.95rem 2.1rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
  border: 2px solid transparent;
}

.home-btn:hover {
  transform: translateY(-2px);
}

.home-btn--study {
  background: #8B1A2F;
  color: #fff;
  box-shadow: 0 6px 18px rgba(139, 26, 47, 0.35);
}

.home-btn--study:hover {
  background: #B02440;
  color: #fff;
}

.home-btn--work {
  background: #1B3A6B;
  color: #fff;
  box-shadow: 0 6px 18px rgba(27, 58, 107, 0.35);
}

.home-btn--work:hover {
  background: #2A5298;
  color: #fff;
}

.home-btn--light {
  background: #fff;
  color: #5C0F1E;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.home-btn--light:hover {
  background: #F5E8EB;
  color: #5C0F1E;
}

/* ── 兩條服務線卡片 ── */
.line-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;
  max-width: 1080px;
  margin: 0 auto;
}

.line-card {
  display: flex;
  flex-direction: column;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: box-shadow var(--transition-base), translate var(--transition-base);
}

.line-card:hover {
  translate: 0 -6px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
}

.line-card__media {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--c-primary-muted);
}

.line-card__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, color-mix(in srgb, var(--c-primary-dark) 55%, transparent) 0%, transparent 55%);
}

.line-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.line-card:hover .line-card__media img {
  transform: scale(1.07);
}

.line-card__tag {
  position: absolute;
  left: 1.25rem;
  bottom: 1.1rem;
  z-index: 1;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--c-text-on-primary);
  background: var(--c-primary);
  border-radius: var(--radius-full);
  padding: 0.3rem 0.85rem;
}

.line-card__content {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.9rem 1.9rem 2.1rem;
}

.line-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--c-primary-dark);
  margin: 0 0 0.85rem;
}

.line-card__desc {
  color: var(--c-text-secondary);
  line-height: 1.85;
  margin: 0 0 1.5rem;
}

.line-card__list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.line-card__list li {
  position: relative;
  padding-left: 1.6rem;
  color: var(--c-text);
  line-height: 1.6;
}

.line-card__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c-primary);
}

.line-card__links {
  margin-top: auto;
}

.line-card__cta {
  display: inline-block;
  font-weight: 700;
  color: var(--c-text-on-primary);
  background: var(--c-primary);
  padding: 0.75rem 1.6rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.line-card__cta span {
  display: inline-block;
  transition: transform var(--transition-base);
}

.line-card__cta:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
}

.line-card__cta:hover span {
  transform: translateX(4px);
}

.line-card__sublinks {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.1rem;
  margin-top: 1.35rem;
  padding-top: 1.2rem;
  border-top: 1px dashed var(--c-border);
}

.line-card__sublinks a {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  text-decoration: none;
}

.line-card__sublinks a:hover {
  color: var(--c-primary);
  text-decoration: underline;
}

/* ── 為什麼找我們 ── */
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 1080px;
  margin: 0 auto;
}

.why-card {
  position: relative;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 2rem 1.75rem;
  overflow: hidden;
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1),
    box-shadow var(--transition-base), border-color var(--transition-base);
}

.why-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 4px;
  background: var(--c-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s ease;
}

.why-card:hover {
  box-shadow: 0 14px 32px rgba(139, 26, 47, 0.1);
  border-color: transparent;
}

.why-card:hover::before {
  transform: scaleX(1);
}

.why-card__num {
  font-family: var(--font-heading);
  font-size: 2.6rem;
  line-height: 1;
  font-weight: 800;
  color: var(--c-primary);
  opacity: 0.28;
}

.why-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--c-text);
  margin: 0.6rem 0 0.75rem;
}

.why-card__body {
  color: var(--c-text-secondary);
  line-height: 1.85;
  margin: 0;
}

/* ── 服務概覽：背景圖 ── */
.home-band {
  position: relative;
  padding: 5.5rem 1.5rem;
  background:
    linear-gradient(rgba(60, 10, 22, 0.78), rgba(26, 10, 13, 0.82)),
    url('/images/home/band.jpg') center / cover no-repeat;
}

/* 視差：只給有滑鼠的裝置，行動裝置的 fixed 背景會卡頓 */
@media (hover: hover) and (min-width: 900px) {
  .home-band,
  .home-cta {
    background-attachment: fixed;
  }
}

.home-band__inner {
  max-width: 1080px;
  margin: 0 auto;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 1.25rem;
  margin: 0;
}

.fact {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: var(--radius-lg);
  padding: 2rem 1rem;
  margin: 0;
}

.fact__key {
  font-family: var(--font-heading);
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.3;
}

.fact__val {
  margin: 0.6rem 0 0;
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.82);
}

/* ── 輪播共用 ── */
.home-carousel {
  max-width: 1280px;
  margin: 0 auto;
}

.home-carousel--news {
  max-width: 1120px;
}

.home-carousel :deep(.swiper) {
  padding: 0.5rem 0.25rem 0.75rem;
}

.home-carousel :deep(.swiper-button-next),
.home-carousel :deep(.swiper-button-prev) {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fff;
  color: var(--c-primary);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  transition: background var(--transition-fast), color var(--transition-fast), opacity var(--transition-fast);
}

.home-carousel :deep(.swiper-button-next)::after,
.home-carousel :deep(.swiper-button-prev)::after {
  font-size: 15px;
  font-weight: 900;
}

.home-carousel :deep(.swiper-button-next:hover),
.home-carousel :deep(.swiper-button-prev:hover) {
  background: var(--c-primary);
  color: #fff;
}

.home-carousel :deep(.swiper-button-disabled) {
  opacity: 0;
}

.home-carousel :deep(.swiper-pagination-bullet-active) {
  background: var(--c-primary);
}

@media (max-width: 640px) {
  .home-carousel :deep(.swiper-button-next),
  .home-carousel :deep(.swiper-button-prev) {
    display: none;
  }
}

/* ── 城市卡片 ── */
.city-card {
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  color: #fff;
  background: var(--c-primary-dark);
}

.city-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.city-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(20, 6, 10, 0.85) 0%, rgba(20, 6, 10, 0.15) 55%, rgba(20, 6, 10, 0) 100%);
  transition: background var(--transition-base);
}

.city-card:hover img {
  transform: scale(1.08);
}

.city-card__body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 1.4rem 1.3rem 1.5rem;
}

.city-card__en {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.22em;
  opacity: 0.8;
}

.city-card__name {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.3;
  margin-top: 0.15rem;
}

.city-card__caption {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.88);
  margin-top: 0.5rem;
}

.city-fallback {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

/* ── 流程 ── */
.flow-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 1080px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  position: relative;
}

/* 串起四個步驟的線：進場時由左畫到右 */
.flow-list::before {
  content: '';
  position: absolute;
  top: 1.5rem;
  left: 12.5%;
  right: 12.5%;
  height: 2px;
  background: var(--c-primary);
  opacity: 0.35;
  transform-origin: left;
}

.reveal-on .flow-list::before {
  transform: scaleX(0);
  transition: transform 1.4s ease 0.2s;
}

.reveal-on .flow-list.is-in::before {
  transform: scaleX(1);
}

.flow-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.1rem;
}

.reveal-on .flow-step {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: calc(var(--i) * 0.22s + 0.15s);
}

.reveal-on .flow-list.is-in .flow-step {
  opacity: 1;
  transform: none;
}

.flow-step__num {
  flex: 0 0 auto;
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--c-primary);
  color: var(--c-text-on-primary);
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 800;
  box-shadow: 0 0 0 6px var(--c-bg-alt), 0 0 0 7px var(--c-border);
}

.flow-step__title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 0.5rem;
}

.flow-step__body {
  color: var(--c-text-secondary);
  line-height: 1.8;
  margin: 0;
}

@media (max-width: 860px) {
  .flow-list {
    grid-template-columns: 1fr;
    max-width: 560px;
    gap: 1.6rem;
  }

  /* 直排時改成每一步自己往下接一段線，最後一步不會多出一截 */
  .flow-list::before {
    display: none;
  }

  .flow-step:not(:last-child)::before {
    content: '';
    position: absolute;
    left: calc(1.5rem - 1px);
    top: 3rem;
    bottom: -1.6rem;
    width: 2px;
    background: var(--c-primary);
    opacity: 0.35;
  }

  .flow-step {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: 1.25rem;
  }

  .flow-step__title {
    margin-top: 0.6rem;
  }
}

/* ── 最新情報 ── */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.news-swiper :deep(.swiper-slide) {
  height: auto;
  display: flex;
}

.news-swiper {
  padding-bottom: 3rem !important;
}

.news-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-decoration: none;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.news-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.news-item__thumb {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--c-bg-alt);
}

.news-item__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.news-item:hover .news-item__thumb img {
  transform: scale(1.06);
}

.news-item__thumb--empty {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--c-primary-muted), var(--c-bg-alt));
}

.news-item__body {
  padding: 1.35rem 1.4rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-item__date {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  letter-spacing: 0.04em;
}

.news-item__title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.55;
  margin: 0.45rem 0 0.6rem;
}

.news-item__desc {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.75;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-item__more {
  margin-top: auto;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary);
}

.news-item__more span {
  display: inline-block;
  transition: transform var(--transition-base);
}

.news-item:hover .news-item__more span {
  transform: translateX(4px);
}

/* ── FAQ ── */
.faq-list {
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.faq-item {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.faq-item.is-open {
  border-color: var(--c-primary);
  box-shadow: 0 8px 22px rgba(139, 26, 47, 0.08);
}

.faq-item__q {
  margin: 0;
  font-size: var(--text-base);
}

.faq-item__q button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 1.4rem;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.5;
}

.faq-item__icon {
  flex: 0 0 auto;
  position: relative;
  width: 16px;
  height: 16px;
}

.faq-item__icon::before,
.faq-item__icon::after {
  content: '';
  position: absolute;
  background: var(--c-primary);
  border-radius: 2px;
  transition: transform var(--transition-base), opacity var(--transition-base);
}

.faq-item__icon::before {
  top: 7px;
  left: 0;
  width: 16px;
  height: 2px;
}

.faq-item__icon::after {
  top: 0;
  left: 7px;
  width: 2px;
  height: 16px;
}

.faq-item.is-open .faq-item__icon::after {
  transform: rotate(90deg);
  opacity: 0;
}

/* 用 grid 0fr → 1fr 做高度動畫；內容始終留在 DOM */
.faq-item__a {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  transition: grid-template-rows 0.35s ease, visibility 0.35s;
}

.faq-item.is-open .faq-item__a {
  grid-template-rows: 1fr;
  visibility: visible;
}

.faq-item__a-inner {
  overflow: hidden;
  min-height: 0;
}

.faq-item__a p {
  margin: 0;
  padding: 0 1.4rem 1.4rem;
  color: var(--c-text-secondary);
  line-height: 1.9;
}

/* ── 結尾 CTA ── */
.home-cta {
  padding: 6rem 1.5rem 6.5rem;
  background:
    linear-gradient(rgba(26, 10, 13, 0.55), rgba(26, 10, 13, 0.7)),
    url('/images/home/cta.jpg') center / cover no-repeat;
}

.home-cta__inner {
  max-width: 680px;
  margin: 0 auto;
  text-align: center;
}

.home-cta__title {
  font-family: var(--font-heading);
  font-size: clamp(1.6rem, 3.8vw, 2.4rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 1rem;
}

.home-cta__body {
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.9;
  margin: 0 0 2rem;
}

/* ── 手機 ── */
@media (max-width: 640px) {
  .home-section,
  .home-hero,
  .home-band,
  .home-cta {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .home-section {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }

  .home-hero {
    min-height: 0;
    padding-top: 3.5rem;
    padding-bottom: 5rem;
  }

  .home-hero__shade {
    background: linear-gradient(180deg, rgba(20, 6, 10, 0.62) 0%, rgba(20, 6, 10, 0.78) 100%);
  }

  .home-hero__actions .home-btn {
    width: 100%;
    text-align: center;
  }

  .line-card__content {
    padding: 1.5rem 1.35rem 1.75rem;
  }

  .facts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .fact {
    padding: 1.4rem 0.6rem;
  }

  .faq-item__q button {
    padding: 1rem 1.1rem;
    font-size: var(--text-base);
  }

  .faq-item__a p {
    padding: 0 1.1rem 1.1rem;
  }
}

/* ── 減少動態效果 ── */
@media (prefers-reduced-motion: reduce) {
  .reveal-on [data-reveal],
  .reveal-on .flow-step,
  .reveal-on .flow-list::before {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .home-hero__slide {
    transition: none;
  }

  .home-hero__slide.is-active img,
  .home-hero__inner > *,
  .home-hero__dot.is-active span::after {
    animation: none;
  }

  .home-hero__dot.is-active span::after {
    transform: scaleX(1);
  }

  .home-band,
  .home-cta {
    background-attachment: scroll;
  }
}
</style>
