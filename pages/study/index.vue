<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

function toPagePath(contentPath: string): string {
  return contentPath
    .replace('/information/study/', '/study/information/')
    .replace('/information/work/', '/work/information/')
}

const { t } = useI18n()
useSeoMeta({
  title: t('seo.study.title'),
  description: t('seo.study.description'),
})

// ── 手動輪播橫幅 ──
const banners = [
  {
    title: '日本特色遊學',
    sub: '從 2 週到 2 年，找到最適合你的學習方式',
    bg: '/img/hero.jpg',
    cta: '探索學習方式',
    action: () => router.push('/study/schools'),
  },
  {
    title: '精選語言學校媒合',
    sub: '與日本多所語言學校深度合作，依你的目標精準推薦',
    bg: '/img/hero.jpg',
    cta: '查看學校列表',
    action: () => router.push('/study/schools'),
  },
  {
    title: '台日雙邊在地支援',
    sub: '台灣顧問協助申請，日本落地後不變孤兒',
    bg: '/img/hero.jpg',
    cta: '立即諮詢',
    action: () => router.push('/contact'),
  },
]

const currentBanner = ref(0)
let bannerTimer: ReturnType<typeof setInterval> | null = null

function startBannerTimer() {
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.length
  }, 5000)
}

function goToBanner(i: number) {
  currentBanner.value = i
  if (bannerTimer) clearInterval(bannerTimer)
  startBannerTimer()
}

onMounted(() => startBannerTimer())
onUnmounted(() => { if (bannerTimer) clearInterval(bannerTimer) })

// ── 學習方式 ──
const studyModes = [
  {
    value: '短期遊學',
    label: '短期遊學',
    sub: '2週～3個月',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8cypyMF0fDQkfvrm-Wk8B-zM5r23IAFsD0v4MUBhLw&s=10',
    desc: '適合想體驗日本生活、快速提升日語口說能力的學生。彈性安排行程，不需長期簽證，是踏出留學第一步的最佳選擇。',
    tags: ['無需長期簽證', '彈性行程', '生活體驗'],
  },
  {
    value: '長期留學',
    label: '長期留學',
    sub: '6個月～2年',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8cypyMF0fDQkfvrm-Wk8B-zM5r23IAFsD0v4MUBhLw&s=10',
    desc: '深度學習日語並融入當地生活，申請語言學校學生簽證，可合法打工補貼生活費，累積實質語言與生活能力。',
    tags: ['學生簽證', '合法打工', '語言深化'],
  },
  {
    value: '升學進修',
    label: '升學進修',
    sub: '專門學校・大學・研究所',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu8cypyMF0fDQkfvrm-Wk8B-zM5r23IAFsD0v4MUBhLw&s=10',
    desc: '以取得日本學位或專業資格為目標，進入專門學校、大學或研究所就讀，為未來在日就業或學術發展奠定基礎。',
    tags: ['取得學位', '專業資格', '就業銜接'],
  },
]

function goToSchoolsByMode(mode: string) {
  const modeMap: Record<string, string> = {
    '短期遊學': '/study/short-term',
    '長期留學': '/study/long-term',
    '升學進修': '/study/university',
  }
  router.push(modeMap[mode] || '/study/schools')
}

function goToAllSchools() {
  router.push('/study/schools')
}

const selectedZone = ref('')
const featuredSchools = ref<any[]>([])

async function fetchFeaturedSchools() {
  try {
    const res = await fetch('/api/schools')
    const json = await res.json()
    if (json.success) featuredSchools.value = json.data.slice(0, 3)
  } catch (err) {
    console.error('❌ 無法取得熱門學校資料：', err)
  }
}

onMounted(fetchFeaturedSchools)

const placeholderNews = [
  { path: '/study/information', title: '日本留學前必看：簽證申請流程懶人包', description: '從在留資格認定到簽證核發，整理留學日本前最容易卡關的文件準備重點。', date: '2026-05-01', cover: null as string | null },
  { path: '/study/information', title: '語言學校 vs 專門學校：該怎麼選？', description: '想先打好日語基礎還是直接銜接專業技能課程？我們整理兩種升學路線的差異。', date: '2026-04-18', cover: null as string | null },
  { path: '/study/information', title: '留學日本的生活費怎麼抓？東京 vs 地方城市實際比較', description: '住宿、餐食、交通的實際花費差異，幫你抓出合理的每月生活預算。', date: '2026-03-30', cover: null as string | null },
]

const { data: realNews } = await useAsyncData('study-latest-news', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/information/study/%')
    .order('date', 'DESC')
    .limit(8)
    .all()
)

