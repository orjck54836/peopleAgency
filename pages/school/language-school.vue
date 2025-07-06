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

const regionOptions = ['東京', '大阪', '名古屋', '福岡', '北海道', '神奈川']
const intakeOptions = ['1', '4', '7', '10']

const sortOption = ref('')
const sortOptions = [
  { value: '', label: '預設排序' },
  { value: 'tuition-desc', label: '學費高 ➜ 低' },
  { value: 'tuition-asc', label: '學費低 ➜ 高' },
  { value: 'popularity', label: '熱門程度' }
]

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
  router.push(`/school/language-school-details/${encoded}`)
}

async function fetchSchools() {
  try {
    const res = await fetch('https://api.forma-global.com/api/GetSchools')
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
    <h1 class="hero-title">學校總覽</h1>
  </div>
  <main class="page-wrapper">
    <div class="grid gap-12">
      <div class="school-overview-container">
        <aside class="school-filter-panel">
          <!-- 篩選列 -->
          <section class="filter-block-section mb-5">
            <div class="filter-header">
              <h2>快速篩選</h2>
              <p class="filter-subtext">依照地區、入學月份、學校類型等條件，迅速找到最適合你的學校！</p>
            </div>
            <div class="filter-block-container">
              <div class="select-group">
                <div class="select-item">
                  <label class="filter-block-label" for="keyword">學校關鍵字</label>
                  <input v-model="filters.keyword" type="text" id="keyword" placeholder="輸入學校名稱或關鍵字"
                    class="form-control keyword-input" />
                </div>
                <div class="select-item">
                  <label class="filter-block-label" for="region">地區</label>
                  <select v-model="filters.region" id="region" class="form-select select-control">
                    <option value="">全部地區</option>
                    <option v-for="region in regionOptions" :key="region" :value="region">
                      {{ region }}
                    </option>
                  </select>
                </div>
                <div class="select-item">
                  <label class="filter-block-label" for="intake">入學時間</label>
                  <select v-model="filters.intake" id="intake" class="form-select select-control">
                    <option value="">全部入學時間</option>
                    <option v-for="month in intakeOptions" :key="month" :value="month">
                      {{ month }} 月
                    </option>
                  </select>
                </div>
                <div class="select-item">
                  <label class="filter-block-label" for="type">學校類型</label>
                  <select v-model="filters.type" id="type" class="form-select select-control">
                    <option value="">全部學校類型</option>
                    <option value="語言學校">語言學校</option>
                    <option value="專門學校">專門學校</option>
                    <option value="大學別科">大學別科</option>
                  </select>
                </div>
                <div class="select-item">
                  <label class="filter-block-label" for="accommodation">住宿類型</label>
                  <select v-model="filters.accommodation" id="accommodation" class="form-select select-control">
                    <option value="">住宿類型不限</option>
                    <option value="宿舍">宿舍</option>
                    <option value="寄宿家庭">寄宿家庭</option>
                    <option value="自行租屋">自行租屋</option>
                  </select>
                </div>
                <!-- 清除按鈕 -->
                <div class="clear-button-container">
                  <button @click="clearFilters" class="clear-button">
                    清除所有篩選條件
                  </button>
                </div>
              </div>
            </div>
          </section>
        </aside>

        <section class="school-list-panel">
          <!-- 排序選單 -->
          <div class="sort-section">
            <button v-for="option in sortOptions" :key="option.value" @click="sortOption = option.value"
              :class="['sort-button', { active: sortOption === option.value }]">
              {{ option.label }}
            </button>
          </div>

          <!-- 卡片區 -->
          <section class="user-profile d-flex flex-wrap justify-content-center gap-3 overflow-hidden">
            <section class="card rounded-2 p-4 text-left" v-for="(person, index) in paginatedSchools" :key="index"
              @click="goToDetailPage(person.name)">
              <div class="school-img-block">
                <img :src="person.image" alt="" />
              </div>
              <div class="p-4">
                <span class="name fw-semibold d-block">{{ person.name }}</span>
                <span class="location-title fw-medium mb-2">{{ person.location }}</span>
                <span class="d-block text-secondary mb-2">
                  入學月份：{{ person.intake.join('月、') }}月
                </span>
                <p>{{ person.introduction }}</p>
                <div class="mt-3 text-danger fw-semibold small text-center">查看更多 ➔</div>
              </div>
            </section>
          </section>
        </section>
      </div>

      <!-- 分頁 -->
      <div class="d-flex justify-content-center mt-5">
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="currentPage > 1 && currentPage--">
              <a class="page-link" href="#">上一頁</a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }"
              @click="currentPage = page">
              <a class="page-link" href="#">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }"
              @click="currentPage < totalPages && currentPage++">
              <a class="page-link" href="#">下一頁</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </main>
  <ContactIcon />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap");

/* === General Typography & Layout === */
body {
  font-family: 'Montserrat', sans-serif !important;
}

.page-wrapper {
  max-width: 90%;
  margin: 0 auto 50px;
  padding: 4rem 1.5rem;
  font-family: 'Noto Sans TC', 'Helvetica Neue', sans-serif;
  background-color: #f8fbff;
  border-radius: 20px;
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

.title::before,
.title::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: #9e5010;
  margin: 0 1rem;
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
  gap: 1.25rem;
  padding: 2rem;
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
  gap: 0.5rem;
  width: 100%;
}

.filter-block-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b4b1f;
}

.select-control,
.keyword-input {
  width: 100%;
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

/* === Card Layout === */
.school-overview-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;
}

.school-filter-panel {
  width: 25%;
  min-width: 250px;
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
    gap: 1rem;
  }

  .clear-button-container {
    justify-content: flex-start;
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
