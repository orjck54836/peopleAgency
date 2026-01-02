<script setup lang="ts">
const route = useRoute()
const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};
const closeNav = () => {
  navOpen.value = false;
};
const { data: article } = await useAsyncData(() =>
  queryCollection('content').path(`/information/${route.params.slug}`).first()
)

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description
})
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <section class="container py-4 max-w-3xl mx-auto">
    <article v-if="article" class="prose prose-lg lg:prose-xl prose-indigo mx-auto">
      <!-- 封面圖 (大圖固定) -->
      <img v-if="article.meta?.cover" :src="`${article.meta?.cover}`" :alt="String(article.title || '')"
        class="rounded-xl shadow-md mb-8 w-full max-h-[420px] object-cover" />

      <!-- H1 標題 -->
      <h1 class="text-4xl font-extrabold mb-4 text-gray-900 leading-snug">
        {{ article.title }}
      </h1>

      <!-- 作者與日期 -->
      <p class="text-gray-500 text-sm mb-10">
        <time :datetime="String(article.meta?.date || '')">
          {{ article.meta?.date }}
        </time>
        ｜ {{ article.meta?.author }}
      </p>


      <!-- 目次區塊 -->
      <nav v-if="article.body?.toc?.links?.length"
        class="mb-12 rounded-xl border border-gray-200 bg-white shadow-sm p-6">
        <h2 class="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" viewBox="0 0 20 20"
            fill="currentColor">
            <path d="M4 6h12M4 10h12M4 14h12" />
          </svg>
          {{ $t('information.toc') }}
        </h2>
        <ul class="space-y-2">
          <li v-for="link in article.body.toc.links" :key="link.id" class="group">
            <a :href="`#${link.id}`"
              class="flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition-colors">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:bg-indigo-600"></span>
              <span>{{ link.text }}</span>
            </a>
          </li>
        </ul>
      </nav>


      <!-- 內文 -->
      <ContentRenderer :value="article" />
    </article>

    <div v-else class="text-center text-gray-500">{{ $t('information.noResults') }}</div>
  </section>

  <ContactIcon />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>

<style>
.prose {
  font-family: "Noto Serif JP", "Hiragino Sans", "Helvetica Neue", Arial, sans-serif;
  color: #2c2c2c;
  line-height: 1.9;
  letter-spacing: 0.03em;
  max-width: 80ch;
}

/* 導語段落（第一段稍微強調） */
.prose p:first-of-type {
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.9;
  color: #1f2937;
}

/* H1 */
.prose h1 {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 1.5em;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.6em;
}

/* H2 */
.prose h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 1em;
  border-left: 6px solid #dd810f;
}

/* H3 */
.prose h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #374151;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

/* 段落 */
.prose p {
  margin-bottom: 1.4em;
  font-size: 1.05rem;
  color: #2d2d2d;
}

/* 列表 */
.prose ul,
.prose ol {
  padding-left: 1.5rem;
  margin-bottom: 1.4em;
}
.prose li {
  margin-bottom: 0.6em;
}

/* blockquote */
.prose blockquote {
  border-left: 4px solid #4f46e5;
  padding-left: 1.2em;
  color: #374151;
  background: #f9fafb;
  border-radius: 0.5rem;
  font-size: 1.05rem;
  margin: 2em 0;
}

/* inline code */
.prose code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #e11d48;
}

/* pre code block */
.prose pre {
  background: #1e293b;
  color: #f9fafb;
  padding: 1.2rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  font-size: 0.95rem;
  margin: 2em 0;
}

/* ================= */
/* 圖片樣式（通用 + 可調大小） */
/* ================= */

/* 預設文章圖片 */
.prose img {
  display: block;
  border-radius: 0.75rem;
  margin: 2rem auto 1.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  max-width: 100%;
  height: auto;
}

/* 可選尺寸 (在 md 裡加 class="article-img-large") */
.prose img.article-img-large {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
}

.prose img.article-img-medium {
  width: 70%;
  max-height: 360px;
  margin: 2rem auto;
}

.prose img.article-img-small {
  width: 40%;
  max-height: 240px;
  margin: 1.5rem auto;
}
</style>

