<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)
const currentPage = ref(1)
const pageSize = 6
const schools = ref<any[]>([])
// 資料回來前先放骨架卡片，避免列表區一片空白再突然跳出內容
const loading = ref(true)
// 手機上篩選面板預設收起來，不然要滑過一整屏表單才看得到學校
const filterOpen = ref(false)
const listTop = ref<HTMLElement | null>(null)
const localePath = useLocalePath()

const initialRegions = route.query.regions
  ? (route.query.regions as string).split(',')
  : (route.query.region ? [route.query.region as string] : [])

const filters = ref({
  keyword: (route.query.keyword as string) || '',
  regions: initialRegions as string[],
  intake: (route.query.intake as string) || '',
  type: (route.query.type as string) || '',
  tags: route.query.tags
  ? Array.isArray(route.query.tags)
    ? route.query.tags as string[]
    : [route.query.tags as string]
  : [],
  accommodation: (route.query.accommodation as string) || ''
})

const { t } = useI18n()

usePageSeo('schools', [
  { name: '日本留遊學', path: '/study' },
  { name: '合作語言學校', path: '/study/schools' },
])

const regionOptions = [
  { value: "tokyo",    label: t("schoolOverview.region.tokyo") },
  { value: "osaka",    label: t("schoolOverview.region.osaka") },
  { value: "nagoya",   label: t("schoolOverview.region.nagoya") },
  { value: "fukuoka",  label: t("schoolOverview.region.fukuoka") },
  { value: "hokkaido", label: t("schoolOverview.region.hokkaido") },
  { value: "kanagawa", label: t("schoolOverview.region.kanagawa") },
  { value: "sendai", label: t("schoolOverview.region.sendai") },
  { value: "nagasaki", label: t("schoolOverview.region.nagasaki") },
]

const initialRegionLabels = computed(() =>
  filters.value.regions
    .map((v) => regionOptions.find((r) => r.value === v)?.label)
    .filter((v): v is string => Boolean(v))
)

const intakeOptions = [
  { value: "1",  label: "1" },
  { value: "4",  label: "4" },
  { value: "7",  label: "7" },
  { value: "10", label: "10" },
]

const tagOptions = [
  { value: '短期', label: t('schoolOverview.tag.shortTerm') },
  { value: '長期', label: t('schoolOverview.tag.longTerm') },
  { value: '升學', label: t('schoolOverview.tag.academic') },
]

const sortOption = ref("")
const sortOptions = computed(() => [
  { value: "",             label: t("schoolOverview.sort.default") },
  { value: "tuition-desc", label: t("schoolOverview.sort.tuitionDesc") },
  { value: "tuition-asc",  label: t("schoolOverview.sort.tuitionAsc") },
  { value: "popularity",   label: t("schoolOverview.sort.popularity") },
])

// 後台的地點有「愛知（名古屋）」這種寫法，完全相等會漏掉，所以用包含比對
function matchRegion(location: string | undefined, label: string) {
  return Boolean(location && location.includes(label))
}

const filteredSchools = computed(() => {
  return schools.value.filter((school) => {
    const keywordMatch = !filters.value.keyword || school.name.includes(filters.value.keyword)
    const regionMatch =
      initialRegionLabels.value.length === 0 ||
      initialRegionLabels.value.some((label) => matchRegion(school.location, label))
    const intakeMatch = !filters.value.intake || school.intake.some((m: string) => m.includes(filters.value.intake))
    const typeMatch = !filters.value.type || school.type === filters.value.type
    const tagsMatch =
      filters.value.tags.length === 0 ||
      filters.value.tags.every((tag) => school.tags?.includes(tag))
    const accommodationMatch = !filters.value.accommodation || school.dormitory?.type === filters.value.accommodation
    return keywordMatch && regionMatch && intakeMatch && typeMatch && tagsMatch && accommodationMatch
  })
})

