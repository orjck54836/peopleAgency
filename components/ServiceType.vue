<script setup lang="ts">
import { serviceType } from "~/public/serviceType";
const localePath = useLocalePath()
</script>

<template>
  <section id="services" class="section services position-relative">
    <!-- 標題區 -->
    <section class="serviceType-section">
      <h1>{{ $t('servicesTitle') }}</h1>
    </section>
    <div class="serviceType-container">
      <div class="projcard-container">
        <!-- 日本留/遊學卡片 -->
        <div class="projcard projcard-blue">
          <div class="projcard-innerbox">
            <img class="projcard-img" src="https://picsum.photos/800/600?image=1041" />
            <div class="projcard-textbox">
              <div class="projcard-title">日本留／遊學</div>
              <div class="projcard-subtitle">「協助台灣學生踏上實現日本夢想的第一步。」</div>
              <div class="projcard-bar"></div>
              <div>
                <div class="projcard-description">
                  我們專注於協助台灣學生前往日本進行短期遊學或長期留學，提供從學校媒合、申請代辦、住宿安排、行前準備到當地支援的一條龍服務。透過我們的專業經驗與在地連結，讓每位學習者都能無縫銜接日本生活，安心成長、拓展國際視野。
                </div>
                <div class="projcard-tagbox">
                  <router-link to="/language-school" class="button-link">
                    了解更多
                  </router-link>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <!-- 日本工作卡片 -->
        <div class="projcard projcard-red">
          <div class="projcard-innerbox">
            <img class="projcard-img" src="https://picsum.photos/800/600?image=1080" />
            <div class="projcard-textbox">
              <div class="projcard-title">日本工作</div>
              <div class="projcard-subtitle">「連結亞洲人才與日本企業，創造雙贏的就業機會。」</div>
              <div class="projcard-bar"></div>
              <div class="projcard-description">
                我們致力於引進外籍人力（包含東南亞與台灣）赴日工作，提供特定技能、技術實習與其他就業媒合方案。從人才甄選、文件準備、簽證協助到工作後在日支援，我們打造一套完整安全的流程，協助企業穩定用工、人才安心就業。
              </div>
              <div class="projcard-tagbox">
                <router-link to="/human-resource" class="button-link">
                  了解更多
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 卡片容器 -->
    <!-- <div class="serviceType-container">
      <NuxtLink
        v-for="{ id, title, desc, tags, image, path } in serviceType"
        :key="id"
        :to=localePath(path)
        class="serviceType-card"
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
    </div> -->
  </section>
</template>


<style lang="scss" scoped>
.serviceType-section {
  text-align: center;
  padding: 20px;
  background-image: url("../img/commonImage/title-background.png");
  background-size: cover;
  border-radius: 20px;
  margin-bottom: 1.5rem;
}

.serviceType-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 10px;
  border-left: 1px dashed #ccc;
  border-right: 1px dashed #ccc;
}

