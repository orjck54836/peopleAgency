import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { getDynamoDBClient } from '~/server/utils/dynamodb'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const client = getDynamoDBClient()

  const result = await client.send(new ScanCommand({
    TableName: config.ddb.schoolDetailsTable,
  }))

  return result.Items ?? []
})