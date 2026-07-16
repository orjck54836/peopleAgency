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
  return [...others].sort((a, b) => a.name.localeCompare(b.name)).slice(0, 2)
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
    <nav class="breadcrumb-bar" aria-label="breadcrumb">
      <NuxtLink to="/study/schools">{{ $t('schoolDetail.breadcrumb') }}</NuxtLink>
      <span class="crumb-sep">›</span>
      <span class="crumb-current">{{ school.name }}</span>
    </nav>

    <!-- Hero：圖片 + 諮詢按鈕 -->
    <section class="detail-hero">
      <div class="detail-gallery">
        <UCarousel ref="carousel" v-slot="{ item }" :items="items" class="gallery-carousel" @select="onSelect">
          <img :src="item" class="gallery-img" :alt="`${school.name} 學校圖片`" />
        </UCarousel>
        <div class="gallery-thumbs">
          <div v-for="(item, index) in items" :key="index" class="thumb" :class="{ active: activeIndex === index }"
            @click="select(index)">
            <img :src="item" :alt="`縮圖 ${index + 1}`" />
          </div>
        </div>
      </div>

      <div class="detail-aside">
        <span class="detail-type-tag">{{ school.type }}</span>
        <h1 class="detail-name">{{ school.name }}</h1>
        <p class="detail-location">{{ school.location }}</p>

        <div class="aside-divider"></div>

        <h2 class="introduce">{{ $t('schoolDetail.introduction') }}</h2>
        <p class="aside-intro">{{ school.introduction }}</p>

        <div class="aside-divider"></div>

        <div class="aside-btns">
          <NuxtLink to="/contact" class="consult-btn">
            {{ $t('schoolDetail.consultBtn') }}
          </NuxtLink>
          <a href="#" class="download-btn">
            下載學校簡章
          </a>
        </div>
      </div>
    </section>

    <!-- 主體：內容 + 側欄 -->
    <section class="detail-body">
      <div class="detail-content">

        <!-- 基本資料 -->
        <div class="detail-block">
          <h2 class="block-title">{{ $t('schoolDetail.basicInfo') }}</h2>
          <ul class="info-list">
            <li><span>{{ $t('schoolDetail.schoolName') }}</span><span>{{ school.name }}</span></li>
            <li><span>{{ $t('schoolDetail.city') }}</span><span>{{ school.location }}</span></li>
            <li><span>{{ $t('schoolDetail.founded') }}</span><span>{{ school.founded }}</span></li>
            <li><span>{{ $t('schoolDetail.type') }}</span><span>{{ school.type }}</span></li>
            <li><span>{{ $t('schoolDetail.intake') }}</span><span>{{ school.intake.join('月、') }}月</span></li>
            <li v-if="school.contact?.tel">
              <span>{{ $t('schoolDetail.tel') }}</span>
              <span>{{ school.contact.tel }}</span>
            </li>
            <li v-if="school.contact?.website">
              <span>{{ $t('schoolDetail.website') }}</span>
              <a :href="school.contact.website" target="_blank" rel="noopener noreferrer" class="info-link">
                {{ school.contact.website }}
              </a>
            </li>
            <li v-if="school.contact?.address">
              <span>{{ $t('schoolDetail.address') }}</span>
              <span>{{ school.contact.address }}</span>
            </li>
            <li v-if="school.contact?.nearest_station">
              <span>{{ $t('schoolDetail.nearestStation') }}</span>
              <span>{{ school.contact.nearest_station }}</span>
            </li>
          </ul>
        </div>

        <!-- 學校介紹 -->
        <div class="detail-block">
          <h2 class="block-title">{{ $t('schoolDetail.introduction') }}</h2>
          <p class="detail-text">{{ school.introduction }}</p>
        </div>

        <!-- 上課時間 -->
        <div v-if="school.classSchedule" class="detail-block">
          <h2 class="block-title">{{ $t('schoolDetail.classSchedule') }}</h2>
          <ul class="info-list">
            <li>
              <span>{{ $t('schoolDetail.morningClass') }}</span>
              <span>{{ school.classSchedule.morningClass }}</span>
            </li>
            <li v-if="school.classSchedule.afternoonClass">
              <span>{{ $t('schoolDetail.afternoonClass') }}</span>
              <span>{{ school.classSchedule.afternoonClass }}</span>
            </li>
            <li>
              <span>{{ $t('schoolDetail.daysPerWeek') }}</span>
              <span>{{ school.classSchedule.daysPerWeek }}</span>
            </li>
            <li>
              <span>{{ $t('schoolDetail.hoursPerWeek') }}</span>
              <span>{{ school.classSchedule.hoursPerWeek }}</span>
            </li>
          </ul>
          <p v-if="school.classSchedule.note" class="detail-note">
            ※ {{ school.classSchedule.note }}
          </p>
        </div>

        <!-- 學費資訊 -->
        <div class="detail-block">
          <h2 class="block-title">{{ $t('schoolDetail.tuitionInfo') }}</h2>
          <div class="table-wrap">
            <table class="tuition-table">
              <thead>
                <tr>
                  <th>{{ $t('schoolDetail.period') }}</th>
                  <th>{{ $t('schoolDetail.applicationFee') }}</th>
                  <th>{{ $t('schoolDetail.registrationFee') }}</th>
                  <th>{{ $t('schoolDetail.tuition') }}</th>
                  <th>{{ $t('schoolDetail.otherFees') }}</th>
                  <th>{{ $t('schoolDetail.total') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fee in school.tuitionDetails" :key="fee.duration">
                  <td>{{ fee.duration }}</td>
                  <td>{{ fee.applicationFee }}</td>
                  <td>{{ fee.registrationFee }}</td>
                  <td>{{ fee.tuition }}</td>
                  <td>{{ fee.otherFees }}</td>
                  <td class="total-cell">{{ fee.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 學生國籍比例 -->
        <div v-if="school.nationalityRatio?.length" class="detail-block">
          <h2 class="block-title">{{ $t('schoolDetail.nationalityRatio') }}</h2>
          <ul class="ratio-list">
            <li v-for="(n, i) in school.nationalityRatio" :key="i" class="ratio-row">
              <span class="ratio-country">{{ n.country }}</span>
              <div class="ratio-bar-track">
                <div class="ratio-bar-fill" :style="{ width: n.ratio }"></div>
              </div>
              <span class="ratio-percent">{{ n.ratio }}</span>
            </li>
          </ul>
        </div>

        <!-- 課程特色 -->
        <div class="detail-block">
          <h2 class="block-title">{{ $t('schoolDetail.features') }}</h2>
          <ul class="feature-list">
            <li v-for="(item, i) in school.features" :key="i">
              <span class="feature-dot"></span>{{ item }}
            </li>
          </ul>
          <p v-if="school.date" class="detail-note" style="margin-top:0.75rem">
            ※ {{ $t('schoolDetail.courseDuration') }}{{ school.date }}
          </p>
        </div>

        <!-- 入學要件 -->
        <div class="detail-block">
          <h2 class="block-title">{{ $t('schoolDetail.requirements') }}</h2>
          <ul class="req-list">
            <li v-for="(req, i) in school.requirements" :key="i">{{ req }}</li>
          </ul>
        </div>

      </div>
    </section>
    <!-- 推薦學校側欄 -->
    <aside class="detail-sidebar">
      <!-- 左欄：推薦學校 -->
      <div class="sidebar-col">
        <h3 class="sidebar-title">{{ $t('schoolDetail.moreSchools') }}</h3>
        <div v-for="(rec, i) in recommendedSchools" :key="i" class="rec-card">
          <NuxtLink :to="`/study/${encodeURIComponent(rec.name)}`">
            <img :src="rec.image" :alt="`${rec.name} 推薦學校`" class="rec-img" />
            <div class="rec-body">
              <p class="rec-name">{{ rec.name }}</p>
              <p class="rec-location">{{ rec.location }}</p>
              <span class="rec-cta">{{ $t('schoolDetail.viewMore') }} →</span>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- 右欄：相關文章 -->
      <div class="sidebar-col">
        <h3 class="sidebar-title">相關情報</h3>
        <div class="article-link-list">
          <NuxtLink to="/study/information/japan-study-cost-zh" class="article-link-item">
            <span class="article-link-text">日本留學費用完整攻略｜語言學校學費與生活費比較</span>
          </NuxtLink>
          <NuxtLink to="/study/information/japan-visa-guide-zh" class="article-link-item">
            <span class="article-link-text">日本留學簽證申請完整指南｜COE 申請到入境流程</span>
          </NuxtLink>
          <NuxtLink to="/study/information/taiwan-shortstudy-zh" class="article-link-item">
            <span class="article-link-text">台灣短期遊學推薦｜小班制中文課程與文化體驗</span>
          </NuxtLink>
          <NuxtLink to="/study/information" class="article-link-more">
            查看所有留學情報 →
          </NuxtLink>
        </div>
      </div>
    </aside>
  </main>

  <Footer />
</template>

<style scoped>
.detail-page {
  width: 80%;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.detail-sidebar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: flex-start;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--c-border);
}

.sidebar-col {
  width: 100%;
}

.pill {
  
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  padding: 0.25rem 0.7rem;
  border-radius: var(--radius-full);
  font-weight: 600;
}

.article-link-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.article-link-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  background: var(--c-surface);
  width: 100%;
  box-sizing: border-box;
  transition: border-color var(--transition-fast);
}

.article-link-item:hover {
  border-color: var(--c-primary);
  background: var(--c-primary-muted);
}

.article-link-text {
  
  color: var(--c-text);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-link-more {
  display: block;
  text-align: right;
  
  font-weight: 700;
  color: var(--c-primary);
  text-decoration: none;
  padding: 0.5rem 0;
}

.article-link-more:hover {
  text-decoration: underline;
}

/* RWD：側欄在手機改成單欄 */
@media (max-width: 900px) {
  .detail-page {
    width: 100%;
  }

  .detail-sidebar {
    flex-direction: column;
  }
}

.aside-divider {
  height: 1px;
  background: var(--c-border);
  margin: 0.8rem 0;
}

.aside-intro {
  
  color: var(--c-text-secondary);
  line-height: 2;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aside-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.aside-meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  gap: 0.5rem;
}

.aside-meta-label {
  color: var(--c-text-muted);
  font-weight: 600;
  flex-shrink: 0;
}

.aside-meta-val {
  color: var(--c-text);
  text-align: right;
}

.aside-btns {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.download-btn {
  display: block;
  width: 100%;
  border: 1.5px solid var(--c-primary);
  color: var(--c-primary);
  text-align: center;
  padding: 0.8rem;
  border-radius: var(--radius-md);
  font-weight: 700;
  
  text-decoration: none;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.download-btn:hover {
  background: var(--c-primary-muted);
}

/* ── 麵包屑 ── */
.breadcrumb-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--c-border);
  margin-bottom: 2rem;
  
}

.breadcrumb-bar a {
  color: var(--c-primary);
  text-decoration: none;
}

.breadcrumb-bar a:hover {
  text-decoration: underline;
}

.crumb-sep {
  color: var(--c-border);
}

.crumb-current {
  color: var(--c-text-muted);
}

/* ── Hero ── */
.detail-hero {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
  align-items: flex-start;
}

.detail-gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 1280px;
}

.gallery-carousel {
  /* border-radius: var(--radius-md); */
  overflow: hidden;
}

.gallery-img {
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: 500px;
  object-fit: cover;
  display: block;
}

.gallery-thumbs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
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

.thumb.active {
  border-color: var(--c-primary);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.detail-aside {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.4rem;
  background: var(--c-surface);
  position: sticky;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.detail-type-tag {
  display: inline-block;
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  
  font-weight: 700;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-sm);
  width: fit-content;
}

.detail-name {
  font-family: var(--font-heading);
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  font-weight: 800;
  color: var(--c-primary-dark);
  margin: 0;
  line-height: 1.3;
}

.detail-location {
  
  color: var(--c-text-muted);
  margin: 0;
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
  
  text-decoration: none;
  margin-top: 0.5rem;
  transition: background var(--transition-fast);
}

.consult-btn:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
}

/* ── 主體 ── */
.detail-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
}

.detail-block {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.4rem;
  background: var(--c-surface);
}

.introduce {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-primary-dark);
}

