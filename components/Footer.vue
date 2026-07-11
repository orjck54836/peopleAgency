<script setup lang="ts">
const socialLinks = [
  { name: 'Threads', href: 'https://www.threads.com/@forma_global_connect', icon: 'fa-brands fa-threads' },
  { name: 'Facebook', href: 'https://www.facebook.com/people/Forma%E4%BA%BA%E6%9D%90%E7%B4%B9%E4%BB%8B%E7%95%99%E5%AD%A6%E3%82%A8%E3%83%BC%E3%82%B8%E3%82%A7%E3%83%B3%E3%83%88/61586054817873/', icon: 'fab fa-facebook-f' },
  { name: 'Instagram', href: 'https://www.instagram.com/forma_global_connect/', icon: 'fab fa-instagram' },
]

const contactInfo = [
  { label: '電話', value: '+886-04-22233958', icon: '📞' },
  { label: 'LINE ID', value: '@forma_global', icon: '💬' },
  { label: 'Email', value: 'info@forma-global.com', icon: '✉️' },
]

const resources = [
  {
    category: '日本留學資源',
    links: [
      { label: '日本台灣交流協會', href: 'https://www.koryu.or.jp/tw/' },
      { label: 'JASSO 日本學生支援機構', href: 'https://www.jasso.or.jp/' },
      { label: '法務省入国在留管理局', href: 'https://www.moj.go.jp/isa/' },
    ],
  },
  {
    category: '台日航空',
    links: [
      { label: '日本航空 JAL', href: 'https://www.tw.jal.co.jp/' },
      { label: '全日空 ANA', href: 'https://www.ana.co.jp/zh/tw/' },
      { label: '中華航空', href: 'https://www.china-airlines.com/tw/zh' },
      { label: '長榮航空', href: 'https://www.evaair.com/zh-tw/' },
      { label: '星宇航空', href: 'https://www.starlux-airlines.com/zh-TW' },
    ],
  },
  {
    category: '日本租屋',
    links: [
      { label: 'SUUMO', href: 'https://suumo.jp/' },
      { label: 'CHINTAI', href: 'https://www.chintai.net/' },
      { label: 'at home', href: 'https://www.athome.co.jp/' },
    ],
  },
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">

      <!-- 第一欄：品牌 + 聯絡資訊 + 社群 -->
      <div class="footer-col footer-col--brand">
        <p class="footer-logo">FORMA</p>
        <p class="footer-tagline">薪火相傳福爾摩沙國際有限公司<br>陪你把對日本的嚮往，變成真實的人生履歷。</p>

        <ul class="footer-contact">
          <li v-for="c in contactInfo" :key="c.label">
            <span class="contact-icon">{{ c.icon }}</span>
            <span class="contact-label">{{ c.label }}</span>
            <span class="contact-val">{{ c.value }}</span>
          </li>
        </ul>

        <div class="footer-social">
          <a
            v-for="s in socialLinks"
            :key="s.name"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn"
            :aria-label="s.name"
          >
            <font-awesome-icon :icon="['fab', s.name === 'Facebook' ? 'facebook-f' : 'instagram']" />
          </a>
        </div>
      </div>

      <!-- 第二～四欄：實用資源 -->
      <div
        v-for="group in resources"
        :key="group.category"
        class="footer-col"
      >
        <h3 class="footer-col-title">{{ group.category }}</h3>
        <ul class="footer-links">
          <li v-for="link in group.links" :key="link.label">
            <a :href="link.href" target="_blank" rel="noopener noreferrer">
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p>Copyright © {{ new Date().getFullYear() }} FORMA Global Co., Ltd. All Rights Reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--c-primary-dark);
  color: rgba(255,255,255,0.85);
}

/* ── 主要內容區 ── */
.footer-main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.5rem 3rem;
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 2.5rem;
  align-items: flex-start;
}

/* ── 品牌欄 ── */
.footer-col--brand {}

.footer-logo {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 0.6rem;
  letter-spacing: 0.05em;
}

.footer-tagline {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  margin: 0 0 1.5rem;
}

/* 聯絡資訊 */
.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
}

.contact-icon { font-size: 0.9rem; flex-shrink: 0; }

.contact-label {
  color: rgba(255,255,255,0.5);
  flex-shrink: 0;
  min-width: 52px;
}

.contact-val { color: rgba(255,255,255,0.85); }

/* 社群按鈕 */
.footer-social {
  display: flex;
  gap: 0.6rem;
}

.social-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.25);
  background: transparent;
  color: rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.social-btn:hover {
  background: rgba(255,255,255,0.15);
  color: #fff;
  border-color: rgba(255,255,255,0.5);
}

/* ── 資源欄 ── */
.footer-col-title {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin: 0 0 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  font-size: 0.83rem;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  transition: color 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.footer-links a::before {
  content: '→';
  font-size: 0.7rem;
  opacity: 0.5;
  transition: opacity 0.15s, transform 0.15s;
}

.footer-links a:hover {
  color: #fff;
}

.footer-links a:hover::before {
  opacity: 1;
  transform: translateX(2px);
}

/* ── 版權列 ── */
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  padding: 1.2rem 1.5rem;
}

.footer-bottom p {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.35);
  margin: 0;
}

/* ── RWD ── */
@media (max-width: 900px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .footer-col--brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer-main {
    grid-template-columns: 1fr;
    padding: 3rem 1.2rem 2rem;
  }
}
</style>