const sortedSchools = computed(() => {
  const list = [...filteredSchools.value]
  switch (sortOption.value) {
    case 'tuition-desc': return list.sort((a, b) => b.tuition - a.tuition)
    case 'tuition-asc':  return list.sort((a, b) => a.tuition - b.tuition)
    case 'popularity':   return list.sort((a, b) => b.popularity - a.popularity)
    default: return list
  }
})

const paginatedSchools = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedSchools.value.slice(start, start + pageSize)
})

const totalPages = computed(() =>
  Math.ceil(filteredSchools.value.length / pageSize)
)

function toggleTag(tag: string) {
  const idx = filters.value.tags.indexOf(tag)
  if (idx > -1) {
    filters.value.tags.splice(idx, 1)
  } else {
    filters.value.tags.push(tag)
  }
}

function detailPath(schoolName: string) {
  return localePath(`/study/${encodeURIComponent(schoolName)}`)
}

// ── 城市快選 ──
// 只列有照片的地區；資料載入後沒有學校的城市就不顯示，免得點進去是空的
const cityImages: Record<string, string> = {
  tokyo: '/images/home/city-tokyo.jpg',
  osaka: '/images/home/city-osaka.jpg',
  nagoya: '/images/home/city-nagoya.jpg',
  fukuoka: '/images/home/city-fukuoka.jpg',
  hokkaido: '/images/home/city-hokkaido.jpg',
  sendai: '/images/schools-page/city-sendai.jpg',
  nagasaki: '/images/schools-page/city-nagasaki.jpg',
}

const cityCards = computed(() =>
  regionOptions
    .filter((r) => cityImages[r.value])
    .map((r) => ({
      ...r,
      img: cityImages[r.value],
      count: schools.value.filter((s) => matchRegion(s.location, r.label)).length,
    }))
    .filter((c) => loading.value || c.count > 0)
)

function selectCity(value: string) {
  const only = filters.value.regions.length === 1 && filters.value.regions[0] === value
  filters.value.regions = !value || only ? [] : [value]
}

// 「愛知（名古屋）」和「名古屋」是同一座城市：有括號就取括號裡的市名再去重
const cityCount = computed(() =>
  new Set(schools.value.map((s) => (s.location || '').match(/（(.+?)）/)?.[1] ?? s.location)).size
)

// ── Hero 數字跳動 ──
const shownSchoolCount = ref(0)
function countUp(target: number) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shownSchoolCount.value = target
    return
  }
  const start = performance.now()
  const duration = 900
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration)
    // ease-out：尾段放慢，數字停下來時比較自然
    shownSchoolCount.value = Math.round(target * (1 - Math.pow(1 - p, 3)))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// 篩選或排序一變就回第 1 頁，否則停在第 2 頁時結果變少會看到空列表
watch([filters, sortOption], () => { currentPage.value = 1 }, { deep: true })

