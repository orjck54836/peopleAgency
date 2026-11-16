<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onSelect(index: number) { activeIndex.value = index }
function select(index: number) {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}

const schoolName = decodeURIComponent(route.params.name as string)

const { data: allSchools } = await useAsyncData('schools-list', async () => {
  const json = await $fetch<{ success: boolean; data: any[] }>('/api/schools')
  return json.success ? json.data : []
})

const school = computed(() =>
  (allSchools.value ?? []).find((s) => s.name === schoolName)
)

// 圖片來源：優先使用 images 陣列，沒有的話 fallback 用單張 image
const items = computed<string[]>(() => {
  if (school.value?.images?.length) return school.value.images
  if (school.value?.image) return [school.value.image]
  return []
})

const recommendedSchools = computed(() => {
  const others = (allSchools.value ?? []).filter((s) => s.name !== schoolName)
  // 同一個地區的排前面，其餘照 API 原本的順序。
  // 不用 localeCompare：Node 和瀏覽器對中日文的排序結果不同，SSR 和前端會挑到不同學校（hydration mismatch）
  const here = school.value?.location
  return [
    ...others.filter((s) => s.location === here),
    ...others.filter((s) => s.location !== here),
  ].slice(0, 3)
})

// 語系檔裡有些欄位名稱結尾帶全形冒號（給舊版的「標籤：值」排版用），
// 現在標籤和值分開排，冒號要拿掉
const label = (key: string) => t(key).replace(/[：:]\s*$/, '')

// 頁內導覽：只列這間學校真的有資料的區塊
const sections = computed(() => {
  const sc = school.value
  if (!sc) return []
  return [
    { id: 'intro', title: t('schoolDetail.introduction'), show: Boolean(sc.introduction) },
    { id: 'features', title: t('schoolDetail.features'), show: Boolean(sc.features?.length) },
    { id: 'schedule', title: t('schoolDetail.classSchedule'), show: Boolean(sc.classSchedule) },
    { id: 'tuition', title: t('schoolDetail.tuitionInfo'), show: Boolean(sc.tuitionDetails?.length) },
    { id: 'ratio', title: t('schoolDetail.nationalityRatio'), show: Boolean(sc.nationalityRatio?.length) },
    { id: 'requirements', title: t('schoolDetail.requirements'), show: Boolean(sc.requirements?.length) },
    { id: 'info', title: t('schoolDetail.basicInfo'), show: true },
  ].filter((x) => x.show)
})

// 學校照片放在遠端，壞圖時收掉 <img>，露出底下的品牌色底
function onImgError(e: Event) {
  (e.target as HTMLElement).style.visibility = 'hidden'
}

const { revealReady } = useScrollReveal('.dp')

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

/* ── 燈箱 Lightbox ── */
const isLightboxOpen = ref(false)

