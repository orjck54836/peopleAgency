<script lang="ts" setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAP animation logic
gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  setTimeout(() => {
    gsap.from(".service-card", {
      stagger: 0.2,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: ".services",
        start: "top 60%",
        end: "top 20%",
      },
    });
  }, 100);
});

const containerRef = ref(null);
</script>

<template>
  <section id="services" class="services section position-relative">
    <!-- 標題區（service Section） -->
    <section class="services-section">
      <h1>{{ $t('servicesTitle') }}</h1>
    </section>
    <section class="services-content">
      <div class="services-container">
        <!-- 一、特定技能人力服務 -->
        <div class="service-block">
          <div class="service-icon">
            <!-- <PhUserFocus /> or any icon you want -->
            <!-- <img src="/icons/tokutei-icon.png" alt="特定技能icon" /> -->
          </div>
          <div class="service-content">
            <h3 class="service-title">特定技能人力服務</h3>
            <p class="service-desc">
              協助外國人(台、越、印尼)通過技能考試、日語學習、簽證申請，並為企業端迅速補足人力空缺。
            </p>
            <ul class="service-steps">
              <li><strong>1. 需求洽談</strong>：了解企業用人條件</li>
              <li><strong>2. 招募/篩選</strong>：多國人才遴選</li>
              <li><strong>3. 簽證申請</strong>：文件、考試輔導</li>
              <li><strong>4. 入職後支援</strong>：追蹤狀況，協助溝通</li>
            </ul>
            <div class="extras">
              <p>如 <strong>日語教學支援</strong>、<strong>住宿協助</strong>、<strong>跨文化培訓</strong>，
                讓外國人更快融入日本。 
              </p>
            </div>
          </div>
        </div>

        <!-- 二、技人國簽證就職 -->
        <div class="service-block">
          <div class="service-icon">
            <!-- <PhBriefcase /> -->
            <!-- <img src="/icons/ginojin-icon.png" alt="技人國icon" /> -->
          </div>
          <div class="service-content">
            <h3 class="service-title">技人國簽證就職</h3>
            <p class="service-desc">
              為企業提供專業人才(技術・人文知識・國際業務)介紹、簽證輔助。結合多國菁英資源、精準匹配需求。
            </p>
            <ul class="service-steps">
              <li><strong>1. 需求洽談</strong>：確認專業背景要求</li>
              <li><strong>2. 招募/篩選</strong>：台、越、印尼等地人才庫精選</li>
              <li><strong>3. 簽證輔助</strong>：技人國簽證文件處理</li>
              <li><strong>4. 入職後支援</strong>：文化融入與管理建議</li>
            </ul>
            <div class="extras">
              <p>若企業需要更深入國際拓展，我們也可提供 <strong>跨文化顧問</strong> 及
                <strong>海外連結</strong> 支援。
              </p>
            </div>
          </div>
        </div>

        <!-- 三、企業顧問 / 人力諮詢 -->
        <div class="service-block">
          <div class="service-icon">
            <!-- <PhUsers /> -->
            <!-- <img src="/icons/consult-icon.png" alt="顧問icon" /> -->
          </div>
          <div class="service-content">
            <h3 class="service-title">企業顧問 / 人力諮詢</h3>
            <p class="service-desc">
              從招募流程到外國員工管理、文化融合，提供多元專業顧問，協助企業在日本市場穩定成長。
            </p>
            <ul class="service-steps">
              <li><strong>1. 現狀分析</strong>：評估企業人力結構與痛點</li>
              <li><strong>2. 招募策略</strong>：打造海外人才引進方案</li>
              <li><strong>3. 管理諮詢</strong>：在留資格維護、社保、日常支援</li>
              <li><strong>4. 持續追蹤</strong>：定期檢討與調整</li>
            </ul>
            <div class="extras">
              <p>
                特別著重 <strong>跨文化培訓</strong>、<strong>日語教學</strong>，
                為外國員工長期留用與企業發展奠定扎實基礎。
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  </section>
</template>

