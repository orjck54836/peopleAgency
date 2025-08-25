<template>
  <div class="hero-section">
    <!-- 標題區 -->
    <div class="hero-text">
      <h1 class="hero-title">跨越國界，連結未來</h1>
      <p class="hero-subtitle">人力仲介x日本特色遊學x台灣華語教育</p>
      <p class="hero-slogan">We connect talents, cultures, and dreams.</p>
    </div>
    <!-- 圖片區 -->
    <div class="gallery-wrapper">
      <ul class="gallery">
        <li v-for="item in items" :key="item.id" :data-pos="item.pos" :style="{ backgroundImage: `url(${item.url})` }"
          @click="shuffle(item)"></li>
      </ul>
    </div>
    <!-- 圖片簡介區 -->
    <div class="hero-description">
      <h3>{{ currentItem.title }}</h3>
      <p>{{ currentItem.desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"

const items = reactive([
  {
    id: 0,
    pos: 0,
    url: "/images/hero/work.jpg",
    title: "人力仲介",
    desc: "協助日本企業媒合優秀外籍人才，嚴格篩選並全程支援，確保穩定的就業關係。"
  },
  {
    id: 1,
    pos: 1,
    url: "/images/hero/school.jpg",
    title: "日本特色遊學",
    desc: "連結日本語言學校與特色課程，打造最符合需求的學習體驗。"
  },
  {
    id: 2,
    pos: 2,
    url: "/images/hero/foreigner.jpg",
    title: "台灣華語教育",
    desc: "在台灣提供專業中文課程，讓留學生與外籍人才快速適應環境。"
  }
])

// 計算目前被選中的圖片（pos=1 通常是中間的主圖）
const currentItem = computed(() => items.find(i => i.pos === 1) || items[0])

function shuffle(item) {
  const heroPos = Math.floor(items.length / 2)
  const hero = items.findIndex(({ pos }) => pos === heroPos)
  const target = items.findIndex(({ id }) => id === item.id)
    ;[items[target].pos, items[hero].pos] = [items[hero].pos, items[target].pos]
}
</script>

<style>
:root {
  --width: min(500px, 90vw);
}
</style>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  text-align: center;
  height: 100vh;
}

/* 文字區域 */
.hero-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 20vh;
}

.hero-title {
  font-size: 2rem;
  font-weight: 800;
  color: #d92d2d;
  margin-bottom: 0.5rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.hero-slogan {
  font-size: 1rem;
  font-style: italic;
  color: #666;
}

.gallery-wrapper {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gallery {
  position: relative;
  width: var(--width);
  height: calc(var(--width) / 3);
  /* 給一個高度讓容器能置中 */
  list-style: none;
  margin: 0;
  padding: 0;
}

.gallery li {
  position: absolute;
  /* ✅ 改成絕對定位，全部疊在中心 */
  top: 50%;
  left: 50%;
  width: calc(var(--width) / 5);
  aspect-ratio: 1;
  cursor: pointer;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.6);
  transition: transform 0.8s;
  transform-origin: center center;
  /* ✅ 以中心為基準 */
  min-width: 350px;
  height: 25vh;
}

/* =====================
   每個 data-pos 的位置
   ===================== */
.gallery li[data-pos="0"] {
  transform: translate(-50%, -50%) translateX(100%) scale(1.4);
  z-index: 1;
}

.gallery li[data-pos="1"] {
  transform: translate(-50%, -50%) translateX(0%) scale(1.8);
  z-index: 10;
}

.gallery li[data-pos="2"] {
  transform: translate(-50%, -50%) translateX(-100%) scale(1.4);
  z-index: 5;
}

/* .gallery li[data-pos="3"] {
  transform: translate(-50%, -50%) translateX(80%) scale(1.4);
  z-index: 5;
}
.gallery li[data-pos="4"] {
  transform: translate(-50%, -50%) translateX(160%) scale(1);
  z-index: 1;
} */

/* 中間比較亮 */
.gallery li::after {
  content: "";
  position: absolute;
  inset: 0;
}

.gallery li[data-pos="0"]::after,
.gallery li[data-pos="2"]::after,
.gallery li[data-pos="3"]::after,
.gallery li[data-pos="4"]::after {
  background-color: rgba(0, 0, 0, 0.4);
}

.gallery li[data-pos="1"]::after {
  background-color: transparent;
}

@media (max-width: 768px) {
  :root {
    --width: min(320px, 90vw);
    /* 📌 整組縮小 */
  }

  .gallery-wrapper {
    height: 35vh;
  }

  .gallery li {
    width: calc(var(--width) / 3);
    /* 每張圖佔比較多 */
  }

  .gallery li[data-pos="0"] {
    transform: translate(-50%, -50%) translateX(100%) scale(1.3);
    z-index: 1;
  }

  .gallery li[data-pos="1"] {
    transform: translate(-50%, -50%) translateX(0%) scale(1.8);
    z-index: 10;
  }

  .gallery li[data-pos="2"] {
    transform: translate(-50%, -50%) translateX(-100%) scale(1.3);
    z-index: 5;
  }

  /* .gallery li[data-pos="3"] {
    transform: translate(-50%, -50%) translateX(50%) scale(1.1);
  }
  .gallery li[data-pos="4"] {
    transform: translate(-50%, -50%) translateX(100%) scale(0.9);
  } */

  .gallery li {
    min-width: 200px;
    height: 15vh;
  }
}

@media (max-width: 600px) {
  .hero-text {
    height: 25vh;
  }

  .gallery-wrapper {
    height: 45vh;
  }

  .gallery li {
    min-width: 150px;
    height: 12vh;
  }

  .gallery li {
    width: calc(var(--width) / 3);
    /* 每張圖佔比較多 */
  }

  .gallery li[data-pos="0"] {
    transform: translate(-50%, -50%) translateX(100%) scale(1.5);
    z-index: 1;
  }

  .gallery li[data-pos="1"] {
    transform: translate(-50%, -50%) translateX(0%) scale(2);
    z-index: 10;
  }

  .gallery li[data-pos="2"] {
    transform: translate(-50%, -50%) translateX(-100%) scale(1.5);
    z-index: 5;
  }
}
</style>
