<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onSelect(index: number) { activeIndex.value = index }
function select(index: number) {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}

const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
]

const schoolName = decodeURIComponent(route.params.name as string)

const { data: allSchools } = await useAsyncData('schools-list', async () => {
  const json = await $fetch<{ success: boolean; data: any[] }>('/api/schools')
  return json.success ? json.data : []
})

const school = computed(() =>
  (allSchools.value ?? []).find((s) => s.name === schoolName)
)

const recommendedSchools = computed(() => {
  const others = (allSchools.value ?? []).filter((s) => s.name !== schoolName)
  return [...others].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3)
})

useSeoMeta({
  title: computed(() =>
    school.value
      ? `${school.value.name}｜${t('schoolDetail.titleSuffix')}`
      : t('seo.study.title')
  ),
  description: computed(() =>
    school.value?.introduction
      ? school.value.introduction.slice(0, 120)
      : t('seo.study.description')
  ),
})
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <main v-if="school" class="detail-page">

    <!-- 麵包屑 -->
    <div class="breadcrumb-bar">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <NuxtLink to="/study/schools">{{ $t('schoolDetail.breadcrumb') }}</NuxtLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ school.name }}</li>
        </ol>
      </nav>
    </div>

    <!-- Hero 區：圖片 + 基本資訊 -->
    <section class="detail-hero">
      <!-- 圖片輪播 -->
      <div class="detail-gallery">
        <UCarousel
          ref="carousel"
          v-slot="{ item }"
          :items="items"
          class="gallery-carousel"
          @select="onSelect"
        >
          <img :src="item" class="gallery-img" :alt="`${school.name} 學校圖片`" />
        </UCarousel>
        <div class="gallery-thumbs">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="thumb"
            :class="{ active: activeIndex === index }"
            @click="select(index)"
          >
            <img :src="item" :alt="`縮圖 ${index + 1}`" />
          </div>
        </div>
      </div>

      <!-- 基本資訊側欄 -->
      <div class="detail-info">
        <span class="detail-type-tag">{{ school.type }}</span>
        <h1 class="detail-name">{{ school.name }}</h1>

        <ul class="detail-meta">
          <li>
            <span class="meta-label">{{ $t('schoolDetail.location') }}</span>
            <span class="meta-val">{{ school.location }}</span>
          </li>
          <li>
            <span class="meta-label">{{ $t('schoolDetail.intake') }}</span>
            <span class="meta-val">{{ school.intake.join('月、') }}月</span>
          </li>
          <li>
            <span class="meta-label">{{ $t('schoolDetail.type') }}</span>
            <span class="meta-val">{{ school.type }}</span>
          </li>
          <li>
            <span class="meta-label">{{ $t('schoolDetail.duration') }}</span>
            <span class="meta-val">{{ school.tuitionDetails.at(-1)?.duration }}</span>
          </li>
          <li>
            <span class="meta-label">{{ $t('schoolDetail.target') }}</span>
            <span class="meta-val">{{ school.requirements[0] }}</span>
          </li>
          <li>
            <span class="meta-label">{{ $t('schoolDetail.japaneseLevel') }}</span>
            <span class="meta-val">{{ school.requirements[1] }}</span>
          </li>
          <li>
            <span class="meta-label">{{ $t('schoolDetail.brochure') }}</span>
            <a href="#" class="meta-link">{{ $t('schoolDetail.download') }}</a>
          </li>
        </ul>

        <NuxtLink to="/contact" class="consult-btn">
          {{ $t('schoolDetail.consultBtn') }}
        </NuxtLink>
      </div>
    </section>

    <!-- 詳細內容 + 側欄推薦 -->
    <section class="detail-body">
      <div class="detail-content">

        <!-- 基本資料 -->
        <div class="detail-block">
          <h2>{{ $t('schoolDetail.basicInfo') }}</h2>
          <ul class="info-list">
            <li><span>{{ $t('schoolDetail.schoolName') }}</span><span>{{ school.name }}</span></li>
            <li><span>{{ $t('schoolDetail.city') }}</span><span>{{ school.location }}</span></li>
            <li><span>{{ $t('schoolDetail.intake') }}</span><span>{{ school.intake.join('月、') }}月</span></li>
            <li><span>{{ $t('schoolDetail.type') }}</span><span>{{ school.type }}</span></li>
            <li><span>{{ $t('schoolDetail.founded') }}</span><span>{{ school.founded }}</span></li>
          </ul>
        </div>

        <!-- 學校介紹 -->
        <div class="detail-block">
          <h2>{{ $t('schoolDetail.introduction') }}</h2>
          <p class="detail-text">{{ school.introduction }}</p>
        </div>

        <!-- 學費資訊 -->
        <div class="detail-block">
          <h2>{{ $t('schoolDetail.tuitionInfo') }}</h2>
          <div class="table-wrap">
            <table class="tuition-table">
              <thead>
                <tr>
                  <th>{{ $t('schoolDetail.period') }}</th>
                  <th>{{ $t('schoolDetail.examFee') }}</th>
                  <th>{{ $t('schoolDetail.entryFee') }}</th>
                  <th>{{ $t('schoolDetail.tuition') }}</th>
                  <th>{{ $t('schoolDetail.facilityFee') }}</th>
                  <th>{{ $t('schoolDetail.total') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fee in school.tuitionDetails" :key="fee.duration">
                  <td>{{ fee.duration }}</td>
                  <td>{{ fee.examFee }}</td>
                  <td>{{ fee.entryFee }}</td>
                  <td>{{ fee.tuition }}</td>
                  <td>{{ fee.facility }}</td>
                  <td class="total-cell">{{ fee.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 宿舍資訊 -->
        <div class="detail-block">
          <h2>{{ $t('schoolDetail.dormInfo') }}</h2>
          <ul class="info-list">
            <li><span>{{ $t('schoolDetail.dormType') }}</span><span>{{ school.dormitory.type }}</span></li>
            <li><span>{{ $t('schoolDetail.dormRent') }}</span><span>{{ school.dormitory.rent }} 日圓</span></li>
            <li><span>{{ $t('schoolDetail.dormMisc') }}</span><span>{{ school.dormitory.misc }}</span></li>
            <li><span>{{ $t('schoolDetail.dormLocation') }}</span><span>{{ school.dormitory.location }}</span></li>
          </ul>
        </div>

        <!-- 課程特色 -->
        <div class="detail-block">
          <h2>{{ $t('schoolDetail.features') }}</h2>
          <ul class="feature-list">
            <li v-for="(item, i) in school.features" :key="i">
              <span class="feature-dot"></span>{{ item }}
            </li>
          </ul>
          <p class="detail-text" style="margin-top:0.75rem">
            <strong>{{ $t('schoolDetail.courseDuration') }}</strong>{{ school.date }}
          </p>
        </div>

        <!-- 入學要件 -->
        <div class="detail-block">
          <h2>{{ $t('schoolDetail.requirements') }}</h2>
          <ul class="req-list">
            <li v-for="(req, i) in school.requirements" :key="i">{{ req }}</li>
          </ul>
        </div>

      </div>

      <!-- 推薦學校側欄 -->
      <aside class="detail-sidebar">
        <h3 class="sidebar-title">{{ $t('schoolDetail.moreSchools') }}</h3>
        <div
          v-for="(rec, i) in recommendedSchools"
          :key="i"
          class="rec-card"
        >
          <NuxtLink :to="`/study/${encodeURIComponent(rec.name)}`">
            <img :src="rec.image" :alt="`${rec.name} 推薦學校`" class="rec-img" />
            <div class="rec-body">
              <p class="rec-name">{{ rec.name }}</p>
              <p class="rec-location">{{ rec.location }}</p>
              <span class="rec-cta">{{ $t('schoolDetail.viewMore') }} →</span>
            </div>
          </NuxtLink>
        </div>
      </aside>
    </section>

  </main>

  
  <Footer />
</template>

<style scoped>
.detail-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

/* ── 麵包屑 ── */
.breadcrumb-bar {
  padding: 1rem 0;
  border-bottom: 1px solid var(--c-border);
  margin-bottom: 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--text-sm);
}

.breadcrumb-item a {
  color: var(--c-primary);
  text-decoration: none;
}

.breadcrumb-item a:hover { text-decoration: underline; }

.breadcrumb-item.active { color: var(--c-text-muted); }

.breadcrumb-item + .breadcrumb-item::before {
  content: '›';
  color: var(--c-border);
}

/* ── Hero 區 ── */
.detail-hero {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2.5rem;
  margin-bottom: 3rem;
  align-items: flex-start;
}

/* 圖片輪播 */
.detail-gallery { display: flex; flex-direction: column; gap: 0.75rem; }

.gallery-carousel { border-radius: var(--radius-md); overflow: hidden; }

.gallery-img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
}

.gallery-thumbs {
  display: flex;
  gap: 0.5rem;
}

.thumb {
  width: 72px;
  height: 54px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color var(--transition-fast);
  flex-shrink: 0;
}

.thumb.active { border-color: var(--c-primary); }

.thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* 基本資訊側欄 */
.detail-info {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  background: var(--c-surface);
  position: sticky;
  top: 80px;
}

.detail-type-tag {
  display: inline-block;
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-sm);
  margin-bottom: 0.75rem;
}

.detail-name {
  font-family: var(--font-serif);
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: 800;
  color: var(--c-primary-dark);
  margin: 0 0 1.2rem;
  line-height: 1.3;
}

.detail-meta {
  list-style: none;
  padding: 0;
  margin: 0 0 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.detail-meta li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--c-border);
  font-size: var(--text-sm);
  gap: 0.5rem;
}

