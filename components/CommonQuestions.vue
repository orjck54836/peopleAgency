<script setup lang="ts">
import projectOne from "/img/common-questions/worker.jpg";
import projectTwo from "/img/common-questions/price.jpg";
import projectThree from "/img/common-questions/visa.jpg";

const projects = [
  {
    name: "commonQuestions.worker.title",
    description: "commonQuestions.worker.desc",
    category: "commonQuestions.worker.category",
    image: projectOne,
    alt: "commonQuestions.worker.alt",
    faqList: [
      { q: "commonQuestions.worker.q1", a: "commonQuestions.worker.a1" },
      { q: "commonQuestions.worker.q2", a: "commonQuestions.worker.a2" },
      { q: "commonQuestions.worker.q3", a: "commonQuestions.worker.a3" },
      { q: "commonQuestions.worker.q4", a: "commonQuestions.worker.a4" }
    ]
  },
  {
    name: "commonQuestions.price.title",
    description: "commonQuestions.price.desc",
    category: "commonQuestions.price.category",
    image: projectTwo,
    alt: "commonQuestions.price.alt",
    faqList: [
      { q: "commonQuestions.price.q1", a: "commonQuestions.price.a1" },
      { q: "commonQuestions.price.q2", a: "commonQuestions.price.a2" },
      { q: "commonQuestions.price.q3", a: "commonQuestions.price.a3" },
      { q: "commonQuestions.price.q4", a: "commonQuestions.price.a4" }
    ]
  },
  {
    name: "commonQuestions.visa.title",
    description: "commonQuestions.visa.desc",
    category: "commonQuestions.visa.category",
    image: projectThree,
    alt: "commonQuestions.visa.alt",
    faqList: [
      { q: "commonQuestions.visa.q1", a: "commonQuestions.visa.a1" },
      { q: "commonQuestions.visa.q2", a: "commonQuestions.visa.a2" },
      { q: "commonQuestions.visa.q3", a: "commonQuestions.visa.a3" },
      { q: "commonQuestions.visa.q4", a: "commonQuestions.visa.a4" }
    ]
  }
];

const currentProject = ref(projects[0]);
</script>

<template>
  <!-- 標題區 -->
  <section class="common-questions-section">
    <h1>{{ $t('commonQuestions.title') }}</h1>
  </section>

  <!-- 問題列表 -->
  <div class="row pb-60 project-list g-4 common-questions-content">
    <div v-for="(project, i) in projects" :key="i" @click="currentProject = project" data-bs-toggle="modal"
      data-bs-target="#exampleModal">
      <div class="single-project">
        <div class="card-overlay">
          <span>{{ $t('commonQuestions.more') }}</span>
        </div>
        <div>
          <img :src="project.image" class="card-img" :alt="$t(project.alt)" />
        </div>
        <div class="project-info">
          <h3>{{ $t(project.name) }}</h3>
          <p>{{ $t(project.category) }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <Teleport to="body">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-body">
            <!-- 關閉 -->
            <button type="button" class="btn-close fs-3" data-bs-dismiss="modal" aria-label="Close" />
            <!-- FAQ -->
            <div class="faq-modal-content">
              <h2 class="modal-faq-title">{{ $t(currentProject.name) }}</h2>
              <p class="modal-faq-subtitle">{{ $t(currentProject.description) }}</p>
              <div class="faq-list">
                <div class="faq-item" v-for="(item, index) in currentProject.faqList" :key="index">
                  <h3>Q{{ index + 1 }}：{{ $t(item.q) }}</h3>
                  <p>A：{{ $t(item.a) }}</p>
                </div>
              </div>
            </div>
          </div>
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
  background-image: url("/img/commonImage/title-background.png");
  background-size: cover;
  border-radius: 20px;
}

.common-questions-content {
  text-align: center;
  border-left: 1px dashed #ccc;
  border-right: 1px dashed #ccc;
  margin: 10px auto;
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
      background: rgba(211, 137, 33, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
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
    background-image: url('/img/common-questions/commonquestions_bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    max-width: 90%;
    height: 100%;
    margin: 30px;
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
        padding: 5px;
      }

      .faq-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .faq-item {
          background-color: #f6d09b96;
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
