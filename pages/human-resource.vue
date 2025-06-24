<template>
    <Header :nav-open="navOpen" :toggle-nav="toggleNav" />
    <div class="title">
        <h1 class="hero-title">就業人力引進</h1>
    </div>
    <main class="page-wrapper">
        <div class="grid gap-12">
            <!-- 簽證類型 -->
            <section class="section-card">
        <div class="card-flex">
          <div class="w-100">
            <h2>支援的簽證類型</h2>
            <div class="visa-block">
              <div class="carousel-slider desktop-only">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="item-content">特定技能簽證</div>
                  </div>
                  <div class="swiper-slide">
                    <div class="item-content">技術・人文知識・國際業務簽證</div>
                  </div>
                  <div class="swiper-slide">
                    <div class="item-content">技能実習</div>
                  </div>
                </div>
              </div>

              <!-- Mobile View: List -->
              <div class="mobile-only visa-list">
                <div class="visa-item">
                  <h4>特定技能簽證</h4>
                  <p>適用於餐飲、建設、照護、農業、製造等產業，需具備實務經驗與日語能力。</p>
                </div>
                <div class="visa-item">
                  <h4>技術・人文知識・國際業務簽證</h4>
                  <p>適用於工程、設計、IT、會計、國際貿易等專業領域。</p>
                </div>
                <div class="visa-item">
                  <h4>技能實習</h4>
                  <p>提供來自發展中國家的青年在日本企業進行技能學習與實務訓練的機會。</p>
                </div>
              </div>

              <!-- 桌面版對應說明內容 -->
              <div class="visa-description desktop-only" style="margin-top: 1.5rem">
                <div v-if="currentIndex === 0">
                  <h4>特定技能簽證</h4>
                  <p>適用於餐飲、建設、照護、農業、製造等產業，需具備實務經驗與日語能力。</p>
                </div>
                <div v-else-if="currentIndex === 1">
                  <h4>技術・人文知識・國際業務簽證</h4>
                  <p>適用於工程、設計、IT、會計、國際貿易等專業領域。</p>
                </div>
                <div v-else-if="currentIndex === 2">
                  <h4>技能實習</h4>
                  <p>提供來自發展中國家的青年在日本企業進行技能學習與實務訓練的機會。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <!-- 我們的使命 -->
            <section class="section-card">
                <div class="card-flex">
                    <h2 class="section-title">我們的使命</h2>
                    <div class="mission-content">

                        <div class="d-flex justify-content-center">
                            <div>
                                <div class="mission-block">
                                    <h3 class="mission-heading">這份工作的意義</h3>
                                    <p class="mission-text">
                                        對每位企業雇主而言，我們協助他們找到值得信賴、穩定投入的海外人才；<br />
                                        對每位外籍求職者而言，我們為他們打開一條合法、安全、有希望的赴日工作之路。<br />
                                        我們深知，一次成功的就業媒合，背後不只是履歷與面談，更是關乎一個家庭的未來、一個人的夢想實現。
                                    </p>
                                </div>

                                <div class="mission-block">
                                    <h3 class="mission-heading">我們對社會的貢獻</h3>
                                    <p class="mission-text">
                                        我們的服務幫助企業補足人力缺口、穩定營運；也促進多元文化交流，帶動地方活力與國際理解。<br /><br />
                                        透過合法的工作與在地支援，我們幫助他們走出貧困、創造價值，並將經驗與希望帶回原生社會。<br /><br />
                                        我們相信，真正有價值的國際勞務輸出，是互惠、尊重與共創未來的過程。<br />
                                        而我們，就是這個正向循環的推動者。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <img src="https://picsum.photos/800/600?image=1081" alt="Mission"
                                class="card-image-large" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- 國籍範圍 -->
            <section class="section-card">
                <h2>選擇的理由</h2>
                <p>我們深耕亞洲市場，協助日本企業從以下國家尋找優秀人才，同時也支援這些國家求職者完成赴日夢想：</p>

                <div class="tag-list">
                    <span class="tag-item">台灣</span>
                    <span class="tag-item">越南</span>
                    <span class="tag-item">印尼</span>
                </div>

                <div class="foreign-benefits">
                    <h3 class="benefits-heading">為何選擇外籍人材？</h3>
                    <ul class="benefits-list">
                        <li>彌補人手短缺：特定產業（如餐飲、建築、照護）普遍面臨招工困難，外籍人才可穩定支援。</li>
                        <li>高穩定性與學習意願：多數來日工作的外籍人才具有高度動機，忠誠度與適應力強。</li>
                        <li>提升職場活力：導入多元文化促進團隊創新，激發新觀點與更具彈性的工作模式。</li>
                        <li>改善離職率：經過完整培訓與事前說明的候選人，留任率往往優於一般短期人力。</li>
                    </ul>
                </div>

                <div class="foreign-safety">
                    <h3 class="benefits-heading">我們的保障措施</h3>
                    <ul class="benefits-list">
                        <li>嚴格篩選流程：不僅重視技能與語言，也關注人格特質與文化適應力。</li>
                        <li>全程支援制度：從入職文件、簽證辦理到定期追蹤，全由專人協助。</li>
                        <li>在地生活輔導：協助住宿安排、生活諮詢，降低離職風險。</li>
                        <li>契約保障清楚：保障雇主與人才雙方權益，避免糾紛與誤解。</li>
                    </ul>
                </div>
            </section>


            <!-- 合作流程 -->
            <section class="section-card">
                <h2>企業合作流程</h2>
                <div class="flow">
                    <div class="flow__item">
                        <div class="flow__num"><span>STEP</span></div>
                        <div class="flow__txt">
                            <h3 class="ttl">需求確認：</h3>
                            <p class="detail">由專員與雇主進行一對一諮詢，了解實際職缺內容、工作環境、招募條件（語言程度、專業經歷、文化適應度等），確保找到最合適的人才。</p>
                        </div>
                    </div>

                    <div class="flow__item">
                        <div class="flow__num"><span>STEP</span></div>
                        <div class="flow__txt">
                            <h3 class="ttl">合作簽約：</h3>
                            <p class="detail">雙方簽訂正式合作契約，明訂職缺數量、招募時間、服務內容（如文件準備、教育訓練）、收費項目與權責分工，保障雙方權益。</p>
                        </div>
                    </div>

                    <div class="flow__item">
                        <div class="flow__num"><span>STEP</span></div>
                        <div class="flow__txt">
                            <h3 class="ttl">人選推薦與面試：</h3>
                            <p class="detail">根據企業需求精準篩選候選人，安排線上或實體面試（含履歷與背景檢查），並可提供錄影資料供審核，提升媒合效率。</p>
                        </div>
                    </div>

                    <div class="flow__item">
                        <div class="flow__num"><span>STEP</span></div>
                        <div class="flow__txt">
                            <h3 class="ttl">簽證與在留處理：</h3>
                            <p class="detail">協助辦理所有簽證、在留資格等申請流程，包含翻譯、公證、雇用契約撰寫與行政程序，全程由專員追蹤處理進度。</p>
                        </div>
                    </div>

                    <div class="flow__item">
                        <div class="flow__num"><span>STEP</span></div>
                        <div class="flow__txt">
                            <h3 class="ttl">赴日前準備：</h3>
                            <p class="detail">針對錄取人員提供赴日前的日語訓練、文化適應課程與生活知識指導，並協助安排機票、接機與住宿，確保順利赴任。</p>
                        </div>
                    </div>

                    <div class="flow__item">
                        <div class="flow__num"><span>STEP</span></div>
                        <div class="flow__txt">
                            <h3 class="ttl">入職後追蹤：</h3>
                            <p class="detail">定期與雇主與人才雙方進行溝通回饋，協助處理語言適應、生活輔導、出勤管理等問題，促進穩定的長期就業關係。</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA -->
            <div class="text-center mt-10">
                <NuxtLink to="/contact">
                    <button class="cta-button">立即聯絡我們</button>
                </NuxtLink>
            </div>
        </div>
    </main>
    <ContactIcon />
    <Navigation :nav-open="navOpen" :close-nav="closeNav" />
    <Footer />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'

