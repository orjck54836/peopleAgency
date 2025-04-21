<template>
  <div>
     <div class="wave"></div>
     <div class="wave"></div>
     <div class="wave"></div>
  </div>
  <section class="hero-section">
    <!-- 背景圖形由 ::before 製作 -->
    <div class="hero-content-wrapper">
      <div class="hero-text">
        <h5 class="subtitle">每一次的跨越，都有新的可能</h5>
        <h1 class="title">跨越文化與地域，打造更大未來</h1>
        <p class="desc">
          為您搭起通往日本的信任橋梁，無論是外籍雇用、簽證申辦還是制度諮詢，我們提供全方位解決方案。
        </p>
      </div>
      <div class="hero-image">
        <img src="../img/main-page/image.jpg" alt="hero" class="hero-img" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from(".hero-text", {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: "power2.out"
  });

  gsap.from(".hero-img", {
    opacity: 0,
    x: 50,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.3
  });
});
</script>

<style scoped lang="scss">
.hero-section {
  position: relative;
  overflow: hidden;
  padding: 100px 20px;
  z-index:-1;
  
  .hero-content-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
    position: relative;

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  .hero-text {
    flex: 1;
    max-width: 600px;
    z-index: 1;

    .subtitle {
      font-size: 1rem;
      color: #7f6552;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #734c3f;
      margin-bottom: 1rem;
      @media (min-width: 768px) {
        font-size: 3.5rem;
      }
    }

    .desc {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #4e3d36;
    }
  }

  .hero-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    z-index: 1;

    .hero-img {
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
  }
}

@keyframes floatBg {
  0% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.02) translateY(-10px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}



body {
    margin: auto;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: auto;
    background: linear-gradient(315deg, rgba(101,0,94,1) 3%, rgba(60,132,206,1) 38%, rgba(48,238,226,1) 68%, rgba(255,25,25,1) 98%);
    animation: gradient 15s ease infinite;
    background-size: 400% 400%;
    background-attachment: fixed;
}

@keyframes gradient {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
    100% {
        background-position: 0% 0%;
    }
}

body {
    margin: auto;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: auto;
    background: linear-gradient(315deg, rgba(101,0,94,1) 3%, rgba(60,132,206,1) 38%, rgba(48,238,226,1) 68%, rgba(255,25,25,1) 98%);
    animation: gradient 15s ease infinite;
    background-size: 400% 400%;
    background-attachment: fixed;
}

@keyframes gradient {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
    100% {
        background-position: 0% 0%;
    }
}

.wave {
    background: rgb(255 255 255 / 25%);
    border-radius: 1000% 1000% 0 0;
    position: fixed;
    width: 200%;
    height: 12em;
    animation: wave 10s -3s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.wave:nth-of-type(2) {
    bottom: -1.25em;
    animation: wave 18s linear reverse infinite;
    opacity: 0.8;
}

.wave:nth-of-type(3) {
    bottom: -2.5em;
    animation: wave 20s -1s reverse infinite;
    opacity: 0.9;
}

@keyframes wave {
    2% {
        transform: translateX(1);
    }

    25% {
        transform: translateX(-25%);
    }

    50% {
        transform: translateX(-50%);
    }

    75% {
        transform: translateX(-25%);
    }

    100% {
        transform: translateX(1);
    }
}
</style>