const latestNews = computed(() =>
  realNews.value && realNews.value.length ? realNews.value : placeholderNews
)

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <!-- 手動輪播橫幅 -->
  <div class="hero-banner">
    <transition name="banner-fade" mode="out-in">
      <div
        :key="currentBanner"
        class="hero-slide"
        :style="{
          backgroundImage: `linear-gradient(to bottom right, rgba(155,35,53,0.82), rgba(110,23,38,0.70)), url('${banners[currentBanner].bg}')`
        }"
      >
        <div class="hero-slide-content">
          <h1>{{ banners[currentBanner].title }}</h1>
          <p>{{ banners[currentBanner].sub }}</p>
          <button class="hero-cta" @click="banners[currentBanner].action()">
            {{ banners[currentBanner].cta }}
          </button>
        </div>
      </div>
    </transition>
    <div class="banner-dots">
      <button
        v-for="(_, i) in banners"
        :key="i"
        type="button"
        class="banner-dot"
        :class="{ active: i === currentBanner }"
        @click="goToBanner(i)"
      />
    </div>
  </div>

  <!-- 五大承諾（獨立元件） -->
  <TrustSection />

  <main class="study-landing-wrapper">
    <!-- 學習方式卡片 -->
    <section class="landing-section">
      <h2 class="landing-section-title">選擇你的學習方式</h2>
      <div class="mode-grid">
        <div
          v-for="mode in studyModes"
          :key="mode.value"
          class="mode-card"
          @click="goToSchoolsByMode(mode.value)"
        >
          <div class="mode-card-img-wrap">
            <img :src="mode.image" :alt="mode.label" class="mode-card-img" />
            <span class="mode-card-badge">{{ mode.sub }}</span>
          </div>
          <div class="mode-card-body">
            <h3 class="mode-card-title">{{ mode.label }}</h3>
            <p class="mode-card-desc">{{ mode.desc }}</p>
            <div class="mode-card-tags">
              <span v-for="tag in mode.tags" :key="tag" class="mode-card-tag">{{ tag }}</span>
            </div>
          </div>
          <div class="mode-card-footer">
            <span class="mode-card-cta">了解更多 →</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 地區選擇：日本地圖 -->
    <section class="landing-section landing-section--alt">
      <h2 class="landing-section-title">{{ $t('schoolOverview.regionLabel') }}</h2>
      <JapanZoneMap v-model="selectedZone" />
    </section>

    <!-- 留學情報 -->
    <section v-if="latestNews && latestNews.length" class="landing-section">
      <h2 class="landing-section-title">留學情報</h2>
      <ClientOnly>
        <Swiper
          :slides-per-view="1"
          :space-between="20"
          :loop="latestNews.length > 3"
          :breakpoints="{ 640: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }"
          class="news-swiper"
        >
          <SwiperSlide v-for="(article, i) in latestNews" :key="article.path + i">
            <NuxtLink :to="toPagePath(article.path)" class="news-card">
              <img v-if="article.cover" :src="article.cover" :alt="article.title" class="news-card-img" />
              <div v-else class="news-card-img news-card-img--placeholder" aria-hidden="true" />
              <div class="news-card-body">
                <span class="news-card-date">{{ formatDate(article.date) }}</span>
                <h3 class="news-card-title">{{ article.title }}</h3>
                <p class="news-card-desc">{{ article.description }}</p>
              </div>
            </NuxtLink>
          </SwiperSlide>
        </Swiper>
        <template #fallback>
          <div class="news-fallback-grid">
            <NuxtLink
              v-for="(article, i) in latestNews.slice(0, 3)"
              :key="article.path + i"
              :to="toPagePath(article.path)"
              class="news-card"
            >
              <img v-if="article.cover" :src="article.cover" :alt="article.title" class="news-card-img" />
              <div v-else class="news-card-img news-card-img--placeholder" aria-hidden="true" />
              <div class="news-card-body">
                <span class="news-card-date">{{ formatDate(article.date) }}</span>
                <h3 class="news-card-title">{{ article.title }}</h3>
                <p class="news-card-desc">{{ article.description }}</p>
              </div>
            </NuxtLink>
          </div>
        </template>
      </ClientOnly>
    </section>

    <!-- 熱門學校推薦 -->
    <section class="landing-section">
      <h2 class="landing-section-title">{{ $t('schoolOverview.title') }}</h2>
      <div class="featured-grid">
        <NuxtLink
          v-for="(school, i) in featuredSchools"
          :key="i"
          :to="`/study/${encodeURIComponent(school.name)}`"
          class="featured-card"
        >
          <img :src="school.image" :alt="`${school.name} 日本留學 學校介紹`" />
          <div class="featured-card-body">
            <h3>{{ school.name }}</h3>
            <p>{{ school.location }}</p>
            <span class="featured-card-link">{{ $t('schoolDetail.viewMore') }}</span>
          </div>
        </NuxtLink>
      </div>
      <div class="landing-section-more">
        <button class="btn-outline-primary" @click="goToAllSchools">
          {{ $t('schoolOverview.moreDetail') }}
        </button>
      </div>
    </section>
  </main>

  <ContactIcon />
  <Footer />
</template>