const currentIndex = ref(0)
const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};
const closeNav = () => {
  navOpen.value = false;
};


onMounted(() => {
    const swiper = new Swiper('.carousel-slider', {
        grabCursor: true,
        watchSlidesProgress: true,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 20,
        initialSlide: 0,
        on: {
            progress(e) {
                const t = e.slides.length
                for (let r = 0; r < e.slides.length; r += 1) {
                    const o = e.slides[r]
                    const s = (e.slides[r] as any).progress
                    const i = Math.abs(s)
                    let n = 1
                    if (i > 1) n = 0.3 * (i - 1) + 1
                    const l = o.querySelectorAll('.item-content')
                    const a = s * n * 50 + '%'
                    const c = 1 - 0.2 * i
                    const d = t - Math.abs(Math.round(s))
                    o.style.transform = `translateX(${a}) scale(${c})`
                    o.style.zIndex = d.toString()
                    o.style.opacity = (i > 3 ? 0 : 1).toString()
                    l.forEach((el) => {
                        (el as HTMLElement).style.opacity = (1 - i / 3).toString()
                    })
                }
            },
            setTransition(e, t) {
                for (let r = 0; r < e.slides.length; r += 1) {
                    const o = e.slides[r]
                    const s = o.querySelectorAll('.item-content')
                    o.style.transitionDuration = `${t}ms`
                    s.forEach((el) => {
                        (el as HTMLElement).style.transitionDuration = `${t}ms`
                    })
                }
            },
            slideChange(swiper) {
                currentIndex.value = swiper.realIndex
            }
        }
    })
})

</script>


<style scoped>
.desktop-only {
  display: block;
}
.mobile-only {
  display: none;
}
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: block;
  }
  .visa-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .visa-item {
    background: #fff8f0;
    padding: 1rem 1.2rem;
    border-radius: 10px;
    border-left: 5px solid #d6710c;
  }
  .visa-item h4 {
    margin-bottom: 0.5rem;
    color: #b45309;
  }
}
.title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px;
    color: #9e5010;
    font-weight: bolder;
    width: 50%;
    margin: 0 auto;
}