function goPage(p: number) {
  currentPage.value = p
  listTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// 學校照片放在遠端，壞圖時收掉 <img>，露出底下的品牌色底
function onImgError(e: Event) {
  (e.target as HTMLElement).style.visibility = 'hidden'
}

const { revealReady } = useScrollReveal('.sp')

function clearFilters() {
  filters.value = { keyword: '', regions: [], intake: '', type: '', tags: [], accommodation: '' }
  currentPage.value = 1
  router.replace(localePath('/study/schools'))
}

async function fetchSchools() {
  try {
    const res = await fetch('/api/schools')
    const json = await res.json()
    if (json.success) {
      schools.value = json.data.map((s: any) => ({
        ...s,
        popularity: Math.floor(Math.random() * 5) + 1,
        tuition: Number((s.tuitionDetails?.[0]?.total || '0').replace(/[,日圓]/g, '')) || 0
      }))
    }
  } catch (err) {
    console.error('❌ 無法取得學校資料：', err)
  } finally {
    loading.value = false
    countUp(schools.value.length)
  }
}

onMounted(fetchSchools)
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <div class="sp" :class="{ 'reveal-on': revealReady }">
    <!-- Page Hero -->
    <section class="sp-hero">
      <img
        class="sp-hero__bg"
        src="/images/schools-page/hero.jpg"
        :alt="$t('schoolOverview.heroAlt')"
        width="1920"
        height="1200"
        fetchpriority="high"
      />
      <div class="sp-hero__shade" aria-hidden="true"></div>
      <!-- 花瓣純裝飾：數量少、速度慢，prefers-reduced-motion 時整組關掉 -->
      <div class="sp-petals" aria-hidden="true">
        <span v-for="n in 9" :key="n" class="sp-petal" :style="{ '--n': n }"></span>
      </div>

      <div class="sp-hero__inner">
        <p class="sp-hero__eyebrow">{{ $t('schoolOverview.eyebrow') }}</p>
        <h1 class="sp-hero__title">{{ $t('schoolOverview.title') }}</h1>
        <p class="sp-hero__sub">{{ $t('schoolOverview.heroText') }}</p>

        <ul class="sp-stats">
          <li>
            <strong>{{ loading ? '–' : shownSchoolCount }}</strong>
            <span>{{ $t('schoolOverview.statSchools') }}</span>
          </li>
          <li>
            <strong>{{ loading ? '–' : cityCount }}</strong>
            <span>{{ $t('schoolOverview.statCities') }}</span>
          </li>
          <li>
            <strong>0</strong>
            <span>{{ $t('schoolOverview.statFee') }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- 城市快選：壓在 Hero 下緣，讓照片區和列表區接起來 -->
    <nav class="sp-cities" :aria-label="$t('schoolOverview.regionLabel')">
      <div class="sp-cities__track">
        <button
          type="button"
          class="sp-city sp-city--all"
          :class="{ active: filters.regions.length === 0 }"
          @click="selectCity('')"
        >
          <span class="sp-city__name">{{ $t('schoolOverview.allRegions') }}</span>
          <span v-if="!loading" class="sp-city__count">{{ schools.length }}</span>
        </button>
        <button
          v-for="(c, i) in cityCards"
          :key="c.value"
          type="button"
          class="sp-city"
          :class="{ active: filters.regions.includes(c.value) }"
          :style="{ '--i': i + 1 }"
          :aria-pressed="filters.regions.includes(c.value)"
          @click="selectCity(c.value)"
        >
          <img :src="c.img" alt="" loading="lazy" width="900" height="600" />
          <span class="sp-city__name">{{ c.label }}</span>
          <span v-if="!loading" class="sp-city__count">{{ c.count }}</span>
        </button>
      </div>
    </nav>

    <div class="schools-layout">
      <!-- 左側篩選面板 -->
      <aside class="filter-panel" :class="{ open: filterOpen }">
        <button
          type="button"
          class="filter-header"
          :aria-expanded="filterOpen"
          @click="filterOpen = !filterOpen"
        >
          <span class="filter-header__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
          </span>
          <span class="filter-header__text">
            <span class="filter-header__title">{{ $t('schoolOverview.filterTitle') }}</span>
            <span class="filter-header__sub">{{ $t('schoolOverview.filterSubtitle') }}</span>
          </span>
          <svg class="filter-header__chevron" aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </button>

        <div class="filter-body">
          <!-- 關鍵字 -->
          <div class="filter-field">
            <label for="sp-keyword">{{ $t('schoolOverview.keywordLabel') }}</label>
            <div class="filter-search">
              <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input
                id="sp-keyword"
                v-model="filters.keyword"
                type="text"
                :placeholder="$t('schoolOverview.keywordPlaceholder')"
                class="filter-input"
              />
            </div>
          </div>

          <!-- 地區 -->
          <div class="filter-field">
            <label for="sp-region">{{ $t('schoolOverview.regionLabel') }}</label>
            <select
              id="sp-region"
              :value="filters.regions[0] || ''"
              class="filter-select"
              @change="filters.regions = ($event.target as HTMLSelectElement).value
                ? [($event.target as HTMLSelectElement).value] : []"
            >
              <option value="">{{ $t('schoolOverview.allRegions') }}</option>
              <option v-for="r in regionOptions" :key="r.value" :value="r.value">{{ r.label }}</option>
            </select>
            <p v-if="filters.regions.length > 1" class="filter-note">
              {{ $t('schoolOverview.currentFilter') }}{{ initialRegionLabels.join('、') }}
            </p>
          </div>

          <!-- 入學月份 -->
          <div class="filter-field">
            <label for="sp-intake">{{ $t('schoolOverview.intakeLabel') }}</label>
            <select id="sp-intake" v-model="filters.intake" class="filter-select">
              <option value="">{{ $t('schoolOverview.allIntakes') }}</option>
              <option v-for="m in intakeOptions" :key="m.value" :value="m.label">
                {{ m.label }} {{ $t('schoolOverview.month') }}
              </option>
            </select>
          </div>

          <!-- 學校類型 -->
          <div class="filter-field">
            <label for="sp-type">{{ $t('schoolOverview.typeLabel') }}</label>
            <select id="sp-type" v-model="filters.type" class="filter-select">
              <option value="">{{ $t('schoolOverview.allTypes') }}</option>
              <option value="語言學校">{{ $t('schoolOverview.langSchool') }}</option>
              <option value="專門學校">{{ $t('schoolOverview.vocSchool') }}</option>
              <option value="大學別科">{{ $t('schoolOverview.univPrep') }}</option>
            </select>
          </div>

          <!-- 課程標籤 -->
          <div class="filter-field">
            <label>{{ $t('schoolOverview.tagsLabel') }}</label>
            <div class="filter-tag-group">
              <button
                v-for="opt in tagOptions"
                :key="opt.value"
                type="button"
                class="filter-tag-btn"
                :class="{ active: filters.tags.includes(opt.value) }"
                :aria-pressed="filters.tags.includes(opt.value)"
                @click="toggleTag(opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- 住宿類型 -->
          <!-- <div class="filter-field">
            <label>{{ $t('schoolOverview.accommodationLabel') }}</label>
            <select v-model="filters.accommodation" class="filter-select">
              <option value="">{{ $t('schoolOverview.allAccommodations') }}</option>
              <option value="宿舍">{{ $t('schoolOverview.dorm') }}</option>
              <option value="寄宿家庭">{{ $t('schoolOverview.homestay') }}</option>
              <option value="自行租屋">{{ $t('schoolOverview.rent') }}</option>
            </select>
          </div> -->

          <button class="filter-clear" @click="clearFilters">
            {{ $t('schoolOverview.clearFilters') }}
          </button>
        </div>
      </aside>

      <!-- 右側學校列表 -->
      <div ref="listTop" class="schools-main">
        <!-- 排序列 -->
        <div class="sort-bar">
          <span class="sort-label">{{ $t('schoolOverview.sortLabel') }}</span>
          <button
            v-for="opt in sortOptions"
            :key="opt.value"
            class="sort-btn"
            :class="{ active: sortOption === opt.value }"
            @click="sortOption = opt.value"
          >
            {{ opt.label }}
          </button>
          <span v-if="!loading" class="result-count">
            {{ $t('schoolOverview.resultCount', { n: filteredSchools.length }) }}
          </span>
        </div>

        <!-- 載入中：骨架卡片 -->
        <div v-if="loading" class="school-list" aria-hidden="true">
          <div v-for="n in 4" :key="n" class="school-card school-card--skeleton">
            <div class="school-card-img-wrap sk"></div>
            <div class="school-card-body">
              <span class="sk sk-line sk-line--title"></span>
              <span class="sk sk-line sk-line--short"></span>
              <span class="sk sk-line"></span>
              <span class="sk sk-line"></span>
            </div>
          </div>
        </div>

        <!-- 學校卡片列表 -->
        <div v-else class="school-list">
          <NuxtLink
            v-for="(school, i) in paginatedSchools"
            :key="school.name"
            :to="detailPath(school.name)"
            class="school-card"
            :style="{ '--i': i }"
          >
            <div class="school-card-img-wrap">
              <img
                :src="school.image"
                :alt="school.name"
                class="school-card-img"
                loading="lazy"
                @error="onImgError"
              />
              <span class="school-card-type">{{ school.type }}</span>
              <span class="school-card-location">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
                {{ school.location }}
              </span>
            </div>
            <div class="school-card-body">
              <h3 class="school-card-name">{{ school.name }}</h3>

              <div v-if="school.tags?.length" class="school-card-tags">
                <span v-for="tag in school.tags" :key="tag" class="tag-badge">{{ tag }}</span>
              </div>

              <p class="school-card-intro">{{ school.introduction }}</p>

              <div class="school-card-foot">
                <p class="school-card-intake">
                  <span class="school-card-intake__label">{{ $t('schoolOverview.intakeMonth') }}</span>
                  <span v-for="m in school.intake" :key="m" class="intake-chip">{{ m }}</span>
                </p>
                <span class="school-card-cta">
                  {{ $t('schoolOverview.moreDetail').replace(/\s*➔\s*$/, '') }}
                  <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- 無結果 -->
        <div v-if="!loading && filteredSchools.length === 0" class="no-result">
          <img src="/images/plane.png" alt="" width="1600" height="1202" loading="lazy" />
          <p>{{ $t('schoolOverview.noResult') }}</p>
          <button class="filter-clear" @click="clearFilters">{{ $t('schoolOverview.clearFilters') }}</button>
        </div>

        <!-- 分頁 -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            v-for="p in totalPages"
            :key="p"
            class="page-btn"
            :class="{ active: p === currentPage }"
            :aria-current="p === currentPage ? 'page' : undefined"
            @click="goPage(p)"
          >
            {{ p }}
          </button>
        </div>
      </div>
    </div>

    <!-- 底部 CTA：和 /study 入口頁共用樣式與文案 -->
    <section class="lp-cta sp-cta">
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
.sp {
  --sp-ink: color-mix(in srgb, var(--c-primary-dark) 70%, #000);
  background: var(--c-bg-alt);
  overflow-x: clip;
}

/* ── Page Hero ── */
.sp-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 4.5rem 1.5rem 7rem;
  text-align: center;
  color: #fff;
  background: var(--sp-ink);
}

.sp-hero__bg {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  animation: sp-zoom 18s ease-out both;
}

@keyframes sp-zoom {
  from { transform: scale(1.12); }
  to { transform: scale(1); }
}

/* 照片本身偏亮粉，蓋一層品牌深色才壓得住白字 */
.sp-hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(ellipse at center, color-mix(in srgb, var(--sp-ink) 62%, transparent) 0%, color-mix(in srgb, var(--sp-ink) 38%, transparent) 70%),
    linear-gradient(0deg, color-mix(in srgb, var(--sp-ink) 80%, transparent) 0%, transparent 45%);
}

.sp-hero__inner {
  max-width: 720px;
  margin: 0 auto;
}

.sp-hero__inner > * {
  animation: sp-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.sp-hero__inner > :nth-child(2) { animation-delay: 0.1s; }
.sp-hero__inner > :nth-child(3) { animation-delay: 0.2s; }
.sp-hero__inner > :nth-child(4) { animation-delay: 0.32s; }

@keyframes sp-rise {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: none; }
}

.sp-hero__eyebrow {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--radius-full);
  padding: 0.3rem 1rem;
  margin: 0 0 1.1rem;
}

