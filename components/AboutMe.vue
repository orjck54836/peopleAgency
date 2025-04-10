<script setup lang="ts"></script>

<template>
  <section id="our_story" class="about section">
    <!-- 標題區（About Section） -->
    <section class="about-section">
      <h1>{{ $t('ourStoryTitle') }}</h1>
    </section>
    <!-- About Content -->
    <div class="about-container">
      <!-- 公司簡介區 -->
      <section class="intro-section">
        <div class="intro-text">
          <h2>{{ $t('ourStory') }}</h2>
          <p>
            {{ $t('stortText1') }}
          </p>
          <p>
            {{ $t('stortText2') }}
          </p>
        </div>
        <!-- 公司相關圖片 -->
        <div class="intro-image">
          <img src="../img/about-me/story-image.jpg"
              alt="公司形象圖" />
        </div>
      </section>
      <!-- 願景＆核心價值 -->
      <section class="vision-section">
        <!-- Acronym 區塊 -->
      <div class="acronym-grid">
        <!-- F -->
        <div class="acronym-card">
          <div class="letter-title">F</div>
          <div class="letter-content">
            <h3>Formosa</h3>
            <p>{{ $t('title_Formosa') }}</p>
          </div>
        </div>
        <!-- O -->
        <div class="acronym-card">
          <div class="letter-title">O</div>
          <div class="letter-content">
            <h3>Opportunity</h3>
            <p>{{ $t('title_Opportunity') }}</p>
          </div>
        </div>
        <!-- R -->
        <div class="acronym-card">
          <div class="letter-title">R</div>
          <div class="letter-content">
            <h3>Resource</h3>
            <p>{{ $t('title_Resource') }}</p>
          </div>
        </div>
        <!-- M -->
        <div class="acronym-card">
          <div class="letter-title">M</div>
          <div class="letter-content">
            <h3>Momentum</h3>
            <p>{{ $t('title_Momentum') }}</p>
          </div>
        </div>
        <!-- A -->
        <div class="acronym-card">
          <div class="letter-title">A</div>
          <div class="letter-content">
            <h3>Alliance</h3>
            <p>{{ $t('title_Alliance') }}</p>
          </div>
        </div>
      </div>
      </section>
    </div>

    <!-- Next Chapter Link -->
    <!-- <div class="col-12">
      <a href="#services" class="d-flex gap-4 align-items-center next-chapter">
        <span class="page">02/11</span>
        <span class="next">Next Chapter</span>
        <span class="icon">
          <PhosphorIconArrowElbowRightDown />
        </span>
      </a>
    </div> -->
  </section>
</template>

<style lang="scss">
.about {
  .section-title-overlay-text {
    top: 80px;
  }
  position: relative;
  padding-top: 60px;
  @media (min-width: 1200px) {
    padding-top: 120px;
  }
  padding-bottom: 40px;
  z-index: 3;
  .about-desc {
    h2 {
      font-size: 32px;
      @media (min-width: 768px) {
        font-size: 40px;
      }
      margin-bottom: 28px;
    }
    p.desc {
      @media (min-width: 1200px) {
        font-size: 20px;
      }
      margin-bottom: 40px;
    }
  }
  .about-contact {
    p {
      font-size: 18px;
      font-weight: 500;
    }
    a,
    span {
      font-size: 20px;
      font-weight: 500;
    }
  }
  .experience-card {
    border: 1px solid rgb(var(--black));
    width: 100%;
    padding: 40px;
    text-align: center;
    transition-duration: 500ms;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(var(--primary));
    position: relative;
    z-index: 3;
    &::before {
      content: "";
      position: absolute;
      transition-duration: 500ms;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid rgb(var(--black));
      transform: rotate(2.5deg);
      z-index: -1;
    }
    &::after {
      content: "";
      position: absolute;
      transition-duration: 500ms;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 1px solid rgb(var(--black));
      transform: rotate(-2.5deg);
      z-index: -1;
    }
    .card-inner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(var(--primary));
      z-index: 0;
    }
    &:hover {
      &::before,
      &::after {
        transform: rotate(0);
        opacity: 0;
      }
      .numbers .number-outline-one,
      .numbers .number-outline-two {
        transform: rotate(0);
        opacity: 0;
      }
    }
    p {
      font-size: 20px;
      font-weight: 500;
      position: relative;
      z-index: 1;
    }
    .numbers {
      z-index: 1;
      position: relative;
      span {
        font-size: 200px;
        font-weight: 700;
        line-height: 120%;
      }
      .number-outline-one,
      .number-outline-two {
        position: absolute;
        top: 0;
        -webkit-text-stroke: 1px #000;
        -webkit-text-fill-color: transparent;
        display: flex;
        justify-content: center;
        transition-duration: 500ms;
      }
      .number-outline-one {
        transform: rotate(6deg);
      }
      .number-outline-two {
        transform: rotate(-6deg);
      }
    }
  }
  .next-chapter {
    padding-top: 100px;
  }
  /* 一些基礎重置 */
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
    padding: 20px;
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
    align-items: center;
    gap: 2rem;
    margin: 3rem 0;
    padding: 10px;
  }
  .intro-text {
    flex: 1;
    min-width: 280px;
  }
  .intro-text h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #c78460;
  }
  .intro-text p {
    margin-bottom: 1rem;
    color: #555;
    font-family: Lato, "Noto Sans JP", "ヒラギノ角ゴ ProN", "Hiragino Kaku Gothic ProN", メイリオ, Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
    font-size: 1.2rem;
  }
  .intro-image {
    flex: 1;
    min-width: 280px;
    text-align: center;
  }
  .intro-image img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  /* 願景與核心價值 */
  .vision-section {
    margin: 3rem 0;
  }
  .vision-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  .vision-list {
    list-style: none;
    margin: 1rem auto;
    max-width: 700px;
    padding: 0;
  }
  .vision-list li {
    margin-bottom: 1rem;
    color: #555;
  }
  .vision-list strong {
    color: #333;
  }

  /* 團隊區 */
  .team-section {
    margin: 3rem 0;
  }
  .team-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  .team-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }
  .team-member {
    text-align: center;
    width: 150px;
  }
  .team-member img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
  .team-member h3 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
  .team-member p {
    font-size: 0.9rem;
    color: #666;
  }

  /* CTA 區 */
  .cta-section {
    text-align: center;
    margin: 4rem 0 2rem;
  }
  .cta-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  .cta-section p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }
  .cta-button {
    display: inline-block;
    padding: 0.8rem 1.2rem;
    background-color: #3662d8;
    color: #fff;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s ease;
  }
  .cta-button:hover {
    background-color: #274fad;
  }
  /* Acronym 區塊 */
  .acronym-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 10px;
  }

  .acronym-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    padding: 1.5rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  /* 信件或標誌可以按需要決定尺寸 */
  .letter-title {
    font-size: 2rem;
    font-weight: 700;
    color: #5a5ac9; /* 可依品牌色調整 */
    line-height: 1;
    margin-right: 0.5rem;
  }

  .letter-content h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .letter-content p {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;
  }
}
</style>