function openLightbox() {
  if (!items.value.length) return
  isLightboxOpen.value = true
}
function closeLightbox() {
  isLightboxOpen.value = false
}
function nextImage() {
  if (!items.value.length) return
  activeIndex.value = (activeIndex.value + 1) % items.value.length
  carousel.value?.emblaApi?.scrollTo(activeIndex.value)
}
function prevImage() {
  if (!items.value.length) return
  activeIndex.value = (activeIndex.value - 1 + items.value.length) % items.value.length
  carousel.value?.emblaApi?.scrollTo(activeIndex.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <main v-if="school" class="dp" :class="{ 'reveal-on': revealReady }">
    <!-- Hero：把學校照片放大模糊當底，蓋品牌深色，文字才讀得到 -->
    <section class="dp-hero">
      <img v-if="items[0]" class="dp-hero__bg" :src="items[0]" alt="" aria-hidden="true" @error="onImgError" />
      <div class="dp-hero__shade" aria-hidden="true"></div>

      <div class="dp-hero__inner">
        <nav class="dp-crumb" aria-label="breadcrumb">
          <NuxtLink :to="localePath('/study/schools')">{{ $t('schoolDetail.breadcrumb') }}</NuxtLink>
          <span aria-hidden="true">›</span>
          <span class="dp-crumb__current">{{ school.name }}</span>
        </nav>

        <span class="dp-hero__type">{{ school.type }}</span>
        <h1 class="dp-hero__name">{{ school.name }}</h1>

        <div class="dp-hero__meta">
          <span class="dp-hero__loc">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
            {{ school.location }}
          </span>
          <span v-for="tag in school.tags" :key="tag" class="dp-hero__tag">{{ tag }}</span>
        </div>
      </div>
    </section>

    <div class="dp-layout">
      <div class="dp-main">
        <!-- 相簿 -->
        <section class="dp-gallery">
          <div class="dp-gallery__main">
            <UCarousel ref="carousel" v-slot="{ item }" :items="items" class="gallery-carousel" @select="onSelect">
              <img
                :src="item"
                class="gallery-img"
                :alt="`${school.name} 學校圖片`"
                @click="openLightbox"
                @error="onImgError"
              />
            </UCarousel>

            <template v-if="items.length > 1">
              <button type="button" class="dp-gallery__nav dp-gallery__nav--prev" aria-label="上一張" @click="prevImage">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6" /></svg>
              </button>
              <button type="button" class="dp-gallery__nav dp-gallery__nav--next" aria-label="下一張" @click="nextImage">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6" /></svg>
              </button>
              <span class="dp-gallery__count">{{ activeIndex + 1 }} / {{ items.length }}</span>
            </template>
          </div>

          <div v-if="items.length > 1" class="gallery-thumbs">
            <button
              v-for="(item, index) in items"
              :key="index"
              type="button"
              class="thumb"
              :class="{ active: activeIndex === index }"
              :aria-label="`縮圖 ${index + 1}`"
              @click="select(index)"
            >
              <img :src="item" alt="" loading="lazy" @error="onImgError" />
            </button>
          </div>
        </section>

        <!-- 頁內導覽 -->
        <nav class="dp-tabs" aria-label="sections">
          <a v-for="sec in sections" :key="sec.id" :href="`#${sec.id}`" class="dp-tab">{{ sec.title }}</a>
        </nav>

        <!-- 學校介紹 -->
        <section id="intro" class="detail-block" data-reveal>
          <h2 class="block-title">{{ $t('schoolDetail.introduction') }}</h2>
          <p class="detail-text">{{ school.introduction }}</p>
        </section>

        <!-- 課程特色 -->
        <section v-if="school.features?.length" id="features" class="detail-block" data-reveal>
          <h2 class="block-title">{{ $t('schoolDetail.features') }}</h2>
          <ul class="feature-list">
            <li v-for="(item, i) in school.features" :key="i">
              <span class="feature-check" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10" /></svg>
              </span>
              {{ item }}
            </li>
          </ul>
          <p v-if="school.date" class="detail-note">
            ※ {{ $t('schoolDetail.courseDuration') }}{{ school.date }}
          </p>
        </section>

        <!-- 上課時間 -->
        <section v-if="school.classSchedule" id="schedule" class="detail-block" data-reveal>
          <h2 class="block-title">{{ $t('schoolDetail.classSchedule') }}</h2>
          <dl class="sched-grid">
            <div class="sched-tile">
              <dt>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" /></svg>
                {{ $t('schoolDetail.morningClass') }}
              </dt>
              <dd>{{ school.classSchedule.morningClass }}</dd>
            </div>
            <div v-if="school.classSchedule.afternoonClass" class="sched-tile">
              <dt>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10V4M5.6 11.6 7 13M18.4 11.6 17 13M3 18h18M7 18a5 5 0 0 1 10 0" /></svg>
                {{ $t('schoolDetail.afternoonClass') }}
              </dt>
              <dd>{{ school.classSchedule.afternoonClass }}</dd>
            </div>
            <div class="sched-tile">
              <dt>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
                {{ $t('schoolDetail.daysPerWeek') }}
              </dt>
              <dd>{{ school.classSchedule.daysPerWeek }}</dd>
            </div>
            <div class="sched-tile">
              <dt>
                <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                {{ $t('schoolDetail.hoursPerWeek') }}
              </dt>
              <dd>{{ school.classSchedule.hoursPerWeek }}</dd>
            </div>
          </dl>
          <p v-if="school.classSchedule.note" class="detail-note">
            ※ {{ school.classSchedule.note }}
          </p>
        </section>

        <!-- 學費資訊 -->
        <section v-if="school.tuitionDetails?.length" id="tuition" class="detail-block" data-reveal>
          <h2 class="block-title">{{ $t('schoolDetail.tuitionInfo') }}</h2>
          <!-- 金額欄常帶「初年度／次年度」這種長字串：桌機用表格，手機改成一筆一張卡 -->
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
                  <td class="period-cell">{{ fee.duration }}</td>
                  <td :data-label="$t('schoolDetail.applicationFee')">{{ fee.applicationFee }}</td>
                  <td :data-label="$t('schoolDetail.registrationFee')">{{ fee.registrationFee }}</td>
                  <td :data-label="$t('schoolDetail.tuition')">{{ fee.tuition }}</td>
                  <td :data-label="$t('schoolDetail.otherFees')">{{ fee.otherFees }}</td>
                  <td class="total-cell" :data-label="$t('schoolDetail.total')">{{ fee.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="fee-note">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
            {{ $t('schoolDetail.zeroFee') }}
          </p>
        </section>

        <!-- 學生國籍比例 -->
        <section v-if="school.nationalityRatio?.length" id="ratio" class="detail-block" data-reveal>
          <h2 class="block-title">{{ $t('schoolDetail.nationalityRatio') }}</h2>
          <ul class="ratio-list">
            <li v-for="(n, i) in school.nationalityRatio" :key="i" class="ratio-row">
              <span class="ratio-country">{{ n.country }}</span>
              <div class="ratio-bar-track">
                <div class="ratio-bar-fill" :style="{ '--w': n.ratio, '--i': i }"></div>
              </div>
              <span class="ratio-percent">{{ n.ratio }}</span>
            </li>
          </ul>
        </section>

        <!-- 入學要件 -->
        <section v-if="school.requirements?.length" id="requirements" class="detail-block" data-reveal>
          <h2 class="block-title">{{ $t('schoolDetail.requirements') }}</h2>
          <ol class="req-list">
            <li v-for="(req, i) in school.requirements" :key="i">{{ req }}</li>
          </ol>
        </section>

        <!-- 基本資料 -->
        <section id="info" class="detail-block" data-reveal>
          <h2 class="block-title">{{ $t('schoolDetail.basicInfo') }}</h2>
          <dl class="info-list">
            <div><dt>{{ label('schoolDetail.schoolName') }}</dt><dd>{{ school.name }}</dd></div>
            <div><dt>{{ label('schoolDetail.city') }}</dt><dd>{{ school.location }}</dd></div>
            <div v-if="school.founded"><dt>{{ label('schoolDetail.founded') }}</dt><dd>{{ school.founded }}</dd></div>
            <div><dt>{{ label('schoolDetail.type') }}</dt><dd>{{ school.type }}</dd></div>
            <div><dt>{{ label('schoolDetail.intake') }}</dt><dd>{{ school.intake.join('、') }}</dd></div>
            <div v-if="school.contact?.tel"><dt>{{ $t('schoolDetail.tel') }}</dt><dd>{{ school.contact.tel }}</dd></div>
            <div v-if="school.contact?.website">
              <dt>{{ $t('schoolDetail.website') }}</dt>
              <dd>
                <a :href="school.contact.website" target="_blank" rel="noopener noreferrer" class="info-link">
                  {{ school.contact.website }}
                </a>
              </dd>
            </div>
            <div v-if="school.contact?.address"><dt>{{ $t('schoolDetail.address') }}</dt><dd>{{ school.contact.address }}</dd></div>
            <div v-if="school.contact?.nearest_station"><dt>{{ $t('schoolDetail.nearestStation') }}</dt><dd>{{ school.contact.nearest_station }}</dd></div>
          </dl>
        </section>
      </div>

      <!-- 右側：重點摘要 + 諮詢 -->
      <aside class="dp-aside">
        <div class="aside-card">
          <p class="aside-card__name">{{ school.name }}</p>

          <dl class="aside-facts">
            <div>
              <dt>{{ label('schoolDetail.location') }}</dt>
              <dd>{{ school.location }}</dd>
            </div>
            <div>
              <dt>{{ label('schoolDetail.intake') }}</dt>
              <dd class="aside-chips">
                <span v-for="m in school.intake" :key="m" class="intake-chip">{{ m }}</span>
              </dd>
            </div>
            <div v-if="school.contact?.nearest_station">
              <dt>{{ $t('schoolDetail.nearestStation') }}</dt>
              <dd>{{ school.contact.nearest_station }}</dd>
            </div>
          </dl>

          <NuxtLink :to="localePath('/contact')" class="consult-btn">
            {{ $t('schoolDetail.consultBtn') }}
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </NuxtLink>
          <a
            v-if="school.contact?.website"
            :href="school.contact.website"
            target="_blank"
            rel="noopener noreferrer"
            class="site-btn"
          >
            {{ $t('schoolDetail.officialSite') }}
          </a>

          <p class="aside-note">{{ $t('schoolDetail.zeroFee') }}</p>
        </div>
      </aside>
    </div>

    <!-- 更多學校 + 相關情報 -->
    <section class="dp-more">
      <div class="dp-more__inner">
        <h2 class="dp-more__title" data-reveal>{{ $t('schoolDetail.moreSchools') }}</h2>
        <div class="rec-grid">
          <NuxtLink
            v-for="(rec, i) in recommendedSchools"
            :key="rec.name"
            :to="localePath(`/study/${encodeURIComponent(rec.name)}`)"
            class="rec-card"
            data-reveal
            :style="{ '--d': `${i * 90}ms` }"
          >
            <div class="rec-img-wrap">
              <img :src="rec.image" :alt="`${rec.name} 推薦學校`" class="rec-img" loading="lazy" @error="onImgError" />
              <span class="rec-location">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
                {{ rec.location }}
              </span>
            </div>
            <div class="rec-body">
              <p class="rec-name">{{ rec.name }}</p>
              <span class="rec-cta">
                {{ $t('schoolDetail.viewMore') }}
                <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
          </NuxtLink>
        </div>

        <h2 class="dp-more__title dp-more__title--sub" data-reveal>{{ $t('schoolDetail.relatedInfo') }}</h2>
        <div class="article-link-list" data-reveal>
          <NuxtLink :to="localePath('/study/information/japan-study-cost-zh')" class="article-link-item">
            <span class="article-link-text">日本留學費用完整攻略｜語言學校學費與生活費比較</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6" /></svg>
          </NuxtLink>
          <NuxtLink :to="localePath('/study/information/japan-visa-guide-zh')" class="article-link-item">
            <span class="article-link-text">日本留學簽證申請完整指南｜COE 申請到入境流程</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6" /></svg>
          </NuxtLink>
          <NuxtLink :to="localePath('/study/information/taiwan-shortstudy-zh')" class="article-link-item">
            <span class="article-link-text">台灣短期遊學推薦｜小班制中文課程與文化體驗</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6" /></svg>
          </NuxtLink>
        </div>
        <NuxtLink :to="localePath('/study/information')" class="article-link-more">
          {{ $t('schoolDetail.allInfo') }} →
        </NuxtLink>
      </div>
    </section>

    <!-- 底部 CTA：和 /study 入口頁共用樣式與文案 -->
    <section class="lp-cta dp-cta">
      <div class="lp-cta__inner" data-reveal>
        <h2 class="lp-cta__title">{{ $t('home.cta.heading') }}</h2>
        <p class="lp-cta__body">{{ $t('home.cta.body') }}</p>
        <NuxtLink :to="localePath('/contact')" class="lp-btn lp-btn--light">{{ $t('home.cta.btn') }}</NuxtLink>
      </div>
    </section>
  </main>

  <!-- 網址上的校名對不到資料：給一個回列表的出口，不要整頁空白 -->
  <main v-else class="dp-missing">
    <img src="/images/plane.png" alt="" width="1600" height="1202" />
    <p>{{ $t('schoolDetail.notFound') }}</p>
    <NuxtLink :to="localePath('/study/schools')" class="consult-btn consult-btn--inline">
      {{ $t('schoolDetail.backToList') }}
    </NuxtLink>
  </main>

  <!-- 燈箱 Lightbox -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isLightboxOpen" class="lightbox-overlay" @click.self="closeLightbox">
        <button class="lightbox-close" @click="closeLightbox" aria-label="關閉">✕</button>
        <button v-if="items.length > 1" class="lightbox-nav lightbox-prev" @click="prevImage" aria-label="上一張">‹</button>
        <!-- key 跟著張數換，切換時整張重掛，淡入動畫才會重播 -->
        <img :key="activeIndex" :src="items[activeIndex]" class="lightbox-img" :alt="`${school?.name} 放大圖片`" />
        <button v-if="items.length > 1" class="lightbox-nav lightbox-next" @click="nextImage" aria-label="下一張">›</button>
        <span v-if="items.length > 1" class="lightbox-count">{{ activeIndex + 1 }} / {{ items.length }}</span>
      </div>
    </Transition>
  </Teleport>

  <Footer />
</template>

<style scoped>
.dp {
  --dp-ink: color-mix(in srgb, var(--c-primary-dark) 70%, #000);
  /* 站上的 Header 連同 App 公告列高 148px，sticky 和錨點都要讓過它 */
  --dp-header: 164px;
  background: var(--c-bg-alt);
  overflow-x: clip;
}

/* ── Hero ── */
.dp-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 2rem 1.5rem 6.5rem;
  color: #fff;
  background: var(--dp-ink);
}

.dp-hero__bg {
  position: absolute;
  inset: -40px;
  z-index: -2;
  width: calc(100% + 80px);
  height: calc(100% + 80px);
  object-fit: cover;
  filter: blur(18px) saturate(1.1);
  animation: dp-zoom 16s ease-out both;
}

@keyframes dp-zoom {
  from { transform: scale(1.12); }
  to { transform: scale(1); }
}

.dp-hero__shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg,
      color-mix(in srgb, var(--dp-ink) 88%, transparent) 0%,
      color-mix(in srgb, var(--dp-ink) 62%, transparent) 60%,
      color-mix(in srgb, var(--dp-ink) 48%, transparent) 100%);
}

.dp-hero__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.dp-hero__inner > * {
  animation: dp-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.dp-hero__inner > :nth-child(2) { animation-delay: 0.08s; }
.dp-hero__inner > :nth-child(3) { animation-delay: 0.16s; }
.dp-hero__inner > :nth-child(4) { animation-delay: 0.26s; }

@keyframes dp-rise {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
}

.dp-crumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

.dp-crumb a {
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.dp-crumb a:hover { color: #fff; text-decoration: underline; }
.dp-crumb__current { color: rgba(255, 255, 255, 0.6); }

.dp-hero__type {
  display: inline-block;
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: 0.1em;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.38);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--radius-full);
  padding: 0.25rem 0.9rem;
}

.dp-hero__name {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4.4vw, 2.8rem);
  font-weight: 800;
  line-height: 1.3;
  color: #fff;
  margin: 0.9rem 0 1rem;
  text-shadow: 0 2px 22px rgba(0, 0, 0, 0.3);
}

.dp-hero__meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.dp-hero__loc {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 700;
  margin-right: 0.4rem;
}

.dp-hero__tag {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary-dark);
  background: rgba(255, 255, 255, 0.92);
  border-radius: var(--radius-full);
  padding: 0.12rem 0.7rem;
}

/* ── 版面：相簿往上壓進 Hero ── */
.dp-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 1.75rem;
  max-width: 1200px;
  margin: -4.5rem auto 0;
  padding: 0 1.5rem 4rem;
  align-items: flex-start;
}

