<script setup lang="ts"></script>

<template>
  <section id="our_story" class="about section">
    <!-- 標題 -->
    <section class="about-section">
      <h1>{{ $t('ourStoryTitle') }}</h1>
    </section>

    <div class="about-container">
      <!-- 公司簡介與核心價值 -->
      <section class="intro-section">
        <div class="intro-text">
          <!-- <h2>{{ $t('ourStory') }}</h2> -->
          <div class="image-size">
            <img src="../img/about-me/logo.png" alt="" class="img-fluid w-75">
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

      <!-- 公司資訊表格 -->
      <section class="company-overview">
        <div class="company-table">
          <div class="row">
            <div class="cell label">公司名稱</div>
            <div class="cell value">Forma株式会社</div>
          </div>
          <div class="row">
            <div class="cell label">代表者</div>
            <div class="cell value">代表取締役 李 嘉皓</div>
          </div>
          <div class="row">
            <div class="cell label">事業內容</div>
            <div class="cell value">
              有料職業介紹事業、特定技能仲介、留學代辦事業、語言學校媒合
              <br />
              職業介紹許可（有料）：13-ユ-987654
            </div>
          </div>
          <div class="row">
            <div class="cell label">公司地址</div>
            <div class="cell value">〒160-0023 東京都新宿区西新宿1-1-1 Forma大樓5F</div>
          </div>
          <div class="row">
            <div class="cell label">聯絡方式</div>
            <div class="cell value">info@forma.co.jp / 03-1234-5678</div>
          </div>
          <div class="row">
            <div class="cell label">支援語言</div>
            <div class="cell value">中文、日文、英文、越南文、印尼文</div>
          </div>
        </div>
      </section>
    </div>
  </section>
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


.company-overview {
  margin: 0 auto;
  border-radius: 16px;
  font-family: "Noto Sans TC", sans-serif;

  .company-table {
    border-radius: 12px;
    overflow: hidden;
    padding: 10px;

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
        width: 20%;
        font-weight: bold;
        color: #5e4028;
      }

      .value {
        background: #fff;
        width: 80%;
        color: #333;
        line-height: 1.6;
      }
    }
  }

  @media (max-width: 768px) {
    .company-table .row {
      flex-direction: column;

      .label,
      .value {
        width: 100%;
        padding: 0.75rem 1rem;
      }

      .label {
        background: #f3e4d4;
        border-bottom: 1px solid #e0cdb5;
      }
    }
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
    font-family: "Noto Sans TC", Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fdfdfd;
  }

  /* 主容器 */
  .about-container {
    margin: 10px auto;
    border-left: 1px dashed #999;
    border-right: 1px dashed #999;
  }

  /* About Section */
  .about-section {
    text-align: center;
    padding: 15px;
    position: relative;
    background-image: url("../img/commonImage/title-background.png");
    background-size: cover;
    border-radius: 20px;
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

      img {
        object-fit: contain;/* 防止圖片延展 */
      }
    }

    .text {
      padding: 15px;

      p {
        color: #114a0eab;
        max-width: 700px; // 限制段落寬度，控制每行字數
        text-align: justify; // 讓左右對齊（等寬感）
        line-height: 1.8; // 增加行距讓閱讀更舒服
        letter-spacing: 0.05em; // 微調字距
        word-break: break-word; // 避免單字超出邊界
        margin: 0 auto 1rem; // 置中顯示
        font-weight: bold;
      }
    }
  }
}
</style>
