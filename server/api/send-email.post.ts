import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        inquiryType?: string
        name?: string
        email?: string
        companyName?: string
        phone?: string
        workContent?: string
        cityAddress?: string
        message?: string
    }>(event)

    // 基本驗證
    if (!body?.email || !body?.name) {
        throw createError({ statusCode: 400, statusMessage: 'name & email required' })
    }

    // 與你原本的「有 inquiryType → 人才介紹表單；否則 → 留學諮詢表單」邏輯一致
    const isRecruiting = Boolean(body.inquiryType)
    const formType = isRecruiting ? '人才介紹表單' : '留學諮詢表單'

    const textBody = isRecruiting
        ? `📄 【${formType}】

公司名稱: ${body.companyName ?? ''}
姓名: ${body.name ?? ''}
電話: ${body.phone ?? ''}
E-mail: ${body.email ?? ''}
地址: ${body.cityAddress ?? ''}
事業內容: ${body.workContent ?? ''}
諮詢類別: ${body.inquiryType ?? ''}
補充說明: ${body.message ?? ''}`
        : `📄 【${formType}】

姓名: ${body.name ?? ''}
電話: ${body.phone ?? ''}
E-mail: ${body.email ?? ''}
留學計畫: ${body.message ?? ''}`

    // 讀取環境變數（建議放 nuxt.config.ts -> runtimeConfig）
    const config = useRuntimeConfig(event)
    const region = config.sesRegion || 'ap-northeast-3'

    const ses = new SESClient({ region })
    // const ses = new SESClient({
    //     region,
    //     // 在本機開發才需要 key；部署到 Lambda 用 IAM 角色即可
    //     credentials: process.env.AWS_ACCESS_KEY_ID
    //         ? {
    //             accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    //             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    //         }
    //         : undefined,
    // })

    const Source = config.mailFrom || 'aiden@forma-global.com'
    const ToAddresses = (config.mailTo || 'liaiden1213@gmail.com')
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean)

    try {
        await ses.send(
            new SendEmailCommand({
                Source,
                Destination: { ToAddresses },
                Message: {
                    Subject: { Data: `🔔 表單提交通知 - ${formType}` },
                    Body: { Text: { Data: textBody } },
                },
            })
        )

        // 同站時其實不用 CORS header；若你仍要加也可以：
        setHeader(event, 'Access-Control-Allow-Origin', '*')
        return { success: true, message: '郵件已發送' }
    } catch (err: any) {
        console.error('SES send error:', err)
        setHeader(event, 'Access-Control-Allow-Origin', '*')
        throw createError({ statusCode: 500, statusMessage: err?.message ?? 'send failed' })
    }
})