.block-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--c-border);
}

/* 資訊清單 */
.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--c-border);
  
  gap: 1rem;
}

.info-list li:last-child {
  border-bottom: none;
}

.info-list li span:first-child {
  color: var(--c-text-muted);
  font-weight: 600;
  
  flex-shrink: 0;
  padding-top: 2px;
  min-width: 80px;
}

.info-list li span:last-child,
.info-list li a {
  color: var(--c-text);
  text-align: right;
  word-break: break-all;
}

.info-link {
  color: var(--c-primary);
  text-decoration: underline;
}

.detail-text {
  
  color: var(--c-text-secondary);
  line-height: 1.85;
  margin: 0;
}

.detail-note {
  
  color: var(--c-text-muted);
  margin: 0;
  line-height: 1.6;
}

/* 學費表 */
.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tuition-table {
  width: 100%;
  border-collapse: collapse;
  
  min-width: 480px;
}

.tuition-table thead tr {
  background: var(--c-primary-muted);
}

.tuition-table th {
  padding: 0.6rem 0.75rem;
  text-align: center;
  font-weight: 700;
  color: var(--c-primary-dark);
  
  border-bottom: 1px solid var(--c-border);
  white-space: nowrap;
}

.tuition-table td {
  padding: 0.6rem 0.75rem;
  text-align: center;
  color: var(--c-text-secondary);
  border-bottom: 1px solid var(--c-border);
  
  white-space: nowrap;
}

