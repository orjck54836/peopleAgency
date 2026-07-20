<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const router = useRouter()
const { t } = useI18n()

// 不變的靜態資料（id、regions、圖片、評分數值）留在這裡
const zoneMeta = [
  { id: 'hokkaido', costLevel: 3, convenienceLevel: 3, atmosphereLevel: 4, difficultyLevel: 2, regions: ['hokkaido'] },
  { id: 'tohoku', costLevel: 2, convenienceLevel: 3, atmosphereLevel: 3, difficultyLevel: 2, regions: ['tohoku'] },
  { id: 'kanto', costLevel: 5, convenienceLevel: 5, atmosphereLevel: 5, difficultyLevel: 3, regions: ['tokyo', 'kanagawa'] },
  { id: 'chubu', costLevel: 3, convenienceLevel: 4, atmosphereLevel: 3, difficultyLevel: 2, regions: ['nagoya'] },
  { id: 'kansai', costLevel: 4, convenienceLevel: 5, atmosphereLevel: 5, difficultyLevel: 3, regions: ['osaka'] },
  { id: 'chugoku', costLevel: 2, convenienceLevel: 3, atmosphereLevel: 3, difficultyLevel: 2, regions: ['chugoku'] },
  { id: 'shikoku', costLevel: 2, convenienceLevel: 2, atmosphereLevel: 3, difficultyLevel: 1, regions: ['shikoku'] },
  { id: 'kyushu', costLevel: 2, convenienceLevel: 4, atmosphereLevel: 4, difficultyLevel: 2, regions: ['fukuoka'] },
]

const imageMap: Record<string, string> = {
  hokkaido: '/images/prefecture/hokkaido.png',
  tohoku: '/images/prefecture/aomori.jpeg',
  kanto: '/images/prefecture/tokyo.png',
  chubu: '/images/prefecture/nagoya.jpg',
  kansai: '/images/prefecture/osaka.jpg',
  chugoku: '/images/prefecture/okayama.jpeg',
  shikoku: '/images/prefecture/ehime.jpeg',
  kyushu: '/images/prefecture/fukuoka.png',
}

// 文字全部從 i18n 取
const zones = computed(() =>
  zoneMeta.map(meta => ({
    ...meta,
    label: t(`japanZoneMap.zones.${meta.id}.label`),
    cities: t(`japanZoneMap.zones.${meta.id}.cities`),
    description: t(`japanZoneMap.zones.${meta.id}.description`),
    climate: t(`japanZoneMap.zones.${meta.id}.climate`),
    suitableFor: t(`japanZoneMap.zones.${meta.id}.suitableFor`),
    lifeAccess: t(`japanZoneMap.zones.${meta.id}.lifeAccess`),
    rentRange: t(`japanZoneMap.zones.${meta.id}.rentRange`),
  }))
)

const defaultZone = 'kanto'

const currentZone = computed(() =>
  zones.value.find(z => z.id === (props.modelValue || defaultZone))
)

const ratings = computed(() => {
  if (!currentZone.value) return []
  const z = currentZone.value
  return [
    { label: t('japanZoneMap.ratings.cost'), level: z.costLevel, tag: t(`japanZoneMap.costLabels.${z.costLevel}`) },
    { label: t('japanZoneMap.ratings.convenience'), level: z.convenienceLevel, tag: t(`japanZoneMap.convenienceLabels.${z.convenienceLevel}`) },
    { label: t('japanZoneMap.ratings.atmosphere'), level: z.atmosphereLevel, tag: t(`japanZoneMap.atmosphereLabels.${z.atmosphereLevel}`) },
    { label: t('japanZoneMap.ratings.difficulty'), level: z.difficultyLevel, tag: t(`japanZoneMap.difficultyLabels.${z.difficultyLevel}`) },
  ]
})

function selectZone(zoneId: string) {
  emit('update:modelValue', zoneId)
}

function goToSchools() {
  if (!currentZone.value) return
  router.push({
    path: '/study/schools',
    query: { regions: currentZone.value.regions.join(',') },
  })
}
</script>

