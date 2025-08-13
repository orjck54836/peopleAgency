import { defineEventHandler, getQuery, createError } from 'h3'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

export default defineEventHandler(async (event) => {
  // 讀 query（可選：region、type）
  const q = getQuery(event) as { region?: string; type?: string; limit?: string }

  // 讀 runtimeConfig
  const config = useRuntimeConfig(event)
  const region = (config.awsRegion as string) || 'ap-northeast-3'
  const tableName =
    (config.ddb?.languageSchoolsTable as string) || process.env.DDB_LANGUAGE_SCHOOLS || 'language_schools'

  // 本機開發才需要 AK/SK；部署到 AWS 用 Lambda 角色
  const client = new DynamoDBClient({
    region,
    credentials: process.env.AWS_ACCESS_KEY_ID
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        }
      : undefined,
  })
  const ddb = DynamoDBDocumentClient.from(client)

  // 基本 Scan（可套條件）
  const filterParts: string[] = []
  const exprValues: Record<string, any> = {}
  const exprNames: Record<string, string> = {}

  if (q.region) {
    filterParts.push('#region = :region')
    exprValues[':region'] = q.region
    exprNames['#region'] = 'region'
  }
  if (q.type) {
    filterParts.push('#type = :type')
    exprValues[':type'] = q.type
    exprNames['#type'] = 'type'
  }

  // 你可用 limit 控制最多抓多少筆（避免全表巨大）
  const hardCap = Math.min(Number(q.limit ?? 1000), 5000) // 安全上限
  const items: any[] = []
  let ExclusiveStartKey: Record<string, any> | undefined

  try {
    do {
      const res = await ddb.send(
        new ScanCommand({
          TableName: tableName,
          FilterExpression: filterParts.length ? filterParts.join(' AND ') : undefined,
          ExpressionAttributeValues: Object.keys(exprValues).length ? exprValues : undefined,
          ExpressionAttributeNames: Object.keys(exprNames).length ? exprNames : undefined,
          ExclusiveStartKey,
          Limit: 1000, // 每頁抓 1000，再自己疊加
        })
      )

      if (res.Items?.length) items.push(...res.Items)
      ExclusiveStartKey = res.LastEvaluatedKey

      // 超過安全上限就停
      if (items.length >= hardCap) break
    } while (ExclusiveStartKey)

    //（同站其實不需要 CORS；若你仍要）
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    setHeader(event, 'Content-Type', 'application/json')

    return {
      success: true,
      count: items.length,
      data: items,
    }
  } catch (e: any) {
    console.error('DynamoDB scan error:', e)
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    throw createError({ statusCode: 500, statusMessage: e?.message ?? 'DynamoDB scan failed' })
  }
})
