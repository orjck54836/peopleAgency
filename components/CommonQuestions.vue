<script setup lang="ts">
import projectOne from "../img/common-questions/worker.jpg";
import projectTwo from "../img/common-questions/price.jpg";
import projectThree from "../img/common-questions/visa.jpg";
import projectDetailsOne from "/images/project-details-1.png";
import projectDetailsTwo from "/images/project-details-2.png";
import edumasterBig from "/images/edumaster-big.png";
import techshopBig from "/images/techshop-big.png";
import quickbiteBig from "/images/quickbite-big.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    name: "僱用外國人流程",
    description: ``,
    // tags: ["design", "frontend", "backend"],
    category: "對於如何雇用外國人有疑問的人",
    image: projectOne,
    bigImg: techshopBig,
  },
  {
    name: "費用與服務",
    description: ``,
    // tags: ["design", "frontend", "backend"],
    category: "想了解費用的計算與後續服務",
    image: projectTwo,
    bigImg: edumasterBig,
  },
  {
    name: "簽證與法規細節",
    description: ``,
    // tags: ["design", "frontend", "backend"],
    category: "認識關於簽證的內容與細節",
    image: projectThree,
    bigImg: edumasterBig,
  },
];
const currentProject = ref(projects[1]);

gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
  gsap.from(".single-project", {
    opacity: 0,
    stagger: 0.2,
    scale: 0,
    scrollTrigger: {
      trigger: ".project-list",
      start: "top 60%",
      end: "top 20%",
    },
  });
});
</script>
<template>
  <!-- 標題區（service Section） -->
  <section class="common-questions-section">
    <h1>{{ $t('commonQuestionTitle') }}</h1>
  </section>
  <div class="row pb-60 project-list g-4 common-questions-content">
    <div v-for="(project, i) in projects" key="{project.name}" @click="currentProject = project" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      <div class="single-project">
        <div class="card-overlay">
          <span>瞭解更多</span>
        </div>
        <div>
          <img :src="project.image" class="card-img" alt="問題圖片" />
        </div>
        <div class="project-info">
          <h2>{{ project.name }}</h2>
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

            <!-- 可以保留大圖 (如 Big Image) 或換成FAQ Banner -->
            <img :src="currentProject.bigImg" class="w-100 img-fluid project-details-img rounded-3 mb-4" alt="" />

            <!-- FAQ 區塊 -->
            <div class="faq-modal-content">
              <h2 class="modal-faq-title">{{ currentProject.name }}</h2>
              <p class="modal-faq-subtitle">
                <!-- 若想保留一些簡介或描述 -->
                {{ currentProject.description }}
              </p>

              <!-- FAQ 實際內容，可用 v-for 或靜態 -->
              <div class="faq-list">
                <div class="faq-item">
                  <h3>Q1：這項服務包含哪些範圍？</h3>
                  <p>A：可協助外國人簽證申請、日語教學、企業招募策略等全套服務。</p>
                </div>
                <div class="faq-item">
                  <h3>Q2：需要多長時間處理簽證？</h3>
                  <p>A：視個案而定，通常 1~3 個月；我們會協助準備文件，加速進程。</p>
                </div>
                <div class="faq-item">
                  <h3>Q3：企業端收費怎麼算？</h3>
                  <p>A：以成功酬或固定專案費計算，會先與你確認需求再估價。</p>
                </div>
                <div class="faq-item">
                  <h3>Q4：外國人入職後若有離職怎麼辦？</h3>
                  <p>A：在約定保證期內可免費重新介紹人選或按比例退費，具體視合約內容。</p>
                </div>
                <!-- 依需求自行加更多 Q&A -->
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

// projects
.projects {
  @media (min-width: 1200px) {
    width: 100%;
  }

  .section-title-overlay-text {
    top: 100px;
  }

  .single-project {
    position: relative;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    padding: 1.5rem;
    transition: all 0.4s ease;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;

    // hover 效果
    &:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);

      .project-info h2 {
        color: #f59e0b;
      }

      .card-overlay {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .project-info {
      margin-left: 1.5rem;
      text-align: left;
      z-index: 2;

      h2 {
        font-size: 1.6rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        transition: color 0.3s ease;
      }

      p {
        font-size: 0.95rem;
        color: #555;
      }
    }

    .card-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
      opacity: 0;
      transform: translateY(100%);
      transition: all 0.4s ease;
      z-index: 10; // 確保蓋過圖片與資訊
    }

    .card-img {
      width: 22vw;
      border-radius: 12px;
      object-fit: cover;
      transition: transform 0.4s ease, filter 0.4s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
      z-index: 1;
    }

    .project-info {
      z-index: 2;
      text-align: left;

      h2 {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #1f2937;
        transition: color 0.3s ease;
      }

      p {
        font-size: 0.95rem;
        color: #4b5563;
        line-height: 1.4;
      }
    }
  }

  .next-chapter {
    padding-top: 80px;
  }
}

.right-bar {
  padding: 20px;

  @media (min-width: 1200px) {
    padding: 32px;
    gap: 24px;
  }

  border-radius: 12px;
  border: 1px solid rgba(var(--black), 0.1);
  background-color: rgba(var(--white), 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;

  h6 {
    font-size: 18px;
  }
}

// modal
.modal-dialog {
  overflow-y: auto;
}

.modal-content {
  background-color: rgba(var(--primary), 0.1);

  .modal-body {
    background-color: rgb(241, 218, 187);
    max-width: 1296px;
    height: 100%;
    border-radius: 12px;
    margin: 30px auto;
    position: relative;
    padding: 16px;

    @media (min-width: 768px) {
      padding: 32px;
      width: 100%;
    }

    @media (min-width: 1200px) {
      padding: 48px;
      width: 100%;
    }

    /* 關閉按鈕 */
    .btn-close {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 24px;
      height: 24px;

      @media (min-width: 1200px) {
        right: 48px;
        width: 36px;
        height: 36px;
      }

      border-radius: 50%;
      color: rgb(var(--white));
      background-color: rgb(var(--black));
      display: flex;
      align-items: center;
      justify-content: center;
      transition-duration: 0.3s;

      &:hover {
        transform: rotate(180deg);
      }
    }

    /* 大圖 */
    .project-details-img {
      /* 你原本的樣式可保留 */
      border-radius: 12px;
    }

    /* FAQ 區塊 */
    .faq-modal-content {
      text-align: left;
      color: rgb(var(--contrast));

      .modal-faq-title {
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: rgb(var(--contrast));
      }

      .modal-faq-subtitle {
        font-size: 1rem;
        color: rgba(var(--contrast), 0.85);
        line-height: 1.6;
        margin-bottom: 1.5rem;
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
            color: rgb(var(--contrast));
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
