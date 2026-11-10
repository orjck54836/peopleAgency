<script setup lang="ts">
const route = useRoute()
const navOpen = ref(false)
const toggleNav = () => { navOpen.value = !navOpen.value }
const localePath = useLocalePath()
const { data: article } = await useAsyncData(() =>
  queryCollection('content').path(`/information/study/${route.params.slug}`).first()
)

const { t } = useI18n()
const articlePath = computed(() => `/study/information/${route.params.slug}`)

// 文章目前只有中文內容：/ja、/en 底下同一篇文章顯示的是同樣的中文內文。
// 讓這些網址的 canonical 指回中文版，避免被當成三份重複內容互相稀釋。
const { locale: currentLocale, defaultLocale } = useI18n()
useHead({
  link: [
    {
      key: 'canonical',
      rel: 'canonical',
      href: () =>
        currentLocale.value === defaultLocale
          ? `https://www.forma-global.com${route.path}`
          : `https://www.forma-global.com${articlePath.value}`,
    },
  ],
})
// content.config.ts 的 schema 欄位（date/author/cover/tags）是頂層欄位，
// 不在 meta 底下。這裡統一取值，並保留 meta 作為後備。
const meta = computed<any>(() => {
  const a = article.value as any
  if (!a) return {}
  return {
    date: a.date ?? a.meta?.date ?? null,
    updated: a.updated ?? a.meta?.updated ?? null,
    author: a.author ?? a.meta?.author ?? null,
    cover: a.cover ?? a.meta?.cover ?? null,
    tags: a.tags ?? a.meta?.tags ?? null,
  }
})

useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.description,
  ogTitle: () => article.value?.title,
  ogDescription: () => article.value?.description,
  ogType: 'article',
  ogUrl: () => absoluteUrl(articlePath.value),
  ogImage: () => absoluteUrl(meta.value?.cover ?? '/images/og-default.png'),
  twitterCard: 'summary_large_image',
  twitterImage: () => absoluteUrl(meta.value?.cover ?? '/images/og-default.png'),
  articlePublishedTime: () => (meta.value?.date ? String(meta.value.date) : undefined),
  articleModifiedTime: () => {
    const m = meta.value?.updated ?? meta.value?.date
    return m ? String(m) : undefined
  },
  articleSection: '留學情報',
  articleTag: () => meta.value?.tags ?? undefined,
})

// 結構化資料：讓 Google 產生文章卡片，也讓 AI 搜尋把這篇當成可引用的來源
watchEffect(() => {
  if (!article.value) return
  useArticleSchema({
    title: article.value.title,
    description: article.value.description,
    path: articlePath.value,
    date: meta.value?.date ? String(meta.value.date) : null,
    updated: meta.value?.updated ? String(meta.value.updated) : null,
    author: meta.value?.author ?? '皓學/FORMA',
    cover: meta.value?.cover ?? null,
    tags: meta.value?.tags ?? null,
    section: '留學情報',
  })

  useBreadcrumbSchema([
    { name: '首頁', path: '/study' },
    { name: '留學情報', path: '/study/information' },
    { name: String(article.value.title ?? '') },
  ])
})
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <main class="article-page">
    <template v-if="article">
      <!-- 麵包屑 -->
      <nav class="article-breadcrumb" aria-label="breadcrumb">
        <NuxtLink :to="localePath('/study')">首頁</NuxtLink>
        <span class="crumb-sep">›</span>
        <NuxtLink :to="localePath('/study/information')">留學情報</NuxtLink>
        <span class="crumb-sep">›</span>
        <span class="crumb-current">{{ article.title }}</span>
      </nav>

      <!-- 文章標頭 -->
      <header class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <time v-if="meta.date" :datetime="String(meta.date || '')">
            {{ meta.date }}
          </time>
          <span v-if="meta.author" class="meta-dot">·</span>
          <span v-if="meta.author">{{ meta.author }}</span>
        </div>
      </header>

      <!-- 封面圖 -->
      <div v-if="meta.cover" class="article-cover">
        <img :src="`${meta.cover}`" loading="lazy" decoding="async" :alt="String(article.title || '')" />
      </div>

      <!-- 目次 -->
      <nav v-if="article.body?.toc?.links?.length" class="article-toc">
        <p class="toc-title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
            <path d="M4 6h12M4 10h12M4 14h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          {{ $t('information.toc') }}
        </p>
        <ul class="toc-list">
          <li v-for="link in article.body.toc.links" :key="link.id">
            <a :href="`#${link.id}`">
              <span class="toc-dot"></span>
              <span>{{ link.text }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- 內文 -->
      <article class="article-body">
        <ContentRenderer :value="article" />
      </article>

      <!-- 底部 CTA -->
      <div class="article-cta">
        <p class="cta-text">對日本留學有興趣嗎？</p>
        <NuxtLink to="/contact" class="cta-btn">免費諮詢，開始規劃 →</NuxtLink>
      </div>
    </template>

    <div v-else class="article-empty">{{ $t('information.noResults') }}</div>
  </main>

  <Footer />
</template>

<style scoped>
.article-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5rem;
}