.sp-hero__title {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.1rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.8rem;
  line-height: 1.25;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
}

.sp-hero__sub {
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--text-lg);
  margin: 0;
  line-height: 1.7;
  /* 手機上避免最後一行只剩一個字 */
  text-wrap: balance;
}

.sp-stats {
  display: inline-flex;
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.sp-stats li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  padding: 0.85rem 1.6rem;
  min-width: 108px;
}

.sp-stats li + li {
  border-left: 1px solid rgba(255, 255, 255, 0.24);
}

.sp-stats strong {
  font-family: var(--font-serif);
  font-size: 1.9rem;
  font-weight: 800;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
}

.sp-stats span {
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.85);
}

/* ── 花瓣 ── */
.sp-petals {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.sp-petal {
  position: absolute;
  top: -24px;
  /* 用序號推出位置、大小與時間差，省得寫九組規則 */
  left: calc((var(--n) * 37 + 5) * 1% - (var(--n) - 1) * 26%);
  width: calc(9px + var(--n) * 0.8px);
  height: calc(7px + var(--n) * 0.6px);
  background: #ffd3e0;
  border-radius: 80% 0 80% 0;
  opacity: 0;
  animation: sp-fall calc(9s + var(--n) * 0.9s) linear calc(var(--n) * -1.7s) infinite;
}

@keyframes sp-fall {
  0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.85; }
  50% { transform: translate3d(46px, 260px, 0) rotate(160deg); }
  90% { opacity: 0.7; }
  100% { transform: translate3d(-12px, 560px, 0) rotate(340deg); opacity: 0; }
}

