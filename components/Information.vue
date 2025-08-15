<script setup lang="ts">
// setup script
</script>

<template>
  <section id="our_story" class="information section">
    <section class="information-section">
      <h1>{{ $t('informationTitle') }}</h1>
    </section>
    <div class="information-container">
      <section class="intro-section">
        <div class="tagline">
          <p>就職・留学・外国人採用情報がここに！</p>
          <p>あなたの次の一歩をサポートします。</p>
        </div>
        <div class="intro-text">
          <div class="text">
            <img src="../img/information/2661118.png" alt="" class="img-fluid">
            <p>
              想知道更多關於日本工作、雇用外國人，以及留學的最新情報嗎？  
              點擊下方按鈕，即可瀏覽我們為您整理的完整資訊，
              包含日本就業市場動態、企業雇用政策、留學申請流程與在日生活指南，
              幫助您一次掌握在日本發展所需的關鍵知識！
            </p>
          </div>
        </div>
        <div class="info-btn">
          <router-link to="/information" >
            {{ $t('learnMore') }}
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
  padding: 15px;

  @media (min-width: 1200px) {
    padding-top: 120px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

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
