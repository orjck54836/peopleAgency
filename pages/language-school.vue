<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  <div class="title">
    <h1 class="hero-title">學校總覽</h1>
  </div>
  <main class="page-wrapper">
    <div class="grid gap-12">
      <!-- 篩選列 -->
      <section class="filter-block-section mb-5">
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
      <!-- 卡片區 -->
      <section class="user-profile d-flex flex-wrap justify-content-center gap-3 overflow-hidden">
        <section class="card rounded-2 p-4 text-center" v-for="(person, index) in paginatedSchools" :key="index">
          <img :src="person.image" alt="" class="img-fluid rounded-2 object-fit-cover mx-auto mb-4" />
          <span class="name fw-semibold d-block">{{ person.name }}</span>
          <span class="location-title fw-medium mb-2">{{ person.location }}</span>
          <span class="d-block text-secondary mb-2" style="font-size: 0.85rem;">
            入學月份：{{ person.intake.join('月、') }}月
          </span>
          <p class="mx-auto text-center line-clamp-2">{{ person.directions }}</p>
          <div class="mt-3 text-danger fw-semibold small">查看更多 ➔</div>
        </section>
      </section>
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
  <Footer />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import logo from "/images/logo.png";

const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};

const currentPage = ref(1)
const pageSize = 6 // 每頁幾筆

const paginatedSchools = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredSchools.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredSchools.value.length / pageSize)
})

const filters = ref({
  keyword: '',
  region: '',
  intake: '',
  type: '',
  accommodation: ''
})

const regionOptions = ['東京', '大阪', '名古屋', '福岡', '北海道', '神奈川']
const intakeOptions = ['1', '4', '7', '10']

const team = [
  {
    name: 'CBC外語商業專門學校',
    location: '神奈川',
    directions: '位於神奈川縣川崎市，半全日制。豐富選修課程及可與日本學生互動。',
    intake: ['4', '10'],
    image: 'https://cms.rhinoshield.app/public/images/ip_page_spongebob_icon_b310ce2b5a.jpg'
  },
  {
    name: '新宿日本語學校',
    location: '東京',
    directions: '1975年成立，歷史悠久老字號名校。為日本文部科學省指定認可語言學校。',
    intake: ['1', '4', '10'],
    image: 'https://cms.rhinoshield.app/public/images/ip_page_spongebob_icon_b310ce2b5a.jpg'
  },
  {
    name: '大阪YMCA學院',
    location: '大阪',
    directions: '大阪YMCA 學院位於熱鬧的天王寺區，校舍位於YMCA總部內，資源完整。',
    intake: ['1', '7'],
    image: 'https://cms.rhinoshield.app/public/images/ip_page_spongebob_icon_b310ce2b5a.jpg'
  },
  {
    name: 'TERA外語商業學院',
    location: '大阪',
    directions: 'TERA外語商業學院、EN日本語學校、SEIKO外語學園是關西知名的語言與商業綜合型學校。',
    intake: ['4', '10'],
    image: 'https://cms.rhinoshield.app/public/images/ip_page_spongebob_icon_b310ce2b5a.jpg'
  },
  {
    name: 'CBC外語商業專門學校',
    location: '神奈川',
    directions: '位於神奈川縣川崎市，半全日制。豐富選修課程及可與日本學生互動。',
    intake: ['4', '10'],
    image: 'https://cms.rhinoshield.app/public/images/ip_page_spongebob_icon_b310ce2b5a.jpg'
  },
  {
    name: '新宿日本語學校',
    location: '東京',
    directions: '1975年成立，歷史悠久老字號名校。為日本文部科學省指定認可語言學校。',
    intake: ['1', '4', '10'],
    image: 'https://cms.rhinoshield.app/public/images/ip_page_spongebob_icon_b310ce2b5a.jpg'
  },
  {
    name: '大阪YMCA學院',
    location: '大阪',
    directions: '大阪YMCA 學院位於熱鬧的天王寺區，校舍位於YMCA總部內，資源完整。',
    intake: ['1', '7'],
    image: 'https://cms.rhinoshield.app/public/images/ip_page_spongebob_icon_b310ce2b5a.jpg'
  },
  {
    name: 'TERA外語商業學院',
    location: '大阪',
    directions: 'TERA外語商業學院、EN日本語學校、SEIKO外語學園是關西知名的語言與商業綜合型學校。',
    intake: ['4', '10'],
    image: 'https://cms.rhinoshield.app/public/images/ip_page_spongebob_icon_b310ce2b5a.jpg'
  }
]