/* ── 麵包屑 ── */
.article-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.article-breadcrumb a {
  color: var(--c-primary);
  text-decoration: none;
}

.article-breadcrumb a:hover { text-decoration: underline; }

.crumb-sep { color: var(--c-border); }

.crumb-current {
  color: var(--c-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 240px;
}

/* ── 文章標頭 ── */
.article-header {
  margin-bottom: 2rem;
}

.article-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: var(--c-text);
  line-height: 1.35;
  margin: 0 0 1rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  
  color: var(--c-text-muted);
}

.meta-dot { opacity: 0.5; }

/* ── 封面圖 ── */
.article-cover {
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 2.5rem;
  border: 1px solid var(--c-border);
}

.article-cover img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  display: block;
}

/* ── 目次 ── */
.article-toc {
  background: var(--c-bg-alt);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin-bottom: 3rem;
}

.toc-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-heading);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 1rem;
}

.toc-title svg {
  width: 18px;
  height: 18px;
  color: var(--c-primary);
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.toc-list a {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  
  color: var(--c-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.toc-list a:hover { color: var(--c-primary); }

.toc-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-primary);
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}

.toc-list a:hover .toc-dot { opacity: 1; }

/* ── 底部 CTA ── */
.article-cta {
  margin-top: 4rem;
  padding: 2.5rem;
  background: var(--c-primary-muted);
  border-radius: var(--radius-lg);
  text-align: center;
}

.cta-text {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 1rem;
}

.cta-btn {
  display: inline-block;
  background: var(--c-primary);
  color: var(--c-text-on-primary);
  
  font-weight: 700;
  padding: 0.85rem 2.2rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.cta-btn:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
}

.article-empty {
  text-align: center;
  color: var(--c-text-muted);
  padding: 4rem 0;
}
</style>

<!-- 非 scoped：文章內文（ContentRenderer 產生的內容）樣式 -->
<style>
.article-body {
  font-family: var(--font-body);
  color: var(--c-text);
  line-height: 1.9;
  letter-spacing: 0.02em;
}

/* 導語段落 */
.article-body > p:first-of-type {
  font-size: var(--text-xl);
  font-weight: 500;
  line-height: 1.85;
  color: var(--c-text);
}

/* H2 */
.article-body h2 {
  font-family: var(--font-heading);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--c-text);
  margin: 2.5rem 0 1rem;
  padding-left: 0.9rem;
  border-left: 5px solid var(--c-primary);
  line-height: 1.4;
}

/* H3 */
.article-body h3 {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 2rem 0 0.8rem;
}

/* 段落 */
.article-body p {
  margin: 0 0 1.4em;
  font-size: var(--text-base);
  color: var(--c-text-secondary);
}

/* 連結 */
.article-body a {
  color: var(--c-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.article-body a:hover { color: var(--c-primary-light); }

/* 列表 */
.article-body ul,
.article-body ol {
  padding-left: 1.5rem;
  margin: 0 0 1.4em;
}

.article-body li {
  margin-bottom: 0.5em;
  color: var(--c-text-secondary);
}

.article-body li::marker { color: var(--c-primary); }

/* blockquote */
.article-body blockquote {
  border-left: 4px solid var(--c-primary);
  padding: 1rem 1.4rem;
  color: var(--c-text-secondary);
  background: var(--c-bg-alt);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  font-size: var(--text-base);
  margin: 2em 0;
}

.article-body blockquote p { margin: 0; }

/* inline code */
.article-body code {
  background: var(--c-primary-muted);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  
  color: var(--c-primary-dark);
}

/* code block */
.article-body pre {
  background: #1e293b;
  color: #f9fafb;
  padding: 1.2rem;
  border-radius: var(--radius-md);
  overflow-x: auto;
  
  margin: 2em 0;
}

.article-body pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}

/* 圖片 */
.article-body img {
  display: block;
  border-radius: var(--radius-md);
  margin: 2rem auto 1.5rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  max-width: 100%;
  height: auto;
}

.article-body img.article-img-large {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
}

.article-body img.article-img-medium {
  width: 70%;
  max-height: 360px;
}

.article-body img.article-img-small {
  width: 40%;
  max-height: 240px;
}

/* 表格 */
.article-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 2em 0;
  
}

.article-body th {
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  font-weight: 700;
  padding: 0.7rem 1rem;
  text-align: left;
  border: 1px solid var(--c-border);
}

.article-body td {
  padding: 0.7rem 1rem;
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
}

.article-body tr:nth-child(even) td { background: var(--c-bg-alt); }

/* 分隔線 */
.article-body hr {
  border: none;
  border-top: 1px solid var(--c-border);
  margin: 2.5em 0;
}
</style>