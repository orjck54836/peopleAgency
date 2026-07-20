<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)

const { t } = useI18n()

useSeoMeta({
  title: t('seo.shortTerm.title'),
  description: t('seo.shortTerm.description'),
  ogTitle: t('seo.shortTerm.title'),
  ogDescription: t('seo.shortTerm.description'),
})

// section 的 listCount 設定（不變的靜態資料）
const sectionMeta = [
  { id: 'whatIs',    listCount: 0 },
  { id: 'whoFor',    listCount: 4 },
  { id: 'features',  listCount: 0 },
  { id: 'cost',      listCount: 3 },
  { id: 'reminder',  listCount: 0 },
]

const sections = computed(() =>
  sectionMeta.map((meta, i) => ({
    id: meta.id,
    title: t(`shortTerm.sections.${meta.id}.title`),
    body:  t(`shortTerm.sections.${meta.id}.body`),
    list: meta.listCount > 0
      ? Array.from({ length: meta.listCount }, (_, j) => ({
          title: t(`shortTerm.sections.${meta.id}.list.${j}.title`),
          desc:  t(`shortTerm.sections.${meta.id}.list.${j}.desc`),
        }))
      : null,
  }))
)

const chips = computed(() =>
  Array.from({ length: 5 }, (_, i) => t(`shortTerm.chips.${i}`))
)

const recommendedSchools = ref<any[]>([])

async function fetchSchools() {
  try {
    const res = await fetch('/api/schools')
    const json = await res.json()
    if (json.success) {
      recommendedSchools.value = json.data
        .filter((s: any) => s.type === '日本語學校')
        .slice(0, 3)
    }
  } catch (err) {
    console.error('❌ 無法取得學校資料：', err)
  }
}

onMounted(fetchSchools)

function goToSchool(name: string) {
  router.push(`/study/${encodeURIComponent(name)}`)
}

function goToAllSchools() {
  router.push({ path: '/study/schools', query: { type: '日本語學校' } })
}
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <section class="mode-hero">
    <div class="mode-hero-inner">
      <p class="mode-tag">{{ $t('shortTerm.hero.tag') }}</p>
      <h1 v-html="$t('shortTerm.hero.title')" />
      <p class="mode-sub">{{ $t('shortTerm.hero.sub') }}</p>
    </div>
  </section>

  <main class="mode-wrapper">
    <div class="mode-chips">
      <span v-for="chip in chips" :key="chip" class="chip">{{ chip }}</span>
    </div>

    <section class="mode-sections">
      <div
        v-for="(sec, i) in sections"
        :key="sec.id"
        class="mode-section"
        :class="{ 'mode-section--alt': i % 2 === 1 }"
      >
        <div class="mode-section-text">
          <h2>{{ sec.title }}</h2>
          <p v-if="sec.body" style="white-space: pre-line">{{ sec.body }}</p>
          <ul v-if="sec.list" class="section-list">
            <li v-for="(item, j) in sec.list" :key="j">
              <strong>{{ item.title }}</strong>：{{ item.desc }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mode-schools">
      <h2 class="mode-schools-title">{{ $t('shortTerm.schools.title') }}</h2>
      <p class="mode-schools-sub">{{ $t('shortTerm.schools.sub') }}</p>
      <div v-if="recommendedSchools.length" class="mode-schools-grid">
        <div
          v-for="school in recommendedSchools"
          :key="school.name"
          class="school-card"
          @click="goToSchool(school.name)"
        >
          <img :src="school.image" :alt="school.name" class="school-card-img" />
          <div class="school-card-body">
            <h3>{{ school.name }}</h3>
            <p>{{ school.location }}</p>
            <span class="school-card-link">{{ $t('shortTerm.schools.detail') }}</span>
          </div>
        </div>
      </div>
      <div class="mode-schools-cta">
        <button class="btn-more" @click="goToAllSchools">
          {{ $t('shortTerm.schools.viewAll') }}
        </button>
      </div>
    </section>
  </main>
  <Footer />
</template>

<style scoped>
.section-body {
  white-space: pre-line; 
  line-height: 1.7;
  color: #4a4a4a;
}

.section-list {
  list-style: disc;
  padding-left: 1.4rem;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.section-list li {
  color: var(--c-text-secondary);
  line-height: 1.75;
}

.section-list li strong {
  color: var(--c-text);
  font-weight: 700;
}

.mode-hero {
  background: linear-gradient(to bottom right, rgba(139, 26, 47, 0.85), rgba(92, 15, 30, 0.75)),
    url('/images/hero.jpg');
  background-size: cover;
  background-position: center;
  padding: 6rem 2rem;
  text-align: center;
  color: #fff;
}

.mode-hero-inner {
  max-width: 640px;
  margin: 0 auto;
}

.mode-section-text p {
  white-space: pre-line;
}

.mode-tag {
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-full);
  padding: 0.3rem 1rem;
  
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
}

.mode-hero-inner h1 {
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.3;
  margin: 0 0 1rem;
}

.mode-sub {
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.mode-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}

.mode-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.chip {
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
  
  font-weight: 600;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--c-border);
}

.mode-sections {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 4rem;
}

.mode-section {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--c-surface);
  border-bottom: 1px solid var(--c-border);
  align-items: flex-start;
}

.mode-section:last-child {
  border-bottom: none;
}

.mode-section--alt {
  background: var(--c-bg-alt);
}

.mode-section-icon {
  font-size: var(--text-3xl);
  flex-shrink: 0;
  width: 2.5rem;
  text-align: center;
  padding-top: 0.2rem;
}

.mode-section-text h2 {
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.6rem;
}

.mode-section-text p {
  color: var(--c-text-secondary);
  line-height: 1.8;
  margin: 0;
}

.mode-schools {
  border-top: 1px solid var(--c-border);
  padding-top: 3rem;
}

.mode-schools-title {
  font-weight: 700;
  color: var(--c-primary-dark);
  text-align: center;
  margin-bottom: 0.4rem;
}

.mode-schools-sub {
  text-align: center;
  margin-bottom: 2rem;
}

.mode-schools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.school-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.school-card:hover {
  border-color: var(--c-primary);
}

.school-card-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.school-card-body {
  padding: 1rem;
}

.school-card-body h3 {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--c-text);
  margin: 0 0 0.3rem;
}

.school-card-body p {
  
  color: var(--c-text-secondary);
  margin: 0 0 0.6rem;
}

.school-card-link {
  
  font-weight: 600;
  color: var(--c-primary);
}

.mode-schools-cta {
  display: flex;
  justify-content: center;
}

.btn-more {
  border: 1px solid var(--c-primary);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--c-primary);
  font-weight: 700;
  padding: 0.8rem 2rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.btn-more:hover {
  background: var(--c-primary);
  color: #fff;
}

@media (max-width: 768px) {
  .mode-hero-inner h1 {
    font-size: var(--text-3xl);
  }

  .mode-schools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .mode-hero {
    padding: 4rem 1.5rem;
  }

  .mode-hero-inner h1 {
    font-size: var(--text-2xl);
  }

  .mode-section {
    flex-direction: column;
    gap: 0.8rem;
    padding: 1.5rem;
  }

  .mode-schools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
