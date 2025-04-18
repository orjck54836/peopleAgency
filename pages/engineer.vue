<template>
    <section class="internship-page">
      <!-- Hero Section -->
      <div class="hero-banner">
        <h1>技能實習制度（Internship Program）</h1>
        <p>結合實務與教育，為日本企業輸送穩定且具備潛力的外籍人才。</p>
      </div>
  
      <!-- Overview Section -->
      <div class="content-section">
        <h2>制度介紹</h2>
        <p>
          技能實習制度是日本政府推動的一項人才培育政策，目的是將開發中國家的年輕人招募至日本企業工作，讓他們透過實際的現場工作，學習日本的技術與知識。
          在實習結束後，實習生可將技能帶回本國，促進當地經濟發展。
        </p>
      </div>
  
      <!-- Key Features -->
      <div class="content-section">
        <h2>主要特點</h2>
        <ul>
          <li>實習期間為1至3年，可延長至5年。</li>
          <li>實習職種包含：農業、建築、製造、食品加工等。</li>
          <li>必須經由監理團體（如協同組合）安排並輔導。</li>
          <li>有薪工作，薪資標準依照日本最低工資規範。</li>
        </ul>
      </div>
  
      <!-- Our Advantage Section -->
      <div class="content-section">
        <h2>為何選擇我們？</h2>
        <p>
          我們擁有與越南等地多年合作經驗，嚴格把關實習生素質，並協助企業在技能實習過程中進行教育、勞務管理與生活支援。
          無論是申請流程還是語言教育、適應輔導，我們都能提供全面的協助。
        </p>
      </div>
  
      <!-- Call to Action -->
      <div class="cta-section">
        <h3>想了解更多技能實習制度內容？</h3>
        <NuxtLink to="/contact" class="cta-btn">立即諮詢我們</NuxtLink>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // 無需額外邏輯，目前為靜態展示頁面
  </script>
  
  <style scoped lang="scss">
  .internship-page {
    padding: 2rem;
    max-width: 960px;
    margin: auto;
    line-height: 1.8;
    color: #333;
  
    .hero-banner {
      text-align: center;
      padding: 3rem 1rem;
      background: linear-gradient(145deg, #f9f3eb, #e7ddd2);
      border-radius: 12px;
      margin-bottom: 2.5rem;
  
      h1 {
        font-size: 2.5rem;
        margin-bottom: 0.75rem;
      }
  
      p {
        font-size: 1.1rem;
        color: #555;
      }
    }
  
    .content-section {
      margin-bottom: 2rem;
  
      h2 {
        font-size: 1.6rem;
        margin-bottom: 0.5rem;
        color: #5a3e1b;
      }
  
      ul {
        padding-left: 1.5rem;
        li {
          margin-bottom: 0.5rem;
        }
      }
    }
  
    .cta-section {
      text-align: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #ddd;
  
      h3 {
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }
  
      .cta-btn {
        padding: 0.75rem 1.5rem;
        background-color: #a07b57;
        color: #fff;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        transition: background-color 0.3s;
  
        &:hover {
          background-color: #7c5f3e;
        }
      }
    }
  }
  </style>
  