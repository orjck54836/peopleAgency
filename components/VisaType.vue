<script setup lang="ts">
import { visatype } from "~/public/visatype";
const localePath = useLocalePath()
</script>

<template>
  <section id="blogs" class="section blogs position-relative">
    <!-- 標題區 -->
    <section class="visatype-section">
      <h1>{{ $t('ourStoryTitle') }}</h1>
    </section>

    <!-- 卡片容器 -->
    <div class="visatype-container">
      <NuxtLink
        v-for="{ id, title, desc, tags, image, path } in visatype"
        :key="id"
        :to=localePath(path)
        class="visatype-card"
      >
        <div class="img-wrapper">
          <img :src="image" alt="" />
        </div>
        <div class="card-content">
          <h4 class="title">{{ title }}</h4>
          <p class="desc">{{ desc }}</p>
          <div class="tags">
            <div>
              <span v-for="tag in tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
            <div class="more-link">
              {{ $t("learnMore") }} →
            </div>
          </div>
          
        </div>
      </NuxtLink>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.visatype-section {
  text-align: center;
  padding: 20px;
  background-image: url("../img/commonImage/title-background.png");
  background-size: cover;
  border-radius: 20px;
  margin-bottom: 1.5rem;
}

.visatype-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 10px;
  border-left: 1px dashed #ccc;
  border-right: 1px dashed #ccc;
  margin: 3rem auto;
}

.visatype-card {
  display: flex;
  align-items: center;
  flex-direction: row;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;
  padding: 10px;

  &:hover {
    transform: translateY(-4px);
  }

  .more-link {
    font-weight: 600;
    color: #be6a10;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
      color: #9c510a;
    }
  }

  .img-wrapper {
    flex-shrink: 0;
    width: 200px;
    height: 140px;
    overflow: hidden;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      transition: scale 0.3s ease;
      border-radius: 10px;
    }
  }

  .card-content {
    flex: 1;
    padding: 1rem;

    .title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .desc {
      font-size: 0.95rem;
      color: #555;
      line-height: 1.5;
      margin-bottom: 1rem;
      padding-left: 0.5rem;
    }

    .tags {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      align-items: center;

      .tag {
        background-color: #f5f5f5;
        color: #333;
        padding: 0.25rem 0.75rem;
        border-radius: 16px;
        font-size: 0.75rem;
        margin-right: 5px;
      }
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .visatype-card {
    flex-direction: column;

    .img-wrapper {
      width: 100%;
      height: 180px;
    }

    .card-content {
      padding: 1rem;
    }
  }
}

</style>
