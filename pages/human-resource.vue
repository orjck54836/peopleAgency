<template>
    <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
    <main class="page-wrapper">
      <section class="hero">
        <h1 class="hero-title">日本就業人力引進服務</h1>
        <p class="hero-subtitle">連結亞洲人才與日本企業，打造高品質、合規且高效率的跨國就業解決方案。</p>
        <img class="hero-image" src="https://picsum.photos/800/600?image=1080" alt="Japan Employment" />
      </section>
  
      <div class="grid gap-12">
        <!-- 我們的使命 -->
        <section class="section-card">
          <div class="card-flex">
            <img src="https://picsum.photos/800/600?image=1080" alt="Mission" class="card-image" />
            <div>
              <h2>我們的使命</h2>
              <p>
                本公司致力於協助台灣與東南亞優秀人才，取得合法簽證並前往日本從事特定領域工作。無論是特定技能簽證（特定技能1號/2號），還是技術・人文知識・國際業務簽證（技人國），我們皆提供從媒合、文件處理到就業後支援的一條龍服務。
              </p>
            </div>
          </div>
        </section>
  
        <!-- 簽證類型 -->
        <section class="section-card">
          <div class="card-flex">
            <img src="https://picsum.photos/800/600?image=1080" alt="Visa Types" class="card-image" />
            <div>
              <h2>支援的簽證類型</h2>
              <ul>
                <li><strong>特定技能簽證（特定技能1號 / 2號）：</strong> 適用於餐飲、建設、照護、製造業等特定產業。</li>
                <li><strong>技術・人文知識・國際業務簽證（技人國）：</strong> 適用於工程師、設計師、國際業務等專業人才。</li>
              </ul>
            </div>
          </div>
        </section>
  
        <!-- 國籍範圍 -->
        <section class="section-card">
          <h2>主要引進國籍</h2>
          <p>我們擁有跨國人才網絡，並聚焦以下來源國家：</p>
          <div class="tag-list">
            <span class="tag-item">台灣</span>
            <span class="tag-item">越南</span>
            <span class="tag-item">印尼</span>
            <span class="tag-item">菲律賓</span>
            <span class="tag-item">泰國</span>
          </div>
          <img src="https://picsum.photos/800/600?image=1080" alt="Countries" class="section-image mt-6" />
        </section>
  
        <!-- 合作流程 -->
        <section class="section-card">
          <h2>企業合作流程</h2>
          <img src="https://picsum.photos/800/600?image=1080" alt="Process Flow" class="section-image mb-4" />
          <ol>
            <li>確認職缺與需求 → 簽訂合作協議</li>
            <li>人才篩選與初步面談（線上/實體）</li>
            <li>提交資料 → 簽證文件處理</li>
            <li>取得在留資格 → 安排赴日行程</li>
            <li>人員入職 → 持續追蹤與支援</li>
          </ol>
        </section>
  
        <!-- CTA -->
        <div class="text-center mt-10">
          <NuxtLink to="/contact">
            <button class="cta-button">立即聯絡我們</button>
          </NuxtLink>
        </div>
      </div>
    </main>
  </template>
  
  <style scoped>
  .page-wrapper {
    max-width: 1040px;
    margin: 0 auto;
    padding: 4rem 1.5rem;
    font-family: 'Noto Sans TC', 'Helvetica Neue', sans-serif;
    background-color: #f6f8fb;
  }
  
  .hero {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .hero-image {
    max-width: 480px;
    margin: 0 auto;
  }
  
  .section-card {
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    padding: 2rem 2.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .section-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  }
  
  .section-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #374151;
    margin-bottom: 1rem;
    border-left: 4px solid #2563eb;
    padding-left: 0.75rem;
  }
  
  .section-card p,
  .section-card li {
    font-size: 1rem;
    line-height: 1.75;
    color: #374151;
  }
  
  .section-card ul,
  .section-card ol {
    margin-left: 1.25rem;
    padding-left: 0.5rem;
  }
  
  .card-flex {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    flex-wrap: wrap;
  }
  
  .card-image {
    flex-shrink: 0;
    max-width: 120px;
  }
  
  .section-image {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1rem auto 0;
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1rem;
  }
  
  .tag-item {
    background-color: #dbeafe;
    color: #1d4ed8;
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
  }
  
  .cta-button {
    background-color: #2563eb;
    color: white;
    font-size: 1.125rem;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 999px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #1e40af;
  }
  </style>
  