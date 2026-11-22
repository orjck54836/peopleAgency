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
        // 文章末尾的常見問題：畫面和 FAQ 結構化資料共用這一份
        faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
        // 對應皓學日語 App 裡的主題名稱；有填的文章會在文末顯示 App 的入口
        appTopic: z.string().optional(),
        // 不是單一主題的文章（例如 App 挑選指南、五十音）用這個自訂 App 入口的說明文字；有填也會顯示入口
        appPitch: z.string().optional(),
      })
    })
  }
})