<script setup lang="ts">
/**
 * 文章內文的圖片（Markdown 的 ![alt](src)）。
 * 覆寫 @nuxt/content 預設的 ProseImg：補上 width / height（避免載入時版面跳動）
 * 與 loading="lazy"、decoding="async"。
 */
const props = defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>()

const size = computed(() =>
  props.width && props.height
    ? { width: props.width, height: props.height }
    : imageDims(props.src)
)
</script>

<template>
  <img :src="src" :alt="alt ?? ''" :width="size.width" :height="size.height" loading="lazy" decoding="async" />
</template>
