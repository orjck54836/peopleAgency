<script lang="ts" setup>
/**
 * 日本の学校・企業向けのブランド紹介ページ（/ja/partners）。
 *
 * 目的只有一個：讓日本的學校與企業知道皓學／FORMA 是誰、在做什麼，
 * 有興趣的話自己透過頁尾的聯絡方式找我們。所以這頁刻意不放表單、
 * 數據、價格或回覆時限——沒有任何需要定期維護或對外承諾的內容。
 *
 * 讀者是日本人，只有日文版：/partners、/en/partners 一律 301 到 /ja/partners，
 * sitemap 只收 /ja/partners（見 nuxt.config.ts），hreflang 只宣告 ja（見 useHreflang）。
 */
const { locale } = useI18n()
if (locale.value !== 'ja') {
  await navigateTo('/ja/partners', { redirectCode: 301 })
}

const navOpen = ref(false)
const toggleNav = () => (navOpen.value = !navOpen.value)
const localePath = useLocalePath()

usePageSeo('partners', [{ name: '日本の学校・企業の皆さまへ', path: '/partners' }])

const channels = [
  {
    name: '留学情報サイト',
    desc: '本サイト（繁体字中国語）。日本留学の手続き、学校選び、日本での生活情報を発信しています。',
  },
  {
    name: '皓學日語アプリ（iOS）',
    desc: '自社開発の日本語学習アプリ。日本に興味を持つ台湾の学習者が、毎日日本語に触れる場所です。',
  },
  {
    name: 'LINE 公式アカウント',
    desc: '台湾で最も使われているメッセンジャー。留学相談の窓口として、スタッフが直接やり取りしています。',
  },
  {
    name: 'Instagram・Threads・Facebook',
    desc: '日本の日常、日本語の一言、留学生の体験談などを繁体字で発信しています。',
  },
]

const services = [
  { title: '日本留学サポート', desc: '日本語学校・専門学校・大学への出願、ビザ申請の準備、渡日後の生活立ち上げまでサポートしています。' },
  { title: '日本での就職支援', desc: 'FORMA ブランドで、日本で働きたい人材と日本企業をつないでいます。' },
  { title: '繁体字コンテンツの制作', desc: '台湾の読者に向けて、日本の学校・地域・暮らしを繁体字で紹介しています。' },
  { title: '日本語学習アプリの運営', desc: '五十音から読み物、AI 会話練習まで、皓學日語アプリを自社で開発・運営しています。' },
]

const strengths = [
  { title: '日本語で直接やり取り', desc: '代表は JLPT N1 を取得し、日本企業での実務経験があります。' },
  { title: '台湾の公的資格', desc: '台湾の国家資格「就業服務士」を保有し、合法登録された法人として運営しています。' },
  { title: '台日両方に拠点', desc: '台湾・台中の本社と日本の協力パートナーが連携しています。' },
]

const company = [
  { label: '会社名', value: '新福爾摩莎國際有限公司（THE NEW PRECIOUS ISLAND LTD.）' },
  { label: 'ブランド', value: '皓學（HAOGAKU）／ FORMA' },
  { label: '代表', value: '李政南' },
  { label: '設立', value: '2015年' },
  { label: '所在地', value: '台湾 臺中市西區市府路39號9樓之1' },
]