.tuition-table tbody tr:last-child td {
  border-bottom: none;
}

.tuition-table tbody tr:nth-child(even) {
  background: var(--c-bg-alt);
}

.total-cell {
  font-weight: 700;
  color: var(--c-primary-dark);
}

/* 國籍比例 */
.ratio-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ratio-row {
  display: grid;
  grid-template-columns: 64px 1fr 44px;
  align-items: center;
  gap: 0.75rem;
}

.ratio-country {
  
  font-weight: 600;
  color: var(--c-text);
}

.ratio-bar-track {
  height: 8px;
  background: var(--c-bg-alt);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.ratio-bar-fill {
  height: 100%;
  background: var(--c-primary);
  border-radius: var(--radius-full);
  transition: width 0.4s ease;
}

.ratio-percent {
  
  font-weight: 700;
  color: var(--c-primary-dark);
  text-align: right;
}

/* 特色 */
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
  
  color: var(--c-text-secondary);
  line-height: 1.6;
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
  
  color: var(--c-text-secondary);
  line-height: 1.6;
}

/* ── 側欄 ── */
.detail-sidebar {
  position: sticky;
  top: 80px;
}

.sidebar-title {
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.75rem;
}

.rec-card {
  margin-bottom: 0.75rem;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--c-border);
}

