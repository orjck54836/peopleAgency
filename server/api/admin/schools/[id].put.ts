import { UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { getDynamoDBClient } from '~/server/utils/dynamodb'

export default defineEventHandler(async (event) => {
  const school_id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const client = getDynamoDBClient()

  // 動態產生 UpdateExpression
  const { school_id: _, updated_at: __, ...rest } = body
  const fieldKeys = Object.keys(rest)
  const UpdateExpression = 'SET ' + [
    ...fieldKeys.map((k) => `#${k} = :${k}`),
    '#updated_at = :updated_at',
  ].join(', ')
  const ExpressionAttributeNames = Object.fromEntries([
    ...fieldKeys.map((k) => [`#${k}`, k]),
    ['#updated_at', 'updated_at'],
  ])
  const ExpressionAttributeValues = Object.fromEntries([
    ...fieldKeys.map((k) => [`:${k}`, rest[k]]),
    [':updated_at', new Date().toISOString()],
  ])

  const result = await client.send(new UpdateCommand({
    TableName: config.ddb.schoolDetailsTable,
    Key: { school_id },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  }))

  return result.Attributes
})