.dp-main {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
}

/* ── 相簿 ── */
.dp-gallery {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: dp-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.2s both;
}

.dp-gallery__main {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: linear-gradient(135deg, var(--c-primary-muted), var(--c-border));
  box-shadow: 0 18px 40px rgba(40, 8, 16, 0.22);
}

.gallery-carousel {
  overflow: hidden;
}

.gallery-img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
  cursor: zoom-in;
}

.dp-gallery__nav {
  position: absolute;
  top: 50%;
  translate: 0 -50%;
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  color: var(--c-primary-dark);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s ease, scale 0.2s ease, background 0.2s ease;
}

.dp-gallery__nav--prev { left: 0.9rem; }
.dp-gallery__nav--next { right: 0.9rem; }

.dp-gallery__main:hover .dp-gallery__nav,
.dp-gallery__nav:focus-visible { opacity: 1; }
.dp-gallery__nav:hover { background: #fff; scale: 1.08; }
.dp-gallery__nav:active { scale: 0.94; }

.dp-gallery__count {
  position: absolute;
  right: 0.9rem;
  bottom: 0.9rem;
  font-size: var(--text-sm);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #fff;
  background: rgba(20, 6, 10, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border-radius: var(--radius-full);
  padding: 0.15rem 0.75rem;
  pointer-events: none;
}

.gallery-thumbs {
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  padding: 3px;
  scrollbar-width: none;
}

.gallery-thumbs::-webkit-scrollbar { display: none; }

.thumb {
  flex: 0 0 auto;
  width: 92px;
  height: 64px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  background: var(--c-primary-muted);
  outline: 2px solid transparent;
  outline-offset: 1px;
  transition: opacity 0.2s ease, outline-color 0.2s ease, translate 0.2s ease;
}

.thumb:hover { opacity: 1; translate: 0 -2px; }
.thumb.active { opacity: 1; outline-color: var(--c-primary); }

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── 頁內導覽 ── */
.dp-tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.15rem 0;
  scrollbar-width: none;
}

.dp-tabs::-webkit-scrollbar { display: none; }

.dp-tab {
  flex: 0 0 auto;
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--c-text-secondary);
  text-decoration: none;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-full);
  padding: 0.4rem 1rem;
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
}

