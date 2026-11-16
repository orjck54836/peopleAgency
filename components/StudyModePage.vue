<script lang="ts" setup>
/**
 * 短期遊學／長期留學／升學進修三個內頁共用的版面。
 * 三頁原本各自複製一份幾乎相同的 template 和樣式，改一處要改三次，所以收成一個元件；
 * 各頁只保留自己的 SEO、結構化資料，以及「有哪些區塊、用哪幾張圖」這些差異。
 * 文案全部從 i18n 的 `${mode}.*` 讀。
 */
type Mode = 'shortTerm' | 'longTerm' | 'university'

const props = defineProps<{
  mode: Mode
  /** 這一頁有哪些區塊；listCount 是該區塊在語系檔裡的條列數，0 代表只有內文 */
  sections: Array<{ id: string; listCount: number }>
  heroImage: string
  /** 「什麼是…」旁邊的照片 */
  introImage: string
  /** 「課程特色」旁邊的照片 */
  featuresImage: string
  /** 推薦學校要帶到總覽頁的課程標籤（短期／長期／升學） */
  schoolTag: string
  /** 推薦學校收哪些學校類型 */
  schoolTypes?: string[]
}>()

const { t } = useI18n()
const localePath = useLocalePath()

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

// 每個區塊用哪種版型由 id 決定：同一個 id 在三頁的內容性質相同
const layoutOf = (id: string, hasList: boolean) => {
  if (id === 'whatIs' || id === 'features') return 'split'
  if (id === 'whoFor') return 'cards'
  if (id === 'process') return 'timeline'
  if (id === 'cost') return 'cost'
  if (id === 'reminder' || id === 'howWeHelp') return 'callout'
  return hasList ? 'checklist' : 'prose'
}

const blocks = computed(() =>
  props.sections.map((meta) => {
    const base = `${props.mode}.sections.${meta.id}`
    const body = t(`${base}.body`)
    return {
      id: meta.id,
      layout: layoutOf(meta.id, meta.listCount > 0),
      title: t(`${base}.title`),
      // 語系檔用空行分段，拆成多個 <p> 才有段距
      paragraphs: body ? body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) : [],
      list: Array.from({ length: meta.listCount }, (_, j) => ({
        title: t(`${base}.list.${j}.title`),
        desc: t(`${base}.list.${j}.desc`),
      })),
      image: meta.id === 'whatIs' ? props.introImage : meta.id === 'features' ? props.featuresImage : '',
    }
  })
)

const chips = computed(() => Array.from({ length: 5 }, (_, i) => t(`${props.mode}.chips.${i}`)))

// 三種留學方式互相切換
const modeTabs = computed(() =>
  ([
    { mode: 'shortTerm', path: '/study/short-term' },
    { mode: 'longTerm', path: '/study/long-term' },
    { mode: 'university', path: '/study/university' },
  ] as Array<{ mode: Mode; path: string }>).map((m) => ({
    ...m,
    label: t(`${m.mode}.hero.tag`),
    active: m.mode === props.mode,
  }))
)

const recommendedSchools = ref<any[]>([])

async function fetchSchools() {
  try {
    const res = await fetch('/api/schools')
    const json = await res.json()
    if (json.success) {
      const types = props.schoolTypes ?? ['語言學校']
      const pool = json.data.filter((s: any) => types.includes(s.type))
      // 有標這個課程標籤的學校排前面，才不會在短期頁推薦到只收長期生的學校
      const ranked = [
        ...pool.filter((s: any) => s.tags?.includes(props.schoolTag)),
        ...pool.filter((s: any) => !s.tags?.includes(props.schoolTag)),
      ]
      // 同一個體系的分校（校名只差括號裡的校區）先只取一間，免得三格都是同一家
      const seen = new Set<string>()
      const distinct = ranked.filter((s: any) => {
        const brand = s.name.replace(/（.*?）/g, '')
        if (seen.has(brand)) return false
        seen.add(brand)
        return true
      })
      recommendedSchools.value = [...distinct, ...ranked.filter((s: any) => !distinct.includes(s))].slice(0, 3)
    }
  } catch (err) {
    console.error('❌ 無法取得學校資料：', err)
  }
}

onMounted(fetchSchools)

const allSchoolsLink = computed(() => ({
  path: localePath('/study/schools'),
  query: { type: '語言學校', tags: [props.schoolTag] },
}))

