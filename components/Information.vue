<script setup lang="ts">
// setup script
</script>

<template>
  <section id="our_story" class="information section">
    <section class="information-section">
      <h1>{{ $t('information.title') }}</h1>
    </section>
    <div class="information-container">
      <section class="intro-section">
        <div class="tagline">
          <p>{{ $t('information.tagline1') }}</p>
          <p>{{ $t('information.tagline2') }}</p>
        </div>
        <div class="intro-text">
          <div class="text">
            <img 
              src="/img/information/2661118.png" 
              :alt="$t('information.alt')" 
              class="img-fluid"
            >
            <p>{{ $t('information.desc') }}</p>
          </div>
        </div>
        <div class="info-btn">
          <router-link to="/information">
            {{ $t('information.learnMore') }}
          </router-link>
        </div>
      </section>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.tagline {
  text-align: center;
  line-height: 1.5;
}

.tagline p:first-child {
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(90deg, #ff8a00, #e52e71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.05em;
  margin-bottom: 0.3rem;
}

.tagline p:last-child {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
  letter-spacing: 0.03em;
}
.information {
  position: relative;
  z-index: 3;

  /* 主容器 */
  .information-container {
    margin: 10px auto;
    border-left: 1px dashed #ccc;
    border-right: 1px dashed #ccc;
  }

  /* 標題區 */
  .information-section {
    text-align: center;
    padding: 15px;
    background-image: url("../img/commonImage/title-background.png");
    background-size: cover;
    border-radius: 20px;
  }

  /* 公司簡介 */
  .intro-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 15px;
    flex-direction: column;
    text-align: center;

    @media (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .intro-text {
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0 2.5rem;
    text-align: center;

    .text {
      display: flex;
      align-items: center;

      @media (max-width: 1200px) {
        flex-direction: column;
      }

      img {
        object-fit: contain;
        max-width: 600px;
        width: 100%;
      }

      p {
        display: flex;
        align-items: center;
        color: #114a0eab;
        text-align: justify;
        line-height: 1.8;
        letter-spacing: 0.05em;
        word-break: break-word;
        font-weight: bold;
        font-size: 1rem;
        max-width: 500px;
      }
    }
  }
}
 /* 按鈕樣式 */
 .info-btn {
    display: flex;
    padding: 0.75rem 1.5rem;
    background-color: #2e7d32;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 30px;
    text-decoration: none;
    transition: all 0.25s ease;
    justify-content: center;
    width: 100%;
    max-width: 250px;

    &:hover {
      background-color: #256427;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
</style>