.hero-title {
    text-align: center;
    padding: 0 1rem;
    position: relative;
    white-space: nowrap;
}

.title::before,
.title::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #9e5010;
    margin: 0 1rem;
}

.page-wrapper {
    max-width: 90%;
    margin: 0 auto;
    padding: 4rem 1.5rem;
    font-family: 'Noto Sans TC', 'Helvetica Neue', sans-serif;
    background-color: #f8fbff;
    border-radius: 20px;
    margin-bottom: 50px;
}

.section-card {
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
    padding: 2.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin-bottom: 20px;
}

.section-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.section-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1rem;
    border-left: 5px solid #d6710c;
    padding-left: 1rem;
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
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.card-image-large {
    height: auto;
    padding: 0 20px;
    width: 100%;
}

.section-image {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1rem auto 0;
    border-radius: 1rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
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
    background-color: #d6710c;
    color: white;
    font-size: 1.125rem;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.cta-button:hover {
    background-color: #714110;
}

.flow {
    counter-reset: number 0;
}

.flow__item {
    margin-bottom: 40px;
    border-radius: 15px;
    border: 1px solid #F1F1F1;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.flow__item:last-child {
    margin-bottom: 0;
}

.flow__item::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: #dd7016;
    /* 主色調 */
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.flow__item:last-child::after {
    display: none;
}

.flow__num {
    background: rgb(215, 134, 20);
    color: #FFF;
    font-family: var(--font-family03);
    font-weight: bold;
    font-size: var(--font-size18);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 8%;
    min-width: 60px;
    border-radius: 15px 50px 50px 15px;
}

.flow__num span::after {
    counter-increment: number 1;
    content: '0' counter(number);
    font-size: 2em;
    display: block;
    text-align: center;
    line-height: 1.2;
}

.flow__txt {
    width: 92%;
    max-width: calc(100% - 60px);
    padding: min(3%, 25px) min(5%, 50px);
}

.flow__txt h3.ttl {
    padding: 0;
    border: 0 !important;
    font-size: var(--font-size22);
}

.flow__txt h3.ttl::before {
    display: none;
}

.flow__txt p:last-child {
    margin-bottom: 0;
}

.visa-block {
    display: flex;
    flex-wrap: wrap; /* 關鍵：允許換行 */
    justify-content: space-between;
    gap: 1.5rem; /* 避免重疊緊貼 */
}

.carousel-slider {
    max-width: 50%;

    /* @media (max-width: 600px) {
        width: 50%;
        
    } */
}

.carousel-slider .swiper-wrapper {
    display: flex;
    align-items: center;
    max-height: 150px;
    max-width: 100%;
}

.carousel-slider .swiper-slide {
    width: 220px;
    max-width: 50%;
    /* 手機裝置時不爆版 */
    aspect-ratio: 1 / 1;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: 600px) {
        max-width: 30vw;
        aspect-ratio: 1 / 1;
        padding: 1rem;
        box-sizing: border-box;
        font-size: 0.8rem;
    }
}

.carousel-slider .swiper-slide {
    background: rgba(9, 21, 50, 0.2);
    border-radius: 25px;
}

.carousel-slider .swiper-slide.swiper-slide-next,
.carousel-slider .swiper-slide.swiper-slide-prev {
    background: rgba(9, 21, 50, 0.75);
}

.carousel-slider .swiper-slide.swiper-slide-active {
    font-weight: bolder;
    font-size: 1.2rem;
    background: #c8924b;
    box-shadow: 0 0 25px 2px rgba(255, 255, 255, 0.7);
}

.carousel-slider .item-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}

.visa-description {
    max-width: 50%;
}

.visa-description h4 {
    margin-bottom: 10px;
}

.mission-content {
    width: 100%;
    display: flex;
    gap: 2rem;
}

.section-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 1.5rem;
    border-left: 5px solid #d6710c;
    padding-left: 1rem;
}

.mission-block {
    background-color: #f9fafb;
    border-left: 4px solid #f59e0b;
    border-radius: 10px;
    padding: 1.25rem 1.5rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
    margin-bottom: 50px;
}

.mission-heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: #d97706;
    margin-bottom: 0.75rem;
}

.mission-text {
    font-size: 1rem;
    line-height: 1.8;
    color: #374151;
}

.foreign-benefits,
.foreign-safety {
    margin-top: 2rem;
    background-color: #f9fafb;
    padding: 1.5rem;
    border-left: 4px solid #d97706;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.benefits-heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: #d97706;
    margin-bottom: 1rem;
}

.benefits-list {
    list-style-type: disc;
    padding-left: 1.5rem;
    color: #374151;
    font-size: 1rem;
    line-height: 1.75;
}


@media (max-width: 1600px) {
    .visa-block {
        flex-direction: column;
        align-items: center;
    }

    .visa-description {
        text-align: center;
    }

    .mission-content {
        flex-direction: column;
    }
}
</style>