/* ── 城市快選 ── */
.sp-cities {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: -3.6rem auto 0;
  padding: 0 1.5rem;
}

.sp-cities__track {
  display: flex;
  gap: 0.8rem;
  overflow-x: auto;
  padding: 0.4rem 0.2rem 0.9rem;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
}

.sp-cities__track::-webkit-scrollbar { display: none; }

.sp-city {
  position: relative;
  flex: 1 0 132px;
  max-width: 200px;
  height: 104px;
  border: 0;
  padding: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  color: #fff;
  background: var(--c-primary-dark);
  box-shadow: 0 8px 22px rgba(40, 8, 16, 0.18);
  scroll-snap-align: start;
  outline: 3px solid transparent;
  outline-offset: 2px;
  animation: sp-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(0.35s + var(--i, 0) * 60ms);
  transition: translate 0.25s ease, box-shadow 0.25s ease, outline-color 0.2s ease;
}

.sp-city img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.sp-city::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(20, 6, 10, 0.8) 0%, rgba(20, 6, 10, 0.1) 70%);
}

.sp-city:hover { translate: 0 -4px; box-shadow: 0 14px 28px rgba(40, 8, 16, 0.26); }
.sp-city:hover img { transform: scale(1.1); }
.sp-city:focus-visible,
.sp-city.active { outline-color: var(--c-primary); }

