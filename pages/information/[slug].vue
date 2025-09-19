<script setup lang="ts">
const route = useRoute()

const { data: article } = await useAsyncData(() =>
  queryCollection('content').path(`/information/${route.params.slug}`).first()
)

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description
})
</script>

<template>
  <ContentRenderer v-if="article" :value="article" />
  <div v-else>文章未找到</div>
</template>
