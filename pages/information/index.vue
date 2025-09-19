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
  queryCollection("content").all()
);

// 關鍵字篩選
const filteredArticles = computed(() => {
  if (!articles.value) return [];
  if (!searchQuery.value) return articles.value;

  const keyword = searchQuery.value.toLowerCase();
  return articles.value.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword) ||
      post.meta?.description?.toLowerCase().includes(keyword) ||
      post.meta?.author?.toLowerCase().includes(keyword) ||
      (post.meta?.tags || []).some((tag: string) =>
        tag.toLowerCase().includes(keyword)
      )
  );
});

useSeoMeta({
  title: "情報專欄｜FORMA台湾人材紹介",
  description: "外国人雇用、留学、ビザ関連の最新情報を発信する情報ブログ。"
});
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  <section class="container py-12 max-w-6xl mx-auto">
    <!-- 頁面標題 -->
    <h1 class="text-4xl font-extrabold mb-6 text-center text-gray-900 tracking-wide">
      情報專欄
    </h1>

    <!-- 搜尋欄 -->
    <div class="flex justify-end mb-10">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('information.search')"
        class="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>

    <!-- 卡片列表 -->
    <div v-if="filteredArticles?.length" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="post in filteredArticles"
        :key="post._id"
        class="article-card border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white flex flex-col"
      >
        <!-- 封面圖片 -->
        <NuxtLink :to="post.path">
          <img
            v-if="post.meta?.cover"
            :src="post.meta.cover"
            :alt="post.title"
            class="article-cover w-full h-52 object-cover"
          />
        </NuxtLink>

        <!-- 文字區塊 -->
        <div class="p-4 flex flex-col flex-grow">
          <NuxtLink :to="post.path">
            <h2 class="text-xl font-semibold mb-3 text-gray-800 hover:text-indigo-600 line-clamp-2">
              {{ post.title }}
            </h2>
          </NuxtLink>

          <p class="text-gray-600 text-sm mb-3">
            <time :datetime="post.meta?.date">{{ post.meta?.date }}</time> ｜ {{ post.meta?.author }}
          </p>

          <p class="text-gray-700 text-base leading-relaxed line-clamp-3">
            {{ post.meta?.description }}
          </p>

          <div class="mt-auto pt-4">
            <NuxtLink
              :to="post.path"
              class="text-indigo-600 text-sm font-medium hover:underline"
            >
              続きを読む →
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <p v-else class="text-center text-gray-500">検索結果が見つかりません。</p>
  </section>

  <ContactIcon />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>

<style scoped>
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