// 學校照片放在遠端，壞圖時收掉 <img>，露出底下的品牌色底
function onImgError(e: Event) {
  (e.target as HTMLElement).style.visibility = 'hidden'
}

const { revealReady } = useScrollReveal('.mp')
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <main class="mp" :class="{ 'reveal-on': revealReady }">
    <!-- Hero -->
    <section class="mp-hero">
      <img class="mp-hero__bg" :src="heroImage" alt="" width="1920" height="1280" fetchpriority="high" />
      <div class="mp-hero__shade" aria-hidden="true"></div>

      <div class="mp-hero__inner">
        <p class="mp-hero__tag">{{ $t(`${mode}.hero.tag`) }}</p>
        <h1 class="mp-hero__title" v-html="$t(`${mode}.hero.title`)" />
        <p class="mp-hero__sub">{{ $t(`${mode}.hero.sub`) }}</p>

        <ul class="mp-chips">
          <li v-for="chip in chips" :key="chip">{{ chip }}</li>
        </ul>

        <div class="mp-hero__actions">
          <NuxtLink :to="localePath('/contact')" class="lp-btn lp-btn--light">{{ $t('home.cta.btn') }}</NuxtLink>
          <a href="#schools" class="lp-btn lp-btn--ghost">{{ $t(`${mode}.schools.title`) }}</a>
        </div>
      </div>
    </section>

    <!-- 三種方式切換：壓在 Hero 下緣 -->
    <nav class="mp-modes" aria-label="study modes">
      <NuxtLink
        v-for="m in modeTabs"
        :key="m.mode"
        :to="localePath(m.path)"
        class="mp-mode"
        :class="{ active: m.active }"
        :aria-current="m.active ? 'page' : undefined"
      >
        {{ m.label }}
      </NuxtLink>
    </nav>

    <!-- 內容區塊 -->
    <section
      v-for="(sec, i) in blocks"
      :id="sec.id"
      :key="sec.id"
      class="mp-section"
      :class="[`mp-section--${sec.layout}`, { 'mp-section--alt': i % 2 === 1 }]"
    >
      <div class="mp-section__inner">
        <!-- 圖文並排 -->
        <template v-if="sec.layout === 'split'">
          <div class="mp-split" :class="{ 'mp-split--reverse': sec.id === 'features' }">
            <div class="mp-split__text" data-reveal>
              <h2 class="mp-title">{{ sec.title }}</h2>
              <p v-for="(p, j) in sec.paragraphs" :key="j" class="mp-text">{{ p }}</p>
            </div>
            <div class="mp-split__media" :data-reveal="sec.id === 'features' ? 'left' : 'right'">
              <img :src="sec.image" :alt="sec.title" loading="lazy" width="1200" height="900" />
            </div>
          </div>
        </template>

        <!-- 適合對象：卡片 -->
        <template v-else-if="sec.layout === 'cards'">
          <h2 class="mp-title mp-title--center" data-reveal>{{ sec.title }}</h2>
          <p v-for="(p, j) in sec.paragraphs" :key="j" class="mp-text mp-text--center" data-reveal>{{ p }}</p>
          <ul class="mp-cards">
            <li v-for="(item, j) in sec.list" :key="j" class="mp-card" data-reveal :style="{ '--d': `${j * 80}ms` }">
              <span class="mp-card__no" aria-hidden="true">{{ String(j + 1).padStart(2, '0') }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </li>
          </ul>
        </template>

        <!-- 申請流程：時間軸 -->
        <template v-else-if="sec.layout === 'timeline'">
          <h2 class="mp-title mp-title--center" data-reveal>{{ sec.title }}</h2>
          <p v-for="(p, j) in sec.paragraphs" :key="j" class="mp-text mp-text--center" data-reveal>{{ p }}</p>
          <ol class="mp-timeline" data-reveal>
            <li v-for="(item, j) in sec.list" :key="j" class="mp-step" :style="{ '--i': j }">
              <span class="mp-step__dot" aria-hidden="true">{{ j + 1 }}</span>
              <div class="mp-step__body">
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
            </li>
          </ol>
        </template>

        <!-- 費用：三格 -->
        <template v-else-if="sec.layout === 'cost'">
          <h2 class="mp-title mp-title--center" data-reveal>{{ sec.title }}</h2>
          <p v-for="(p, j) in sec.paragraphs" :key="j" class="mp-text mp-text--center" data-reveal>{{ p }}</p>
          <ul class="mp-costs">
            <li
              v-for="(item, j) in sec.list"
              :key="j"
              class="mp-cost"
              :class="{ 'mp-cost--total': j === sec.list.length - 1 }"
              data-reveal
              :style="{ '--d': `${j * 90}ms` }"
            >
              <span class="mp-cost__icon" aria-hidden="true">
                <svg v-if="j === 0" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9 12 4l10 5-10 5L2 9Z" /><path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" /></svg>
                <svg v-else-if="j === 1" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>
                <svg v-else viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4l6 8 6-8" /><path d="M12 12v8M7 13h10M7 17h10" /></svg>
              </span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </li>
          </ul>
        </template>

        <!-- 必備文件：打勾清單 -->
        <template v-else-if="sec.layout === 'checklist'">
          <div class="mp-narrow">
            <h2 class="mp-title" data-reveal>{{ sec.title }}</h2>
            <p v-for="(p, j) in sec.paragraphs" :key="j" class="mp-text" data-reveal>{{ p }}</p>
            <ul class="mp-checklist">
              <li v-for="(item, j) in sec.list" :key="j" data-reveal :style="{ '--d': `${j * 80}ms` }">
                <span class="mp-check" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10" /></svg>
                </span>
                <div>
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <!-- 提醒／皓學如何協助：強調框 -->
        <template v-else-if="sec.layout === 'callout'">
          <div class="mp-callout" data-reveal>
            <span class="mp-callout__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.600.5 1 1.3 1 2.1h5c0-.800.4-1.6 1-2.1A6 6 0 0 0 12 3Z" /></svg>
            </span>
            <div class="mp-callout__body">
              <h2 class="mp-title">{{ sec.title }}</h2>
              <p v-for="(p, j) in sec.paragraphs" :key="j" class="mp-text">{{ p }}</p>
              <NuxtLink :to="localePath('/contact')" class="lp-btn lp-btn--primary mp-callout__btn">
                {{ $t('home.cta.btn') }}
              </NuxtLink>
            </div>
          </div>
        </template>

        <!-- 純內文 -->
        <template v-else>
          <div class="mp-narrow" data-reveal>
            <h2 class="mp-title">{{ sec.title }}</h2>
            <p v-for="(p, j) in sec.paragraphs" :key="j" class="mp-text">{{ p }}</p>
          </div>
        </template>
      </div>
    </section>

    <!-- 推薦學校 -->
    <section id="schools" class="mp-section mp-schools">
      <div class="mp-section__inner">
        <h2 class="mp-title mp-title--center" data-reveal>{{ $t(`${mode}.schools.title`) }}</h2>
        <p class="mp-text mp-text--center" data-reveal>{{ $t(`${mode}.schools.sub`) }}</p>

        <!-- 學校是掛載後才抓的，所以用 CSS 動畫進場，不走 data-reveal（observer 不會看到後來才出現的元素） -->
        <div v-if="recommendedSchools.length" class="mp-school-grid">
          <NuxtLink
            v-for="(school, i) in recommendedSchools"
            :key="school.name"
            :to="localePath(`/study/${encodeURIComponent(school.name)}`)"
            class="mp-school"
            :style="{ '--i': i }"
          >
            <div class="mp-school__img">
              <img :src="school.image" :alt="school.name" loading="lazy" @error="onImgError" />
              <span class="mp-school__loc">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
                {{ school.location }}
              </span>
            </div>
            <div class="mp-school__body">
              <h3>{{ school.name }}</h3>
              <span class="mp-school__link">{{ $t(`${mode}.schools.detail`) }}</span>
            </div>
          </NuxtLink>
        </div>

        <div class="mp-schools__cta">
          <NuxtLink :to="allSchoolsLink" class="lp-btn lp-btn--primary">
            {{ $t(`${mode}.schools.viewAll`) }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 底部 CTA：和 /study 入口頁共用樣式與文案 -->
    <section class="lp-cta mp-cta">
      <div class="lp-cta__inner" data-reveal>
        <h2 class="lp-cta__title">{{ $t('home.cta.heading') }}</h2>
        <p class="lp-cta__body">{{ $t('home.cta.body') }}</p>
        <NuxtLink :to="localePath('/contact')" class="lp-btn lp-btn--light">{{ $t('home.cta.btn') }}</NuxtLink>
      </div>
    </section>
  </main>

  <Footer />
</template>

<style scoped>
.mp {
  --mp-ink: color-mix(in srgb, var(--c-primary-dark) 70%, #000);
  /* 站上的 Header 連同 App 公告列高 148px，錨點要讓過它 */
  --mp-header: 164px;
  background: var(--c-bg);
  overflow-x: clip;
}

/* ── Hero ── */
.mp-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 5rem 1.5rem 7.5rem;
  text-align: center;
  color: #fff;
  background: var(--mp-ink);
}

.mp-hero__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: mp-zoom 18s ease-out both;
}

@keyframes mp-zoom {
  from { transform: scale(1.12); }
  to { transform: scale(1); }
}

/* 三張照片亮度差很多（白天街景、黃昏的塔），遮罩要夠深白字才都讀得到 */
.mp-hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at center, color-mix(in srgb, var(--mp-ink) 80%, transparent) 0%, color-mix(in srgb, var(--mp-ink) 56%, transparent) 75%),
    linear-gradient(0deg, color-mix(in srgb, var(--mp-ink) 80%, transparent) 0%, transparent 45%);
}

