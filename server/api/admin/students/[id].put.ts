import { UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { getDynamoDBClient } from '~/server/utils/dynamodb'

export default defineEventHandler(async (event) => {
  const student_id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const client = getDynamoDBClient()

  // 移除 primary key 和 updated_at，避免衝突
  const { student_id: _, updated_at: __, ...fields } = body
  const fieldKeys = Object.keys(fields)

  const UpdateExpression = 'SET ' + [
    ...fieldKeys.map((k) => `#${k} = :${k}`),
    '#updated_at = :updated_at',
  ].join(', ')

  const ExpressionAttributeNames = Object.fromEntries([
    ...fieldKeys.map((k) => [`#${k}`, k]),
    ['#updated_at', 'updated_at'],
  ])

  const ExpressionAttributeValues = Object.fromEntries([
    ...fieldKeys.map((k) => [`:${k}`, fields[k]]),
    [':updated_at', new Date().toISOString()],
  ])

  const result = await client.send(new UpdateCommand({
    TableName: config.ddb.studentsTable,
    Key: { student_id },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  }))

  return result.Attributes
})