.rec-card:hover {
  border-color: var(--c-primary);
}

.rec-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* 左側推薦學校改兩欄 */
.sidebar-col:first-child {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.sidebar-col:first-child .sidebar-title {
  grid-column: 1 / -1;
}

.rec-img {
  height: 100px;
  width: 100%;
  object-fit: cover;
  display: block;
}

.rec-body {
  padding: 0.7rem;
}

.rec-name {
  
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 0.2rem;
}

.rec-location {
  
  color: var(--c-text-muted);
  margin: 0 0 0.35rem;
}

.rec-cta {
  
  font-weight: 700;
  color: var(--c-primary);
}

.sidebar-cta {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1rem;
  text-align: center;
  background: var(--c-bg-alt);
  margin-top: 0.75rem;
}

.sidebar-cta p {
  
  color: var(--c-text-secondary);
  margin: 0 0 0.6rem;
}

.consult-btn--sm {
  display: inline-block;
  width: auto;
  padding: 0.6rem 1.4rem;
  
  margin-top: 0;
}

/* ════════════════════════════════
   RWD
════════════════════════════════ */
@media (max-width: 1024px) {
  .detail-body {
    grid-template-columns: 1fr;
  }

  .detail-sidebar {
    grid-template-columns: 1fr;
  }

  .sidebar-title {
    grid-column: 1 / -1;
    margin-bottom: 0;
  }

  .sidebar-cta {
    grid-column: 1 / -1;
    margin-top: 0;
  }

  .rec-card {
    margin-bottom: 10px;
  }
}

@media (max-width: 900px) {
  .detail-hero {
    grid-template-columns: 1fr;
  }

  .detail-aside {
    position: static;
  }
}

@media (max-width: 640px) {
  .detail-page {
    padding: 0 1rem 4rem;
  }

  .detail-block {
    padding: 1.1rem;
  }

  .info-list li span:first-child {
    min-width: 64px;
  }
}

@media (max-width: 480px) {
  .gallery-thumbs {
    gap: 0.4rem;
  }

  .thumb {
    width: 60px;
    height: 45px;
  }
}
</style>