<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const route = useRoute()
const navOpen = ref(false)

const toggleNav = () => (navOpen.value = !navOpen.value)
const closeNav = () => (navOpen.value = false)

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}

const items = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
]

// 從 API 抓取所有學校資料
const allSchools = ref<any[]>([])
const schoolName = decodeURIComponent(route.params.name as string)
const school = computed(() => allSchools.value.find(s => s.name === schoolName))

const recommendedSchools = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await fetch('https://api.forma-global.com/api/GetSchools')
    const json = await res.json()
    if (json.success) {
      allSchools.value = json.data

      // 移除目前學校避免重複
      const others = allSchools.value.filter(s => s.name !== schoolName)

      // 洗牌後取前3筆
      recommendedSchools.value = others.sort(() => Math.random() - 0.5).slice(0, 3)
    } else {
      console.error('API 回傳失敗')
    }
  } catch (err) {
    console.error('無法取得學校資料：', err)
  }
})
</script>


<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <main class="school-wrapper" v-if="school">
    <div class="school-layout">
      <!-- 左側圖片輪播 -->
      <div class="flex-4 w-full">
        <UCarousel ref="carousel" v-slot="{ item }" :items="items" class="w-full max-w-4xl mx-auto" @select="onSelect">
          <img :src="item" class="rounded-lg mx-auto">
        </UCarousel>
        <div class="flex gap-1 justify-content-center pt-4 max-w-xs mx-auto">
          <div v-for="(item, index) in items" :key="index"
            class="size-11 opacity-25 hover:opacity-100 transition-opacity"
            :class="{ 'opacity-100': activeIndex === index }" @click="select(index)">
            <img :src="item" width="44" height="44" class="rounded-lg">
          </div>
        </div>
      </div>
      <!-- 右側內容 -->
      <div class="school-content-section">
        <ul class="meta-list">
          <div>
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <a :href="'/school/language-school'">學校總覽</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">{{ school.name }}</li>
              </ol>
            </nav>
            <h1 class="school-title mb-2">{{ school.name }}</h1>
          </div>

          <li><strong>📍 學校地點：</strong>{{ school.location }}</li>
          <li><strong>📆 開課期間：</strong>{{ school.intake.join('月、') }}月</li>
          <li><strong>🏫 學校類型：</strong>{{ school.type }}</li>
          <li><strong>⏳ 課程期間：</strong>{{ school.tuitionDetails.at(-1)?.duration }}</li>
          <li><strong>👥 招生對象：</strong>{{ school.requirements[0] }}</li>
          <li><strong>🈶 建議日文程度：</strong>{{ school.requirements[1] }}</li>
          <li><strong>📄 簡章下載：</strong><a href="#">點擊下載</a></li>
        </ul>

        <button class="booking-btn">立即諮詢</button>
      </div>

    </div>
    <section class="feature-layout">
      <!-- 左側：課程特色 -->
      <div class="features-section">
        <div class="detail-block">
          <h2>🏫 基本資料</h2>
          <ul>
            <li><strong>學校名稱：</strong>{{ school.name }}</li>
            <li><strong>縣市：</strong>{{ school.location }}</li>
            <li><strong>可入學月份：</strong>{{ school.intake.join('月、') }}月</li>
            <li><strong>學校類型：</strong>{{ school.type }}</li>
            <li><strong>創立年份：</strong>{{ school.founded }}</li>
          </ul>
        </div>
        <div class="detail-block">
          <h2>📖 學校介紹</h2>
          <p class="description">{{ school.introduction }}</p>
        </div>
        <div class="detail-block">
          <h2>💰 學費資訊</h2>
          <div class="table-responsive">
            <table class="tuition-table">
              <thead>
                <tr>
                  <th>期間</th>
                  <th>入學檢定料</th>
                  <th>入學金</th>
                  <th>學費</th>
                  <th>設施維持費</th>
                  <th>合計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fee in school.tuitionDetails" :key="fee.duration">
                  <td>{{ fee.duration }}</td>
                  <td>{{ fee.examFee }}</td>
                  <td>{{ fee.examFee }}</td>
                  <td>{{ fee.entryFee }}</td>
                  <td>{{ fee.tuition }}</td>
                  <td>{{ fee.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="detail-block">
          <h2>🏠 宿舍資訊</h2>
          <ul>
            <li><strong>住宿類型：</strong>{{ school.dormitory.type }}</li>
            <li><strong>月租金：</strong>{{ school.dormitory.rent }} 日圓</li>
            <li><strong>其他費用：</strong>{{ school.dormitory.misc }}</li>
            <li><strong>地點：</strong>{{ school.dormitory.location }}</li>
          </ul>
        </div>
        <div class="detail-block">
          <h2>✨ 課程特色</h2>
          <ul>
            <li v-for="(item, i) in school.features" :key="i">◆ {{ item }}</li>
          </ul>
          <p><strong>📅 課程期間：</strong>{{ school.date }}</p>
        </div>
        <div class="detail-block">
          <h2>📝 報名資格</h2>
          <ul>
            <li v-for="(req, i) in school.requirements" :key="i">- {{ req }}</li>
          </ul>
        </div>
      </div>
      <!-- 右側：推薦學校 -->
      <aside class="sidebar">
        <div class="sidebar-header">更多熱門學校</div>
        <div class="recommend-card" v-for="(rec, i) in recommendedSchools" :key="i">
          <NuxtLink :to="`/school/language-school-details/${encodeURIComponent(rec.name)}`">
            <div><img :src="rec.image" alt="推薦學校" class="rec-img" />
              <h3 class="rec-title">{{ rec.name }}</h3>
              <div class="text-center mb-2">
                查看更多
              </div>
            </div>
          </NuxtLink>
        </div>
      </aside>
    </section>
  </main>
  <!-- <section v-else class="not-found">
    <h2>查無學校資料</h2>
    <p>請確認連結是否正確。</p>
  </section> -->

  <ContactIcon />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>

<style lang="scss" scoped>
.school-wrapper {
  max-width: 70%;
  margin: 0 auto;
  padding: 3rem 1rem;
  font-family: 'Noto Sans TC', sans-serif;

  @media (max-width: 1400px) {
    max-width: 80%;
  }
}

.school-layout {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
}

.school-image-section {
  flex: 1 1 50%;
  border-radius: 12px;
  overflow: hidden;
}

.school-image-section img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.school-content-section {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;

  @media (max-width: 1200px) {
    align-items: center;
  }
}

.breadcrumbs {
  font-size: 0.85rem;
  color: #999;
}

.school-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #9e5010;
}

.meta-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.meta-list li {
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
  color: #333;
}

.meta-list a {
  color: #d67c00;
  text-decoration: underline;
}

.booking-btn {
  padding: 0.75rem;
  width: 100%;
  max-width: 300px;
  background: linear-gradient(to right, #fa709a, #febb6e);
  border: none;
  border-radius: 999px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.booking-btn:hover {
  opacity: 0.85;
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
  color: #c00;
}

.feature-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 3rem;

  .features-section {
    background-color: #fffdf7;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    flex: 1 1 65%;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(230, 150, 60, 0.1);
    padding: 1rem;
    max-width: 100%;
    box-sizing: border-box;

    .detail-block {
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(230, 150, 60, 0.1);
      margin-bottom: 10px;
      width: 100%;

      h2 {
        font-size: 1.25rem;
        margin: 1.2rem 0;
        color: #9e5010;
      }
    }

    ul {
      font-size: 1rem;
      line-height: 1.6;
      color: #444;
    }

    .description {
      margin-bottom: 1rem;
      color: #555;
    }

    .table-scale-wrapper {
      width: 100%;
      overflow: visible;
      display: flex;
      justify-content: center;
    }

    .tuition-table {
      width: 100%;
      max-width: 800px;
      border-collapse: collapse;
      font-size: 1rem;
      transition: transform 0.2s ease;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);

      thead {
        background: linear-gradient(to right, #f7e2c3, #e6b87c);
        color: #5c3c0d;
        max-width: 100%;

        th {
          padding: 0.75rem 1rem;
          text-align: center;
          font-weight: 700;
          border-bottom: 1px solid #e0c29e;
          font-size: 0.8rem;
        }
      }

      tbody {
        tr {
          transition: background 0.2s ease;
          font-size: 0.8rem;

          &:nth-child(even) {
            background-color: #fdf7f0;
          }

          &:hover {
            background-color: #fff1db;
          }

          td {
            padding: 0.75rem 1rem;
            text-align: center;
            border-bottom: 1px solid #f0e2d0;
            color: #444;
          }
        }
      }
    }
  }
}

.sidebar {
  flex: 1 1 15%;
  background: linear-gradient(to bottom right, #fff5eb, #ffe2cc);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  height: fit-content;

  .sidebar-header {
    font-weight: bold;
    font-size: 1rem;
    color: #d67c00;
    margin-bottom: 1rem;
    text-align: center;
  }
}

.recommend-card {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.recommend-card:hover {
  transform: translateY(-4px);
}

.rec-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.rec-title {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  color: #333;
}
</style>
