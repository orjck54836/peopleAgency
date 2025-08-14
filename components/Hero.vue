<template>
  <section class="section_hero">
    <div class="hero">
      <!-- 標語 -->
      <div class="hero-text-container">
        <div class="hero-text-wrapper">
          <h1 class="hero_slogan">
            <span class="fade_word">{{ $t('heroTitle1') }}</span>
            <span class="fade_word">{{ $t('heroTitle2') }}</span>
            <span class="fade_word">{{ $t('heroTitle3') }}</span>
          </h1>
          <p class="hero-subtitle">
            <span class="fade_word">{{ $t('heroSubtitle1') }}</span>
            <span class="fade_word">{{ $t('heroSubtitle2') }}</span>
          </p>
          <div class="hero-buttons">
            <a href="#services" class="btn btn-2 btn-2g">服務項目</a>
            <a href="contact" class="btn btn-2 btn-2g">立即諮詢</a>
          </div>
        </div>
      </div>
      <div class="hero-illustration">
        <div class="glow-bg"></div><!-- 圖片 -->
        <img src="../img/main-page/hero-image.png" alt="Hero Image" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from(".hero-illustration img", {
    scale: 1.1,
    opacity: 0,
    y: 30,
    duration: 1.6,
    ease: "power2.out"
  });

  gsap.from(".fade_word", {
    opacity: 0,
    y: 30,
    stagger: 0.4,
    delay: 0.2,
    duration: 3,
    ease: "power3.out"
  });
});
</script>

<style scoped lang="scss">
@import url('https://fonts.cdnfonts.com/css/gloock');
.hero-illustration {
  position: relative;
  display: flex;
  justify-content: center;
}

.glow-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(236, 137, 56, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: 0;
}

.hero-illustration img {
  position: relative;
  z-index: 1;
  width: 80%;
}

.section_hero {
  display: flex;
  justify-content: center;
  min-height: 90vh;
  position: relative;
  padding-top: 0;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 992px) {
    gap: 50px;
  }

  @media (max-width: 1180px) {
    flex-direction: column;
    text-align: center;
  }
}

.hero_slogan {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.3;
  text-align: left;

  color: #68300ae8;
  text-shadow: 0 1px 3px rgba(249, 249, 249, 0.2);
  margin-bottom: 2rem;

  @media (min-width: 1800px) {
    font-size: 3rem;
  }

  @media (max-width: 992px) {
    font-size: 1.8rem;
  }

  @media (max-width: 420px) {
    font-size: 1.3rem;
  }

  .fade_word {
    line-height: 1.4;
    font-weight: 700;
    text-align: left;

    @media (max-width: 1180px) {
      text-align: center;
    }
  }
}

.hero-text-container {
  position: relative;
  padding: 6rem 1.5rem;
  max-width: 1280px;
  margin: 0 50px;
}

.hero-text-wrapper {
  max-width: 40rem;
}

.hero-heading {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.75rem;
  }
}

.hero-subtitle {
  margin-top: 50px;
  font-size: 1.1rem;
  color: #ae7c25b7;
  margin-bottom: 2rem;
  font-weight: bolder;
  text-shadow: 0 1px 3px rgba(210, 127, 18, 0.2);
}

.hero-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    justify-self: center;
    align-items: center;
  }
}

.btn {
  border: none;
  font-size: 1.2rem;
  color: inherit;
  background: none;
  cursor: pointer;
  padding: 4% 15%;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  outline: none;
  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;

  @media (max-width: 1200px) {
    padding: 5% 20%;
  }
}

.btn:after {
  content: '';
  position: absolute;
  z-index: -1;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-2 {
  background: linear-gradient(145deg, #6fa892, #548571); /* 柔和漸層 */
  color: #fff;
  width: 200px;
  border: none;
  border-radius: 40px;
  padding: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow:
    0 6px 12px rgba(0, 0, 0, 0.15),  /* 外陰影 */
    inset 0 1px rgba(255, 255, 255, 0.3); /* 內陰影增加光澤感 */
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-2:hover {
  transform: translateY(-3px);
  box-shadow:
    0 10px 18px rgba(0, 0, 0, 0.2),
    inset 0 1px rgba(255, 255, 255, 0.3);
}

.btn-2:active {
  transform: translateY(1px);
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.15) inset;
}
</style>