.mp-hero__inner {
  max-width: 760px;
  margin: 0 auto;
}

.mp-hero__inner > * {
  animation: mp-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.mp-hero__inner > :nth-child(2) { animation-delay: 0.1s; }
.mp-hero__inner > :nth-child(3) { animation-delay: 0.2s; }
.mp-hero__inner > :nth-child(4) { animation-delay: 0.3s; }
.mp-hero__inner > :nth-child(5) { animation-delay: 0.4s; }

@keyframes mp-rise {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: none; }
}

.mp-hero__tag {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.14em;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--radius-full);
  padding: 0.3rem 1rem;
  margin: 0 0 1.1rem;
}

.mp-hero__title {
  font-family: var(--font-serif);
  font-size: clamp(1.9rem, 4.8vw, 3rem);
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
  margin: 0 0 0.9rem;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
  text-wrap: balance;
}

.mp-hero__sub {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-wrap: balance;
}

.mp-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 1.6rem 0 0;
}

.mp-chips li {
  font-size: var(--text-sm);
  font-weight: 600;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: var(--radius-full);
  padding: 0.3rem 0.9rem;
}

.mp-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
}

/* ── 方式切換 ── */
.mp-modes {
  position: relative;
  z-index: 2;
  display: flex;
  width: fit-content;
  max-width: calc(100% - 2rem);
  margin: -1.9rem auto 0;
  padding: 0.35rem;
  border-radius: var(--radius-full);
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  box-shadow: 0 12px 30px rgba(40, 8, 16, 0.16);
  animation: mp-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.45s both;
}

