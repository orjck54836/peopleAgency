import { PutCommand } from '@aws-sdk/lib-dynamodb'
import { getDynamoDBClient } from '~/server/utils/dynamodb'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const client = getDynamoDBClient()

  const item = {
    school_id: `SCH-${randomUUID().slice(0, 8).toUpperCase()}`,
    ...body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  await client.send(new PutCommand({
    TableName: config.ddb.schoolDetailsTable,
    Item: item,
  }))

  return item
})