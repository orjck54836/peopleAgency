<script setup lang="ts">
import projectOne from "/img/common-questions/worker.jpg";
import projectTwo from "/img/common-questions/price.jpg";
import projectThree from "/img/common-questions/visa.jpg";

const projects = [
  {
    name: "commonQuestions.cooperation.title",
    description: "commonQuestions.cooperation.desc",
    category: "commonQuestions.cooperation.category",
    image: projectOne,
    alt: "commonQuestions.cooperation.alt",
    faqList: [
      { q: "commonQuestions.cooperation.q1", a: "commonQuestions.cooperation.a1" },
      { q: "commonQuestions.cooperation.q2", a: "commonQuestions.cooperation.a2" },
      { q: "commonQuestions.cooperation.q3", a: "commonQuestions.cooperation.a3" },
      { q: "commonQuestions.cooperation.q4", a: "commonQuestions.cooperation.a4" },
      { q: "commonQuestions.cooperation.q5", a: "commonQuestions.cooperation.a5" },
      { q: "commonQuestions.cooperation.q6", a: "commonQuestions.cooperation.a6" },
      { q: "commonQuestions.cooperation.q7", a: "commonQuestions.cooperation.a7" },
      { q: "commonQuestions.cooperation.q8", a: "commonQuestions.cooperation.a8" },
      { q: "commonQuestions.cooperation.q9", a: "commonQuestions.cooperation.a9" },
    ]
  },
  {
    name: "commonQuestions.resources.title",
    description: "commonQuestions.resources.desc",
    category: "commonQuestions.resources.category",
    image: projectTwo,
    alt: "commonQuestions.resources.alt",
    faqList: [
      { q: "commonQuestions.resources.q1", a: "commonQuestions.resources.a1" },
      { q: "commonQuestions.resources.q2", a: "commonQuestions.resources.a2" },
      { q: "commonQuestions.resources.q3", a: "commonQuestions.resources.a3" },
      { q: "commonQuestions.resources.q4", a: "commonQuestions.resources.a4" },
      { q: "commonQuestions.resources.q5", a: "commonQuestions.resources.a5" },
      { q: "commonQuestions.resources.q6", a: "commonQuestions.resources.a6" },
      { q: "commonQuestions.resources.q7", a: "commonQuestions.resources.a7" },
      { q: "commonQuestions.resources.q8", a: "commonQuestions.resources.a8" },
    ]
  },
  {
    name: "commonQuestions.scope.title",
    description: "commonQuestions.scope.desc",
    category: "commonQuestions.scope.category",
    image: projectThree,
    alt: "commonQuestions.scope.alt",
    faqList: [
      { q: "commonQuestions.scope.q1", a: "commonQuestions.scope.a1" },
      { q: "commonQuestions.scope.q2", a: "commonQuestions.scope.a2" },
      { q: "commonQuestions.scope.q3", a: "commonQuestions.scope.a3" },
      { q: "commonQuestions.scope.q4", a: "commonQuestions.scope.a4" },
      { q: "commonQuestions.scope.q5", a: "commonQuestions.scope.a5" },
      { q: "commonQuestions.scope.q6", a: "commonQuestions.scope.a6" },
      { q: "commonQuestions.scope.q7", a: "commonQuestions.scope.a7" },
      { q: "commonQuestions.scope.q8", a: "commonQuestions.scope.a8" },
    ]
  }
];

const currentProject = ref(projects[0]);
</script>

<template>
  <!-- 標題區 -->
  <section class="common-questions-section">
    <h2>{{ $t('commonQuestions.title') }}</h2>
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
            <button type="button" class="btn-close fs-6" data-bs-dismiss="modal" aria-label="Close" />
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
  padding: 5px;
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
  align-items: center;

  .modal-body {
    background-color: #fffaf7;
    margin: 5%;
    padding: 16px;
    border-radius: 5px;
    position: relative;
    overflow: auto;

    @media (min-width: 768px) {
      padding: 32px;
    }

    @media (min-width: 1200px) {
      padding: 48px;
    }

    .btn-close {
      border-radius: 50%;
      color: rgb(var(--white));
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      padding: 15px;

      &:hover {
        transform: rotate(180deg);
      }

      @media (min-width: 1200px) {
        width: 36px;
        height: 36px;
      }

      @media (max-width: 768px) {
        width: 15px;
        height: 15px;
        font-size: 0.5rem;
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
