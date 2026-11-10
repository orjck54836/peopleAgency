<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const swiperModules = [Navigation, Pagination, Autoplay]

const localePath = useLocalePath()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

function toPagePath(contentPath: string): string {
  return localePath(
    contentPath
      .replace('/information/study/', '/study/information/')
      .replace('/information/work/', '/work/information/')
  )
}

const { t, tm, locale } = useI18n()
useSeoMeta({
  title: t('seo.study.title'),
  description: t('seo.study.description'),
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

usePageUrlMeta()

// 服務的結構化資料：明確告訴搜尋引擎與 AI「誰提供什麼服務、服務哪裡、收費如何」
useServiceSchema({
  name: '日本留遊學代辦服務',
  description:
    '日本語言學校精準媒合、留學申請全程代辦、入管局簽證文件一對一指導，以及台日雙邊在地支援。服務涵蓋短期遊學（2 週～3 個月，觀光免簽）、長期留學（6 個月～2 年，學生簽證），以及語言學校銜接專門學校與大學的升學規劃。代辦零手續費，學費與日本學校官方收費完全同步。',
  path: '/study',
  serviceType: ['日本留學代辦', '語言學校媒合', '留學簽證申請協助', '短期遊學安排', '升學進修規劃'],
  freeOfCharge: true,
})

useBreadcrumbSchema([{ name: '日本留遊學', path: '/study' }])

// ── Hero 輪播橫幅 ──
// 只放不受語言影響的資料（圖片、連結），文字全部由 i18n 提供
const bannerMeta = [
  { id: 'schools', bg: '/images/home/hero-1.jpg', to: '/study/schools' },
  { id: 'match', bg: '/images/home/study-hero-2.jpg', to: '/study/schools' },
  { id: 'support', bg: '/images/home/study-hero-3.jpg', to: '/contact' },
]

const banners = computed(() =>
  bannerMeta.map((meta, i) => ({
    ...meta,
    title: t(`studyLanding.banners.${i}.title`),
    sub: t(`studyLanding.banners.${i}.sub`),
    cta: t(`studyLanding.banners.${i}.cta`),
  }))
)

const {
  index: currentBanner,
  paused: bannerPaused,
  go: goToBanner,
  pause: pauseBanner,
  resume: resumeBanner,
} = useHeroSlider(bannerMeta.length, 7000)

const { revealReady } = useScrollReveal('.study-lp')

// LCP 是 hero 第一張圖：提早預載，不用等到解析到 <img> 才開始下載
useHead({
  link: [{ rel: 'preload', as: 'image', href: '/images/home/hero-1.jpg', fetchpriority: 'high' }],
})

// 品牌理念段落文字（陣列，用 tm 取原始清單）
const philosophyBody = computed(() => {
  const count = Number(t('studyLanding.philosophy.bodyCount'))
  return Array.from({ length: count }, (_, i) =>
    t(`studyLanding.philosophy.body.${i}`)
  )
})

// ── 學習方式 ──
// id 為固定英文 slug，用於路由判斷，不隨語言改變
const studyModeMeta = [
  { id: 'short-term', image: '/images/home/mode-short.jpg', to: '/study/short-term' },
  { id: 'long-term', image: '/images/home/mode-long.jpg', to: '/study/long-term' },
  { id: 'university', image: '/images/home/mode-univ.jpg', to: '/study/university' },
]

const studyModes = computed(() =>
  studyModeMeta.map((meta, i) => ({
    ...meta,
    label: t(`studyLanding.modes.items.${i}.label`),
    sub: t(`studyLanding.modes.items.${i}.sub`),
    desc: t(`studyLanding.modes.items.${i}.desc`),
    tags: [0, 1, 2].map(j => t(`studyLanding.modes.items.${i}.tags.${j}`)),
  }))
)

const selectedZone = ref('')
// 佔位新聞資料（無真實文章時使用），文字改由 i18n 提供
const placeholderNews = computed(() => {
  const dates = ['2026-05-01', '2026-04-18', '2026-03-30']
  return dates.map((date, i) => ({
    path: '/study/information',
    title: t(`studyLanding.news.placeholder.${i}.title`),
    description: t(`studyLanding.news.placeholder.${i}.description`),
    date,
    cover: null as string | null,
  }))
})

const { data: realNews } = await useAsyncData('study-latest-news', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/information/study/%')
    // 只取卡片需要的欄位：不 select 的話整篇文章內文都會被塞進頁面 payload
    .select('path', 'title', 'description', 'date', 'cover')
    .order('date', 'DESC')
    .limit(8)
    .all()
)

const latestNews = computed(() =>
  realNews.value && realNews.value.length ? realNews.value : placeholderNews.value
)

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  const localeMap: Record<string, string> = { 'zh-TW': 'zh-TW', en: 'en-US', ja: 'ja-JP' }
  return d.toLocaleDateString(localeMap[locale.value] || 'zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <div class="lp study-lp" :class="{ 'reveal-on': revealReady }">
    <!-- ── Hero：橫幅輪播（淡入淡出） ── -->
    <section class="lp-hero lp-hero--zoom" style="--lp-hero-interval: 7s" @mouseenter="pauseBanner"
      @mouseleave="resumeBanner">
      <div class="lp-hero__slides" aria-hidden="true">
        <div v-for="(banner, i) in banners" :key="banner.id" class="lp-hero__slide"
          :class="{ 'is-active': currentBanner === i }">
          <img :src="banner.bg" alt="" :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : 'low'" decoding="async" />
        </div>
      </div>
      <div class="lp-hero__shade" aria-hidden="true" />

      <div class="lp-hero__inner">
        <!-- h1 固定不隨輪播變動，放的是這一頁真正的主題（搜尋引擎與 AI 以它判斷頁面在講什麼）；
             輪播的標語是視覺文案，用 <p> 呈現 -->
        <h1 class="lp-hero__eyebrow study-hero__h1">{{ $t('studyLanding.heroH1') }}</h1>
        <!-- key 換張時重新掛載，文字會重新播放進場動畫 -->
        <div :key="currentBanner" class="lp-hero__content">
          <p class="lp-hero__title">{{ banners[currentBanner].title }}</p>
          <p class="lp-hero__lead">{{ banners[currentBanner].sub }}</p>
          <div class="lp-hero__actions">
            <NuxtLink :to="localePath(banners[currentBanner].to)" class="lp-btn lp-btn--ghost">
              {{ banners[currentBanner].cta }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="lp-hero__dots">
        <button v-for="(banner, i) in banners" :key="banner.id" type="button" class="lp-hero__dot"
          :class="{ 'is-active': currentBanner === i, 'is-paused': bannerPaused }"
          :aria-label="`${i + 1} / ${banners.length}`" :aria-current="currentBanner === i ? 'true' : undefined"
          @click="goToBanner(i)">
          <span />
        </button>
      </div>
    </section>

    <!-- ── 品牌理念 ── -->
    <section class="lp-section lp-section--alt philosophy">
      <div class="lp-inner philosophy__inner">
        <div class="philosophy__logo" data-reveal="left">
          <img src="/images/haogaku-logo.svg" :alt="$t('studyLanding.philosophy.headline')" />
        </div>
        <div class="philosophy__content" data-reveal="right">
          <h2 class="lp-heading lp-heading--left">{{ $t('studyLanding.philosophy.headline') }}</h2>
          <div class="philosophy__body">
            <p v-for="(line, i) in philosophyBody" :key="i">{{ line }}</p>
          </div>
          <NuxtLink :to="localePath('/contact')" class="lp-btn lp-btn--primary">
            {{ $t('studyLanding.philosophy.cta') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 五大承諾（獨立元件） -->
    <TrustSection />

    <!-- ── 學習方式 ── -->
    <section class="lp-section">
      <div class="lp-inner">
        <h2 class="lp-heading" data-reveal>{{ $t('studyLanding.modes.heading') }}</h2>
        <div class="lp-card-grid">
          <NuxtLink v-for="(mode, i) in studyModes" :key="mode.id" :to="localePath(mode.to)" class="lp-card"
            data-reveal :style="`--d: ${i * 110}ms`">
            <div class="lp-card__media">
              <img :src="mode.image" :alt="mode.label" loading="lazy" decoding="async" />
              <span class="lp-card__badge">{{ mode.sub }}</span>
            </div>
            <div class="lp-card__body">
              <h3 class="lp-card__title">{{ mode.label }}</h3>
              <p class="lp-card__desc">{{ mode.desc }}</p>
              <div class="lp-card__tags">
                <span v-for="tag in mode.tags" :key="tag" class="lp-card__tag">{{ tag }}</span>
              </div>
              <span class="lp-card__cta">{{ $t('studyLanding.modes.readMore') }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── 地區選擇：日本地圖 ── -->
    <section class="lp-section lp-section--alt">
      <div class="lp-inner">
        <h2 class="lp-heading" data-reveal>{{ $t('schoolOverview.regionLabel') }}</h2>
        <div data-reveal>
          <JapanZoneMap v-model="selectedZone" />
        </div>
      </div>
    </section>

    <!-- ── 留學情報：輪播 ── -->
    <section v-if="latestNews && latestNews.length" class="lp-section">
      <div class="lp-inner">
        <h2 class="lp-heading" data-reveal>{{ $t('studyLanding.news.heading') }}</h2>
        <div class="lp-carousel" data-reveal>
          <ClientOnly>
            <Swiper :modules="swiperModules" :navigation="true" :pagination="{ clickable: true }"
              :slides-per-view="1.1" :space-between="16" :breakpoints="{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 }
              }">
              <SwiperSlide v-for="(article, i) in latestNews" :key="article.path + i">
                <NuxtLink :to="toPagePath(article.path)" class="lp-news">
                  <div class="lp-news__thumb">
                    <img v-if="article.cover" :src="article.cover" :alt="article.title" loading="lazy"
                      decoding="async" />
                  </div>
                  <div class="lp-news__body">
                    <span class="lp-news__date">{{ formatDate(article.date) }}</span>
                    <h3 class="lp-news__title">{{ article.title }}</h3>
                    <p class="lp-news__desc">{{ article.description }}</p>
                    <span class="lp-news__more">{{ $t('studyLanding.news.readMore') }}</span>
                  </div>
                </NuxtLink>
              </SwiperSlide>
            </Swiper>
            <!-- 伺服器端輸出一般格狀清單：文章連結要留在初始 HTML 裡 -->
            <template #fallback>
              <div class="lp-news-grid">
                <NuxtLink v-for="(article, i) in latestNews.slice(0, 3)" :key="article.path + i"
                  :to="toPagePath(article.path)" class="lp-news">
                  <div class="lp-news__thumb">
                    <img v-if="article.cover" :src="article.cover" :alt="article.title" loading="lazy"
                      decoding="async" />
                  </div>
                  <div class="lp-news__body">
                    <span class="lp-news__date">{{ formatDate(article.date) }}</span>
                    <h3 class="lp-news__title">{{ article.title }}</h3>
                    <p class="lp-news__desc">{{ article.description }}</p>
                    <span class="lp-news__more">{{ $t('studyLanding.news.readMore') }}</span>
                  </div>
                </NuxtLink>
              </div>
            </template>
          </ClientOnly>
        </div>
      </div>
    </section>

    <!-- ── 結尾 CTA ── -->
    <section class="lp-cta study-cta">
      <div class="lp-cta__inner" data-reveal>
        <h2 class="lp-cta__title">{{ $t('home.cta.heading') }}</h2>
        <p class="lp-cta__body">{{ $t('home.cta.body') }}</p>
        <NuxtLink :to="localePath('/contact')" class="lp-btn lp-btn--light">{{ $t('home.cta.btn') }}</NuxtLink>
      </div>
    </section>
  </div>

  <Footer />
</template>

<style scoped>
/* 共用的 lp-* 樣式在 assets/css/landing.css，這裡只放本頁專屬的部分 */

.study-hero__h1 {
  font-family: var(--font-body);
  line-height: 1.6;
  border-radius: 1.2rem;
}

/* ── 品牌理念 ── */
.philosophy__inner {
  display: grid;
  grid-template-columns: 5fr 6fr;
  gap: 4rem;
  align-items: center;
}

.philosophy__logo {
  display: grid;
  place-items: center;
}

.philosophy__logo img {
  width: min(100%, 380px);
  aspect-ratio: 1;
  display: block;
  filter: drop-shadow(0 18px 36px rgba(139, 26, 47, 0.14));
  animation: logo-float 7s ease-in-out infinite;
}

@keyframes logo-float {
  0%, 100% { translate: 0 0; }
  50% { translate: 0 -10px; }
}

.philosophy__body {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin: 1.75rem 0 2.25rem;
}

.philosophy__body p {
  color: var(--c-text-secondary);
  line-height: 1.9;
  margin: 0;
}

/* ── 結尾 CTA 背景 ── */
.study-cta {
  background-image:
    linear-gradient(rgba(26, 10, 13, 0.55), rgba(26, 10, 13, 0.7)),
    url('/images/home/cta.jpg');
}

@media (max-width: 900px) {
  .philosophy__inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .philosophy__logo img {
    width: min(60%, 240px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .philosophy__logo img {
    animation: none;
  }
}
</style>
