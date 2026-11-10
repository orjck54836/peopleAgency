<script lang="ts" setup>
import { ref } from 'vue'

/**
 * 法務／支援頁的共用外框。
 *
 * terms、privacy、support、delete-account 四頁版面完全一樣：
 * Header → 標題區 → 條文本體 → 頁尾連結 → Footer，
 * 差別只在標題和內容，所以外框和樣式集中在這裡，頁面本身只放內容。
 *
 * 樣式沿用 App 端 public/legal.css 的排版（酒紅／米白／暖墨、行距 1.85），
 * 刻意比官網其他頁樸素——條款頁要的是讀得完，不是好看。
 * 這裡的 <style> 不加 scoped，因為要吃到 <slot> 進來的內容；
 * 所有選擇器都掛在 .legal-page 底下，不會外漏到官網其他頁。
 */
defineProps<{
  /** 頁面大標，例如「服務條款」 */
  title: string
  /** 標題底下那一行說明或生效日期 */
  meta?: string
}>()

const localePath = useLocalePath()

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <main class="legal-page">
    <div class="legal-wrap">
      <header class="legal-header">
        <div class="legal-brand">皓學日語</div>
        <h1>{{ title }}</h1>
        <p v-if="meta" class="legal-meta">{{ meta }}</p>
      </header>

      <!-- 各頁的條文／說明本體 -->
      <slot />

      <footer class="legal-footer">
        皓學日語 ・ Forma Global<br>
        <NuxtLink :to="localePath('/study/terms')">服務條款</NuxtLink> ・
        <NuxtLink :to="localePath('/study/privacy')">隱私權政策</NuxtLink> ・
        <NuxtLink :to="localePath('/study/support')">技術支援</NuxtLink> ・
        <NuxtLink :to="localePath('/study/delete-account')">刪除帳號</NuxtLink>
      </footer>
    </div>
  </main>

  <Footer />
</template>

<style>
/* 全部掛在 .legal-page 底下，避免影響官網其他頁面 */
.legal-page {
  --legal-wine: #8A2432;
  --legal-cream: #F8F3EA;
  --legal-ink: #141012;
  --legal-sub: #6F6568;
  --legal-line: #EDE8E2;

  background: var(--legal-cream);
  color: var(--legal-ink);
  /* 中文行距給寬一點，條款是整段整段讀的 */
  line-height: 1.85;
}

.legal-page .legal-wrap {
  max-width: 720px;
  /* 手機上留 20px 側邊間距，條款頁常常是在 App 裡用 WebView 開的 */
  margin: 0 auto;
  padding: 48px 20px 80px;
}

.legal-page .legal-header {
  border-bottom: 2px solid var(--legal-wine);
  padding-bottom: 20px;
  margin-bottom: 36px;
}

.legal-page .legal-brand {
  color: var(--legal-wine);
  font-weight: 800;
  letter-spacing: -0.3px;
  font-size: 15px;
}

.legal-page h1 {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 10px 0 8px;
}

.legal-page .legal-meta {
  color: var(--legal-sub);
  font-size: 14px;
  margin: 0;
}

.legal-page h2 {
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.3px;
  margin: 40px 0 10px;
  padding-top: 4px;
}

.legal-page h3 {
  font-size: 16px;
  font-weight: 700;
  margin: 24px 0 6px;
}

.legal-page p,
.legal-page li {
  font-size: 16px;
}

.legal-page ul {
  padding-left: 22px;
  list-style: disc;
}

.legal-page li {
  margin-bottom: 8px;
}

.legal-page a {
  color: var(--legal-wine);
  text-decoration: underline;
}

.legal-page table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  font-size: 15px;
  /* 表格在窄螢幕會擠，讓它可以橫向滑而不是撐破版面 */
  display: block;
  overflow-x: auto;
}

.legal-page th,
.legal-page td {
  border: 1px solid var(--legal-line);
  padding: 10px 12px;
  text-align: left;
  vertical-align: top;
}

.legal-page th {
  background: #fff;
  font-weight: 700;
}

.legal-page .note {
  background: #fff;
  border-left: 3px solid var(--legal-wine);
  padding: 14px 18px;
  margin: 20px 0;
  font-size: 15px;
}

.legal-page .legal-footer {
  margin-top: 56px;
  padding-top: 20px;
  border-top: 1px solid var(--legal-line);
  color: var(--legal-sub);
  font-size: 14px;
}
</style>