.sp-city--all {
  background: linear-gradient(135deg, var(--c-primary-light), var(--c-primary-dark));
}

.sp-city--all::after { display: none; }
.sp-city--all.active { outline-color: var(--c-primary-light); }

.sp-city__name {
  position: absolute;
  left: 0.85rem;
  bottom: 0.65rem;
  z-index: 1;
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 800;
}

.sp-city__count {
  position: absolute;
  top: 0.55rem;
  right: 0.55rem;
  z-index: 1;
  min-width: 26px;
  padding: 0.1rem 0.45rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.92);
  color: var(--c-primary-dark);
  font-size: var(--text-xs);
  font-weight: 800;
  text-align: center;
}

/* ── 整體佈局 ── */
.schools-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 1.75rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1.5rem 5rem;
  align-items: flex-start;
}

/* ── 左側篩選面板 ── */
.filter-panel {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: sticky;
  /* 站上的 Header 連同 App 公告列高 148px，要讓過它 */
  top: 164px;
  background: var(--c-surface);
  box-shadow: 0 6px 24px rgba(40, 8, 16, 0.06);
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  border: 0;
  text-align: left;
  color: #fff;
  background: linear-gradient(135deg, var(--c-primary), var(--c-primary-dark));
  padding: 1rem 1.2rem;
  cursor: default;
}

