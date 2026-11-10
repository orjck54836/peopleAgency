import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        date: z.string().optional(),
        // 內容大幅改寫時填這個；datePublished 維持原始 date，dateModified 用 updated
        updated: z.string().optional(),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        cover: z.string().optional(),
      })
    })
  }
})