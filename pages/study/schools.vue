<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)
const currentPage = ref(1)
const pageSize = 6
const schools = ref<any[]>([])

const initialRegions = route.query.regions
  ? (route.query.regions as string).split(',')
  : (route.query.region ? [route.query.region as string] : [])

const filters = ref({
  keyword: (route.query.keyword as string) || '',
  regions: initialRegions as string[],
  intake: (route.query.intake as string) || '',
  type: (route.query.type as string) || '',
  accommodation: (route.query.accommodation as string) || ''
})

const { t } = useI18n()

useSeoMeta({
  title: t('seo.study.title'),
  description: t('seo.study.description'),
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

const regionOptions = [
  { value: "tokyo",    label: t("schoolOverview.region.tokyo") },
  { value: "osaka",    label: t("schoolOverview.region.osaka") },
  { value: "nagoya",   label: t("schoolOverview.region.nagoya") },
  { value: "fukuoka",  label: t("schoolOverview.region.fukuoka") },
  { value: "hokkaido", label: t("schoolOverview.region.hokkaido") },
  { value: "kanagawa", label: t("schoolOverview.region.kanagawa") },
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

const sortOption = ref("")
const sortOptions = computed(() => [
  { value: "",             label: t("schoolOverview.sort.default") },
  { value: "tuition-desc", label: t("schoolOverview.sort.tuitionDesc") },
  { value: "tuition-asc",  label: t("schoolOverview.sort.tuitionAsc") },
  { value: "popularity",   label: t("schoolOverview.sort.popularity") },
])

const filteredSchools = computed(() => {
  return schools.value.filter((school) => {
    const keywordMatch = !filters.value.keyword || school.name.includes(filters.value.keyword)
    const regionMatch =
      initialRegionLabels.value.length === 0 ||
      initialRegionLabels.value.includes(school.location)
    const intakeMatch = !filters.value.intake || school.intake.includes(filters.value.intake)
    const typeMatch = !filters.value.type || school.type === filters.value.type
    const accommodationMatch = !filters.value.accommodation || school.dormitory?.type === filters.value.accommodation
    return keywordMatch && regionMatch && intakeMatch && typeMatch && accommodationMatch
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

function clearFilters() {
  filters.value = { keyword: '', regions: [], intake: '', type: '', accommodation: '' }
  currentPage.value = 1
  router.replace({ path: '/study/schools' })
}

function goToDetailPage(schoolName: string) {
  router.push(`/study/${encodeURIComponent(schoolName)}`)
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
  }
}

onMounted(fetchSchools)
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <!-- Page Hero -->
  <section class="page-hero">
    <div class="page-hero-inner">
      <p class="page-hero-eyebrow">日本語言學校</p>
      <h1 class="page-hero-title">{{ $t('schoolOverview.title') }}</h1>
      <p class="page-hero-sub">{{ $t('schoolOverview.heroText') }}</p>
    </div>
  </section>

  <div class="schools-layout">
    <!-- 左側篩選面板 -->
    <aside class="filter-panel">
      <div class="filter-header">
        <h2>{{ $t('schoolOverview.filterTitle') }}</h2>
        <p>{{ $t('schoolOverview.filterSubtitle') }}</p>
      </div>

      <div class="filter-body">
        <!-- 關鍵字 -->
        <div class="filter-field">
          <label>{{ $t('schoolOverview.keywordLabel') }}</label>
          <input
            v-model="filters.keyword"
            type="text"
            :placeholder="$t('schoolOverview.keywordPlaceholder')"
            class="filter-input"
          />
        </div>

        <!-- 地區 -->
        <div class="filter-field">
          <label>{{ $t('schoolOverview.regionLabel') }}</label>
          <select
            :value="filters.regions[0] || ''"
            class="filter-select"
            @change="filters.regions = ($event.target as HTMLSelectElement).value
              ? [($event.target as HTMLSelectElement).value] : []"
          >
            <option value="">{{ $t('schoolOverview.allRegions') }}</option>
            <option v-for="r in regionOptions" :key="r.value" :value="r.value">{{ r.label }}</option>
          </select>
          <p v-if="filters.regions.length > 1" class="filter-note">
            目前篩選：{{ initialRegionLabels.join('、') }}
          </p>
        </div>

        <!-- 入學月份 -->
        <div class="filter-field">
          <label>{{ $t('schoolOverview.intakeLabel') }}</label>
          <select v-model="filters.intake" class="filter-select">
            <option value="">{{ $t('schoolOverview.allIntakes') }}</option>
            <option v-for="m in intakeOptions" :key="m.value" :value="m.label">
              {{ m.label }} {{ $t('schoolOverview.month') }}
            </option>
          </select>
        </div>

        <!-- 學校類型 -->
        <div class="filter-field">
          <label>{{ $t('schoolOverview.typeLabel') }}</label>
          <select v-model="filters.type" class="filter-select">
            <option value="">{{ $t('schoolOverview.allTypes') }}</option>
            <option value="語言學校">{{ $t('schoolOverview.langSchool') }}</option>
            <option value="專門學校">{{ $t('schoolOverview.vocSchool') }}</option>
            <option value="大學別科">{{ $t('schoolOverview.univPrep') }}</option>
          </select>
        </div>

        <!-- 住宿類型 -->
        <div class="filter-field">
          <label>{{ $t('schoolOverview.accommodationLabel') }}</label>
          <select v-model="filters.accommodation" class="filter-select">
            <option value="">{{ $t('schoolOverview.allAccommodations') }}</option>
            <option value="宿舍">{{ $t('schoolOverview.dorm') }}</option>
            <option value="寄宿家庭">{{ $t('schoolOverview.homestay') }}</option>
            <option value="自行租屋">{{ $t('schoolOverview.rent') }}</option>
          </select>
        </div>

        <button class="filter-clear" @click="clearFilters">
          {{ $t('schoolOverview.clearFilters') }}
        </button>
      </div>
    </aside>

    <!-- 右側學校列表 -->
    <div class="schools-main">
      <!-- 排序列 -->
      <div class="sort-bar">
        <span class="sort-label">排序：</span>
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          class="sort-btn"
          :class="{ active: sortOption === opt.value }"
          @click="sortOption = opt.value"
        >
          {{ opt.label }}
        </button>
        <span class="result-count">共 {{ filteredSchools.length }} 所學校</span>
      </div>

      <!-- 學校卡片列表 -->
      <div class="school-list">
        <div
          v-for="school in paginatedSchools"
          :key="school.name"
          class="school-card"
          @click="goToDetailPage(school.name)"
        >
          <div class="school-card-img-wrap">
            <img :src="school.image" :alt="school.name" class="school-card-img" />
            <span class="school-card-type">{{ school.type }}</span>
          </div>
          <div class="school-card-body">
            <h3 class="school-card-name">{{ school.name }}</h3>
            <p class="school-card-location">📍 {{ school.location }}</p>
            <p class="school-card-intake">
              入學期間：{{ school.intake.join('月、') }}月
            </p>
            <p class="school-card-intro">{{ school.introduction }}</p>
            <span class="school-card-cta">{{ $t('schoolOverview.moreDetail') }} →</span>
          </div>
        </div>
      </div>

      <!-- 無結果 -->
      <div v-if="filteredSchools.length === 0" class="no-result">
        <p>找不到符合條件的學校，請調整篩選條件。</p>
        <button class="filter-clear" @click="clearFilters">清除所有篩選</button>
      </div>

      <!-- 分頁 -->
      <div v-if="totalPages > 1" class="pagination">
        <button
          v-for="p in totalPages"
          :key="p"
          class="page-btn"
          :class="{ active: p === currentPage }"
          @click="currentPage = p"
        >
          {{ p }}
        </button>
      </div>
    </div>
  </div>

  
  <Footer />
</template>

<style scoped>
/* ── Page Hero ── */
.page-hero {
  background: var(--c-primary);
  padding: 3.5rem 2rem;
  text-align: center;
}

.page-hero-inner { max-width: 640px; margin: 0 auto; }

.page-hero-eyebrow {
  
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  margin: 0 0 0.5rem;
}

.page-hero-title {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.75rem;
  line-height: 1.25;
}

.page-hero-sub {
  
  color: rgba(255,255,255,0.82);
  margin: 0;
  line-height: 1.7;
}

/* ── 整體佈局 ── */
.schools-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
  align-items: flex-start;
}

/* ── 左側篩選面板 ── */
.filter-panel {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  position: sticky;
  top: 80px;
  margin-right: 1.5rem;
}

.filter-header {
  background: var(--c-primary);
  padding: 1rem 1.2rem;
}

.filter-header h2 {
  font-size: var(--text-base);
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.2rem;
}

.filter-header p {
  
  color: rgba(255,255,255,0.75);
  margin: 0;
}

.filter-body {
  background: var(--c-surface);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.filter-field label {
  
  font-weight: 700;
  color: var(--c-primary);
  letter-spacing: 0.04em;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  
  background: var(--c-bg);
  color: var(--c-text);
  transition: border-color var(--transition-fast);
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: var(--c-primary);
}

.filter-note {
  
  color: var(--c-text-muted);
  margin: 0;
}

.filter-clear {
  width: 100%;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--c-text-muted);
  
  font-weight: 600;
  padding: 0.6rem;
  cursor: pointer;
  transition: border-color var(--transition-fast), color var(--transition-fast);
  margin-top: 0.5rem;
}

.filter-clear:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}

/* ── 右側主區 ── */
.schools-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── 排序列 ── */
.sort-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  background: var(--c-bg-alt);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
}

.sort-label {
  
  font-weight: 700;
  color: var(--c-text-muted);
}

.sort-btn {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  
  font-weight: 600;
  padding: 0.35rem 0.75rem;
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
  
  color: var(--c-text-muted);
}

/* ── 學校卡片 ── */
.school-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.school-card {
  display: grid;
  grid-template-columns: 220px 1fr;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--c-surface);
  cursor: pointer;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.school-card:hover {
  border-color: var(--c-primary);
  box-shadow: 0 2px 12px rgba(139,26,47,0.08);
}

.school-card-img-wrap {
  position: relative;
  overflow: hidden;
}

.school-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.school-card:hover .school-card-img {
  transform: scale(1.04);
}

.school-card-type {
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  background: var(--c-primary);
  color: #fff;
  
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
}

.school-card-body {
  padding: 1.25rem 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
}

.school-card-name {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
}

.school-card-location {
  
  color: var(--c-text-muted);
  margin: 0;
}

.school-card-intake {
  
  color: var(--c-text-secondary);
  margin: 0;
}

.school-card-intro {
  
  color: var(--c-text-secondary);
  line-height: 1.6;
  margin: 0.25rem 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.school-card-cta {
  
  font-weight: 700;
  color: var(--c-primary);
  margin-top: 0.5rem;
}

/* ── 無結果 ── */
.no-result {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--c-text-muted);
  border: 1px dashed var(--c-border);
  border-radius: var(--radius-md);
}

.no-result p { margin: 0 0 1rem; }

/* ── 分頁 ── */
.pagination {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
}

.page-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-sm);
  background: var(--c-surface);
  color: var(--c-text-secondary);
  
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.page-btn:hover {
  border-color: var(--c-primary);
  color: var(--c-primary);
}

.page-btn.active {
  background: var(--c-primary);
  color: #fff;
  border-color: var(--c-primary);
}

/* ── RWD ── */
@media (max-width: 900px) {
  .schools-layout {
    grid-template-columns: 1fr;
  }

  .filter-panel {
    position: static;
    margin-right: 0;
  }

  .school-card {
    grid-template-columns: 160px 1fr;
  }
}

@media (max-width: 600px) {
  .school-card {
    grid-template-columns: 1fr;
  }

  .school-card-img-wrap {
    height: 200px;
  }
}
</style>