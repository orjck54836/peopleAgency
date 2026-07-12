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
    cities: '札幌、函館、小樽',
    description: '北海道位於日本最北端，四面環海、土地遼闊，約佔日本總面積的 22%。這裡有著純淨的自然景觀與清新的空氣，夏天涼爽宜人、冬天則是滑雪天堂。生活步調悠閒，物價相對親民，是想遠離大都市喧囂、專注學習與體驗道地日本生活的最佳選擇。',
    climate: '四季分明，夏季涼爽（20～26°C），冬季嚴寒多雪（-10～0°C），是體驗雪國文化與滑雪運動的絕佳地區。',
    suitableFor: '喜愛自然、想要安靜學習環境、對滑雪或戶外活動有興趣、預算有限想節省生活費的學生。',
    lifeAccess: '札幌市區有地下鐵與路面電車，生活機能完整；郊區則需依賴巴士，冬季交通易受降雪影響，建議選擇市中心周邊校區。',
    costLevel: 3,
    convenienceLevel: 3,
    atmosphereLevel: 4,
    difficultyLevel: 2,
    rentRange: '3.5 ～ 6 萬日圓／月',
    regions: ['hokkaido'],
  },
  {
    id: 'tohoku',
    label: '東北',
    cities: '仙台、青森、盛岡',
    description: '東北地方涵蓋本州北部，包含青森、岩手、宮城、秋田、山形、福島六縣。以「杜之都」仙台為核心，自然景觀豐富、人情味濃厚，保有最純樸的日本鄉土文化。物價是全日本相對最親民的地區之一，適合想深度融入在地生活、體驗傳統祭典（如青森睡魔祭、仙台七夕祭）的留學生。',
    climate: '四季變化明顯，夏季溫和（22～28°C），冬季寒冷多雪（-2～5°C），日本海側降雪量大。',
    suitableFor: '想體驗純樸日本生活、預算有限、喜歡傳統文化與祭典、偏好人情味濃厚社區的學生。',
    lifeAccess: '仙台為東北交通樞紐，新幹線可快速往返東京（約 1.5 小時）；市區有地下鐵，生活便利，其他縣市則以 JR 與巴士為主。',
    costLevel: 2,
    convenienceLevel: 3,
    atmosphereLevel: 3,
    difficultyLevel: 2,
    rentRange: '3 ～ 5.5 萬日圓／月',
    regions: ['tohoku'],
  },
  {
    id: 'kanto',
    label: '關東',
    cities: '東京、橫濱、埼玉',
    description: '關東地方以東京為中心，是日本政治、經濟與文化的核心，也是留學最熱門的地區。這裡集結了全日本數量最多、選擇最豐富的語言學校、專門學校與大學，交通四通八達、生活機能極為完善。動漫、時尚、美食、次文化應有盡有，打工與企業實習機會也最多，是想要最豐富都市體驗與最多元發展可能的首選。',
    climate: '四季分明，夏季炎熱潮濕（28～35°C），冬季乾燥偏冷（2～10°C），降雪少，氣候相對溫和。',
    suitableFor: '想體驗大都市生活、追求最多學校與職缺選擇、對動漫時尚次文化有興趣、希望打工機會多的學生。',
    lifeAccess: '全日本最發達的鐵路網，JR、地下鐵、私鐵密集交織，通勤極為便利；生活機能無可挑剔，但租金與物價也是全國最高。',
    costLevel: 5,
    convenienceLevel: 5,
    atmosphereLevel: 5,
    difficultyLevel: 3,
    rentRange: '7 ～ 12 萬日圓／月',
    regions: ['tokyo', 'kanagawa'],
  },
  {
    id: 'chubu',
    label: '中部',
    cities: '名古屋、靜岡、金澤',
    description: '中部地方涵蓋愛知、靜岡、新潟、石川等九縣，以日本第四大城名古屋為核心，是日本重要的工業與製造業重鎮（TOYOTA 總部所在地）。生活費比東京、大阪親民許多，產業實習與就業機會豐富，又鄰近富士山、立山黑部、金澤兼六園等知名景點，兼具都市便利與自然人文之美。',
    climate: '四季分明，夏季炎熱（28～34°C），冬季日本海側多雪、太平洋側乾冷（3～8°C）。',
    suitableFor: '對製造業、工科實習有興趣、想要都市生活但預算有限、喜歡兼顧便利與自然環境的學生。',
    lifeAccess: '名古屋為中部交通中心，新幹線往返東京、大阪皆便利；市區地下鐵完善，租金合理，性價比高。',
    costLevel: 3,
    convenienceLevel: 4,
    atmosphereLevel: 3,
    difficultyLevel: 2,
    rentRange: '4 ～ 7 萬日圓／月',
    regions: ['nagoya'],
  },
  {
    id: 'kansai',
    label: '關西',
    cities: '大阪、京都、神戶',
    description: '關西地方以大阪、京都、神戶為中心，是日本歷史文化的搖籃。京都保存了千年古都的優雅風貌，大阪則以熱情豪爽的商業文化與美食聞名（「天下的廚房」），神戶洋溢異國港都風情。生活費比東京略低，語言學校與專門學校選擇眾多，是想體驗傳統日本文化、又不失都市便利的絕佳留學地區。',
    climate: '四季分明，夏季炎熱潮濕（29～35°C），冬季偏冷但降雪少（3～9°C），盆地地形使京都夏熱冬冷更明顯。',
    suitableFor: '熱愛日本傳統文化與歷史、喜歡美食、想要都市生活但租金比東京低、性格外向愛交朋友的學生。',
    lifeAccess: 'JR、阪急、京阪、地下鐵路網綿密，大阪、京都、神戶之間往返僅需 30～60 分鐘；生活機能完善，關西人熱情友善。',
    costLevel: 4,
    convenienceLevel: 5,
    atmosphereLevel: 5,
    difficultyLevel: 3,
    rentRange: '5 ～ 9 萬日圓／月',
    regions: ['osaka'],
  },
  {
    id: 'chugoku',
    label: '中國',
    cities: '廣島、岡山、山口',
    description: '中國地方位於本州西部，包含岡山、廣島、山口、島根、鳥取五縣。廣島是國際知名的和平象徵城市，擁有世界遺產原爆圓頂館與嚴島神社；岡山則以晴天日數多、氣候宜人著稱。這裡氣候溫和、生活費較低、步調悠閒，適合想在寧靜環境中專注學習、又能接觸豐富歷史文化的留學生。',
    climate: '瀨戶內海側氣候溫和少雨（晴天日數全國名列前茅），四季分明，夏季 28～33°C，冬季 4～9°C。',
    suitableFor: '喜歡溫和氣候、想要寧靜學習環境、對歷史文化與世界遺產有興趣、預算有限的學生。',
    lifeAccess: '廣島有路面電車與巴士系統，新幹線可快速連結大阪、福岡；生活機能足夠，物價與租金親民。',
    costLevel: 2,
    convenienceLevel: 3,
    atmosphereLevel: 3,
    difficultyLevel: 2,
    rentRange: '3 ～ 5 萬日圓／月',
    regions: ['chugoku'],
  },
  {
    id: 'shikoku',
    label: '四國',
    cities: '高松、松山、德島',
    description: '四國地方由德島、香川、愛媛、高知四縣組成，是日本本土面積最小的地方。這裡自然風光優美，有著名的四國遍路朝聖文化、道後溫泉、鳴門漩渦等特色，步調悠閒、人情溫暖。學校規模較小但師生比例佳，能獲得更多個別關注，適合想要安靜專注、深度沉浸式學習環境的留學生。',
    climate: '瀨戶內海側溫暖少雨，太平洋側（高知）多雨溫暖，四季分明，夏季 28～33°C，冬季 5～10°C。',
    suitableFor: '想要小班制關注、偏好安靜專注環境、喜歡自然與溫泉、追求高性價比留學生活的學生。',
    lifeAccess: '高松、松山有市區交通與路面電車，跨海大橋連結本州；生活步調慢，物價與租金為全國最低區間之一。',
    costLevel: 2,
    convenienceLevel: 2,
    atmosphereLevel: 3,
    difficultyLevel: 1,
    rentRange: '2.5 ～ 4.5 萬日圓／月',
    regions: ['shikoku'],
  },
  {
    id: 'kyushu',
    label: '九州・沖繩',
    cities: '福岡、鹿兒島、沖繩',
    description: '九州地方由福岡、佐賀、長崎、熊本、大分、宮崎、鹿兒島七縣及沖繩縣構成。福岡是九州最大城市，機能完整、物價親民，近年成為留學新熱點；長崎有濃厚異國歷史、熊本有壯麗阿蘇火山、沖繩則是亞熱帶度假天堂。氣候溫暖、飲食美味、生活費親民，是兼具都市便利與南國風情的留學選擇。',
    climate: '氣候溫暖，九州本島四季分明（夏 30～35°C、冬 6～12°C），沖繩為亞熱帶氣候，全年溫暖（18～30°C）。',
    suitableFor: '喜歡溫暖氣候、想要都市便利又預算親民、對亞洲交流（近韓國、台灣）有興趣、愛美食與海島風情的學生。',
    lifeAccess: '福岡市區有地下鐵，機場距市中心近，往返台灣航班多而便利；生活機能完善，租金與物價相對親民。',
    costLevel: 2,
    convenienceLevel: 4,
    atmosphereLevel: 4,
    difficultyLevel: 2,
    rentRange: '3 ～ 6 萬日圓／月',
    regions: ['fukuoka'],
  },
]

