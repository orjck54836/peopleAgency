import { GetCommand } from '@aws-sdk/lib-dynamodb'
import { getDynamoDBClient } from '~/server/utils/dynamodb'

export default defineEventHandler(async (event) => {
  const student_id = getRouterParam(event, 'id')
  const config = useRuntimeConfig()
  const client = getDynamoDBClient()

  const result = await client.send(new GetCommand({
    TableName: config.ddb.studentsTable,
    Key: { student_id },
  }))

  if (!result.Item) {
    throw createError({ statusCode: 404, message: 'Student not found' })
  }

  return result.Item
})