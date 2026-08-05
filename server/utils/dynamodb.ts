import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

let client: DynamoDBDocumentClient | null = null

export function getDynamoDBClient() {
  if (!client) {
    const ddbClient = new DynamoDBClient({
      region: useRuntimeConfig().awsRegion,
    })
    client = DynamoDBDocumentClient.from(ddbClient)
  }
  return client
}