.mp-mode {
  font-weight: 700;
  color: var(--c-text-secondary);
  text-decoration: none;
  white-space: nowrap;
  border-radius: var(--radius-full);
  padding: 0.65rem 1.6rem;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.mp-mode:hover {
  color: var(--c-primary);
  background: var(--c-primary-muted);
}

.mp-mode.active {
  color: #fff;
  background: var(--c-primary);
}

/* ── 區塊共用 ── */
.mp-section {
  padding: 4.5rem 1.5rem;
  scroll-margin-top: var(--mp-header);
}

.mp-section--alt {
  background: var(--c-bg-alt);
}

.mp-section__inner {
  max-width: 1120px;
  margin: 0 auto;
}

.mp-narrow {
  max-width: 800px;
  margin: 0 auto;
}

.mp-title {
  position: relative;
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 1.35;
  color: var(--c-primary-dark);
  margin: 0 0 1.3rem;
  padding-bottom: 0.9rem;
}

/* 標題下的短線 */
.mp-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 44px;
  height: 4px;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--c-primary-light), var(--c-primary-dark));
}

.mp-title--center {
  text-align: center;
}

.mp-title--center::after {
  left: 50%;
  translate: -50% 0;
}

.mp-text {
  color: var(--c-text-secondary);
  line-height: 2;
  margin: 0 0 1rem;
}

.mp-text:last-child { margin-bottom: 0; }

.mp-text--center {
  max-width: 720px;
  margin-inline: auto;
  text-align: center;
}

