<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <div class="lp work-lp" :class="{ 'reveal-on': revealReady }">
    <!-- ── Hero：全幅圖片輪播 ── -->
    <section class="lp-hero lp-hero--zoom" @mouseenter="pauseHero" @mouseleave="resumeHero">
      <div class="lp-hero__slides" aria-hidden="true">
        <div v-for="(src, i) in heroSlides" :key="src" class="lp-hero__slide"
          :class="{ 'is-active': heroIndex === i }">
          <img :src="src" alt="" :loading="i === 0 ? 'eager' : 'lazy'"
            :fetchpriority="i === 0 ? 'high' : 'low'" decoding="async" />
        </div>
      </div>
      <div class="lp-hero__shade" aria-hidden="true" />

      <div class="lp-hero__inner">
        <div class="lp-hero__content">
          <h1 class="lp-hero__title">{{ $t('hero.title') }}</h1>
          <p class="lp-hero__lead">{{ $t('hero.subtitle') }}</p>
          <div class="lp-hero__actions">
            <NuxtLink :to="localePath('/contact')" class="lp-btn lp-btn--light">{{ $t('home.cta.btn') }}</NuxtLink>
            <NuxtLink :to="localePath('/work/information')" class="lp-btn lp-btn--ghost">
              {{ $t('home.links.information') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="lp-hero__dots">
        <button v-for="(src, i) in heroSlides" :key="src" type="button" class="lp-hero__dot"
          :class="{ 'is-active': heroIndex === i, 'is-paused': heroPaused }"
          :aria-label="`${i + 1} / ${heroSlides.length}`" :aria-current="heroIndex === i ? 'true' : undefined"
          @click="goHero(i)">
          <span />
        </button>
      </div>
    </section>

    <!-- ── 簽證類型 ── -->
    <section class="lp-section">
      <div class="lp-inner">
        <h2 class="lp-heading" data-reveal>{{ $t('visa.title') }}</h2>
        <p class="lp-sub" data-reveal>{{ $t('visa.subtitle') }}</p>

        <div class="visa-list">
          <article v-for="(visa, i) in visas" :key="visa.key" class="visa-item"
            :class="{ 'visa-item--reverse': i % 2 === 1 }">
            <div class="visa-item__media" :data-reveal="i % 2 === 1 ? 'right' : 'left'">
              <img :src="visa.img" :alt="$t(`visa.${visa.key}.alt`)" loading="lazy" decoding="async" />
            </div>
            <div class="visa-item__text" :data-reveal="i % 2 === 1 ? 'left' : 'right'">
              <span class="visa-item__num" aria-hidden="true">0{{ i + 1 }}</span>
              <h3 class="visa-item__title">{{ $t(`visa.${visa.key}.title`) }}</h3>
              <p class="visa-item__desc">{{ $t(`visa.${visa.key}.desc`) }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ── 合作邀請：背景圖 + 五項優勢 ── -->
    <section class="lp-band work-band">
      <div class="lp-inner">
        <h2 class="lp-heading lp-heading--light" data-reveal>{{ $t('cooperation.title') }}</h2>
        <p class="lp-sub lp-sub--light" data-reveal>
          {{ $t('cooperation.q1') }}<br />{{ $t('cooperation.q2') }}
        </p>
        <div class="lp-glass-grid strengths">
          <div v-for="(node, i) in strengths" :key="i" class="lp-glass" data-reveal :style="`--d: ${i * 90}ms`">
            <span class="lp-glass__num" aria-hidden="true">0{{ i + 1 }}</span>
            <h3 class="lp-glass__title">{{ node.title }}</h3>
            <p class="lp-glass__body">{{ node.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 為何雇用外籍人士 ── -->
    <section class="lp-section">
      <div class="lp-inner">
        <h2 class="lp-heading" data-reveal>{{ $t('foreign.title') }}</h2>

        <div class="talent">
          <div class="talent__media" data-reveal>
            <img src="/images/home/work-reason.jpg" :alt="$t('foreign.imageAlt')" loading="lazy" decoding="async" />
          </div>
          <div class="talent__cards">
            <div v-for="(group, gi) in audiences" :key="group" class="talent__card" data-reveal
              :style="`--d: ${gi * 120}ms`">
              <h3 class="talent__title">{{ $t(`foreign.${group}.title`) }}</h3>
              <ul class="talent__list">
                <li v-for="n in 4" :key="n">{{ $t(`foreign.${group}.point${n}`) }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 合作流程 ── -->
    <section class="lp-section lp-section--alt">
      <div class="lp-inner">
        <h2 class="lp-heading" data-reveal>{{ $t('flow.title') }}</h2>
        <p class="lp-sub" data-reveal>{{ $t('flow.subtitle') }}</p>
        <ol class="lp-flow" :style="`--steps: ${flowSteps.length}`" data-reveal>
          <li v-for="(step, index) in flowSteps" :key="index" class="lp-flow__step" :style="`--i: ${index}`">
            <span class="lp-flow__num">{{ index + 1 }}</span>
            <div>
              <h3 class="lp-flow__title">{{ step.title }}</h3>
              <p class="lp-flow__body">{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ── 就職情報：輪播 ── -->
    <section v-if="newsItems.length" class="lp-section">
      <div class="lp-inner">
        <h2 class="lp-heading" data-reveal>{{ $t('home.news.heading') }}</h2>
        <div class="lp-carousel" data-reveal>
          <ClientOnly>
            <Swiper :modules="swiperModules" :navigation="true" :pagination="{ clickable: true }"
              :slides-per-view="1.1" :space-between="16" :breakpoints="{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 }
              }">
              <SwiperSlide v-for="article in newsItems" :key="article.path">
                <NuxtLink :to="toPagePath(article.path)" class="lp-news">
                  <div class="lp-news__thumb">
                    <img v-if="article.cover" :src="String(article.cover)" :alt="String(article.title)"
                      loading="lazy" decoding="async" />
                  </div>
                  <div class="lp-news__body">
                    <time class="lp-news__date" :datetime="String(article.date)">{{ formatDate(article.date) }}</time>
                    <h3 class="lp-news__title">{{ article.title }}</h3>
                    <p class="lp-news__desc">{{ article.description }}</p>
                    <span class="lp-news__more">
                      {{ $t('home.news.readMore') }} <span class="lp-arrow" aria-hidden="true">→</span>
                    </span>
                  </div>
                </NuxtLink>
              </SwiperSlide>
            </Swiper>
            <!-- 伺服器端輸出一般格狀清單：文章連結要留在初始 HTML 裡 -->
            <template #fallback>
              <div class="lp-news-grid">
                <NuxtLink v-for="article in newsItems" :key="article.path" :to="toPagePath(article.path)"
                  class="lp-news">
                  <div class="lp-news__thumb">
                    <img v-if="article.cover" :src="String(article.cover)" :alt="String(article.title)"
                      loading="lazy" decoding="async" />
                  </div>
                  <div class="lp-news__body">
                    <time class="lp-news__date" :datetime="String(article.date)">{{ formatDate(article.date) }}</time>
                    <h3 class="lp-news__title">{{ article.title }}</h3>
                    <p class="lp-news__desc">{{ article.description }}</p>
                  </div>
                </NuxtLink>
              </div>
            </template>
          </ClientOnly>
        </div>
        <div class="lp-more">
          <NuxtLink :to="localePath('/work/information')" class="lp-link">
            {{ $t('home.news.all') }} <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── 結尾 CTA ── -->
    <section class="lp-cta work-cta">
      <div class="lp-cta__inner" data-reveal>
        <h2 class="lp-cta__title">{{ $t('home.cta.heading') }}</h2>
        <p class="lp-cta__body">{{ $t('home.cta.body') }}</p>
        <NuxtLink :to="localePath('/contact')" class="lp-btn lp-btn--light">{{ $t('home.cta.btn') }}</NuxtLink>
      </div>
    </section>
  </div>

  <Footer />
</template>


<script lang="ts" setup>
import { ref, computed } from "vue";
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const swiperModules = [Navigation, Pagination, Autoplay]

const navOpen = ref(false);
const toggleNav = () => (navOpen.value = !navOpen.value);
const { t } = useI18n()
const localePath = useLocalePath()
useSeoMeta({
  title: t('seo.work.title'),
  description: t('seo.work.description'),
  // 原本這兩行誤用了 seo.study 的文案，分享出去的標題跟頁面不符
  ogTitle: t('seo.work.title'),
  ogDescription: t('seo.work.description'),
})

usePageUrlMeta()

useServiceSchema({
  name: '赴日就職・特定技能簽證媒合服務',
  description:
    'FORMA 專精日本特定技能簽證申請與跨國人才就業媒合，協助台灣與東南亞人才通過技能評量測試、取得合法工作簽證並進入日本職場。服務涵蓋職缺媒合、履歷與職務經歷書撰寫指導、簽證文件全程準備，以及抵日後的生活安頓支援；企業端則提供合規的海外人才引進與定著支援。求職者不收介紹費。',
  path: '/work',
  serviceType: ['日本就職支援', '特定技能簽證代辦', '台日人才媒合', '工作簽證申請協助', '企業海外人才引進'],
  freeOfCharge: true,
})

useBreadcrumbSchema([{ name: '赴日就職', path: '/work' }])

// ── Hero 輪播 ──
const heroSlides = [
  '/images/home/work-hero-1.jpg',
  '/images/home/hero-4.jpg',
  '/images/home/work-hero-3.jpg',
]
const {
  index: heroIndex,
  paused: heroPaused,
  go: goHero,
  pause: pauseHero,
  resume: resumeHero,
} = useHeroSlider(heroSlides.length)

const { revealReady } = useScrollReveal('.work-lp')

// LCP 是 hero 第一張圖：提早預載，不用等到解析到 <img> 才開始下載
useHead({
  link: [{ rel: 'preload', as: 'image', href: '/images/home/work-hero-1.jpg', fetchpriority: 'high' }],
})

// ── 簽證類型 ──
const visas = [
  { key: 'special', img: '/images/home/visa-special.jpg' },
  { key: 'engineer', img: '/images/home/visa-engineer.jpg' },
  { key: 'intern', img: '/images/home/visa-intern.jpg' },
]

// ── 合作優勢 ──
const strengths = computed(() =>
  [1, 2, 3, 4, 5].map((n) => ({
    title: t(`cooperation.nodes.node${n}.title`),
    desc: t(`cooperation.nodes.node${n}.desc`),
  }))
)

const audiences = ['employer', 'jobseeker']

// flowSteps 用 computed，會隨語言切換更新
const flowSteps = computed(() => [
  { title: t('flow.steps[0].title'), desc: t('flow.steps[0].desc') },
  { title: t('flow.steps[1].title'), desc: t('flow.steps[1].desc') },
  { title: t('flow.steps[2].title'), desc: t('flow.steps[2].desc') },
  { title: t('flow.steps[3].title'), desc: t('flow.steps[3].desc') },
  { title: t('flow.steps[4].title'), desc: t('flow.steps[4].desc') }
])

// ── 就職情報 ──
const { data: workArticles } = await useAsyncData('work-latest-news', () =>
  queryCollection('content')
    .where('path', 'LIKE', '/information/work/%')
    // 只取卡片需要的欄位：不 select 的話整篇文章內文都會被塞進頁面 payload
    .select('path', 'title', 'description', 'date', 'cover')
    .all()
)

const newsItems = computed(() =>
  ((workArticles.value ?? []) as any[])
    // 排除帶語言後綴的重複檔（foo.ja.md / foo.en.md）
    .filter((a) => !/\.(ja|en)$/.test(String(a.path ?? '')))
    .filter((a) => a.title && a.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
)

function toPagePath(contentPath: string): string {
  return localePath(contentPath.replace('/information/work/', '/work/information/'))
}

function formatDate(d?: string | null) {
  if (!d) return ''
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return String(d)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
/* 共用的 lp-* 樣式在 assets/css/landing.css，這裡只放本頁專屬的部分 */

/* ── 簽證類型：圖文左右交錯 ── */
.visa-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.visa-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.visa-item--reverse .visa-item__media {
  order: 2;
}

.visa-item__media {
  position: relative;
  aspect-ratio: 3 / 2;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 18px 40px color-mix(in srgb, var(--c-primary-dark) 18%, transparent);
}

.visa-item__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.visa-item:hover .visa-item__media img {
  transform: scale(1.06);
}

.visa-item__text {
  text-align: left;
}

.visa-item__num {
  display: block;
  font-family: var(--font-heading);
  font-size: 3.2rem;
  line-height: 1;
  font-weight: 800;
  color: var(--c-primary);
  opacity: 0.22;
}

.visa-item__title {
  position: relative;
  font-family: var(--font-heading);
  font-size: clamp(1.3rem, 2.4vw, 1.7rem);
  font-weight: 800;
  color: var(--c-primary-dark);
  line-height: 1.4;
  margin: 0.4rem 0 1rem;
  padding-left: 1rem;
}

.visa-item__title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.2em;
  bottom: 0.2em;
  width: 4px;
  border-radius: 4px;
  background: var(--c-primary);
}

.visa-item__desc {
  color: var(--c-text-secondary);
  line-height: 1.9;
  margin: 0;
}

/* ── 合作優勢 ── */
.work-band {
  background-image:
    linear-gradient(rgba(15, 35, 71, 0.86), rgba(10, 15, 26, 0.88)),
    url('/images/human_resource/strengths_background.jpg');
}

.strengths {
  grid-template-columns: repeat(6, 1fr);
}

.strengths .lp-glass {
  grid-column: span 2;
}

/* 五張卡：上排三張、下排兩張置中 */
.strengths .lp-glass:nth-child(4) {
  grid-column: 2 / span 2;
}

/* ── 為何雇用外籍人士 ── */
/* 這張圖本身帶文字，維持原比例完整顯示，不裁切 */
.talent {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.talent__media {
  width: min(100%, 880px);
  margin: 0 auto;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 18px 40px color-mix(in srgb, var(--c-primary-dark) 18%, transparent);
}

.talent__media img {
  width: 100%;
  height: auto;
  display: block;
}

.talent__cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.talent__card {
  flex: 1;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-top: 4px solid var(--c-primary);
  border-radius: var(--radius-lg);
  padding: 1.75rem 1.75rem 1.9rem;
  text-align: left;
}

.talent__card:hover {
  box-shadow: 0 14px 32px color-mix(in srgb, var(--c-primary) 12%, transparent);
}

.talent__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--c-primary-dark);
  margin: 0 0 1.1rem;
}

.talent__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.8rem;
}

.talent__list li {
  position: relative;
  padding-left: 1.9rem;
  color: var(--c-text-secondary);
  line-height: 1.7;
}

/* 勾勾 */
.talent__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.3em;
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  background: var(--c-primary-muted);
}

.talent__list li::after {
  content: '';
  position: absolute;
  left: 0.4rem;
  top: 0.52em;
  width: 0.35rem;
  height: 0.6rem;
  border: solid var(--c-primary);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* ── 結尾 CTA 背景 ── */
.work-cta {
  background-image:
    linear-gradient(rgba(15, 35, 71, 0.8), rgba(10, 15, 26, 0.85)),
    url('/images/home/band.jpg');
}

@media (max-width: 900px) {
  .visa-list {
    gap: 3rem;
  }

  .visa-item {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .visa-item--reverse .visa-item__media {
    order: 0;
  }

  .strengths {
    grid-template-columns: repeat(2, 1fr);
  }

  .strengths .lp-glass,
  .strengths .lp-glass:nth-child(4) {
    grid-column: auto;
  }

  .talent__cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .strengths {
    grid-template-columns: 1fr;
  }
}
</style>
