<script lang="ts" setup>
import { ref } from 'vue'

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const { t } = useI18n()
useSeoMeta({
  title: t('seo.study.title'),
  description: t('seo.study.description'),
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

// 只存 index，文字全由 i18n 提供
const studyFaqCount = 9
const studyFaqs = Array.from({ length: studyFaqCount }, (_, i) => ({
  q: t(`faq.study.${i}.q`),
  a: t(`faq.study.${i}.a`),
  // list 的數量各不同，用 listCount 控制，0 代表沒有 list
  listCount: Number(t(`faq.study.${i}.listCount`)),
}))

const faqs = computed(() => {
  return Array.from({ length: studyFaqCount }, (_, i) => {
    const listCount = Number(t(`faq.study.${i}.listCount`))
    return {
      q: t(`faq.study.${i}.q`),
      a: t(`faq.study.${i}.a`),
      listCount,
      list: listCount > 0
        ? Array.from({ length: listCount }, (_, j) => ({
          title: t(`faq.study.${i}.list.${j}.title`),
          desc: t(`faq.study.${i}.list.${j}.desc`),
        }))
        : null,
    }
  })
})

const openIndex = ref<number | null>(0)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <section class="faq-hero">
    <div class="faq-hero-inner">
      <h1 class="faq-hero-title">{{ $t('faq.hero.title') }}</h1>
      <p class="faq-hero-sub">{{ $t('faq.hero.sub') }}</p>
    </div>
  </section>

  <main class="faq-page">
    <div class="faq-body">
      <div class="faq-list">
        <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ 'faq-item--open': openIndex === i }">
          <button type="button" class="faq-question" :aria-expanded="openIndex === i" @click="toggle(i)">
            <span class="faq-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="faq-q-text">{{ faq.q }}</span>
            <span class="faq-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="3,6 8,11 13,6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>
          </button>

          <div class="faq-answer-wrap" :class="{ open: openIndex === i }">
            <div class="faq-answer">
              <p v-if="faq.a" style="white-space: pre-line">{{ faq.a }}</p>
              <ul v-if="faq.list" class="faq-answer-list">
                <li v-for="(item, j) in faq.list" :key="j">
                  <strong>{{ item.title }}</strong>：{{ item.desc }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <aside class="faq-aside">
        <div class="aside-card">
          <p class="aside-eyebrow">{{ $t('faq.aside.eyebrow') }}</p>
          <h3 class="aside-title">{{ $t('faq.aside.title') }}</h3>
          <p class="aside-body">{{ $t('faq.aside.body') }}</p>
          <NuxtLink to="/contact" class="aside-btn">{{ $t('faq.aside.cta') }}</NuxtLink>
        </div>

        <div class="aside-card aside-card--light">
          <p class="aside-eyebrow">{{ $t('faq.aside.linksTitle') }}</p>
          <ul class="aside-links">
            <li>
              <NuxtLink to="/study/schools">{{ $t('faq.aside.links.schools') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/study/information">{{ $t('faq.aside.links.info') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/study/short-term">{{ $t('faq.aside.links.shortTerm') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/study/long-term">{{ $t('faq.aside.links.longTerm') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/study/university">{{ $t('faq.aside.links.university') }}</NuxtLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
/* ── Hero ── */
.faq-hero {
  background: var(--c-primary);
  padding: 4rem 2rem;
  text-align: center;
}

.faq-hero-inner {
  max-width: 600px;
  margin: 0 auto;
}

.faq-hero-eyebrow {

  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.6rem;
}

.faq-hero-title {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.25;
  margin: 0 0 0.75rem;
}

.faq-hero-sub {

  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
  margin: 0;
}

/* ── Page ── */
.faq-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 5rem;
}

/* ── Tab ── */
.faq-tabs {
  display: flex;
  gap: 0;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 2rem;
  width: fit-content;
}

.faq-tab {
  padding: 0.75rem 1.8rem;
  border: none;
  background: var(--c-surface);
  color: var(--c-text-secondary);

  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  border-right: 1px solid var(--c-border);
}

.faq-tab:last-child {
  border-right: none;
}

.faq-tab:hover {
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
}

.faq-tab--active {
  background: var(--c-primary);
  color: #fff;
}

/* ── Body ── */
.faq-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  align-items: flex-start;
}

/* ── FAQ 列表 ── */
.faq-list {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.faq-item {
  border-bottom: 1px solid var(--c-border);
  background: var(--c-surface);
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-item--open {
  background: var(--c-bg);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.1rem 1.3rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast);
}

.faq-question:hover {
  background: var(--c-primary-muted);
}

.faq-num {

  font-weight: 700;
  color: var(--c-primary);
  flex-shrink: 0;
  width: 24px;
  opacity: 0.6;
}

.faq-item--open .faq-num {
  opacity: 1;
}

.faq-q-text {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--c-text);
  line-height: 1.4;
  flex: 1;
}

.faq-item--open .faq-q-text {
  color: var(--c-primary-dark);
}

.faq-answer p {
  white-space: pre-line;
}

.faq-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  transition: transform var(--transition-base);
}

.faq-icon svg {
  width: 16px;
  height: 16px;
  display: block;
}

.faq-item--open .faq-icon {
  transform: rotate(180deg);
}

.faq-answer-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer-wrap.open {
  max-height: 400px;
}

.faq-answer {
  padding: 0 1.3rem 1.2rem 3.2rem;
  border-top: 1px solid var(--c-border);
}

.faq-answer p {
  line-height: 1.85;
  margin: 0;
  padding-top: 1rem;
}

.faq-answer-list {
  list-style: disc;
  padding-left: 1.4rem;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.faq-answer-list li {
  color: var(--c-text-secondary);
  line-height: 1.75;
}

.faq-answer-list li strong {
  color: var(--c-text);
  font-weight: 700;
}

/* ── 側欄 ── */
.faq-aside {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 80px;
}

.aside-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.4rem;
}

.aside-card--light {
  background: var(--c-bg-alt);
}

.aside-eyebrow {

  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--c-primary);
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

.aside-title {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 0.6rem;
}

.aside-body {

  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0 0 1.2rem;
}

.aside-btn {
  display: inline-block;
  background: var(--c-primary);
  color: var(--c-text-on-primary);

  font-weight: 700;
  padding: 0.7rem 1.5rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.aside-btn:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
}

.aside-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.aside-links li {
  border-bottom: 1px solid var(--c-border);
}

.aside-links li:last-child {
  border-bottom: none;
}

.aside-links a {
  display: block;
  padding: 0.55rem 0;

  color: var(--c-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.aside-links a:hover {
  color: var(--c-primary);
}

/* ── RWD ── */
@media (max-width: 768px) {
  .faq-body {
    grid-template-columns: 1fr;
  }

  .faq-aside {
    position: static;
  }

  .faq-answer {
    padding: 0 1.2rem 1rem 1.2rem;
  }
}

@media (max-width: 480px) {
  .faq-hero {
    padding: 3rem 1.5rem;
  }

  .faq-page {
    padding: 2rem 1rem 4rem;
  }

  .faq-tabs {
    width: 100%;
  }

  .faq-tab {
    flex: 1;
    text-align: center;
  }
}
</style>