.detail-meta li:last-child { border-bottom: none; }

.meta-label {
  color: var(--c-text-muted);
  flex-shrink: 0;
  font-size: var(--text-xs);
  font-weight: 600;
  padding-top: 2px;
}

.meta-val { color: var(--c-text); text-align: right; }

.meta-link {
  color: var(--c-primary);
  text-decoration: underline;
  text-align: right;
}

.consult-btn {
  display: block;
  width: 100%;
  background: var(--c-primary);
  color: var(--c-text-on-primary);
  text-align: center;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: var(--text-sm);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.consult-btn:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
}

/* ── 詳細內容區 ── */
.detail-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  align-items: flex-start;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-block {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  background: var(--c-surface);
}

.detail-block h2 {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--c-border);
}

/* 資訊列表 */
.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--c-border);
  font-size: var(--text-sm);
}

.info-list li:last-child { border-bottom: none; }

.info-list li span:first-child {
  color: var(--c-text-muted);
  font-weight: 600;
  font-size: var(--text-xs);
}

.info-list li span:last-child { color: var(--c-text); }

.detail-text {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.8;
  margin: 0;
}

/* 學費表 */
.table-wrap { overflow-x: auto; }

.tuition-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.tuition-table thead tr {
  background: var(--c-primary-muted);
}

