<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)
const closeNav = () => (navOpen.value = false)

const currentPage = ref(1)
const pageSize = 6

const schools = ref<any[]>([])

const filters = ref({
  keyword: '',
  region: '',
  intake: '',
  type: '',
  accommodation: ''
})

import { useI18n } from "vue-i18n"

const { t } = useI18n()

const regionOptions = [
  { value: "tokyo", label: t("schoolOverview.region.tokyo") },
  { value: "osaka", label: t("schoolOverview.region.osaka") },
  { value: "nagoya", label: t("schoolOverview.region.nagoya") },
  { value: "fukuoka", label: t("schoolOverview.region.fukuoka") },
  { value: "hokkaido", label: t("schoolOverview.region.hokkaido") },
  { value: "kanagawa", label: t("schoolOverview.region.kanagawa") }
]

const intakeOptions = [
  { value: "1", label: `1 ${t("schoolOverview.month")}` },
  { value: "4", label: `4 ${t("schoolOverview.month")}` },
  { value: "7", label: `7 ${t("schoolOverview.month")}` },
  { value: "10", label: `10 ${t("schoolOverview.month")}` }
]

const sortOption = ref("")
const sortOptions = computed(() => [
  { value: "", label: t("schoolOverview.sort.default") },
  { value: "tuition-desc", label: t("schoolOverview.sort.tuitionDesc") },
  { value: "tuition-asc", label: t("schoolOverview.sort.tuitionAsc") },
  { value: "popularity", label: t("schoolOverview.sort.popularity") }
])

const filteredSchools = computed(() => {
  return schools.value.filter((school) => {
    const keywordMatch = !filters.value.keyword || school.name.includes(filters.value.keyword)
    const regionMatch = !filters.value.region || school.location === filters.value.region
    const intakeMatch = !filters.value.intake || school.intake.includes(filters.value.intake)
    return keywordMatch && regionMatch && intakeMatch
  })
})

const sortedSchools = computed(() => {
  const list = [...filteredSchools.value]
  switch (sortOption.value) {
    case 'tuition-desc':
      return list.sort((a, b) => b.tuition - a.tuition)
    case 'tuition-asc':
      return list.sort((a, b) => a.tuition - b.tuition)
    case 'popularity':
      return list.sort((a, b) => b.popularity - a.popularity)
    default:
      return list
  }
})

const paginatedSchools = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return sortedSchools.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredSchools.value.length / pageSize)
})

function clearFilters() {
  filters.value = {
    keyword: '',
    region: '',
    intake: '',
    type: '',
    accommodation: ''
  }
  currentPage.value = 1
}

