<script setup lang="ts">
  const navOpen = ref(false);
  const toggleNav = () => {
    navOpen.value = !navOpen.value;
  };
  const closeNav = () => {
    navOpen.value = false;
  };
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
  <section id="our_story" class="about section">
    <!-- 標題 -->
    <div class="title">
      <h1 class="hero-title">{{ $t('ourStoryTitle') }}</h1>
    </div>
    <div class="about-container">
      <!-- 公司簡介與核心價值 -->
      <section class="intro-section">
        <div class="intro-text">
          <div class="image-size">
            <img src="../../img/about-me/logo.png" alt="" class="img-fluid w-75">
          </div>
          <div class="text">
            <p>{{ $t('stortText') }}</p>
          </div>
        </div>

        <!-- 核心價值 -->
        <div class="core-values">
          <ul class="core-values-list">
            <li>
              <strong>F - Formosa</strong>
              <p>{{ $t('title_Formosa') }}</p>
            </li>
            <li>
              <strong>O - Opportunity</strong>
              <p>{{ $t('title_Opportunity') }}</p>
            </li>
            <li>
              <strong>R - Resource</strong>
              <p>{{ $t('title_Resource') }}</p>
            </li>
            <li>
              <strong>M - Momentum</strong>
              <p>{{ $t('title_Momentum') }}</p>
            </li>
            <li>
              <strong>A - Alliance</strong>
              <p>{{ $t('title_Alliance') }}</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- 公司資訊：日本 & 台灣 -->
      <section class="company-overview">
        <div class="company-table-container">
          <!-- 日本公司 -->
          <div class="company-table">
            <h2 class="company-title">日本公司</h2>
            <div class="row">
              <div class="cell label">公司名稱</div>
              <div class="cell value">FORMA台湾人材紹介</div>
            </div>
            <div class="row">
              <div class="cell label">代表者</div>
              <div class="cell value">李 嘉皓</div>
            </div>
            <div class="row">
              <div class="cell label">事業內容</div>
              <div class="cell value">人力仲介服務、國際人材派遣、留學代辦</div>
            </div>
            <div class="row">
              <div class="cell label">公司地址</div>
              <div class="cell value">即將公開</div>
            </div>
            <div class="row">
              <div class="cell label">聯絡方式</div>
              <div class="cell value">即將公開</div>
            </div>
            <div class="row">
              <div class="cell label">支援語言</div>
              <div class="cell value">中文、日文、英文</div>
            </div>
          </div>

          <!-- 台灣公司 -->
          <div class="company-table">
            <h2 class="company-title">台灣公司</h2>
            <div class="row">
              <div class="cell label">公司名稱</div>
              <div class="cell value">薪火相傳福爾摩莎國際有限公司</div>
            </div>
            <div class="row">
              <div class="cell label">代表者</div>
              <div class="cell value">李 政南</div>
            </div>
            <div class="row">
              <div class="cell label">事業內容</div>
              <div class="cell value">
                人力仲介服務、國際人材派遣、留學代辦
              </div>
            </div>
            <div class="row">
              <div class="cell label">公司地址</div>
              <div class="cell value">台中市西區利民里市府路39號9樓之1</div>
            </div>
            <div class="row">
              <div class="cell label">聯絡方式</div>
              <div class="cell value">04-22233958</div>
            </div>
            <div class="row">
              <div class="cell label">支援語言</div>
              <div class="cell value">中文、日文、英文、越南文</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
  <ContactIcon />
  <Navigation :nav-open="navOpen" :close-nav="closeNav" />
  <Footer />
</template>

<style lang="scss">
.core-values {
  border-radius: 12px;
  padding: 1.5rem;
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .core-values-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
      background: #ffffff;
      border: 1px solid #eed0b2;
      border-radius: 8px;
      padding: 1.5rem;

      strong {
        display: block;
        font-size: 1.1rem;
        color: #7b4215;
        margin-bottom: 0.3rem;
      }

      p {
        font-size: 1rem;
        color: #555;
        line-height: 1.5;
      }
    }
  }
}

/* 新增：公司卡片雙欄式 */
.company-table-container {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;

  .company-table {
    flex: 1;
    min-width: 320px;
    max-width: 600px;
    border-radius: 12px;
    padding: 10px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);

    .company-title {
      text-align: center;
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: #7b4215;
    }

    .row {
      display: flex;
      flex-direction: row;
      border-top: 1px solid #e0cdb5;

      &:first-child {
        border-top: none;
      }

      .cell {
        padding: 1rem 1.2rem;
        display: flex;
        align-items: center;
        font-size: 1rem;
      }

      .label {
        background: #f3e4d4;
        width: 30%;
        font-weight: bold;
        color: #5e4028;
      }

      .value {
        background: #fff;
        width: 70%;
        color: #333;
        line-height: 1.6;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.about {
  position: relative;
  padding-top: 60px;
  padding-bottom: 40px;
  z-index: 3;

  @media (min-width: 1200px) {
    padding-top: 120px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    line-height: 1.6;
    color: #333;
    background-color: #fdfdfd;
  }

  /* 主容器 */
  .about-container {
    max-width: 90%;
    margin: 10px auto;
  }

  /* === Title Section === */
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9e5010;
    font-weight: bolder;
    width: 50%;
    padding: 30px;
    margin: 0 auto;
  }

  .hero-title {
    text-align: center;
    padding: 0 1rem;
    white-space: nowrap;
    position: relative;
  }

  .about-subtitle {
    font-size: 1.25rem;
    color: #666;
  }

  /* 公司簡介 Intro Section */
  .intro-section {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 2rem;
    padding: 10px;

    @media (max-width: 1200px) {
      flex-direction: column; 
    }
  }

  .intro-text {
    display: flex;
    flex-direction: column;
    min-width: 280px;
    flex: 1;
    padding: 1.5rem;
    text-align: center;

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #c78460;
    }
    .image-size {
      height: 50%;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;

      img {
        object-fit: contain;
      }
    }

    .text {
      padding: 15px;

      p {
        color: #114a0eab;
        max-width: 700px;
        text-align: justify;
        line-height: 1.8;
        letter-spacing: 0.05em;
        word-break: break-word;
        margin: 0 auto 1rem;
        font-weight: bold;
      }
    }
  }
}
</style>