.filter-header__icon {
  flex: none;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
}

.filter-header__text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.filter-header__title {
  font-size: var(--text-base);
  font-weight: 700;
}

.filter-header__sub {
  font-size: var(--text-xs);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
}

.filter-header__chevron {
  display: none;
  flex: none;
  margin-left: auto;
  transition: transform 0.25s ease;
}

.filter-body {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.filter-field label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary);
  letter-spacing: 0.04em;
}

.filter-search {
  position: relative;
}

.filter-search svg {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  translate: 0 -50%;
  color: var(--c-text-muted);
  pointer-events: none;
}

.filter-search .filter-input {
  padding-left: 2.3rem;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  background: var(--c-bg-alt);
  color: var(--c-text);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--c-primary);
  background: var(--c-surface);
  box-shadow: 0 0 0 3px var(--c-primary-muted);
}

.filter-note {
  font-size: var(--text-sm);
  color: var(--c-text-muted);
  margin: 0;
}

.filter-clear {
  width: 100%;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--c-text-secondary);
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
  margin-top: 0.5rem;
}

.filter-clear:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
  background: var(--c-primary-muted);
}

/* 課程標籤篩選按鈕群組 */
.filter-tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.filter-tag-btn {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-full);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), scale var(--transition-fast);
}

.filter-tag-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}

.filter-tag-btn:active { scale: 0.95; }

.filter-tag-btn.active {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}

/* ── 右側主區 ── */
.schools-main {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  /* 換頁捲回列表頂端時，別被 sticky 的 Header 蓋住 */
  scroll-margin-top: 164px;
}

/* ── 排序列 ── */
.sort-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.sort-label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-text-muted);
}

.sort-btn {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-full);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-size: var(--text-sm);
  font-weight: 600;
  padding: 0.4rem 0.95rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.sort-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}

.sort-btn.active {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}

.result-count {
  margin-left: auto;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--c-text-muted);
}

/* ── 學校卡片 ── */
.school-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.school-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--c-surface);
  color: inherit;
  text-decoration: none;
  /* 新掛上的卡片依序浮上來；翻頁、換篩選時整批重播 */
  animation: sp-card-in 0.55s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--i, 0) * 70ms);
  transition: border-color var(--transition-base), box-shadow var(--transition-base), translate var(--transition-base);
}

@keyframes sp-card-in {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
}

.school-card:hover,
.school-card:focus-visible {
  border-color: var(--c-primary);
  box-shadow: 0 14px 34px rgba(139, 26, 47, 0.14);
  translate: 0 -4px;
  color: inherit;
}

.school-card-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  /* 圖片還沒載入或載入失敗時露出的底色 */
  background: linear-gradient(135deg, var(--c-primary-muted), var(--c-border));
}

.school-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.school-card:hover .school-card-img {
  transform: scale(1.06);
}

.school-card-img-wrap::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 45%;
  background: linear-gradient(0deg, rgba(20, 6, 10, 0.6), transparent);
  pointer-events: none;
}

.school-card-type {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 1;
  background: var(--c-primary);
  color: #fff;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.7rem;
  border-radius: var(--radius-full);
}

