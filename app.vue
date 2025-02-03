<script lang="ts" setup>
useHead({
  title: "Portify - Personal Portfolio NuxtJS Template",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    {
      name: "description",
      content: "Portify is a Personal Portfolio Nuxtjs Template NuxtJS template. It is a fully functional and responsive template for Personal Portfolio Nuxtjs Template.",
    },
    {
      name: "keywords",
      content: "money transfer, online payment, NuxtJS template, financial services, payment solutions, responsive template",
    },
    {
      name: "author",
      content: "Portify Team",
    },
    {
      property: "og:title",
      content: "Portify - Personal Portfolio Nuxtjs Template",
    },
    {
      property: "og:description",
      content: "Portify is a fully functional and responsive NuxtJS template designed for Personal Portfolio Nuxtjs Template.",
    },
    {
      property: "og:image",
      content: "/images/logo.png", // Replace with the actual path to your OG image
    },
    {
      property: "og:url",
      content: "https://www.Portify.com", // Replace with the actual URL of your site
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Portify - Personal Portfolio Nuxtjs Template",
    },
    {
      name: "twitter:description",
      content: "A fully functional and responsive NuxtJS template for Personal Portfolio Nuxtjs Template.",
    },
    {
      name: "twitter:image",
      content: "/images/icon/twitter.png", // Replace with the actual path to your Twitter image
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ],
});
</script>
<template>
  <div>
    <ColorSwitcher />
    <Demos />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
