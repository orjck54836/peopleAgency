<script setup lang="ts">
interface Article {
  _id: string
  _path: string
  title: string
  description?: string
  date?: string
  author?: string
  cover?: string
}

const { data: articles } = await useAsyncData<Article[]>(() =>
  queryCollection('content')
    .path('/information')
    .sort({ date: -1 })
    .all()
)


useSeoMeta({
  title: "情報專欄｜Forma台湾人材紹介",
  description: "外国人雇用、留学、ビザ関連の最新情報を発信する情報ブログ。"
})
</script>

<template>
  <section class="container py-10">
    <h1 class="text-3xl font-bold mb-6">情報專欄</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="post in articles"
        :key="post._id"
        class="border rounded-lg p-4 shadow hover:shadow-lg transition"
      >
        <!-- 點進去會到 /information/[slug] -->
        <NuxtLink :to="`/information/${post._path.split('/').pop()}`">
          <img v-if="post.cover" :src="post.cover" :alt="post.title" class="rounded mb-3" />
          <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
        </NuxtLink>

        <p class="text-gray-600 text-sm mb-2">
          <time :datetime="post.date">{{ post.date }}</time> ｜ {{ post.author }}
        </p>

        <p class="text-gray-700">{{ post.description }}</p>
      </article>
    </div>
  </section>
</template>