const costLabels: Record<number, string> = { 1: '非常親民', 2: '親民', 3: '普通', 4: '偏高', 5: '高' }
const convenienceLabels: Record<number, string> = { 1: '較少', 2: '尚可', 3: '普通', 4: '便利', 5: '非常便利' }
const atmosphereLabels: Record<number, string> = { 1: '清淡', 2: '尚可', 3: '普通', 4: '熱絡', 5: '非常熱絡' }
const difficultyLabels: Record<number, string> = { 1: '容易', 2: '較容易', 3: '普通', 4: '略難', 5: '困難' }

const defaultZone = 'kanto'

const imageMap: Record<string, string> = {
  hokkaido: '/images/prefecture/hokkaido.png', tohoku: '/images/prefecture/aomori.jpeg', kanto: '/images/prefecture/tokyo.png', chubu: '/images/prefecture/nagoya.jpg', kansai: '/images/prefecture/osaka.jpg', chugoku: '/images/prefecture/okayama.jpeg', shikoku: '/images/prefecture/ehime.jpeg', kyushu: '/images/prefecture/fukuoka.png',
}

const currentZone = computed(() =>
  zones.find(z => z.id === (props.modelValue || defaultZone))
)

const ratings = computed(() => {
  if (!currentZone.value) return []
  const z = currentZone.value
  return [
    { label: '生活物價', level: z.costLevel, tag: costLabels[z.costLevel] },
    { label: '生活便利', level: z.convenienceLevel, tag: convenienceLabels[z.convenienceLevel] },
    { label: '留學人氣', level: z.atmosphereLevel, tag: atmosphereLabels[z.atmosphereLevel] },
    { label: '適應難度', level: z.difficultyLevel, tag: difficultyLabels[z.difficultyLevel] },
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
    <!-- 上方：橫向地區選擇 -->
    <ul class="zone-tabs" role="tablist">
      <li v-for="zone in zones" :key="zone.id" role="none">
        <button type="button" role="tab" class="zone-tab"
          :class="{ 'zone-tab--active': (props.modelValue || defaultZone) === zone.id }"
          :aria-selected="(props.modelValue || defaultZone) === zone.id" @click="selectZone(zone.id)">
          {{ zone.label }}
        </button>
      </li>
    </ul>

    <!-- 下方：介紹卡片 -->
    <div v-if="currentZone" class="info-card">
      <!-- 標題列 -->
      <div class="card-header">
        <h3 class="card-region">{{ currentZone.label }}地方</h3>
        <span class="card-cities">{{ currentZone.cities }}</span>
      </div>

      <!-- 圖文並排：左圖右描述 -->
      <div class="card-intro">
        <div class="card-map">
          <img :src="imageMap[props.modelValue || defaultZone]" :alt="`日本地圖，${currentZone.label}`"
            class="card-map-img" />
        </div>
        <p class="card-desc">{{ currentZone.description }}</p>
      </div>

      <div class="card-divider" />

      <!-- 評價 -->
      <div class="card-ratings">
        <div v-for="r in ratings" :key="r.label" class="rating-row">
          <span class="rating-label">{{ r.label }}</span>
          <span class="rating-stars">
            <span v-for="n in 5" :key="n" class="star" :class="{ 'star--on': n <= r.level }">★</span>
          </span>
          <span class="rating-tag">{{ r.tag }}</span>
        </div>
        <div class="rating-row rating-row--rent">
          <span class="rating-label">租屋行情</span>
          <span class="rent-value">{{ currentZone.rentRange }}</span>
        </div>
      </div>

      <div class="card-divider" />

      <!-- 詳細情報 -->
      <div class="card-details">
        <div class="detail-item">
          <div>
            <p class="detail-title">氣候特色</p>
            <p class="detail-text">{{ currentZone.climate }}</p>
          </div>
        </div>
        <div class="detail-item">
          <div>
            <p class="detail-title">適合對象</p>
            <p class="detail-text">{{ currentZone.suitableFor }}</p>
          </div>
        </div>
        <div class="detail-item">
          <div>
            <p class="detail-title">生活機能與交通</p>
            <p class="detail-text">{{ currentZone.lifeAccess }}</p>
          </div>
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
  font-size: 0.9rem;
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
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0;
}

.card-cities {
  font-size: 0.82rem;
  color: var(--c-text-muted);
  font-weight: 600;
}

/* 圖文並排 */
.card-intro {
  display: flex;
  gap: 1.6rem;
  padding: 1.5rem 10rem 1.5rem 10rem;
  flex-direction: column;
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
  font-size: 1rem;
  font-weight: 700;
}

.card-desc {
  flex: 1;
  min-width: 0;
  font-size: 0.9rem;
  color: var(--c-text-secondary);
  line-height: 1.85;
  margin: 0;
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
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--c-primary);
  width: 4.5rem;
  flex-shrink: 0;
}

.rating-stars {
  display: flex;
  gap: 1px;
}

.star {
  font-size: 0.9rem;
  color: var(--c-border);
}

.star--on {
  color: var(--c-primary);
}

.rating-tag {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  background: var(--c-bg-alt);
  padding: 0.1rem 0.5rem;
  border-radius: var(--radius-sm);
}

.rating-row--rent .rent-value {
  font-size: 0.88rem;
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
  align-items: flex-start;
}

.detail-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--c-primary-dark);
  margin: 0 0 0.25rem;
}

.detail-text {
  font-size: 0.83rem;
  color: var(--c-text-secondary);
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
  font-size: 0.9rem;
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
    border-bottom: none;
  }

  .zone-tab {
    font-size: 0.85rem;
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
    font-size: 1.2rem;
  }

  .rating-label {
    width: 4rem;
    font-size: 0.74rem;
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