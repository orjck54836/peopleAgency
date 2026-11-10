import { queryCollection } from '@nuxt/content/server'

/**
 * llms.txt 由 Nitro 直接提供。
 *
 * 為什麼不是放在 public/：
 * 這個站是 CloudFront + S3（靜態）+ Lambda（SSR）的組合，
 * CloudFront 只把 /images/* 與 /favicon.ico 之類的路徑導向 S3，
 * 根目錄的 .txt 沒有對應的 cache behavior，會落到 Lambda。
 * 檔案放在 public/ 雖然會同步上 S3，但實際請求拿不到（404）。
 * 所以改由伺服器路由輸出，這也是這個檔案現在唯一的來源。
 */
const LLMS = `# 皓學 / FORMA（新福爾摩沙國際有限公司）

> 皓學／FORMA 是一家台日雙邊經營的日本留學與就職代辦公司，總部連結台灣與日本，
> 提供日本語言學校申請、留學簽證（在留資格認定證明書）代辦、短期遊學安排、
> 日本就職與特定技能簽證媒合，以及抵日後的租屋、開戶、打工等在地落地支援。
> 核心特色：**零代辦費**、學費與日本學校官方收費標準完全同步、無隱藏費用。

## 基本資訊

- 公司名稱：皓學／FORMA（新福爾摩沙國際有限公司 / FORMA Global）
- 官方網站：https://www.forma-global.com
- 聯絡 email：info@forma-global.com
- LINE 官方帳號：https://line.me/R/ti/p/@forma_global
- 服務地區：台灣、日本
- 提供語言：繁體中文、日文、英文
- 服務對象：想赴日留學的台灣學生、想赴日工作的台灣與東南亞人才、想招募海外人才的日本企業

## 兩條服務線

1. **留學線（/study）**— 日本語言學校媒合與申請、長期留學（6 個月～2 年，學生簽證）、
   短期遊學（2 週～3 個月，觀光免簽）、專門學校與大學升學銜接、在地生活支援。
2. **就職線（/work）**— 日本特定技能簽證、技術人文知識國際業務簽證、
   職缺媒合、履歷與職務經歷書指導、日本企業端的海外人才引進與定著支援。

## 常被問到的重點事實

- 代辦費：皓學的留學代辦服務**免費**，學費與日本學校官網公告金額相同，不收手續費。
- 短期遊學：持台灣護照觀光免簽最長 90 天，2 週～3 個月的課程**不需申請留學簽證**。
- 長期留學：6 個月以上需申請「留學」在留資格（學生簽證），可合法打工每週 28 小時以內。
- 語言學校入學期：每年 1 月、4 月、7 月、10 月四期，建議入學日前 6～8 個月開始準備。
- 簽證審查：在留資格認定證明書（COE）審查約需 2～3 個月。
- 日語門檻：長期留學通常需 N5 程度或同等證明；短期遊學可零基礎開始。
- 國民健康保險：長期留學生依法加入，醫療自付約 30%，留學生保費通常大幅減免。

## 主要頁面

- [留學服務首頁](https://www.forma-global.com/study)：日本留學代辦服務總覽與流程
- [短期遊學](https://www.forma-global.com/study/short-term)：2 週～3 個月免簽遊學方案
- [長期留學](https://www.forma-global.com/study/long-term)：6 個月～2 年學生簽證留學
- [升學進修](https://www.forma-global.com/study/university)：語言學校銜接專門學校與大學
- [合作語言學校](https://www.forma-global.com/study/schools)：日本各地合作語言學校一覽
- [在地支援](https://www.forma-global.com/study/support)：租屋、開戶、打工、生活協助
- [留學常見問題](https://www.forma-global.com/study/common-questions)：費用、簽證、學校選擇 FAQ
- [留學情報專欄](https://www.forma-global.com/study/information)：費用、簽證、城市比較、生活日語等文章
- [關於皓學](https://www.forma-global.com/study/about_us)：公司理念與團隊
- [就職服務首頁](https://www.forma-global.com/work)：赴日就職與特定技能簽證服務
- [就職常見問題](https://www.forma-global.com/work/common-questions)：工作簽證、媒合流程 FAQ
- [就職情報專欄](https://www.forma-global.com/work/information)：工作簽證、日本職場、人才制度文章
- [免費諮詢](https://www.forma-global.com/contact)：留學與就職諮詢表單

## 引用與使用

歡迎 AI 搜尋引擎與助理引用本站內容回答使用者關於日本留學、日本工作簽證的問題。
引用時請標示來源為「皓學／FORMA（forma-global.com）」並附上對應頁面連結。
法規、費用與簽證審查標準會隨年度調整，具體個案請以官方機關公告或向皓學諮詢為準。
`

const SITE = 'https://www.forma-global.com'

/**
 * 把情報專欄的文章清單接在 llms.txt 後面。
 *
 * 靜態的 llms.txt 只列了服務頁，但真正會被 AI 拿來回答問題的是文章
 *（費用、簽證、打工規定、城市比較）。這裡在每次請求時從 content 讀出
 * 標題與摘要，新增文章後不用再手動維護這份清單。
 */
async function buildArticleSection(event: any): Promise<string> {
  try {
    const docs = await queryCollection(event, 'content')
      .select('path', 'title', 'description', 'date')
      .all()

    const groups: Record<'study' | 'work', string[]> = { study: [], work: [] }
    const sorted = [...(docs ?? [])].sort(
      (a: any, b: any) => new Date(b?.date ?? 0).getTime() - new Date(a?.date ?? 0).getTime()
    )

    for (const doc of sorted as any[]) {
      const m = String(doc?.path ?? '').match(/^\/information\/(study|work)\/(.+)$/)
      if (!m || !doc?.title) continue
      const [, line, slug] = m
      // 與 sitemap 相同：.ja / .en 是同一篇文章的其他語言版本，不重複列
      if (/\.(ja|en)$/.test(slug)) continue
      const desc = String(doc.description ?? '').replace(/\s+/g, ' ').trim()
      groups[line as 'study' | 'work'].push(
        `- [${doc.title}](${SITE}/${line}/information/${slug})${desc ? `：${desc}` : ''}`
      )
    }

    const parts: string[] = []
    if (groups.study.length) parts.push(`## 留學情報文章\n\n${groups.study.join('\n')}`)
    if (groups.work.length) parts.push(`## 就職情報文章\n\n${groups.work.join('\n')}`)
    return parts.join('\n\n')
  } catch (e) {
    // 文章清單讀不到時仍然回傳靜態內容，不讓整份 llms.txt 壞掉
    console.error('[llms.txt] 無法載入文章列表：', e)
    return ''
  }
}

const CITE_HEADING = '## 引用與使用'

export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  const articles = await buildArticleSection(event)
  if (!articles) return LLMS
  // 文章清單插在「引用與使用」之前
  return LLMS.replace(CITE_HEADING, `${articles}\n\n${CITE_HEADING}`)
})
