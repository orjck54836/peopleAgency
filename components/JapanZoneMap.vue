<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const router = useRouter()

const zones = [
  {
    id: 'hokkaido',
    label: '北海道',
    cities: '札幌、函館',
    description: '北海道位於日本最北端，四面環海，土地遼闊，約佔日本總面積的22%。夏天氣候涼爽宜人，冬天能體驗滑雪等戶外活動，四季分明，是深受台灣同學歡迎的留學選擇。',
    costLevel: 3,
    rentRange: '3.5 ～ 6 萬日圓／月',
    regions: ['hokkaido'],
  },
  {
    id: 'tohoku',
    label: '東北',
    cities: '仙台、青森',
    description: '東北地方涵蓋本州北部，包含青森、岩手、宮城、秋田、山形、福島六縣。自然景觀豐富、生活步調悠閒，物價相對親民，適合想體驗純樸日本生活的留學生。',
    costLevel: 2,
    rentRange: '3 ～ 5.5 萬日圓／月',
    regions: ['tohoku'],
  },
  {
    id: 'kanto',
    label: '關東',
    cities: '東京、橫濱',
    description: '關東地方以東京為中心，是日本留學最熱門的地區。語言學校、專門學校與大學選擇最為豐富，交通便利、生活機能完善，企業實習與打工機會也最多。',
    costLevel: 5,
    rentRange: '7 ～ 12 萬日圓／月',
    regions: ['tokyo', 'kanagawa'],
  },
  {
    id: 'chubu',
    label: '中部',
    cities: '名古屋、靜岡',
    description: '中部地方涵蓋愛知、靜岡、新潟等九縣，以名古屋為主要城市，是日本重要的工業重鎮。生活費相對東京親民，產業實習機會多，也鄰近富士山等知名景點。',
    costLevel: 3,
    rentRange: '4 ～ 7 萬日圓／月',
    regions: ['nagoya'],
  },
  {
    id: 'kansai',
    label: '關西',
    cities: '大阪、京都、神戶',
    description: '關西地方以大阪、京都、神戶為中心，是日本歷史文化重鎮。生活費比東京略低，語言學校與專門學校選擇眾多，也是體驗傳統日本文化的熱門留學地區。',
    costLevel: 4,
    rentRange: '5 ～ 9 萬日圓／月',
    regions: ['osaka'],
  },
  {
    id: 'chugoku',
    label: '中國',
    cities: '岡山、廣島',
    description: '中國地方位於本州西部，包含岡山、廣島、山口、島根、鳥取五縣。氣候溫和、生活費較低，廣島更是國際知名的和平象徵城市，近年也漸受留學生關注。',
    costLevel: 2,
    rentRange: '3 ～ 5 萬日圓／月',
    regions: ['chugoku'],
  },
  {
    id: 'shikoku',
    label: '四國',
    cities: '高松、松山',
    description: '四國地方由德島、香川、愛媛、高知四縣組成，自然風光優美、步調悠閒。學校規模較小但師生比例佳，適合想要安靜專注學習環境的留學生。',
    costLevel: 2,
    rentRange: '2.5 ～ 4.5 萬日圓／月',
    regions: ['shikoku'],
  },
  {
    id: 'kyushu',
    label: '九州・沖繩',
    cities: '福岡、沖繩',
    description: '九州地方由福岡、佐賀、長崎、熊本、大分、宮崎、鹿兒島七縣，以及沖繩縣所構成。生活費相對親民，氣候溫和，福岡市更是九州最大城市，留學生活機能完整。',
    costLevel: 2,
    rentRange: '3 ～ 6 萬日圓／月',
    regions: ['fukuoka'],
  },
]

const costLabels: Record<number, string> = {
  1: '非常親民',
  2: '親民',
  3: '普通',
  4: '偏高',
  5: '高',
}

const defaultZone = 'kanto'

const imageMap: Record<string, string> = {
  hokkaido: '/images/study/japan-map-hokkaido.png',
  tohoku: '/images/study/japan-map-tohoku.png',
  kanto: '/images/study/japan-map-kanto.png',
  chubu: '/images/study/japan-map-chubu.png',
  kansai: '/images/study/japan-map-kansai.png',
  chugoku: '/images/study/japan-map-chugoku.png',
  shikoku: '/images/study/japan-map-shikoku.png',
  kyushu: '/images/study/japan-map-kyushu.png',
}

