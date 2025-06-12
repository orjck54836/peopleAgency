<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  <main class="mx-auto mb-5 bg-white p-5">
    <span class="hire text-center d-block mb-1 text-danger">探索日本留學</span>
    <h2 class="text-center fw-bold mb-2">精選日本語言學校</h2>
    <p class="mx-auto text-center mb-4 fw-medium">
      我們為您整理多所優質日本語言學校資訊，協助您根據地區、入學時間與學習目的快速找到理想學校，踏出留學第一步！
    </p>
    <!-- 篩選列 -->
    <div class="d-flex justify-content-center">
      <section class="d-flex flex-wrap justify-content-center gap-3 mb-5 select-bg">
        <input v-model="filters.keyword" type="text" placeholder="輸入學校名稱"
          class="form-control rounded-pill px-3 py-2 w-80" />
        <div class="d-flex justify-content-center">
          <select v-model="filters.region" class="form-select rounded-pill px-3 py-2 w-auto">
            <option value="">全部地區</option>
            <option v-for="region in regionOptions" :key="region" :value="region">{{ region }}</option>
          </select>
          <select v-model="filters.intake" class="form-select rounded-pill px-3 py-2 w-auto">
            <option value="">全部入學時間</option>
            <option v-for="month in intakeOptions" :key="month" :value="month">{{ month }} 月</option>
          </select>
        </div>
      </section>
    </div>
    <!-- 卡片區 -->
    <section class="user-profile d-flex flex-wrap justify-content-center gap-3 overflow-hidden">
      <section class="card rounded-2 p-4 text-center" v-for="(person, index) in paginatedSchools" :key="index">
        <img :src="person.image" alt="" class="img-fluid rounded-2 object-fit-cover mx-auto mb-4" />
        <span class="name fw-semibold d-block">{{ person.name }}</span>
        <span class="title fw-medium mb-2">{{ person.location }}</span>
        <span class="d-block text-secondary mb-2" style="font-size: 0.85rem;">
          入學月份：{{ person.intake.join('月、') }}月
        </span>
        <p class="mx-auto text-center line-clamp-2">{{ person.directions }}</p>
        <div class="mt-3 text-danger fw-semibold small">查看更多 ➔</div>
      </section>
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

    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import logo from "/images/logo.png";

const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};

const currentPage = ref(1)
const pageSize = 4 // 每頁幾筆

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
  intake: ''
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
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap");

body {
  font-family: 'Montserrat', sans-serif !important;
  background-color: #afacc6 !important;
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

main .hire {
  color: #7f56d9;
  font-size: 0.975rem;
  font-weight: 600;
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
main .user-profile .card:hover .title,
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

main .user-profile .card .title {
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
</style>