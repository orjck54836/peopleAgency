<script setup lang="ts">
import logo from "/images/haogaku-logo.svg";

// SEO：這一頁原本完全沒有 title / description，搜尋結果只會抓到模板文字。
useSeoMeta({
  title: "免費諮詢｜日本留學・赴日就職一對一規劃",
  description:
    "想去日本留學或工作，不知道從哪開始？皓學／FORMA 提供免費一對一諮詢：語言學校選擇、留學簽證準備、費用試算、赴日就職與特定技能簽證評估。填表或加 LINE，顧問會依你的日語程度、預算與時間排出可執行的準備時程。",
  ogTitle: "免費諮詢｜日本留學・赴日就職一對一規劃",
  ogDescription:
    "語言學校選擇、簽證準備、費用試算、赴日就職評估，皓學／FORMA 免費一對一諮詢，台日雙邊在地支援。",
});

usePageUrlMeta();

useBreadcrumbSchema([
  { name: "首頁", path: "/study" },
  { name: "免費諮詢", path: "/contact" },
]);

useHead({
  script: [
    {
      key: "ld-contact",
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": "https://www.forma-global.com/contact",
        name: "免費諮詢｜皓學/FORMA",
        description:
          "日本留學與赴日就職的免費一對一諮詢窗口，提供中文、日文、英文服務。",
        inLanguage: "zh-Hant-TW",
        isPartOf: { "@id": "https://www.forma-global.com/#website" },
        about: { "@id": "https://www.forma-global.com/#organization" },
        mainEntity: {
          "@type": "Organization",
          "@id": "https://www.forma-global.com/#organization",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "info@forma-global.com",
            availableLanguage: ["zh-Hant", "ja", "en"],
            areaServed: ["TW", "JP"],
          },
        },
      }),
    },
  ],
});


const navOpen = ref(false);
const toggleNav = () => {
  navOpen.value = !navOpen.value;
};
const closeNav = () => {
  navOpen.value = false;
};
</script>

<template>
  <Header :nav-open="navOpen" :toggle-nav="toggleNav">
    <div>
      <NuxtLink to="/">
        <img :src="logo" alt="logo" />
      </NuxtLink>
    </div>
  </Header>
  <!-- main content -->
  <main>
    <!-- Blog Details -->
    <div class="container">
      <Contact />
    </div>
  </main>
  <Footer />
</template>

<style lang="scss"></style>