.dp-tab:hover {
  background: var(--c-primary);
  border-color: var(--c-primary);
  color: #fff;
}

/* ── 內容區塊 ── */
.detail-block {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 1.6rem 1.7rem;
  background: var(--c-surface);
  scroll-margin-top: var(--dp-header);
}

.block-title {
  position: relative;
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 800;
  color: var(--c-primary-dark);
  margin: 0 0 1.2rem;
  padding-left: 0.9rem;
}

.block-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.2em;
  bottom: 0.2em;
  width: 4px;
  border-radius: var(--radius-full);
  background: linear-gradient(180deg, var(--c-primary-light), var(--c-primary-dark));
}

.detail-text {
  color: var(--c-text-secondary);
  line-height: 2;
  margin: 0;
}

.detail-note {
  font-size: var(--text-sm);
  color: var(--c-text-muted);
  margin: 1rem 0 0;
  line-height: 1.7;
}

/* 課程特色 */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  color: var(--c-text-secondary);
  line-height: 1.65;
  background: var(--c-bg-alt);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  padding: 0.75rem 0.9rem;
  transition: border-color var(--transition-fast), background var(--transition-fast), translate var(--transition-fast);
}

.feature-list li:hover {
  border-color: var(--c-border);
  background: var(--c-surface);
  translate: 0 -2px;
}