<style lang="scss">
/* services section */
.services {
  margin-top: 60px;
  /* Services Section */
  .services-section {
    text-align: center;
    padding: 20px;
    position: relative;
    background-image: url("../img/commonImage/title-background.png");
    background-size: cover;
    border-radius: 20px;
  }

  @media (min-width: 992px) {
    margin-top: 120px;
  }
  padding-bottom: 40px;
  .section-title {
    padding-top: 60px;
  }
  .service-swiper {
    padding-bottom: 50px;
  }
  .service-pagination {
    display: flex;
    justify-content: center;
    .swiper-pagination-bullet {
      width: 12px;
      height: 12px;
      opacity: 0.5;
      background-color: #fff;
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
  .next-chapter {
    margin-top: 50px;
    @media (min-width: 992px) {
      margin-top: 80px;
    }
  }
  .service-card {
    position: relative;
    padding: 16px;
    @media (min-width: 576px) {
      padding: 32px;
    }
    @media (min-width: 1200px) {
      padding: 50px;
    }
    border: 1px solid rgb(var(--black));
    .card-inner {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(var(--primary));
      z-index: 1;
    }
    .number-circle {
      .waves-top-sm,
      .waves-bottom-sm {
        opacity: 0;
      }
    }
    &::before,
    &::after {
      content: "";
      position: absolute;
      transition-duration: 500ms;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      border: 1px solid rgb(var(--black));
    }
    &:hover {
      &::before {
        transform: rotate(3.5deg);
        opacity: 1;
      }
      &::after {
        transform: rotate(-3.5deg);
        opacity: 1;
      }
      .number-circle {
        .waves-top-sm,
        .waves-bottom-sm {
          opacity: 1;
        }
      }
    }
    .content {
      position: relative;
      z-index: 2;
    }
    .number-circle {
      margin-bottom: 40px;
      width: 78px;
      height: 78px;
      border-radius: 50%;
      background-color: rgb(var(--primary));
      border: 1px solid rgb(var(--black));
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      h2 {
        font-size: 32px;
        font-weight: 500;
      }
    }
    h4 {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 24px;
      padding-bottom: 8px;
      display: inline-block;
      border-bottom: 2px solid rgb(var(--black));
    }
    .service-list {
      list-style: none;
      padding-left: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
      li {
        display: flex;
        align-items: center;
        gap: 12px;
        color: rgb(var(--black));
        svg {
          color: #343330;
        }
      }
    }
  }
  
  .services-content {
    position: relative;
    overflow: hidden;

    .services-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .services-container {
      margin: 3rem auto;
      text-align: center;
      border-left: 1px dashed #999;
      border-right: 1px dashed #999;
      padding: 10px;

      .services-subtitle {
        font-size: 1.1rem;
        color: rgba(var(--contrast), 0.8);
        max-width: 700px;
        margin: 0.5rem auto 3rem;
        line-height: 1.6;
      }
    }

    .service-block {
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(var(--contrast), 0.1);
      padding: 2rem;
      margin-bottom: 2rem;
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      transition: box-shadow 0.3s ease, transform 0.3s ease;

      &:hover {
        box-shadow: 0 6px 10px rgba(var(--contrast), 0.15);
        transform: translateY(-2px);
      }

      .service-icon {
        font-size: 3rem;
        color: rgb(var(--secondary));
        margin-right: 1rem;
        flex-shrink: 0;

        img {
          width: 60px;
          height: 60px;
          object-fit: contain;
        }
      }

      .service-content {
        text-align: left;
        h3.service-title {
          font-size: 1.4rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: rgb(var(--contrast));
        }
        .service-desc {
          font-size: 1rem;
          color: rgb(var(--contrast));
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        .service-steps {
          list-style: none;
          margin-bottom: 1rem;
          padding: 0;
          li {
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
            strong {
              color: rgb(var(--secondary));
              margin-right: 4px;
            }
          }
        }
        .extras {
          p {
            font-size: 0.9rem;
            color: rgba(var(--contrast), 0.8);
            strong {
              color: rgb(var(--accent));
            }
          }
        }
      }
    }
  }
}
</style>
