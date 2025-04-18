<script setup lang="ts">
import { onMounted } from "vue"
import gsap from "gsap"
import SplitType from "split-type"

const props = defineProps<{
  classes?: string
}>()

onMounted(() => {
  // 分割文字字元 + GSAP 動畫
  const split = new SplitType(".hero-title", { types: "chars" })
  gsap.from(split.chars, {
    y: 30,
    opacity: 0,
    stagger: 0.04,
    duration: 0.8,
    ease: "power2.out",
  })

  // 文字區塊淡入
  gsap.from(".hero-text", {
    x: -50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power2.out",
  })

  // 圖片區塊從右邊滑入
  gsap.from(".hero-img", {
    x: 50,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power2.out",
  })
})
</script>

<template>
  <section class="hero-section" :class="props.classes">
    <!-- 半透明色塊裝飾 (可自訂形狀/顏色) -->
    <div class="hero-deco-shape"></div>

    <div class="hero-container">
      <!-- 左側文字 -->
      <div class="hero-text">
        <h4 class="hero-subtitle">每一次的跨越，都有新的可能</h4>
        <h3 class="hero-title">跨越文化與地域，打造更大未來</h3>
        <p class="hero-desc">
          即使沒有完整背景，充足的留白與設計要素，  
          依然能讓這裡成為令人驚豔的首頁英雄區！
        </p>
      </div>

      <!-- 右側圖片 -->
      <div class="hero-image">
        <img 
          src="../img/main-page/image.jpg"
          alt="hero main"
          class="hero-img"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  width: 100%;
  min-height: 50vh; /* 不要撐太大，保證一進畫面能看到整個區塊 */
  padding: 4rem 1rem; 
  overflow: hidden;
  display: flex;
  align-items: center;

  /* 半透明斜角色塊: 只佔左半或部分 */
  .hero-deco-shape {
    position: absolute;
    top: 0; left: 0;
    width: 50vw;
    height: 100%;
    background-color: rgba(215, 169, 140, 0.1);
    /* 讓色塊帶斜角: skewX */
    transform: skewX(-10deg);
    transform-origin: top left;
    z-index: -1;
  }

  .hero-container {
    max-width: 1200px;
    display: flex;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 992px) {
      flex-direction: column;
      text-align: center;
      height: auto; /* 小螢幕下自動撐高 */
    }
  }

  .hero-text {
    flex: 1;
    max-width: 550px;
    margin-right: 2rem;
    @media (max-width: 992px) {
      margin-right: 0;
      margin-bottom: 2rem;
    }

    .hero-subtitle {
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
      color: #555;
    }

    .hero-title {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      @media (min-width: 768px) {
        font-size: 2.4rem;
      }
      @media (min-width: 1200px) {
        font-size: 3rem;
      }
    }

    .hero-desc {
      font-size: 1rem;
      line-height: 1.6;
      color: #444;
      max-width: 450px;
      @media (min-width: 768px) {
        font-size: 1.125rem;
      }
    }
  }

  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .hero-img {
      width: 100%;
      max-width: 420px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border: 1px solid rgba(0,0,0,0.1);
    }
  }
}
</style>
