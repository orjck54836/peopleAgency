import { defineEventHandler, getQuery, createError } from 'h3'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

// 只在本機才使用明文金鑰；Lambda/雲端一律交給 SDK 的預設憑證鏈
function getLocalCreds() {
  const isLocal =
    process.env.NITRO_DEV === 'true' ||
    process.env.NODE_ENV === 'development' ||
    !process.env.AWS_LAMBDA_FUNCTION_NAME // 不在 Lambda 環境

  if (
    isLocal &&
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY
  ) {
    // 本機：可選擇帶 sessionToken（例如使用臨時憑證時）
    return process.env.AWS_SESSION_TOKEN
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          sessionToken: process.env.AWS_SESSION_TOKEN!,
        }
      : {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        }
  }
  // 雲端：回傳 undefined → 交給 SDK 從 Lambda 角色自動取臨時憑證（含 session token）
  return undefined
}

export default defineEventHandler(async (event) => {
  const q = getQuery(event) as { region?: string; type?: string; limit?: string }

  const config = useRuntimeConfig(event)
  const region = (config.awsRegion as string) || 'ap-northeast-3'
  const tableName =
    (config.ddb?.languageSchoolsTable as string) ||
    process.env.DDB_LANGUAGE_SCHOOLS ||
    'language_schools'

  const client = new DynamoDBClient({
    region,
    credentials: getLocalCreds(), // ✅ 本機才會有值；Lambda 會是 undefined
  })
  const ddb = DynamoDBDocumentClient.from(client)

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

  const hardCap = Math.min(Number(q.limit ?? 1000), 5000)
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
          Limit: 1000,
        })
      )
      if (res.Items?.length) items.push(...res.Items)
      ExclusiveStartKey = res.LastEvaluatedKey
      if (items.length >= hardCap) break
    } while (ExclusiveStartKey)

    setHeader(event, 'Access-Control-Allow-Origin', '*')
    setHeader(event, 'Content-Type', 'application/json')
    return { success: true, count: items.length, data: items }
  } catch (e: any) {
    console.error('DynamoDB scan error:', e)
    setHeader(event, 'Access-Control-Allow-Origin', '*')
    throw createError({ statusCode: 500, statusMessage: e?.message ?? 'DynamoDB scan failed' })
  }
})
