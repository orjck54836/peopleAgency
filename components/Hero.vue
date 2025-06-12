<template>
  <section class="section_hero">
    <div class="white-gradient-overlay"></div>
      <div class="hero">
        <!-- 圖片 -->
        <!-- <div class="hero_image">
          <img src="../img/main-page/image.jpg" alt="Hero Image" />
        </div> -->
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
              <a href="#services" class="btn-primary">了解服務項目</a>
              <a href="#contact" class="btn-secondary">立即諮詢</a>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from(".hero_image img", {
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

.section_hero {
  display: flex;
  justify-content: start;
  min-height: 90vh;
  overflow: hidden;
  position: relative;
  padding-top: 0;
  background-image: url('../img/main-page/image.jpg');
  background-size: cover; 
  background-position: center;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
  clip-path: ellipse(100% 90% at 50% 10%);
}

.white-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  margin-left: 5%;
  flex-wrap: wrap;
  z-index: 2;

  @media (max-width: 992px) {
    gap: 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }
}

.hero_image {
  height: 40vh;
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(20%) brightness(1.05);
    border-radius: 24px;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
}

.hero_title {
  max-width: 600px;
  
  h1.hero_slogan {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    font-size: 2.2rem;
    color: #a7703e;

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
      font-family: "Urbanist", sans-serif;
      text-align: left;

      @media (max-width: 768px) {
        text-align: center;
      }

      &.highlight {
        color: #ae6b5a;
      }
    }
  }
}
.hero-text-container {
  position: relative;
  padding: 6rem 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
}

.hero-text-wrapper {
  max-width: 40rem;
}

.hero-heading {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .hero-heading {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .hero-heading {
    font-size: 3.75rem;
  }
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #4b5563;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .hero-buttons {
    flex-direction: row;
  }
}

.btn-primary {
  background-color: #6366f1;
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #4f46e5;
}

.btn-secondary {
  border: 1px solid #d1d5db;
  color: #1f2937;
  padding: 0.75rem 2rem;
  border-radius: 999px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
}
</style>