<template>
  <div class="zone-wrap">
    <ul class="zone-tabs" role="tablist">
      <li v-for="zone in zones" :key="zone.id" role="none">
        <button type="button" role="tab" class="zone-tab"
          :class="{ 'zone-tab--active': (props.modelValue || defaultZone) === zone.id }"
          :aria-selected="(props.modelValue || defaultZone) === zone.id" @click="selectZone(zone.id)">
          {{ zone.label }}
        </button>
      </li>
    </ul>

    <div v-if="currentZone" class="info-card">
      <div class="card-header">
        <h3 class="card-region">{{ currentZone.label }}{{ $t('japanZoneMap.regionSuffix') }}</h3>
        <span class="card-cities">{{ currentZone.cities }}</span>
      </div>

      <div class="card-intro">
        <div class="card-map">
          <img :src="imageMap[props.modelValue || defaultZone]"
            :alt="$t('japanZoneMap.mapAlt', { label: currentZone.label })" class="card-map-img" />
        </div>
        <p class="card-desc">{{ currentZone.description }}</p>
      </div>

      <div class="card-divider" />

      <div class="card-ratings">
        <div v-for="r in ratings" :key="r.label" class="rating-row">
          <span class="rating-label">{{ r.label }}</span>
          <span class="rating-stars">
            <span v-for="n in 5" :key="n" class="star" :class="{ 'star--on': n <= r.level }">★</span>
          </span>
          <span class="rating-tag">{{ r.tag }}</span>
        </div>
        <div class="rating-row rating-row--rent">
          <span class="rating-label">{{ $t('japanZoneMap.ratings.rent') }}</span>
          <span class="rent-value">{{ currentZone.rentRange }}</span>
        </div>
      </div>

      <div class="card-divider" />

      <div class="card-details">
        <div class="detail-item">
          <p class="detail-title">{{ $t('japanZoneMap.details.climate') }}</p>
          <p class="detail-text">{{ currentZone.climate }}</p>
        </div>
        <div class="detail-item">
          <p class="detail-title">{{ $t('japanZoneMap.details.suitableFor') }}</p>
          <p class="detail-text">{{ currentZone.suitableFor }}</p>
        </div>
        <div class="detail-item">
          <p class="detail-title">{{ $t('japanZoneMap.details.lifeAccess') }}</p>
          <p class="detail-text">{{ currentZone.lifeAccess }}</p>
        </div>
      </div>

      <div class="card-divider" />

      <div class="card-bottom">
        <button type="button" class="search-btn" @click="goToSchools">
          {{ $t('japanZoneMap.searchBtn', { label: currentZone.label }) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.zone-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── 上方橫向地區選擇 ── */
.zone-tabs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.zone-tabs li {
  border-right: 1px solid var(--c-border);
}

.zone-tabs li:last-child {
  border-right: none;
}

.zone-tab {
  width: 100%;
  border: none;
  background: var(--c-surface);
  color: var(--c-text);

  font-weight: 600;
  padding: 0.85rem 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  white-space: nowrap;
}

.zone-tab:hover {
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
}

.zone-tab--active {
  background: var(--c-primary);
  color: var(--c-text-on-primary);
}

/* ── 介紹卡片 ── */
.info-card {
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--c-surface);
}

/* 標題列 */
.card-header {
  gap: 0.75rem;
  padding: 1.4rem 1.6rem 0;
  flex-wrap: wrap;
}

.card-region {
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0;
}

.card-cities {

  color: var(--c-text-muted);
  font-weight: 600;
}

/* 圖文並排 */
.card-intro {
  display: flex;
  gap: 1.6rem;
  padding: 1.5rem;
  flex-direction: column;
  align-items: center;
}

.card-map {
  position: relative;
  /* flex: 0 0 200px; */
  /* aspect-ratio: 3 / 4; */
  overflow: hidden;
  background: var(--c-surface);
  object-fit: fill;
  display: flex;
  justify-content: center;
}

.card-map img {
  max-width: 500px;
}

.card-map-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-primary-muted);
  color: var(--c-primary);
  font-size: var(--text-base);
  font-weight: 700;
}