.feature-check {
  flex: none;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin-top: 0.15rem;
  border-radius: 50%;
  color: #fff;
  background: var(--c-primary);
}

/* 上課時間 */
.sched-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  margin: 0;
}

.sched-tile {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 0.9rem 1rem;
}

.sched-tile dt {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary);
  margin-bottom: 0.35rem;
}

.sched-tile dd {
  margin: 0;
  color: var(--c-text);
  line-height: 1.65;
}

/* 學費 */
.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
}

.tuition-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.tuition-table th {
  padding: 0.7rem 0.8rem;
  text-align: left;
  font-weight: 700;
  color: var(--c-primary-dark);
  background: var(--c-primary-muted);
  white-space: nowrap;
}

.tuition-table td {
  padding: 0.75rem 0.8rem;
  text-align: left;
  vertical-align: top;
  color: var(--c-text-secondary);
  border-top: 1px solid var(--c-border);
  line-height: 1.6;
}

.tuition-table tbody tr {
  transition: background var(--transition-fast);
}

.tuition-table tbody tr:hover {
  background: var(--c-bg-alt);
}

.period-cell {
  font-weight: 700;
  color: var(--c-text) !important;
}

.total-cell {
  font-weight: 800;
  color: var(--c-primary-dark) !important;
}

.fee-note {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.6;
  color: var(--c-primary-dark);
  background: var(--c-primary-muted);
  border-radius: var(--radius-md);
  padding: 0.7rem 0.9rem;
  margin: 1rem 0 0;
}

