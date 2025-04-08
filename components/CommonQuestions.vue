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
    <h1 class="common-questions-title">{{ $t('commonQuestionTitle') }}</h1>
  </section>
  <div class="row pb-60 project-list g-4 common-questions-content">
    <div v-for="(project, i) in projects" key="{project.name}" @click="currentProject = project" class="col-sm-6 col-lg-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <div class="single-project">
        <div class="project-card">
          <div class="card-inner"></div>
          <img :src="project.image" class="img-fluid w-100 card-img" alt="" />
          <div class="card-arrow">
            <div class="arrow-inner">
              <PhosphorIconArrowUpRight :size="26" />
            </div>
          </div>
        </div>
        <div class="project-info">
          <h2>{{ project.name }}</h2>
          <p>{{ project.category }}</p>
          <!-- <div class="tags d-flex align-items-center gap-1">
            <template v-for="tag in project.tags">
              <span>{{ tag }}</span> {{ i < project.tags.length - 1 && "-" }}
            </template>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div
      class="modal fade"
      id="exampleModal"
      :tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-body">
            <!-- 關閉按鈕 -->
            <button
              type="button"
              class="btn-close fs-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <PhosphorIconX />
            </button>

            <!-- 可以保留大圖 (如 Big Image) 或換成FAQ Banner -->
            <img
              :src="currentProject.bigImg"
              class="w-100 img-fluid project-details-img rounded-3 mb-4"
              alt=""
            />

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
  padding: 2rem 1rem 2rem;
  position: relative;
  background-image: url("../img/about-me/aboutme-title.jpg");
  background-size: cover;
}

.common-questions-content {
  margin: 3rem auto;
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
    cursor: pointer;
    &:hover {
      .project-card {
        transform: scale(0.97);
      }
    }
  }
  .project-card {
    position: relative;
    transition-duration: 500ms;
    display: flex;
    justify-content: center;
    align-items: center;
    .card-inner {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(var(--primary));
      z-index: 1;
    }
    .card-img {
      position: relative;
      z-index: 2;
      transition-duration: 300ms;
      transform-origin: left;
      height: 35vh;
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
    .card-arrow {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 1px solid rgb(var(--black));
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 4;
      transition-duration: 500ms;
      scale: 0;
      opacity: 0;
      .arrow-inner {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgb(var(--primary));
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          font-size: 35px;
        }
      }
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
      .card-arrow {
        scale: 1;
        opacity: 1;
      }
    }
  }
  .project-info {
    margin-top: 30px;
    h2 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    p {
      margin-bottom: 12px;
    }
    .tags {
      span {
        font-weight: 600;
        font-size: 14px;
        text-transform: uppercase;
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