const currentZone = computed(() =>
  zones.find(z => z.id === (props.modelValue || defaultZone))
)

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
  <div class="map-layout">
    <!-- 左側：地區按鈕清單 -->
    <ul class="zone-list" role="tablist">
      <li v-for="zone in zones" :key="zone.id" role="none">
        <button
          type="button"
          role="tab"
          class="zone-btn"
          :class="{ 'zone-btn--active': (props.modelValue || defaultZone) === zone.id }"
          :aria-selected="(props.modelValue || defaultZone) === zone.id"
          @click="selectZone(zone.id)"
        >
          {{ zone.label }}
        </button>
      </li>
    </ul>

    <!-- 右側：地圖 + 卡片 -->
    <div class="map-content">
      <div class="map-frame">
        <img
          :src="imageMap[props.modelValue || defaultZone]"
          :alt="`日本地圖，${currentZone?.label}`"
          class="map-img"
        />
        <div class="map-placeholder">{{ currentZone?.label }}</div>
      </div>

      <!-- 三段式資訊卡片 -->
      <div v-if="currentZone" class="info-card">
        <div class="card-top">
          <h3 class="card-region">{{ currentZone.label }}地方</h3>
          <p class="card-desc">{{ currentZone.description }}</p>
        </div>

        <div class="card-divider" />

        <div class="card-mid">
          <div class="cost-row">
            <span class="cost-label">生活物價</span>
            <span class="cost-stars">
              <span
                v-for="n in 5"
                :key="n"
                class="star"
                :class="{ 'star--on': n <= currentZone.costLevel }"
              >★</span>
            </span>
            <span class="cost-tag">{{ costLabels[currentZone.costLevel] }}</span>
          </div>
          <div class="rent-row">
            <span class="cost-label">租屋行情</span>
            <span class="rent-value">{{ currentZone.rentRange }}</span>
          </div>
        </div>

        <div class="card-divider" />

        <div class="card-bottom">
          <button type="button" class="search-btn" @click="goToSchools">
            搜尋{{ currentZone.label }}地區學校 →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-layout {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

/* ── 左側按鈕清單 ── */
.zone-list {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 0 0 160px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.zone-btn {
  width: 100%;
  border: none;
  background: var(--c-surface);
  color: var(--c-text);
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.85rem 1rem;
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid var(--c-border);
  transition: background var(--transition-fast), color var(--transition-fast);
}

.zone-list li:last-child .zone-btn {
  border-bottom: none;
}

.zone-btn:hover {
  background: var(--c-primary-muted);
  color: var(--c-primary-dark);
}

.zone-btn--active {
  background: var(--c-primary);
  color: var(--c-text-on-primary);
}

/* ── 右側內容區 ── */
.map-content {
  flex: 1;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

/* ── 地圖圖片框 ── */
.map-frame {
  position: relative;
  flex: 0 0 240px;
  aspect-ratio: 3 / 4;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--c-surface);
}

.map-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.map-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-primary-muted);
  color: var(--c-primary);
  font-size: 1rem;
  font-weight: 700;
}

/* ── 三段式資訊卡片 ── */
.info-card {
  flex: 1 1 280px;
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--c-surface);
}

.card-top {
  padding: 1.2rem 1.4rem;
}

.card-region {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.6rem;
}

.card-desc {
  font-size: 0.88rem;
  color: var(--c-text-secondary);
  line-height: 1.7;
  margin: 0;
}

.card-divider {
  height: 1px;
  background: var(--c-border);
}

.card-mid {
  padding: 1.2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.cost-row,
.rent-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.cost-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--c-primary);
  width: 4.5rem;
  flex-shrink: 0;
}

.cost-stars {
  display: flex;
  gap: 1px;
}

.star {
  font-size: 0.95rem;
  color: var(--c-border);
}

.star--on {
  color: var(--c-primary);
}

.cost-tag {
  font-size: 0.78rem;
  color: var(--c-text-muted);
  margin-left: 0.2rem;
}

.rent-value {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--c-text);
}

.card-bottom {
  padding: 1.2rem 1.4rem;
}

.search-btn {
  width: 100%;
  border: 1px solid var(--c-primary);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--c-primary);
  font-size: 0.9rem;
  font-weight: 700;
  padding: 0.75rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
  text-align: center;
}

.search-btn:hover {
  background: var(--c-primary);
  color: var(--c-text-on-primary);
}

/* ── RWD ── */
@media (max-width: 900px) {
  .map-layout {
    flex-direction: column;
  }

  .zone-list {
    flex: none;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-radius: var(--radius-md);
  }

  .zone-list li {
    border-right: 1px solid var(--c-border);
  }

  .zone-list li:nth-child(4n) {
    border-right: none;
  }

  .zone-btn {
    border-bottom: none;
    text-align: center;
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }

  .map-frame {
    flex: none;
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
  }
}

@media (max-width: 600px) {
  .zone-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .zone-list li {
    border-bottom: 1px solid var(--c-border);
  }

  .zone-list li:nth-child(2n) {
    border-right: none;
  }
}
</style>