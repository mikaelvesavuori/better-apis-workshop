import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

/**
 * @description The controller for our "fake user" service, in its basic or naive shape.
 */
export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: 'Someguy Someguyson'
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
}