const filteredSchools = computed(() => {
  return team.filter((school) => {
    const keywordMatch = !filters.value.keyword || school.name.includes(filters.value.keyword)
    const regionMatch = !filters.value.region || school.location === filters.value.region
    const intakeMatch =
      !filters.value.intake || school.intake.includes(filters.value.intake)
    return keywordMatch && regionMatch && intakeMatch
  })
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
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap");

body {
  font-family: 'Montserrat', sans-serif !important;
}

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
  position: relative;
  white-space: nowrap;
}

.title::before,
.title::after {
  content: "";
  flex: 1;
  height: 1px;
  background-color: #9e5010;
  margin: 0 1rem;
}

.page-wrapper {
  max-width: 90%;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: 'Noto Sans TC', 'Helvetica Neue', sans-serif;
  background-color: #f8fbff;
  border-radius: 20px;
  margin-bottom: 50px;
}

.filter-block-section {
  max-width: 90%;
  margin: 0 auto;
}

.filter-block-container {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  max-width: 100%;

  background: linear-gradient(
    to bottom right,
    rgba(245, 209, 167, 0.95),
    rgba(232, 147, 29, 0.5)
  );
  backdrop-filter: blur(4px); /* 可選：有玻璃感 */
}

.keyword-input {
  padding: 0.75rem 1.25rem;
  border: 1px solid #d6a267;
  width: 100%;
  font-size: 1rem;
}

.select-group {
  display: flex;
  gap: 0.5rem;
  justify-content: start;
  align-items: center;
  max-width: 100%;
}

.select-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
  margin-right: 10px;
  width: 15%;
}

.select-control {
  border-radius: 999px;
  border: 1px solid #d6a267;
  font-size: 0.95rem;
  background-color: #fff;
  padding: 0.75rem 1.25rem;
}

.filter-block-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6b4b1f;
  padding-left: 0.25rem;
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-bg {
  background-color: #f5e0ca;
  padding: 10px 15px;
  border-radius: 5px;
}

main {
  margin-top: 5rem;
  max-width: 1200px;
  width: 95%;
}

main h2 {
  color: #101828;
}

main p {
  max-width: 600px;
  width: 100%;
  color: #667085;
}

main .btns button {
  max-width: 150px;
  width: 100%;
}

main .btns button.about {
  border: 2px solid #d0d5dd;
  color: #474e5d;
}

main .btns button.open {
  background-color: #7f56d9;
}

main .user-profile .card {
  max-width: 260px;
  width: 100%;
  cursor: pointer;
  background-color: rgb(248, 235, 216);
  border: 1.5px solid rgb(199, 146, 91);
  transition: 0.2s ease;
}

main .user-profile .card:hover {
  background-color: #ebc299;
  color: #fff !important;
}

main .user-profile .card:hover a,
main .user-profile .card:hover a:visited,
main .user-profile .card:hover .location-title,
main .user-profile .card:hover p {
  color: #fff !important;
}

main .user-profile .card img {
  width: 80%;
  height: 60%;
}

main .user-profile .card .name {
  font-size: 1.125rem;
}

main .user-profile .card .location-title {
  color: #7f56d9;
}

main .user-profile .card p {
  max-width: 70%;
  width: 100%;
  font-size: 0.875rem;
}

main .user-profile .card .social-links a,
main .user-profile .card .social-links a:visited {
  color: #98a2b3;
}

@media (max-width: 1200px) {
  .select-group {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .select-item {
    width: 100%;
  }

  .clear-button-container {
    justify-content: flex-start;
    margin: 0 auto;
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