function goToDetailPage(schoolName: string) {
  const encoded = encodeURIComponent(schoolName)
  router.push(`/school/${encoded}`)
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
  <div class="title">
    <h1 class="hero-title">{{ $t('schoolOverview.title') }}</h1>
  </div>
  <div class="hero-banner">
    <img src="/img/school/32810422_m.jpg" :alt="$t('schoolOverview.heroAlt')" />
    <div class="hero-banner-text">
      <p>{{ $t('schoolOverview.heroText') }}</p>
    </div>
  </div>
  <main class="page-wrapper">
    <div class="row justify-content-center">
      <div class="row justify-content-center align-items-center">
        <!-- 圖片 -->
        <div class="col-lg-3 mb-3 mb-md-0 p-4 text-picture">
          <img src="/img/school/depart.png" :alt="$t('schoolOverview.departAlt')" />
        </div>
        <!-- 文字 -->
        <div class="col-lg-7 col-md-12 jp-intro p-4 p-md-5 d-flex">
          <div>
            <h1>{{ $t('schoolOverview.introTitle') }}</h1>
          </div>
          <div>
            <span class="jp-intro__petal petal-1" aria-hidden="true"></span>
            <span class="jp-intro__petal petal-2" aria-hidden="true"></span>
            <span class="jp-intro__petal petal-3" aria-hidden="true"></span>
            <p>{{ $t('schoolOverview.introDesc') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="school-overview-container row">
      <div class="col-lg-4">
        <section class="school-filter-panel">
          <section class="mb-5">
            <div class="filter-header">
              <h2>{{ $t('schoolOverview.filterTitle') }}</h2>
              <p class="filter-subtext">{{ $t('schoolOverview.filterSubtitle') }}</p>
            </div>
            <div class="filter-block-container flex-wrap gap-3">
              <div class="select-group">
                <div class="select-item">
                  <label class="filter-block-label" for="keyword">{{ $t('schoolOverview.keywordLabel') }}</label>
                  <input v-model="filters.keyword" type="text" id="keyword"
                    :placeholder="$t('schoolOverview.keywordPlaceholder')" class="form-control keyword-input" />
                </div>
                <div class="select-item">
                  <label class="filter-block-label" for="region">{{ $t('schoolOverview.regionLabel') }}</label>
                  <select v-model="filters.region" id="region" class="form-select select-control">
                    <option value="">{{ $t('schoolOverview.allRegions') }}</option>
                    <option v-for="region in regionOptions" :key="region" :value="region">
                      {{ region }}
                    </option>
                  </select>
                </div>
                <div class="select-item">
                  <label class="filter-block-label" for="intake">{{ $t('schoolOverview.intakeLabel') }}</label>
                  <select v-model="filters.intake" id="intake" class="form-select select-control">
                    <option value="">{{ $t('schoolOverview.allIntakes') }}</option>
                    <option v-for="month in intakeOptions" :key="month" :value="month">
                      {{ month }} {{ $t('schoolOverview.month') }}
                    </option>
                  </select>
                </div>
                <div class="select-item">
                  <label class="filter-block-label" for="type">{{ $t('schoolOverview.typeLabel') }}</label>
                  <select v-model="filters.type" id="type" class="form-select select-control">
                    <option value="">{{ $t('schoolOverview.allTypes') }}</option>
                    <option value="語言學校">{{ $t('schoolOverview.langSchool') }}</option>
                    <option value="專門學校">{{ $t('schoolOverview.vocSchool') }}</option>
                    <option value="大學別科">{{ $t('schoolOverview.univPrep') }}</option>
                  </select>
                </div>
                <div class="select-item">
                  <label class="filter-block-label" for="accommodation">{{ $t('schoolOverview.accommodationLabel')
                  }}</label>
                  <select v-model="filters.accommodation" id="accommodation" class="form-select select-control">
                    <option value="">{{ $t('schoolOverview.allAccommodations') }}</option>
                    <option value="宿舍">{{ $t('schoolOverview.dorm') }}</option>
                    <option value="寄宿家庭">{{ $t('schoolOverview.homestay') }}</option>
                    <option value="自行租屋">{{ $t('schoolOverview.rent') }}</option>
                  </select>
                </div>
                <div class="clear-button-container">
                  <button @click="clearFilters" class="clear-button">
                    {{ $t('schoolOverview.clearFilters') }}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
      <div class="col-lg-8">
        <section class="school-list-panel">
          <div class="sort-section">
            <button v-for="option in sortOptions" :key="option.value" @click="sortOption = option.value"
              :class="['sort-button', { active: sortOption === option.value }]">
              {{ option.label }}
            </button>
          </div>
          <section class="user-profile d-flex flex-wrap justify-content-center gap-4">
            <section class="card rounded-4 p-4" v-for="(person, index) in paginatedSchools" :key="index"
              @click="goToDetailPage(person.name)">
              <div class="school-img-block">
                <img :src="person.image" :alt="`${person.name} 日本留學 學校介紹`" />
              </div>
              <div class="p-4">
                <span class="name fw-semibold d-block">{{ person.name }}</span>
                <span class="location-title fw-medium mb-2">{{ person.location }}</span>
                <span class="d-block text-secondary mb-2">
                  {{ $t('schoolOverview.intakeMonth') }}：{{ person.intake.join('月、') }}月
                </span>
                <p>{{ person.introduction }}</p>
                <div class="mt-3 text-danger fw-semibold small text-center">{{ $t('schoolOverview.moreDetail') }}</div>
              </div>
            </section>
          </section>
        </section>
      </div>
    </div>
  </main>
  <ContactIcon />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Yuji+Mai&display=swap');

.jp-intro p,
.jp-intro strong {
  font-family: 'Kaisei Tokumin', 'Noto Serif JP', serif;
}

.jp-intro {
  position: relative;
  overflow: hidden;
  animation: introFadeUp .7s ease-out both .05s;
  line-height: 2.5;
  color: #3e3a39;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  flex-direction: column;
}

.jp-intro h1 {
  padding: 30px;
}

/* 文字排版：強調詞彙用和風色 */
.jp-intro p {
  font-size: 1.35rem;
  letter-spacing: .2px;
  /* padding: 50px; */

  @media (max-width: 1200px) {
    font-size: 1rem;
  }
}

.jp-intro strong {
  color: #9c2f2f;
  /* 侘寂系紅（朱・緋） */
  font-weight: 600;
  position: relative;
}

.jp-intro strong::after {
  /* 細筆觸底線 */
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 6px;
  background: linear-gradient(90deg, rgba(211, 159, 84, .0), rgba(211, 159, 84, .45), rgba(211, 159, 84, .0));
  border-radius: 6px;
  transform: scaleX(0);
  transform-origin: left;
  animation: strokeReveal .8s ease .3s forwards;
}

/* 櫻花花瓣（極簡形狀），緩慢上浮與旋轉 */
.jp-intro__petal {
  --size: 12px;
  position: absolute;
  width: var(--size);
  height: var(--size);
  left: 70%;
  background: radial-gradient(circle at 30% 30%, #ffd9e1 0 40%, #f7b7c6 60% 100%);
  border-radius: 60% 40% 60% 40%;
  opacity: .0;
  filter: blur(.2px);
}

.petal-1 {
  left: 78%;
  bottom: -6px;
  animation: petalFloat 7s linear .3s infinite;
}

.petal-2 {
  left: 86%;
  bottom: -10px;
  animation: petalFloat 8.5s linear 1s infinite;
  --size: 10px;
}

.petal-3 {
  left: 90%;
  bottom: -8px;
  animation: petalFloat 6.5s linear .6s infinite;
  --size: 9px;
}

/* 動畫定義 */
@keyframes introFadeUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes kintsugiSlide {
  from {
    transform: translateX(-12px) scaleY(.96);
    opacity: .0;
  }

  60% {
    transform: translateX(0) scaleY(1.02);
    opacity: .85;
  }

  to {
    transform: translateX(0) scaleY(1);
    opacity: 1;
  }
}

@keyframes strokeReveal {
  from {
    transform: scaleX(0);
    opacity: .4;
  }

  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes petalFloat {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }

  10% {
    opacity: .55;
  }

  50% {
    transform: translateY(-52px) translateX(-14px) rotate(80deg);
    opacity: .45;
  }

  100% {
    transform: translateY(-110px) translateX(-26px) rotate(180deg);
    opacity: 0;
  }
}

.hero-banner {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.hero-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
}

.hero-banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
}

.hero-banner-text p {
  font-size: 1.5rem;
  opacity: 0.9;
}


.d-flex>div {
  flex: 1;
}

/* === General Typography & Layout === */
.page-wrapper {
  max-width: 90%;
  margin: 50px auto;
  padding: 4rem 1.5rem;
  background-image: linear-gradient(rgba(255, 245, 230, 0.8),
      /* 淡米白 */
      rgba(248, 225, 210, 0.8)
      /* 暖粉杏色 */
    ),
    url("../../img/school/background.jpg");
  background-size: contain;
  background-position: center;
  border-radius: 20px;

  .text-picture {
    @media (max-width: 1400px) {
      width: 50%;
    }

    @media (max-width: 1200px) {
      width: 40%;
    }

    @media (max-width: 950px) {
      width: 80%;
    }
  }
}

/* === Title Section === */
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9e5010;
  font-weight: bolder;
  width: 50%;
  padding: 30px;
  margin: 0 auto;
}

.hero-title {
  text-align: center;
  padding: 0 1rem;
  white-space: nowrap;
  position: relative;
}

/* === Filter Panel === */
.filter-header {
  position: relative;
  text-align: center;
  padding: 1rem;
  border-radius: 12px 12px 0 0;
  background: linear-gradient(to bottom right, rgba(243, 235, 202, 0.751), rgba(206, 172, 79, 0.5));
  overflow: hidden;
}

.filter-header::before,
.filter-header::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  z-index: 0;
}

.filter-header::before {
  top: -20px;
  left: -20px;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.35);
}