.fee-note svg { flex: none; margin-top: 0.2em; }

/* 國籍比例 */
.ratio-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.ratio-row {
  display: grid;
  grid-template-columns: 72px 1fr 48px;
  align-items: center;
  gap: 0.75rem;
}

.ratio-country {
  font-weight: 600;
  color: var(--c-text);
}

.ratio-bar-track {
  height: 10px;
  background: var(--c-primary-muted);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.ratio-bar-fill {
  width: var(--w);
  height: 100%;
  background: linear-gradient(90deg, var(--c-primary-light), var(--c-primary));
  border-radius: var(--radius-full);
}

/* 捲到這一塊才把長條拉開；沒有 JS 時維持原寬 */
.reveal-on [data-reveal] .ratio-bar-fill {
  width: 0;
  transition: width 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) calc(0.25s + var(--i, 0) * 90ms);
}

.reveal-on [data-reveal].is-in .ratio-bar-fill {
  width: var(--w);
}

.ratio-percent {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--c-primary-dark);
  text-align: right;
}

/* 報名資格 */
.req-list {
  list-style: none;
  counter-reset: req;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.req-list li {
  counter-increment: req;
  position: relative;
  padding-left: 2.4rem;
  color: var(--c-text-secondary);
  line-height: 1.7;
}

.req-list li::before {
  content: counter(req);
  position: absolute;
  left: 0;
  top: 0.1rem;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: var(--text-sm);
  font-weight: 800;
  color: var(--c-primary-dark);
  background: var(--c-primary-muted);
}

/* 基本資料 */
.info-list {
  margin: 0;
}

.info-list > div {
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 1rem;
  padding: 0.7rem 0;
  border-bottom: 1px dashed var(--c-border);
}

.info-list > div:last-child { border-bottom: 0; padding-bottom: 0; }
.info-list > div:first-child { padding-top: 0; }

.info-list dt {
  font-weight: 600;
  color: var(--c-text-muted);
}

.info-list dd {
  margin: 0;
  color: var(--c-text);
  line-height: 1.65;
  overflow-wrap: anywhere;
}

.info-link {
  color: var(--c-primary);
  text-decoration: underline;
}

/* ── 右側摘要卡 ── */
.dp-aside {
  position: sticky;
  top: var(--dp-header);
  animation: dp-rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) 0.32s both;
}

