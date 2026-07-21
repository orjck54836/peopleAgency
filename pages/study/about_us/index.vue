<script lang="ts" setup>
import { ref, computed } from 'vue'

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const { t } = useI18n()

useSeoMeta({
  title: t('seo.study.title'),
  description: t('seo.study.description'),
  ogTitle: t('seo.study.title'),
  ogDescription: t('seo.study.description'),
})

const values = computed(() =>
  Array.from({ length: 4 }, (_, i) => ({
    title: t(`about.values.${i}.title`),
    desc:  t(`about.values.${i}.desc`),
  }))
)

const storyBody = computed(() =>
  Array.from({ length: 4 }, (_, i) => t(`about.story.body.${i}`))
)

const companyInfo = computed(() =>
  Array.from({ length: 6 }, (_, i) => ({
    label: t(`about.company.${i}.label`),
    value: t(`about.company.${i}.value`),
  }))
)
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <section class="about-hero">
    <div class="about-hero-inner">
      <h1 class="about-title">{{ $t('about.hero.title') }}</h1>
      <p class="about-sub">{{ $t('about.hero.sub') }}</p>
    </div>
  </section>

  <main class="about-page">
    <section class="about-section">
      <div class="about-section-inner about-section-inner--2col">
        <div class="story-text">
          <h2 class="section-title">{{ $t('about.story.title') }}</h2>
          <div class="story-body">
            <p v-for="(line, i) in storyBody" :key="i">{{ line }}</p>
          </div>
        </div>
        <div>
          <img src="/images/haogaku-logo.svg" :alt="$t('about.story.imgAlt')" class="story-img" />
        </div>
      </div>
    </section>

    <section class="about-section about-section--alt">
      <div class="about-section-inner">
        <h2 class="section-title">{{ $t('about.values.title') }}</h2>
        <div class="value-grid">
          <div v-for="v in values" :key="v.title" class="value-card">
            <h3 class="value-title">{{ v.title }}</h3>
            <p class="value-desc">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section about-section--alt">
      <div class="about-section-inner">
        <h2 class="section-title">{{ $t('about.company.title') }}</h2>
        <div class="company-table">
          <div v-for="item in companyInfo" :key="item.label" class="company-row">
            <span class="company-label">{{ item.label }}</span>
            <span class="company-val">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="about-cta">
      <h2>{{ $t('about.cta.title') }}</h2>
      <p>{{ $t('about.cta.sub') }}</p>
      <NuxtLink to="/contact" class="cta-btn">{{ $t('about.cta.btn') }}</NuxtLink>
    </section>
  </main>
  <Footer />
</template>

<style scoped>
.about-hero {
  background: var(--c-primary);
  padding: 4.5rem 2rem;
  text-align: center;
}

.about-hero-inner {
  max-width: 640px;
  margin: 0 auto;
}

.about-eyebrow {
  
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.6rem;
}

.about-title {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.25;
  margin: 0 0 0.75rem;
}

.about-sub {
  
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
  margin: 0;
}

.about-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.about-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--c-border);
}

.about-section--alt {
  margin: 0 -1.5rem;
  padding: 4rem 1.5rem;
}

.about-section-inner--2col {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;
  align-items: center;
}

.section-eyebrow {
  
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-primary);
  margin: 0 0 0.6rem;
}

.section-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.3;
}

.story-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.story-body p {
  line-height: 1.85;
  margin: 0;
}

.story-img {
  width: 100%;
  aspect-ratio: 4/3;
  /* object-fit: cover; */
  display: block;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

.value-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.value-icon {
  font-size: 1.8rem;
  display: block;
  margin-bottom: 0.75rem;
}

.value-title {
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.5rem;
}

.value-desc {
  line-height: 1.7;
  margin: 0;
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.team-card {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}

.team-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--c-primary);
  color: #fff;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.team-name-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.2rem;
}

.team-name {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--c-text);
  margin: 0;
}

.team-tag {
  
  font-weight: 700;
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-sm);
}

.team-role {
  
  color: var(--c-primary);
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.team-desc {
  
  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.company-table {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.company-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  border-bottom: 1px solid var(--c-border);
  
}

.company-row:last-child {
  border-bottom: none;
}

.company-label {
  padding: 0.9rem 1.2rem;
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  font-weight: 700;
  display: flex;
  align-items: center;
}

.company-val {
  padding: 0.9rem 1.2rem;
  background: var(--c-surface);
  color: var(--c-text-secondary);
  display: flex;
  align-items: center;
}

.about-cta {
  text-align: center;
  padding: 4rem 0 0;
}

.about-cta h2 {
  font-family: var(--font-heading);
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.75rem;
}

.about-cta p {
  margin: 0 0 1.5rem;
}

.cta-btn {
  display: inline-block;
  background: var(--c-primary);
  color: var(--c-text-on-primary);
  font-weight: 700;
  padding: 0.9rem 2.4rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background var(--transition-fast);
}

.cta-btn:hover {
  background: var(--c-primary-light);
  color: var(--c-text-on-primary);
}

@media (max-width: 900px) {
  .about-section-inner--2col {
    grid-template-columns: 1fr;
  }

  .value-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .about-hero {
    padding: 3.5rem 1.5rem;
  }

  .about-section {
    padding: 3rem 0;
  }

  .about-section--alt {
    padding: 3rem 1.5rem;
  }

  .team-card {
    flex-direction: column;
    gap: 1rem;
  }

  .company-row {
    grid-template-columns: 100px 1fr;
  }
}
</style>