.filter-header::after {
  bottom: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.25);
  transform: rotate(45deg);
}

.filter-header h2 {
  font-size: 1.25rem;
  color: #9e5010;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.filter-subtext {
  font-size: 0.9rem;
  color: #555;
}

.filter-block-container {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1rem;
  border-radius: 0 0 12px 12px;
  background: linear-gradient(to bottom right, rgba(245, 209, 167, 0.95), rgba(232, 147, 29, 0.5));
  backdrop-filter: blur(4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.select-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.select-item {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.filter-block-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b4b1f;
}

.select-control,
.keyword-input {
  padding: 0.75rem 1.25rem;
  border-radius: 999px;
  border: 1px solid #d6a267;
  font-size: 0.95rem;
  background-color: #fff;
}

.clear-button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.clear-button {
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
}

/* 排序區域 */
.sort-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(to right, #fceabb, #fceabb);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  width: 100%;
}

.sort-button {
  flex: 1 1 20%;
  /* 優先兩個一行，太小就自動換行 */
  min-width: 120px;
  /* 防止按鈕太窄 */
  padding: 0.6rem;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #e5b76f;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.85);
  color: #4b3a22;
  cursor: pointer;
  transition: all 0.2s ease;

  @media (max-width: 1200px) {
    flex: 1 1 100%;
  }
}


.sort-button:hover {
  background-color: #fff8e7;
  border-color: #d7a24d;
}

.sort-button.active {
  background-color: #d68c28;
  color: white;
  font-weight: bold;
  border-color: #c37610;
}

.school-filter-panel {
  width: 100%;
  border-radius: 12px;
}

.school-list-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.user-profile .card {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  flex-direction: row;
  background-color: #f8ebd8;
  border: 1.5px solid #c7925b;
  transition: 0.2s ease;
  cursor: pointer;

  @media (max-width: 1200px) {
    flex-direction: column;
    text-align: center;
  }
}

.user-profile .card:hover {
  background-color: #ebc299;
  color: #fff !important;
}

.user-profile .card:hover .location-title,
.user-profile .card:hover p {
  color: #fff !important;
}

.school-img-block {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
  flex-shrink: 0;
}

.school-img-block img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.user-profile .card .name {
  font-size: 1.125rem;
}

.user-profile .card .location-title {
  color: #7f56d9;
}

.user-profile .card p {
  font-size: 0.875rem;
}

/* === Utility Classes === */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* === Responsive === */
@media (max-width: 1200px) {
  .select-group {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .school-overview-container {
    flex-direction: column;
  }

  .school-filter-panel,
  .school-list-panel {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .select-item {
    width: 100%;
  }

  .clear-button-container {
    justify-content: center;
  }
}
</style>