.aside-card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: var(--c-surface);
  box-shadow: 0 18px 40px rgba(40, 8, 16, 0.14);
}

.aside-card__name {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 800;
  line-height: 1.4;
  color: var(--c-primary-dark);
  margin: 0;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--c-border);
}

.aside-facts {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 0;
}

.aside-facts dt {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--c-text-muted);
  margin-bottom: 0.2rem;
}

.aside-facts dd {
  margin: 0;
  font-weight: 600;
  line-height: 1.6;
  color: var(--c-text);
}

.aside-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.intake-chip {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary-dark);
  background: var(--c-primary-muted);
  border-radius: var(--radius-full);
  padding: 0.1rem 0.7rem;
}

.consult-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: 100%;
  background: var(--c-primary);
  color: var(--c-text-on-primary);
  padding: 0.9rem 1.2rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  text-decoration: none;
  margin-top: 0.3rem;
  box-shadow: 0 8px 18px rgba(139, 26, 47, 0.25);
  transition: background var(--transition-fast), translate var(--transition-fast), box-shadow var(--transition-fast);
}

.consult-btn:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
  translate: 0 -2px;
  box-shadow: 0 12px 24px rgba(139, 26, 47, 0.3);
}

.consult-btn svg { transition: translate 0.25s ease; }
.consult-btn:hover svg { translate: 4px 0; }

.consult-btn--inline {
  display: inline-flex;
  width: auto;
}

.site-btn {
  display: block;
  text-align: center;
  font-weight: 700;
  color: var(--c-primary);
  text-decoration: none;
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-full);
  padding: 0.75rem 1.2rem;
  transition: border-color var(--transition-fast), background var(--transition-fast);
}

.site-btn:hover {
  border-color: var(--c-primary);
  background: var(--c-primary-muted);
  color: var(--c-primary);
}

.aside-note {
  font-size: var(--text-sm);
  line-height: 1.6;
  color: var(--c-text-muted);
  margin: 0;
  text-align: center;
  text-wrap: balance;
}

/* ── 更多學校 + 相關情報 ── */
.dp-more {
  background: var(--c-surface);
  border-top: 1px solid var(--c-border);
  padding: 3.5rem 1.5rem 4rem;
}

.dp-more__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.dp-more__title {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--c-primary-dark);
  margin: 0 0 1.25rem;
}

.dp-more__title--sub { margin-top: 3rem; }

.rec-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.rec-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--c-surface);
  color: inherit;
  text-decoration: none;
}

.rec-card:hover {
  border-color: var(--c-primary);
  box-shadow: 0 14px 34px rgba(139, 26, 47, 0.14);
  translate: 0 -4px;
  color: inherit;
}

.rec-img-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: linear-gradient(135deg, var(--c-primary-muted), var(--c-border));
}

.rec-img-wrap::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 45%;
  background: linear-gradient(0deg, rgba(20, 6, 10, 0.6), transparent);
  pointer-events: none;
}

.rec-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.rec-card:hover .rec-img { transform: scale(1.06); }

.rec-location {
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

.rec-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  padding: 1rem 1.15rem 1.1rem;
}

.rec-name {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  font-weight: 700;
  line-height: 1.4;
  color: var(--c-text);
  margin: 0;
  transition: color var(--transition-fast);
}

.rec-card:hover .rec-name { color: var(--c-primary); }

.rec-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: auto;
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--c-primary);
}

.rec-cta svg { transition: translate 0.25s ease; }
.rec-card:hover .rec-cta svg { translate: 5px 0; }

.article-link-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.9rem;
}

.article-link-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--c-primary);
  background: var(--c-bg-alt);
  transition: border-color var(--transition-fast), background var(--transition-fast), translate var(--transition-fast);
}

.article-link-item:hover {
  border-color: var(--c-primary);
  background: var(--c-primary-muted);
  translate: 0 -2px;
}