.tuition-table th {
  padding: 0.6rem 0.75rem;
  text-align: center;
  font-weight: 700;
  color: var(--c-primary-dark);
  font-size: var(--text-xs);
  border-bottom: 1px solid var(--c-border);
}

.tuition-table td {
  padding: 0.6rem 0.75rem;
  text-align: center;
  color: var(--c-text-secondary);
  border-bottom: 1px solid var(--c-border);
  font-size: var(--text-xs);
}

.tuition-table tbody tr:last-child td { border-bottom: none; }

.tuition-table tbody tr:nth-child(even) { background: var(--c-bg-alt); }

.total-cell { font-weight: 700; color: var(--c-primary-dark); }

/* 特色清單 */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
}

.feature-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-primary);
  flex-shrink: 0;
  margin-top: 6px;
}

/* 入學要件 */
.req-list {
  padding-left: 1.2rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.req-list li {
  font-size: var(--text-sm);
  color: var(--c-text-secondary);
  line-height: 1.6;
}

/* ── 推薦學校側欄 ── */
.detail-sidebar { position: sticky; top: 80px; }

.sidebar-title {
  font-family: var(--font-serif);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 1rem;
}

.rec-card {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 0.75rem;
  transition: border-color var(--transition-fast);
}

.rec-card:hover { border-color: var(--c-primary); }

.rec-card a { text-decoration: none; color: inherit; display: block; }

.rec-img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  display: block;
}

.rec-body { padding: 0.75rem; }

.rec-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 0.2rem;
}

.rec-location {
  font-size: var(--text-xs);
  color: var(--c-text-muted);
  margin: 0 0 0.4rem;
}

.rec-cta {
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--c-primary);
}

/* ── RWD ── */
@media (max-width: 1024px) {
  .detail-hero { grid-template-columns: 1fr; }
  .detail-info { position: static; }
  .detail-body { grid-template-columns: 1fr; }
  .detail-sidebar { position: static; }
}

@media (max-width: 640px) {
  .detail-page { padding: 0 1rem 4rem; }
  .detail-block { padding: 1.2rem; }
}
</style>