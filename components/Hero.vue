<template>
<section class="section_hero">
  <div class="hero">
    <!-- 圖片 -->
    <div class="hero_image">
      <img src="../img/main-page/image.jpg" alt="Hero Image" />
    </div>
    <!-- 標語 -->
    <div>
      <div class="hero_title">
        <h1 class="hero_slogan">
          <span class="fade_word">{{ $t('heroTitle1') }}</span>
          <span class="fade_word">{{ $t('heroTitle2') }}</span>
          <span class="fade_word">{{ $t('heroTitle3') }}</span>
        </h1>
      </div>
      <div class="hero_subtitle">
        <h5>
          <span class="fade_word">{{ $t('heroSubtitle1') }}</span>
          <span class="fade_word">{{ $t('heroSubtitle2') }}</span>
        </h5>
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 3rem 1.5rem;
  position: relative;
  padding-top: 0;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  margin: 0 auto;
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
    color: #875b32;

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

.hero_subtitle {
    font-size: 1rem;
    line-height: 1.6;
    color: #a76e46;
    font-family: "Urbanist", sans-serif;
    font-weight: 400;
    opacity: 0.9;
    max-width: 500px;

    h5 {
      font-size: 1rem;

      @media (min-width: 1800px) {
        font-size: 1.2rem;
      }

      @media (max-width: 992px) {
        font-size: 1rem;
      }

      @media (max-width: 420px) {
        font-size: 0.9rem;
      }
    }

  }

</style>