.serviceType-card {
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
  .serviceType-card {
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









.projcard-container {
    margin: 50px 0;
}

.projcard-container,
.projcard-container * {
    box-sizing: border-box;
}

.projcard {
    position: relative;
    width: 100%;
    height: 300px;
    margin-bottom: 40px;
    border-radius: 10px;
    background-color: #fff;
    border: 2px solid #ddd;
    font-size: 18px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 4px 21px -12px rgba(0, 0, 0, .66);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.projcard:hover {
    box-shadow: 0 34px 32px -33px rgba(0, 0, 0, .18);
    transform: translate(0px, -3px);
}

.projcard::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(-70deg, #424242, transparent 50%);
    opacity: 0.07;
}

.projcard:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, #424242, transparent 50%);
}

.projcard-innerbox {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.projcard-img {
    position: absolute;
    height: 300px;
    width: 400px;
    top: 0;
    left: 0;
    transition: transform 0.2s ease;
}

.projcard:nth-child(2n) .projcard-img {
    left: initial;
    right: 0;
}

.projcard:hover .projcard-img {
    transform: scale(1.05) rotate(1deg);
}

.projcard:hover .projcard-bar {
    width: 70px;
}

.projcard-textbox {
    position: absolute;
    top: 7%;
    bottom: 7%;
    left: 430px;
    width: calc(100% - 470px);
    font-size: 17px;
}

.projcard:nth-child(2n) .projcard-textbox {
    left: initial;
    right: 430px;
}

.projcard-textbox::before,
.projcard-textbox::after {
    content: "";
    position: absolute;
    display: block;
    background: #ff0000bb;
    background: #fff;
    top: -20%;
    left: -55px;
    height: 140%;
    width: 60px;
    transform: rotate(8deg);
}

.projcard:nth-child(2n) .projcard-textbox::before {
    display: none;
}

.projcard-textbox::after {
    display: none;
    left: initial;
    right: -55px;
}

.projcard:nth-child(2n) .projcard-textbox::after {
    display: block;
}

.projcard-textbox * {
    position: relative;
}

.projcard-title {
    font-family: 'Voces', 'Open Sans', arial, sans-serif;
    font-size: 24px;
}

.projcard-subtitle {
    font-family: 'Voces', 'Open Sans', arial, sans-serif;
    color: #888;
}

.projcard-bar {
    left: -2px;
    width: 50px;
    height: 5px;
    margin: 10px 0;
    border-radius: 5px;
    background-color: #424242;
    transition: width 0.2s ease;
}

.projcard-blue .projcard-bar {
    background-color: #0088FF;
}

.projcard-blue::before {
    background-image: linear-gradient(-70deg, #0088FF, transparent 50%);
}

.projcard-blue:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, #0088FF, transparent 50%);
}

.projcard-red .projcard-bar {
    background-color: #D62F1F;
}

.projcard-red::before {
    background-image: linear-gradient(-70deg, #D62F1F, transparent 50%);
}

.projcard-red:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, #D62F1F, transparent 50%);
}

.projcard-green .projcard-bar {
    background-color: #40BD00;
}

.projcard-green::before {
    background-image: linear-gradient(-70deg, #40BD00, transparent 50%);
}

.projcard-green:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, #40BD00, transparent 50%);
}

.projcard-yellow .projcard-bar {
    background-color: #F5AF41;
}

.projcard-yellow::before {
    background-image: linear-gradient(-70deg, #F5AF41, transparent 50%);
}

.projcard-yellow:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, #F5AF41, transparent 50%);
}

.projcard-orange .projcard-bar {
    background-color: #FF5722;
}

.projcard-orange::before {
    background-image: linear-gradient(-70deg, #FF5722, transparent 50%);
}

.projcard-orange:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, #FF5722, transparent 50%);
}

.projcard-brown .projcard-bar {
    background-color: #C49863;
}

.projcard-brown::before {
    background-image: linear-gradient(-70deg, #C49863, transparent 50%);
}

.projcard-brown:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, #C49863, transparent 50%);
}

.projcard-grey .projcard-bar {
    background-color: #424242;
}

.projcard-grey::before {
    background-image: linear-gradient(-70deg, #424242, transparent 50%);
}

.projcard-grey:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, #424242, transparent 50%);
}

.projcard-customcolor .projcard-bar {
    background-color: var(--projcard-color);
}

.projcard-customcolor::before {
    background-image: linear-gradient(-70deg, var(--projcard-color), transparent 50%);
}

.projcard-customcolor:nth-child(2n)::before {
    background-image: linear-gradient(-250deg, var(--projcard-color), transparent 50%);
}

.projcard-description {
    z-index: 10;
    font-size: 15px;
    color: #424242;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 20px;
}

.projcard-tagbox .button-link {
    bottom: 3%;
    font-size: 25px;
    cursor: default;
    user-select: none;
    padding: 10px 20px;
    border-radius: 25px;
    text-decoration: none;
    border: none;
    outline: none;
    background: purple;
    box-shadow: 0 4px 21px -12px rgba(0, 0, 0, .66);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.projcard-tagbox a{
    text-decoration: none;
    color: #ddd;
}


</style>
