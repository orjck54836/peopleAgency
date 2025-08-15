<script setup lang="ts">
//（改成 API 取得）
const articles = [
  {
    title: "雇用外國人的好處",
    excerpt: "了解雇用外籍員工能帶來的多元化思維、語言能力與國際化視野...",
    image: "https://picsum.photos/600/400?random=1",
    slug: "benefits-of-hiring-foreigners"
  },
  {
    title: "留學注意事項",
    excerpt: "在日本留學前必須知道的生活習慣、法律規定與文化差異...",
    image: "https://picsum.photos/600/400?random=2",
    slug: "study-abroad-tips"
  },
  {
    title: "企業如何雇用外國人",
    excerpt: "從簽證類型、招聘流程到勞動法規，完整解析企業雇用外國人的流程...",
    image: "https://picsum.photos/600/400?random=3",
    slug: "how-companies-hire-foreigners"
  },
  {
    title: "雇用外國人的好處",
    excerpt: "了解雇用外籍員工能帶來的多元化思維、語言能力與國際化視野...",
    image: "https://picsum.photos/600/400?random=1",
    slug: "benefits-of-hiring-foreigners"
  },
  {
    title: "留學注意事項",
    excerpt: "在日本留學前必須知道的生活習慣、法律規定與文化差異...",
    image: "https://picsum.photos/600/400?random=2",
    slug: "study-abroad-tips"
  },
  {
    title: "企業如何雇用外國人",
    excerpt: "從簽證類型、招聘流程到勞動法規，完整解析企業雇用外國人的流程...",
    image: "https://picsum.photos/600/400?random=3",
    slug: "how-companies-hire-foreigners"
  }
]
const navOpen = ref(false);
const toggleNav = () => {
    navOpen.value = !navOpen.value;
};
const closeNav = () => {
    navOpen.value = false;
};
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  <div class="container py-5">
    <h1 class="mb-4 fw-bold text-center">情報專欄</h1>

    <div class="row g-4">
      <div 
        class="col-md-4" 
        v-for="article in articles" 
        :key="article.slug"
      >
      <NuxtLink :to="`/information/${article.slug}`" class="card-custom h-100">
        <div class="card-image" :style="{ backgroundImage: `url(${article.image})` }">
          <div class="card-overlay"></div>
          <h5 class="card-title">{{ article.title }}</h5>
        </div>
        <div class="card-body">
          <p class="card-text">{{ article.excerpt }}</p>
          <span class="read-more">閱讀更多 →</span>
        </div>
      </NuxtLink>
      </div>
    </div>
  </div>
  <ContactIcon />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>

<style scoped>
.card-custom {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-custom:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.18);
}

.card-image {
  position: relative;
  height: 200px;
  background-size: cover;
  background-position: center;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0));
}

.card-title {
  position: absolute;
  bottom: 12px;
  left: 16px;
  right: 16px;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  z-index: 2;
}

.card-body {
  padding: 16px;
  flex: 1;
}

.card-text {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 限制3行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  display: inline-flex;
  align-items: center;
  margin-top: 12px;
  color: #d2a679;
  font-weight: 600;
  transition: transform 0.2s, color 0.2s;
}

.read-more:hover {
  color: #b07b43;
  transform: translateX(4px);
}
</style>