/* ── 圖文並排 ── */
.mp-split {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 3.5rem;
  align-items: center;
}

.mp-split--reverse .mp-split__text { order: 2; }
.mp-split--reverse .mp-split__media { order: 1; }

.mp-split__media {
  position: relative;
}

/* 照片後面墊一塊錯位的色塊，版面才不會只是方方正正兩欄 */
.mp-split__media::before {
  content: '';
  position: absolute;
  inset: 1.1rem -1.1rem -1.1rem 1.1rem;
  border-radius: var(--radius-lg);
  background: var(--c-primary-muted);
  border: 1px solid var(--c-border);
}

.mp-split--reverse .mp-split__media::before {
  inset: 1.1rem 1.1rem -1.1rem -1.1rem;
}

.mp-split__media img {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: 0 18px 40px rgba(40, 8, 16, 0.16);
}

/* ── 適合對象 ── */
.mp-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.1rem;
  list-style: none;
  padding: 0;
  margin: 2.2rem 0 0;
}

.mp-card {
  position: relative;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem 1.3rem 1.6rem;
  background: var(--c-surface);
}

.mp-card:hover {
  border-color: var(--c-primary);
  box-shadow: 0 14px 34px rgba(139, 26, 47, 0.12);
  translate: 0 -4px;
}

.mp-card__no {
  display: block;
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  color: var(--c-primary-muted);
  -webkit-text-stroke: 1px var(--c-primary);
  margin-bottom: 0.9rem;
}

.mp-card h3,
.mp-cost h3,
.mp-step h3,
.mp-checklist h3 {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  line-height: 1.45;
  color: var(--c-text);
  margin: 0 0 0.5rem;
}

.mp-card p,
.mp-cost p,
.mp-step p,
.mp-checklist p {
  font-size: var(--text-sm);
  line-height: 1.85;
  color: var(--c-text-secondary);
  margin: 0;
}

/* ── 時間軸 ── */
.mp-timeline {
  position: relative;
  max-width: 760px;
  list-style: none;
  padding: 0;
  margin: 2.4rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

/* 貫穿各步驟的直線 */
.mp-timeline::before {
  content: '';
  position: absolute;
  left: 21px;
  top: 22px;
  bottom: 22px;
  width: 2px;
  background: var(--c-border);
  transform-origin: top;
}

.mp-step {
  position: relative;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 1.1rem;
  align-items: flex-start;
}

.mp-step__dot {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-family: var(--font-serif);
  font-weight: 800;
  color: #fff;
  background: var(--c-primary);
  box-shadow: 0 0 0 5px var(--c-bg-alt);
}

.mp-section:not(.mp-section--alt) .mp-step__dot {
  box-shadow: 0 0 0 5px var(--c-bg);
}

.mp-step__body {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 1.1rem 1.3rem;
  background: var(--c-surface);
}

.mp-step h3 {
  color: var(--c-primary-dark);
}

/* 捲到時：線先往下畫，步驟再依序浮現。沒有 JS 時全部維持可見 */
.reveal-on .mp-timeline::before {
  transform: scaleY(0);
  transition: transform 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) 0.2s;
}

.reveal-on .mp-timeline.is-in::before {
  transform: none;
}

.reveal-on .mp-timeline .mp-step {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s ease calc(0.25s + var(--i) * 160ms),
    transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) calc(0.25s + var(--i) * 160ms);
}

.reveal-on .mp-timeline.is-in .mp-step {
  opacity: 1;
  transform: none;
}

/* ── 費用 ── */
.mp-costs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
  list-style: none;
  padding: 0;
  margin: 2.2rem 0 0;
}

.mp-cost {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 1.6rem 1.4rem;
  background: var(--c-surface);
}

.mp-cost:hover {
  translate: 0 -4px;
  box-shadow: 0 14px 34px rgba(139, 26, 47, 0.12);
}

.mp-cost__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  color: var(--c-primary);
  background: var(--c-primary-muted);
  margin-bottom: 1rem;
}

/* 最後一格是總花費，整格鋪品牌色 */
.mp-cost--total {
  border-color: transparent;
  background: linear-gradient(140deg, var(--c-primary), var(--c-primary-dark));
}