<style scoped>
/* ════════════════════════════════
   手動輪播橫幅
════════════════════════════════ */
.hero-banner {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.hero-slide {
  width: 100%;
  min-height: 480px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
}

.hero-slide-content {
  max-width: 680px;
}

.hero-slide-content h1 {
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: 800;
  color: #F8F4EC;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.hero-slide-content p {
  font-size: var(--text-lg);
  color: rgba(248, 244, 236, 0.88);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-cta {
  border: 2px solid #F8F4EC;
  border-radius: var(--radius-full);
  padding: 0.9rem 2.2rem;
  font-weight: 700;
  font-size: var(--text-base);
  background: transparent;
  color: #F8F4EC;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.hero-cta:hover {
  background: #F8F4EC;
  color: var(--c-primary);
}

.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 0.6s ease;
}

.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
}

.banner-dots {
  position: absolute;
  bottom: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.banner-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(248, 244, 236, 0.4);
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
  padding: 0;
}

.banner-dot.active {
  background: #F8F4EC;
  transform: scale(1.3);
}

/* ════════════════════════════════
   Landing wrapper & Section
════════════════════════════════ */
.study-landing-wrapper {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.landing-section { padding: 3rem 0; }

.landing-section--alt {
  /* background: var(--c-primary-muted); */
  border-radius: var(--radius-lg);
  padding: 2rem;
}

.landing-section-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin-bottom: 2rem;
}

.landing-section-more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.btn-outline-primary {
  border: 1px solid var(--c-primary);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--c-primary);
  font-size: var(--text-sm);
  font-weight: 700;
  padding: 0.9rem 2.2rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.btn-outline-primary:hover {
  background: var(--c-primary);
  color: #fff;
}

/* ════════════════════════════════
   學習方式卡片
════════════════════════════════ */
.mode-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.mode-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: border-color var(--transition-fast);
}

.mode-card:hover { border-color: var(--c-primary); }
.mode-card:hover .mode-card-cta { color: var(--c-primary-light); }
.mode-card-img-wrap { position: relative; }

.mode-card-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.mode-card-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: var(--c-primary);
  color: #fff;
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
}

.mode-card-body { padding: 1.2rem 1.4rem; flex: 1; }

.mode-card-title {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.6rem;
}

.mode-card-desc {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0 0 1rem;
}

.mode-card-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }

.mode-card-tag {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--c-primary-dark);
  background: var(--c-primary-muted);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
}

.mode-card-footer {
  padding: 0.9rem 1.4rem;
  border-top: 1px solid var(--c-border);
}

.mode-card-cta {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary);
  transition: color var(--transition-fast);
}

/* ════════════════════════════════
   留學情報
════════════════════════════════ */
.news-swiper { padding-bottom: 1rem; }

.news-fallback-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.news-card {
  display: block;
  height: 100%;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: border-color var(--transition-fast);
}

.news-card:hover { border-color: var(--c-primary); }
.news-card-img { width: 100%; height: 160px; object-fit: cover; }
.news-card-img--placeholder { background: var(--c-primary-muted); height: 160px; }
.news-card-body { padding: 1.2rem; }

.news-card-date {
  font-size: var(--text-xs);
  color: var(--c-primary);
  font-weight: 600;
}

.news-card-title {
  font-size: var(--text-base);
  font-weight: 700;
  margin: 0.4rem 0;
  color: var(--c-text);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card-desc {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ════════════════════════════════
   熱門學校推薦
════════════════════════════════ */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.featured-card {
  display: block;
  background: var(--c-bg-alt);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: border-color var(--transition-fast);
}

.featured-card:hover { border-color: var(--c-primary); }
.featured-card img { width: 100%; height: 160px; object-fit: cover; }
.featured-card-body { padding: 1rem; }

.featured-card-body h3 {
  font-size: var(--text-base);
  font-weight: 700;
  margin-bottom: 0.3rem;
  color: var(--c-text);
}

.featured-card-body p {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  margin-bottom: 0.6rem;
}

.featured-card-link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--c-primary);
}

/* ════════════════════════════════
   RWD
════════════════════════════════ */
@media (max-width: 900px) {
  .mode-grid,
  .featured-grid,
  .news-fallback-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .landing-section--alt { padding: 1.5rem 1rem; }
}

@media (max-width: 640px) {
  .hero-slide { min-height: 360px; padding: 3rem 1.5rem; }
  .hero-slide-content h1 { font-size: var(--text-3xl); }
  .hero-slide-content p { font-size: var(--text-base); }
  .study-landing-wrapper { padding: 1.5rem 1rem 3rem; }
  .landing-section { padding: 2rem 0; }
  .landing-section--alt { padding: 1.2rem 0.8rem; border-radius: var(--radius-md); }
  .landing-section-title { font-size: var(--text-xl); margin-bottom: 1.2rem; }
  .mode-grid, .featured-grid, .news-fallback-grid { grid-template-columns: 1fr; }
  .mode-card-img { height: 140px; }
}

@media (max-width: 480px) {
  .hero-slide-content h1 { font-size: var(--text-2xl); }
  .mode-card-body { padding: 1rem; }
  .mode-card-footer { padding: 0.75rem 1rem; }
  .news-card-body { padding: 0.9rem; }
  .featured-card-body { padding: 0.8rem; }
}
</style>