.card-desc {
  flex: 1;
  min-width: 0;
  color: var(--c-text-secondary);
  line-height: 1.85;
  margin: 0 1rem;
}

.card-divider {
  height: 1px;
  background: var(--c-border);
}

/* 評價 */
.card-ratings {
  padding: 1.3rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.rating-label {
  text-align: left;
  font-weight: 700;
  color: var(--c-primary);
  width: 100%;
  max-width: 6rem;
  flex-shrink: 0;
}

.rating-stars {
  display: flex;
  gap: 1px;
}

.star {

  color: var(--c-border);
}

.star--on {
  color: var(--c-primary);
}

.rating-tag {

  color: var(--c-text-muted);
  background: var(--c-bg-alt);
  padding: 0.1rem 0.5rem;
  border-radius: var(--radius-sm);
}

.rating-row--rent .rent-value {
  font-weight: 700;
  color: var(--c-text);
}

/* 詳細情報 */
.card-details {
  padding: 1.3rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  text-align: left;
}

.detail-item {
  display: flex;
  gap: 0.8rem;
  flex-direction: column;
  align-items: flex-start;
}

.detail-title {
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.25rem;
}

.detail-text {
  line-height: 1.7;
  margin: 0;
}

/* 搜尋按鈕 */
.card-bottom {
  padding: 1.3rem 1.6rem;
}

.search-btn {
  width: 100%;
  border: 1px solid var(--c-primary);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--c-primary);

  font-weight: 700;
  padding: 0.8rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  text-align: center;
}

.search-btn:hover {
  background: var(--c-primary);
  color: var(--c-text-on-primary);
}

/* ════════════════════════════════
   RWD — 平板（≤ 900px）
════════════════════════════════ */
@media (max-width: 900px) {
  .detail-item {
    flex-direction: column;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
  }

  .detail-title {
    width: 200px;
    text-align: center;
    border-bottom: 1px solid rgb(117, 73, 73);
  }

  /* 地區選擇改 4 欄 */
  .zone-tabs {
    grid-template-columns: repeat(4, 1fr);
  }

  .zone-tabs li {
    border-right: 1px solid var(--c-border);
    border-bottom: 1px solid var(--c-border);
  }

  .zone-tabs li:nth-child(4n) {
    border-right: none;
  }

  .zone-tabs li:nth-child(n+5) {
    border-bottom: none;
  }
}

/* ════════════════════════════════
   RWD — 手機（≤ 560px）
════════════════════════════════ */
@media (max-width: 560px) {
  .zone-tabs {
    grid-template-columns: repeat(2, 1fr);
  }

  .zone-tabs li {
    border-right: 1px solid var(--c-border);
    border-bottom: 1px solid var(--c-border);
  }

  .zone-tabs li:nth-child(4n) {
    border-right: 1px solid var(--c-border);
  }

  .zone-tabs li:nth-child(2n) {
    border-right: none;
  }

  .zone-tabs li:nth-child(7),
  .zone-tabs li:nth-child(8) {
    border-top: 1px solid var(--c-border);
  }

  .zone-tab {

    padding: 0.8rem 0.3rem;
  }

  /* 圖文改上下排列 */
  .card-intro {
    flex-direction: column;
    gap: 1rem;
  }

  .card-map {
    flex: none;
    width: 100%;
    max-width: 220px;
    margin: 0 auto;
    aspect-ratio: 4 / 3;
  }

  .card-header,
  .card-intro,
  .card-ratings,
  .card-details,
  .card-bottom {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }

  .card-region {
    font-size: var(--text-xl);
  }

  .rating-label {
    width: 4rem;

  }
}

/* ── 下方三區塊整體置中（與上方圖文區對齊） ── */
.card-ratings,
.card-details,
.card-bottom {
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>