const contacts = [
  { label: 'メール', value: 'info@forma-global.com', href: 'mailto:info@forma-global.com' },
  { label: '電話', value: '+886-4-2223-3958', href: 'tel:+886422233958' },
  { label: 'LINE', value: '@forma_global', href: 'https://line.me/R/ti/p/@forma_global' },
]
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav" />

  <section class="p-hero">
    <div class="p-hero__inner">
      <p class="p-eyebrow">日本の学校・企業の皆さまへ</p>
      <h1 class="p-hero__title">「日本に行きたい」台湾の人たちと、<br class="pc-only" />毎日つながっています。</h1>
      <p class="p-hero__sub">
        皓學（HAOGAKU）／FORMA は、台湾・台中を拠点とする日本留学・就職のエージェントです。
        留学情報サイト、日本語学習アプリ、SNS を通じて、日本留学や訪日を考える台湾の人たちに日本の魅力を届けています。
      </p>
    </div>
  </section>

  <main class="p-page">
    <section class="p-section">
      <h2 class="p-title">台湾の人たちとの接点</h2>
      <div class="p-grid">
        <div v-for="c in channels" :key="c.name" class="p-card">
          <h3 class="p-card__title">{{ c.name }}</h3>
          <p class="p-card__desc">{{ c.desc }}</p>
        </div>
      </div>
    </section>

    <section class="p-section">
      <h2 class="p-title">私たちの仕事</h2>
      <div class="p-grid">
        <div v-for="s in services" :key="s.title" class="p-card">
          <h3 class="p-card__title">{{ s.title }}</h3>
          <p class="p-card__desc">{{ s.desc }}</p>
        </div>
      </div>
      <p class="p-aside">
        外国人材の採用については
        <NuxtLink :to="localePath('/work')">FORMA の人材紹介サービス</NuxtLink>をご覧ください。
      </p>
    </section>

    <section class="p-section">
      <h2 class="p-title">皓學について</h2>
      <div class="p-grid p-grid--3">
        <div v-for="s in strengths" :key="s.title" class="p-card">
          <h3 class="p-card__title">{{ s.title }}</h3>
          <p class="p-card__desc">{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <section class="p-section">
      <h2 class="p-title">会社概要</h2>
      <dl class="p-company">
        <div v-for="c in company" :key="c.label" class="p-company__row">
          <dt>{{ c.label }}</dt>
          <dd>{{ c.value }}</dd>
        </div>
      </dl>
    </section>

    <section id="contact" class="p-section p-contact">
      <h2 class="p-title">ご連絡先</h2>
      <p class="p-contact__lead">日本語でお気軽にご連絡ください。</p>
      <ul class="p-contact__list">
        <li v-for="c in contacts" :key="c.label">
          <span class="p-contact__label">{{ c.label }}</span>
          <a :href="c.href" :target="c.href.startsWith('http') ? '_blank' : undefined" rel="noopener">{{ c.value }}</a>
        </li>
      </ul>
    </section>
  </main>
  <Footer />
</template>

<style scoped>
.p-hero {
  background: var(--c-primary);
  padding: 5rem 1.5rem 4.5rem;
  color: #fff;
}
.p-hero__inner { max-width: 820px; margin: 0 auto; text-align: center; }
.p-eyebrow {
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 0.8rem;
}
.p-hero__title {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.35;
  color: #fff;
  margin: 0 0 1.2rem;
}
.p-hero__sub { color: rgba(255, 255, 255, 0.86); line-height: 1.9; margin: 0 auto; max-width: 680px; }

.p-page { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem 5rem; }
.p-section { padding: 3.5rem 0; border-bottom: 1px solid var(--c-border); }
.p-section:last-child { border-bottom: none; }
.p-title {
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.35;
  margin: 0 0 1.5rem;
}

.p-grid { display: grid; gap: 1.1rem; grid-template-columns: repeat(2, 1fr); }
.p-grid--3 { grid-template-columns: repeat(3, 1fr); }
.p-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
}
.p-card__title { font-size: 1.1rem; font-weight: 700; color: var(--c-primary-dark); margin: 0 0 0.5rem; }
.p-card__desc { line-height: 1.8; margin: 0; color: var(--c-text-secondary); }
.p-aside { margin: 1.5rem 0 0; color: var(--c-text-secondary); }
.p-aside a { color: var(--c-primary); font-weight: 700; }

.p-company { border: 1px solid var(--c-border); border-radius: var(--radius-md); overflow: hidden; margin: 0; }
.p-company__row { display: grid; grid-template-columns: 140px 1fr; border-bottom: 1px solid var(--c-border); }
.p-company__row:last-child { border-bottom: none; }
.p-company dt { padding: 0.85rem 1.2rem; background: var(--c-primary-muted); color: var(--c-primary-dark); font-weight: 700; }
.p-company dd { padding: 0.85rem 1.2rem; margin: 0; background: var(--c-surface); color: var(--c-text-secondary); }

.p-contact__lead { margin: -0.5rem 0 1.25rem; color: var(--c-text-secondary); }
.p-contact__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
.p-contact__list li { display: flex; gap: 1rem; align-items: baseline; }
.p-contact__label { min-width: 4.5rem; font-weight: 700; color: var(--c-primary-dark); }
.p-contact__list a { color: var(--c-primary); font-weight: 700; font-size: 1.1rem; word-break: break-all; }

@media (max-width: 860px) {
  .p-grid, .p-grid--3 { grid-template-columns: 1fr; }
  .pc-only { display: none; }
}
@media (max-width: 560px) {
  .p-hero { padding: 3.5rem 1rem 3rem; }
  .p-page { padding: 0 1rem 4rem; }
  .p-company__row { grid-template-columns: 96px 1fr; }
}
</style>