.mp-cost--total h3 { color: #fff; }
.mp-cost--total p { color: rgba(255, 255, 255, 0.9); }

.mp-cost--total .mp-cost__icon {
  color: #fff;
  background: rgba(255, 255, 255, 0.16);
}

/* ── 打勾清單 ── */
.mp-checklist {
  list-style: none;
  padding: 0;
  margin: 1.6rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.mp-checklist li {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 1.1rem 1.3rem;
  background: var(--c-surface);
}

.mp-check {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  margin-top: 0.1rem;
  border-radius: 50%;
  color: #fff;
  background: var(--c-primary);
}

/* ── 強調框 ── */
.mp-callout {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 1.4rem;
  max-width: 880px;
  margin: 0 auto;
  border: 1px solid var(--c-border);
  border-left: 5px solid var(--c-primary);
  border-radius: var(--radius-lg);
  padding: 2rem 2.2rem;
  background: var(--c-surface);
  box-shadow: 0 14px 34px rgba(40, 8, 16, 0.08);
}

.mp-callout__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: var(--c-primary);
  background: var(--c-primary-muted);
}

.mp-callout .mp-title {
  font-size: var(--text-xl);
  margin-bottom: 0.8rem;
  padding-bottom: 0;
}

.mp-callout .mp-title::after { content: none; }

.mp-callout__btn {
  margin-top: 1.4rem;
  padding: 0.75rem 1.8rem;
}

/* ── 推薦學校 ── */
.mp-schools {
  background: var(--c-bg-alt);
  border-top: 1px solid var(--c-border);
}

.mp-school-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2.2rem;
}

.mp-school {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--c-surface);
  color: inherit;
  text-decoration: none;
  animation: mp-rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--i, 0) * 90ms);
  transition: border-color var(--transition-base), box-shadow var(--transition-base), translate var(--transition-base);
}

.mp-school:hover {
  border-color: var(--c-primary);
  box-shadow: 0 14px 34px rgba(139, 26, 47, 0.14);
  translate: 0 -4px;
  color: inherit;
}

.mp-school__img {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: linear-gradient(135deg, var(--c-primary-muted), var(--c-border));
}

.mp-school__img::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 45%;
  background: linear-gradient(0deg, rgba(20, 6, 10, 0.6), transparent);
  pointer-events: none;
}

.mp-school__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.mp-school:hover .mp-school__img img { transform: scale(1.06); }

.mp-school__loc {
  position: absolute;
  left: 0.85rem;
  bottom: 0.7rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #fff;
  font-size: var(--text-sm);
  font-weight: 700;
}

.mp-school__body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  padding: 1rem 1.15rem 1.1rem;
}

.mp-school__body h3 {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  line-height: 1.4;
  color: var(--c-text);
  margin: 0;
  transition: color var(--transition-fast);
}

.mp-school:hover h3 { color: var(--c-primary); }

.mp-school__link {
  margin-top: auto;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary);
}

.mp-schools__cta {
  display: flex;
  justify-content: center;
  margin-top: 2.2rem;
}

/* ── 底部 CTA：共用樣式上疊一張照片 ── */
.mp-cta {
  background:
    linear-gradient(color-mix(in srgb, var(--mp-ink) 78%, transparent), color-mix(in srgb, var(--mp-ink) 78%, transparent)),
    url('/images/home/cta.jpg') center / cover no-repeat;
}

/* ── RWD ── */
@media (max-width: 960px) {
  .mp-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  .mp-split {
    grid-template-columns: minmax(0, 1fr);
    gap: 2.4rem;
  }

  /* 單欄時一律文字在上、照片在下 */
  .mp-split--reverse .mp-split__text { order: 1; }
  .mp-split--reverse .mp-split__media { order: 2; }

  .mp-split__media { margin-right: 1.1rem; }
  .mp-split--reverse .mp-split__media { margin-right: 0; margin-left: 1.1rem; }
}

@media (max-width: 640px) {
  .mp-hero { padding: 3.5rem 1rem 6rem; }
  .mp-hero__sub { font-size: var(--text-base); }
  .mp-section { padding: 3.2rem 1rem; }

  .mp-mode { padding: 0.6rem 1.05rem; }

  .mp-cards,
  .mp-costs,
  .mp-school-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .mp-callout {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
    padding: 1.5rem 1.3rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mp-hero__bg,
  .mp-hero__inner > *,
  .mp-modes,
  .mp-school {
    animation: none;
  }

  .mp-school,
  .mp-school__img img {
    transition: none;
  }
}
</style>
