<script setup lang="ts">
import projectOne from "../img/common-questions/worker.jpg";
import projectTwo from "../img/common-questions/price.jpg";
import projectThree from "../img/common-questions/visa.jpg";
import projectDetailsOne from "/images/project-details-1.png";
import projectDetailsTwo from "/images/project-details-2.png";
import quickbiteBig from "/images/quickbite-big.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    name: "僱用外國人流程",
    description: "幫助企業了解僱用外籍人員的完整流程，從招募到入職。",
    category: "對於如何雇用外國人有疑問的人",
    image: projectOne,
    faqList: [
      {
        q: "這項服務包含哪些範圍？",
        a: "協助企業進行人力媒合、面試安排、就業契約撰寫、赴日前說明與後續入職輔導。",
      },
      {
        q: "我們公司從未聘用過外國人，可以協助嗎？",
        a: "當然可以。我們將從制度說明開始，逐步指導公司完成必要程序。",
      },
      {
        q: "語言能力會成為障礙嗎？",
        a: "我們會事前評估候選人的日語能力，並可提供日語強化方案，協助順利上手。",
      },
      {
        q: "需要多早開始準備？",
        a: "建議至少提前2~3個月開始，以便配合簽證流程與入職前準備。",
      },
    ],
  },
  {
    name: "費用與服務",
    description: "介紹我們的收費模式、後續支援與可選加值服務內容。",
    category: "想了解費用的計算與後續服務",
    image: projectTwo,
    faqList: [
      {
        q: "服務費用怎麼計算？",
        a: "我們提供「成功收費」與「固定專案費」兩種方案，可依照客戶需求彈性選擇。",
      },
      {
        q: "是否有保證期？",
        a: "有。若在保證期內離職，可免費重新媒合或按比例退費。",
      },
      {
        q: "有包含入職後支援嗎？",
        a: "包含，我們提供勞資溝通輔導、日本生活協助、定期關懷等。",
      },
      {
        q: "是否提供語言培訓？",
        a: "可提供日語線上課程，或依公司需求安排團體訓練。",
      },
    ],
  },
  {
    name: "簽證與法規細節",
    description: "針對不同簽證類型、法規限制與常見誤區進行說明與輔導。",
    category: "認識關於簽證的內容與細節",
    image: projectThree,
    faqList: [
      {
        q: "外國人可以申請哪些簽證？",
        a: "常見為『特定技能』與『技術・人文知識・國際業務』兩種，我們會依個案建議合適類型。",
      },
      {
        q: "簽證有效期限多久？",
        a: "初期多為1年，視個人條件可續簽至3年、5年。",
      },
      {
        q: "需要準備哪些文件？",
        a: "包括學歷證明、履歷、職務說明書、聘用合約等；我們會協助全程準備。",
      },
      {
        q: "若簽證申請失敗怎麼辦？",
        a: "我們會協助了解原因，並可重新申請或提出備案（如轉換簽證類型）。",
      },
    ],
  },
];

const currentProject = ref(projects[1]);
</script>
<template>
  <!-- 標題區（service Section） -->
  <section class="common-questions-section">
    <h1>{{ $t('commonQuestionTitle') }}</h1>
  </section>
  <div class="row pb-60 project-list g-4 common-questions-content">
    <div v-for="(project, i) in projects" :key="project.name" @click="currentProject = project" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      <div class="single-project">
        <div class="card-overlay">
          <span>瞭解更多</span>
        </div>
        <div>
          <img :src="project.image" class="card-img" alt="問題圖片" />
        </div>
        <div class="project-info">
          <h3>{{ project.name }}</h3>
          <p>{{ project.category }}</p>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div class="modal fade" id="exampleModal" :tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-body">
            <!-- 關閉按鈕 -->
            <button type="button" class="btn-close fs-3" data-bs-dismiss="modal" aria-label="Close">
              <PhosphorIconX />
            </button>
            <!-- FAQ區塊 -->
            <div class="faq-modal-content">
              <h2 class="modal-faq-title">{{ currentProject.name }}</h2>
              <p class="modal-faq-subtitle">
                {{ currentProject.description }}
              </p>
              <!-- FAQ內容-->
              <div class="faq-list">
                <div class="faq-item" v-for="(item, index) in currentProject.faqList" :key="index">
                  <h3>Q{{ index + 1 }}：{{ item.q }}</h3>
                  <p>A：{{ item.a }}</p>
                </div>
              </div>

            </div>
            <!-- End FAQ modal content -->
          </div> <!-- /modal-body -->
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.common-questions-section {
  text-align: center;
  padding: 20px;
  position: relative;
  background-image: url("../img/commonImage/title-background.png");
  background-size: cover;
  border-radius: 20px;
}