.school-card-location {
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

.school-card-body {
  flex: 1;
  padding: 1.1rem 1.25rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.school-card-name {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: 700;
  line-height: 1.4;
  color: var(--c-text);
  margin: 0;
  transition: color var(--transition-fast);
}

.school-card:hover .school-card-name { color: var(--c-primary); }

/* 學校卡片上的課程標籤 */
.school-card-tags {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.tag-badge {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--c-primary-dark);
  background: var(--c-primary-muted);
  padding: 0.15rem 0.6rem;
  border-radius: var(--radius-full);
}

.school-card-intro {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.school-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--c-border);
}

.school-card-intake {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 0;
}

.school-card-intake__label {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  margin-right: 0.15rem;
}

.intake-chip {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--c-text-secondary);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-full);
  padding: 0.05rem 0.5rem;
}

.school-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary);
  margin-left: auto;
}

.school-card-cta svg { transition: translate 0.25s ease; }
.school-card:hover .school-card-cta svg { translate: 5px 0; }

/* ── 骨架 ── */
.school-card--skeleton {
  pointer-events: none;
  animation: none;
}

.sk {
  background: linear-gradient(100deg, var(--c-primary-muted) 30%, #fff 50%, var(--c-primary-muted) 70%);
  background-size: 300% 100%;
  animation: sp-shimmer 1.4s ease-in-out infinite;
}

.sk-line {
  display: block;
  height: 0.8rem;
  border-radius: var(--radius-full);
}

.sk-line--title { height: 1.3rem; width: 70%; }
.sk-line--short { width: 40%; }

@keyframes sp-shimmer {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}

/* ── 無結果 ── */
.no-result {
  text-align: center;
  padding: 2.5rem 1rem 3rem;
  color: var(--c-text-muted);
  border: 1px dashed var(--c-border);
  border-radius: var(--radius-lg);
  background: var(--c-surface);
  animation: sp-card-in 0.5s ease both;
}

.no-result img {
  width: 150px;
  height: auto;
  opacity: 0.9;
  animation: sp-float 4s ease-in-out infinite;
}

@keyframes sp-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.no-result p { margin: 0.75rem 0 1rem; }
.no-result .filter-clear { width: auto; margin-top: 0; }

/* ── 分頁 ── */
.pagination {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--c-border);
  border-radius: 50%;
  background: var(--c-surface);
  color: var(--c-text-secondary);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast), scale var(--transition-fast);
}

.page-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}

.page-btn:active { scale: 0.92; }

.page-btn.active {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}

/* ── 底部 CTA：共用樣式上疊一張照片 ── */
.sp-cta {
  background:
    linear-gradient(color-mix(in srgb, var(--sp-ink) 78%, transparent), color-mix(in srgb, var(--sp-ink) 78%, transparent)),
    url('/images/home/cta.jpg') center / cover no-repeat;
}

/* ── RWD ── */
@media (max-width: 900px) {
  .schools-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }

  .filter-panel {
    position: static;
  }

  /* 手機：篩選面板收成一條，點標題列才展開 */
  .filter-header { cursor: pointer; }
  .filter-header__chevron { display: block; }
  .filter-panel.open .filter-header__chevron { transform: rotate(180deg); }
  .filter-panel:not(.open) .filter-body { display: none; }

  .sp-city { flex: 0 0 132px; }
}

@media (max-width: 640px) {
  .sp-hero { padding: 3.2rem 1rem 6rem; }
  .sp-hero__sub { font-size: var(--text-base); }
  .sp-stats li { padding: 0.7rem 0.9rem; min-width: 0; }
  .sp-stats strong { font-size: 1.5rem; }
  .sp-cities { padding: 0 1rem; }
  .schools-layout { padding: 1rem 1rem 4rem; }

  .school-list {
    grid-template-columns: minmax(0, 1fr);
  }

  .result-count { width: 100%; margin-left: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .sp-petals { display: none; }

  .sp-hero__bg,
  .sp-hero__inner > *,
  .sp-city,
  .school-card,
  .no-result,
  .no-result img,
  .sk {
    animation: none;
  }

  .sp-city,
  .sp-city img,
  .school-card,
  .school-card-img {
    transition: none;
  }
}
</style>
