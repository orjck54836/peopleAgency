import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { getDynamoDBClient } from '~/server/utils/dynamodb'

export default defineEventHandler(async (event) => {
  const school_id = getRouterParam(event, 'id')
  const config = useRuntimeConfig()
  const client = getDynamoDBClient()

  const result = await client.send(new GetCommand({
    TableName: config.ddb.schoolDetailsTable,
    Key: { school_id },
  }))

  if (!result.Item) {
    throw createError({ statusCode: 404, message: 'School not found' })
  }

  return result.Item
})