.article-link-item svg { flex: none; transition: translate 0.25s ease; }
.article-link-item:hover svg { translate: 4px 0; }

.article-link-text {
  color: var(--c-text);
  font-weight: 600;
  line-height: 1.6;
}

.article-link-more {
  display: block;
  text-align: right;
  font-weight: 700;
  color: var(--c-primary);
  text-decoration: none;
  padding: 1rem 0 0;
}

.article-link-more:hover { text-decoration: underline; }

/* ── 底部 CTA：共用樣式上疊一張照片 ── */
.dp-cta {
  background:
    linear-gradient(color-mix(in srgb, var(--dp-ink) 78%, transparent), color-mix(in srgb, var(--dp-ink) 78%, transparent)),
    url('/images/home/cta.jpg') center / cover no-repeat;
}

/* ── 找不到學校 ── */
.dp-missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem 1.5rem 6rem;
  text-align: center;
  color: var(--c-text-secondary);
}

.dp-missing img { width: 170px; height: auto; }
.dp-missing p { margin: 0; }

/* ── 燈箱 Lightbox ── */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 3, 5, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  /* 要蓋過 sticky 的 Header（z-index 1050） */
  z-index: 2000;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 86vh;
  object-fit: contain;
  border-radius: var(--radius-md);
  animation: dp-lightbox-in 0.3s ease both;
}

@keyframes dp-lightbox-in {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: none; }
}

.lightbox-close,
.lightbox-nav {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  transition: background 0.2s;
}

.lightbox-close:hover,
.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.3);
}

.lightbox-close {
  top: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  font-size: 1.5rem;
}

.lightbox-nav {
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  font-size: 2rem;
}

.lightbox-prev { left: 1.5rem; }
.lightbox-next { right: 1.5rem; }

.lightbox-count {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  translate: -50% 0;
  font-size: var(--text-sm);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.85);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── RWD ── */
@media (max-width: 960px) {
  .dp-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  /* 摘要卡在手機上排到內容後面，就不黏了 */
  .dp-aside {
    position: static;
  }

  /* 觸控裝置沒有 hover，左右鈕要一直看得到 */
  .dp-gallery__nav { opacity: 1; }

  .rec-grid,
  .article-link-list {
    grid-template-columns: minmax(0, 1fr);
  }

  .rec-card { flex-direction: row; }
  .rec-img-wrap { flex: 0 0 42%; aspect-ratio: 4 / 3; }
}

@media (max-width: 640px) {
  .dp-hero { padding: 1.4rem 1rem 5.5rem; }
  .dp-crumb { margin-bottom: 1.4rem; }
  .dp-layout { padding: 0 1rem 3rem; margin-top: -4rem; }
  .dp-more { padding: 2.5rem 1rem 3rem; }

  .detail-block { padding: 1.25rem 1.1rem; }

  .feature-list,
  .sched-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .thumb { width: 76px; height: 54px; }
  .dp-gallery__nav { width: 36px; height: 36px; }

  .info-list > div {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.15rem;
  }

  /* 學費表：一筆一張卡，欄名用 data-label 帶出來 */
  .table-wrap { border: 0; border-radius: 0; overflow: visible; }
  .tuition-table thead { display: none; }

  .tuition-table,
  .tuition-table tbody,
  .tuition-table tr,
  .tuition-table td {
    display: block;
  }

  .tuition-table tr {
    border: 1px solid var(--c-border);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  .tuition-table tr + tr { margin-top: 0.8rem; }

  .tuition-table td {
    display: grid;
    grid-template-columns: 92px minmax(0, 1fr);
    gap: 0.75rem;
    padding: 0.6rem 0.9rem;
  }

  .tuition-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--c-text-muted);
  }

  .tuition-table td.period-cell {
    display: block;
    border-top: 0;
    background: var(--c-primary-muted);
    color: var(--c-primary-dark) !important;
  }

  .tuition-table td.period-cell::before { content: none; }

  .lightbox-nav { width: 40px; height: 40px; font-size: 1.5rem; }
  .lightbox-prev { left: 0.6rem; }
  .lightbox-next { right: 0.6rem; }
  .lightbox-close { width: 36px; height: 36px; top: 1rem; right: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .dp-hero__bg,
  .dp-hero__inner > *,
  .dp-gallery,
  .dp-aside,
  .lightbox-img {
    animation: none;
  }

  .rec-img,
  .feature-list li,
  .consult-btn,
  .thumb {
    transition: none;
  }
}
</style>
