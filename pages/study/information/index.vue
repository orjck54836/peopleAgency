<script setup lang="ts">
const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};
const closeNav = () => {
  navOpen.value = false;
};
const { t } = useI18n()
// 搜尋欄
const searchQuery = ref("");

// 拿文章
const { data: articles } = await useAsyncData("articles", () =>
  queryCollection("content").where("path", "LIKE", "/information/study/%").all()
);

function toPagePath(contentPath: string): string {
  // /information/study/slug → /study/information/slug
  // /information/work/slug  → /work/information/slug
  return contentPath
    .replace('/information/study/', '/study/information/')
    .replace('/information/work/', '/work/information/')
}

// 關鍵字篩選
const filteredArticles = computed(() => {
  if (!articles.value) return [];
  if (!searchQuery.value) return articles.value;

  const keyword = searchQuery.value.toLowerCase();
  return articles.value.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword) ||
      post.description?.toLowerCase().includes(keyword) ||
      post.author?.toLowerCase().includes(keyword) ||
      (post.tags || []).some((tag: string) =>
        tag.toLowerCase().includes(keyword)
      )
  );
});

useSeoMeta({
  title: t("seo.blog.title"),
  description: t("seo.blog.description"),
});
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  <section class="container py-12 max-w-6xl mx-auto">
    <div class="title">
      <!-- 頁面標題 -->
      <h1>
        {{ $t('informationTitle') }}
      </h1>
      <p class="subtitle">{{ $t('information.subtitle') }}</p>
    </div>

    <!-- 搜尋欄 -->
    <div class="flex justify-end mb-10">
      <input v-model="searchQuery" type="text" :placeholder="t('information.search')"
        class="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
    </div>

    <!-- 卡片列表 -->
    <div v-if="filteredArticles?.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article v-for="post in filteredArticles" :key="post.path"
        class="article-card border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white flex flex-col">
        <!-- 封面圖片 -->
        <NuxtLink :to="toPagePath(post.path)">
          <img v-if="post.cover" :src="String(post.cover)" :alt="post.title"
            class="article-cover w-full h-52 object-cover" />
        </NuxtLink>

        <!-- 文字區塊 -->
        <div class="p-4 flex flex-col flex-grow">
          <NuxtLink :to="toPagePath(post.path)">
            <h2 class="text-xl font-semibold mb-3 text-gray-800 hover:text-indigo-600 line-clamp-2">
              {{ post.title }}
            </h2>
          </NuxtLink>

          <p class="text-gray-600 text-sm mb-3">
            <time :datetime="post.date">{{ post.date }}</time> ｜ {{ post.author }}
          </p>

          <p class="text-gray-700 text-base leading-relaxed line-clamp-3">
            {{ post.description }}
          </p>

          <div class="mt-auto pt-4">
            <NuxtLink :to="toPagePath(post.path)" class="text-indigo-600 text-sm font-medium hover:underline">
              {{ $t('information.readMore') }}
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <p v-else class="text-center text-gray-500">{{ $t('information.noResults') }}</p>
  </section>

  
  <Footer />
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  padding: 30px;
  padding-bottom: 0;
  margin: 0 auto;
  text-align: center;
  flex-direction: column;
}

/* 副標題 */
.subtitle {
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
  animation: fadeIn 1.2s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}

/* 卡片 hover 效果 */
.article-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.article-card:hover {
  transform: translateY(-4px);
}

/* 封面圖片樣式 */
.article-cover {
  transition: transform 0.4s ease;
}

.article-card:hover .article-cover {
  transform: scale(1.05);
}

/* line-clamp 多行省略 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
