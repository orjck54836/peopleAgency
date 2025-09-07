<template>
  <div class="hero-section">
    <!-- 標題 -->
    <div class="hero-text">
      <h1 class="hero-title">{{ $t('hero_page.title') }}</h1>
      <p class="hero-subtitle">{{ $t('hero_page.subtitle') }}</p>
      <p class="hero-slogan">{{ $t('hero_page.slogan') }}</p>
    </div>

    <!-- ✅ 包裹一層，保持和文字距離 -->
    <div class="gallery-container">
      <div class="gallery-wrapper">
        <ul class="gallery">
          <li v-for="item in items"
              :key="item.id"
              :data-pos="item.pos"
              :style="{ backgroundImage: `url(${item.url})` }"
              :aria-label="$t(item.alt)"
              role="img"
              @click="shuffle(item)">
          </li>
        </ul>
      </div>
    </div>
    
    <!-- 簡介 -->
    <div class="hero-description">
      <h3>{{ $t(currentItem.title) }}</h3>
      <p>{{ $t(currentItem.desc) }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue"

const items = reactive([
  {
    id: 0,
    pos: 0,
    url: "/images/hero/work.jpg",
    alt: "hero_page.work.alt",
    title: "hero_page.work.title",
    desc: "hero_page.work.desc"
  },
  {
    id: 1,
    pos: 1,
    url: "/images/hero/school.jpg",
    alt: "hero_page.study.alt",
    title: "hero_page.study.title",
    desc: "hero_page.study.desc"
  },
  {
    id: 2,
    pos: 2,
    url: "/images/hero/chinese.jpg",
    alt: "hero_page.chinese.alt",
    title: "hero_page.chinese.title",
    desc: "hero_page.chinese.desc"
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
<style>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  background: rgba(230, 73, 21, 0.591);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  animation: fadeInDown 1s ease-out;
  text-align: center;
}

.hero-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  position: relative;
  display: inline-block;
  padding: 0 1.5rem;
  text-align: center;
}

.hero-slogan {
  font-size: 1.1rem;
  font-style: italic;
  color: #666;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid #d92d2d;
  animation: typing 3s steps(40, end) forwards, blink 0.75s step-end infinite;
  text-align: center;
}

.hero-description {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-height: 200px;
  background: rgba(255, 255, 255, 0.265);
  /* 半透明卡片感 */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 5px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);

  animation: fadeUp 0.8s ease forwards;
  transform: translateY(20px);
  opacity: 0;
  width: 50%;
  border-radius: 5px;
}

.hero-description h3 {
  font-size: 1.4rem;
  font-weight: 700;
  background: rgba(229, 179, 132, 0.799);
  color: white;
  letter-spacing: 1px;
  padding: 0.5vh 5vw;
  border-radius: 0 0 10px 10px;
}

.hero-description p {
  font-size: 1.2rem;
  flex: 1;
  /* 佔滿剩餘空間 */
  display: flex;
  align-items: center;
  /* 垂直置中 */
  justify-content: center;
  /* 水平置中 */
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  max-width: 600px;
  padding: 0.5vh 5vw;
}

/* 入場動畫 */
@keyframes fadeUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 動畫效果 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

@keyframes blink {
  50% {
    border-color: transparent
  }
}

.gallery-wrapper {
  width: 100%;
  position: relative;
  /* absolute 以這裡為基準 */
  aspect-ratio: 16/9;
  max-width: 1000px;
  height: 40vh;
  /* 📌 桌機時給個相對高度 */
  margin: 2rem 0;
}

.gallery-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.gallery {
  position: relative;
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.gallery li {
  position: absolute;
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
  min-width: 350px;
  height: 25vh;
  max-width: 90vw;
}

.gallery li[data-pos="0"] {
  transform: translate(-50%, -50%) translateX(80%) scale(1);
  z-index: 1;
}

.gallery li[data-pos="1"] {
  transform: translate(-50%, -50%) translateX(0%) scale(1.4);
  z-index: 10;
}

.gallery li[data-pos="2"] {
  transform: translate(-50%, -50%) translateX(-80%) scale(1);
  z-index: 5;
}

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
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    width: 100%;
  }

  .hero-description h3 {
    font-size: 1rem;
  }

  .gallery li[data-pos="0"] {
    transform: translate(-50%, -50%) translateX(60%) scale(1.6);
    z-index: 1;
  }

  .gallery li[data-pos="1"] {
    transform: translate(-50%, -50%) translateX(0%) scale(2);
    z-index: 10;
  }

  .gallery li[data-pos="2"] {
    transform: translate(-50%, -50%) translateX(-60%) scale(1.6);
    z-index: 5;
  }

  .gallery li {
    min-width: 200px;
    height: 20vh;
  }
}

@media (max-width: 600px) {
  .hero-subtitle {
    font-size: 0.9rem;
  }

  .hero-slogan {
    font-size: 0.8rem;
  }

  .gallery-wrapper {
    height: 30vh;
  }

  .gallery li {
    width: calc(var(--width) / 3);
    /* 每張圖佔比較多 */
    min-width: 150px;
    /* ✅ 小螢幕更彈性 */
    max-width: 90vw;
    /* ✅ 不會超過螢幕 */
  }

  .gallery li[data-pos="0"] {
    transform: translate(-50%, -50%) translateX(70%) scale(1);
    z-index: 1;
  }

  .gallery li[data-pos="1"] {
    transform: translate(-50%, -50%) translateX(0%) scale(1.4);
    z-index: 10;
  }

  .gallery li[data-pos="2"] {
    transform: translate(-50%, -50%) translateX(-70%) scale(1);
    z-index: 5;
  }
}
</style>
