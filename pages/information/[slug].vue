<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  <div class="article-detail">
    <!-- 頂部灰色背景標題 -->
    <div class="article-header">
      <div class="container">
        <NuxtLink to="/information" class="back-link">← 返回情報專欄</NuxtLink>
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="meta">
          {{ article.date }} ｜ 作者：{{ article.author }}
        </p>
      </div>
    </div>

    <div class="container py-5">
      <!-- 文章導言 -->
      <div class="intro" v-html="article.intro"></div>

      <!-- 目次 -->
      <div class="toc-box">
        <h5>目次</h5>
        <ul>
          <li v-for="item in article.toc" :key="item.id">
            <a :href="'#' + item.id">{{ item.text }}</a>
          </li>
        </ul>
      </div>

      <!-- 內文段落 -->
      <section
        v-for="section in article.sections"
        :key="section.id"
        :id="section.id"
        class="content-section"
      >
        <h2 class="section-title">{{ section.title }}</h2>
        <div v-html="section.content"></div>
      </section>
    </div>
  </div>
  <ContactIcon />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>

<script setup lang="ts">
const article = {
  title: "施工管理で外国人雇用する際に必要な在留資格は？法律や雇用の流れも解説！",
  date: "2025-08-15",
  author: "株式会社Forma",
  intro: `
    <p>日本の建設業界は...（導言內容，可放 HTML）</p>
  `,
  toc: [
    { id: "visa", text: "在留資格とは？" },
    { id: "residence", text: "居住資格とは？" },
    { id: "activity", text: "活動資格とは？" }
  ],
  sections: [
    {
      id: "visa",
      title: "在留資格とは？",
      content: `
        <p>外国人を雇用する際には...（內容 HTML）</p>
        <div class="highlight-box">
          <p>在留資格は大きく分けて「居住資格」と「活動資格」に分類されます。</p>
        </div>
      `
    },
    {
      id: "residence",
      title: "居住資格とは？",
      content: `
        <ul>
          <li>永住者</li>
          <li>日本人の配偶者等</li>
          <li>定住者</li>
        </ul>
        <p>（內容 HTML）</p>
      `
    },
    {
      id: "activity",
      title: "活動資格とは？",
      content: `
        <div class="activity-grid">
          <div class="activity-card">就労制限のない資格</div>
          <div class="activity-card">就労制限のある資格</div>
          <div class="activity-card">就労不可の資格</div>
        </div>
      `
    }
  ]
};
const navOpen = ref(false);
const toggleNav = () => {
    navOpen.value = !navOpen.value;
};
const closeNav = () => {
    navOpen.value = false;
};
</script>

<style scoped>
.article-header {
  background: linear-gradient(90deg, #5b6b7d, #9ba9b9);
  color: #fff;
  padding: 2rem 0;
}
.back-link {
  display: inline-block;
  color: #fff;
  margin-bottom: 0.5rem;
  text-decoration: none;
}
.back-link:hover {
  text-decoration: underline;
}
.article-title {
  font-size: 2rem;
  font-weight: bold;
}
.meta {
  font-size: 0.9rem;
  opacity: 0.85;
}

.intro {
  font-size: 1.05rem;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.toc-box {
  background: #f8f9fa;
  border-left: 4px solid #ff9800;
  padding: 1rem;
  margin-bottom: 2rem;
}
.toc-box h5 {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.toc-box ul {
  margin: 0;
  padding-left: 1.2rem;
}
.toc-box a {
  color: #007bff;
  text-decoration: none;
}
.toc-box a:hover {
  text-decoration: underline;
}

.content-section {
  margin-bottom: 3rem;
}
.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
}
.highlight-box {
  background: #f0f8ff;
  border-left: 4px solid #2196f3;
  padding: 1rem;
  margin: 1rem 0;
}
.activity-grid {
  display: flex;
  gap: 1rem;
}
.activity-card {
  flex: 1;
  padding: 1rem;
  background: #f8f9fa;
  text-align: center;
  border-radius: 6px;
  border: 1px solid #ddd;
}
</style>