.common-questions-content {
  text-align: center;
  border-left: 1px dashed #999;
  border-right: 1px dashed #999;
  padding: 10px;
}

.projects {
  @media (min-width: 1200px) {
    width: 100%;
  }

  .next-chapter {
    padding-top: 80px;
  }

  .single-project {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: all 0.4s ease;
    overflow: hidden;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    &:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);

      .card-overlay {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-img {
      width: 16vw;
      max-width: 250px;
      border-radius: 12px;
      object-fit: cover;
      transition: transform 0.4s ease, filter 0.4s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      z-index: 1;

      @media (max-width: 768px) {
        width: 50vw;
      }
    }

    .project-info {
      margin-left: 1.5rem;
      text-align: left;
      z-index: 2;

      h3 {
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
      }

      p {
        font-size: 0.95rem;
        color: #555;
      }

      @media (max-width: 768px) {
        text-align: center;
        margin-left: 0;
      }
    }

    .card-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: rgba(6, 119, 93, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(221, 173, 29, 0.2);
      border-radius: 16px;
      box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
      color: #fff;
      font-size: 1.2rem;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 0.4s ease, transform 0.4s ease;
      pointer-events: none;
      z-index: 10;

      span {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-size: 1.5rem;

        &::after {
          content: "→";
          display: inline-block;
          transition: transform 0.3s ease;
        }

        &:hover::after {
          transform: translateX(5px);
        }
      }
    }
  }
}

@keyframes floatIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-dialog {
  overflow-y: auto;
}

.modal-content {
  background-color: rgba(var(--primary), 0.1);

  .modal-body {
    background-image: url('../img/common-questions/commonquestions_bg.png');
    background-size: cover;
    max-width: 90%;
    height: 100%;
    margin: 30px 10%;
    padding: 16px;
    border-radius: 12px;
    position: relative;

    @media (min-width: 768px) {
      padding: 32px;
    }

    @media (min-width: 1200px) {
      padding: 48px;
    }

    .btn-close {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      color: rgb(var(--white));
      background-color: rgb(var(--black));
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(180deg);
      }

      @media (min-width: 1200px) {
        right: 48px;
        width: 36px;
        height: 36px;
      }

      @media (max-width: 768px) {
        top: 10px;
        right: 10px;
        width: 24px;
        height: 24px;
        font-size: 1rem;
      }
    }

    .faq-modal-content {
      margin-top: 25px;
      text-align: left;
      color: rgb(var(--contrast));

      .modal-faq-title {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        text-align: center;
      }

      .modal-faq-subtitle {
        font-size: 1rem;
        color: rgba(var(--contrast), 0.85);
        line-height: 1.6;
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .faq-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .faq-item {
          background-color: #fff;
          padding: 1rem 1.2rem;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(var(--contrast), 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 8px rgba(var(--contrast), 0.2);
          }

          h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
          }

          p {
            font-size: 0.95rem;
            color: rgba(var(--contrast), 0.9);
            line-height: 1.5;
          }
        }
      }
    }
  }
}
</style>
