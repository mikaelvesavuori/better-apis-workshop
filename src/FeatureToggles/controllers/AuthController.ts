import { APIGatewayProxyResult } from 'aws-lambda';

import { getUserFeatureToggles } from '../usecases/getUserFeatureToggles';

import { validateUserId } from '../frameworks/validators';

/**
 * @description The controller.
 */
export async function handler(event: any): Promise<APIGatewayProxyResult> {
  if (event.httpMethod === 'OPTIONS') return handleCors();

  const userName = event.headers['Authorization'];
  const isUserNameValid = validateUserId(userName);
  if (!userName || !isUserNameValid) return generatePolicy(userName, 'Deny', event.methodArn, {});

  const toggles = await getUserFeatureToggles(userName);
  const response = JSON.stringify(toggles);
  return generatePolicy(userName, 'Allow', event.methodArn, response);
}

/**
 * @description CORS handler.
 */
function handleCors() {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      Vary: 'Origin'
    },
    body: JSON.stringify('OK')
  } as APIGatewayProxyResult;
}

/**
 * @description Creates the IAM policy for the response.
 */
const generatePolicy = (principalId: any, effect: string, resource: string, data: any) => {
  // @see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html
  const authResponse: any = {
    principalId
  };

  if (effect && resource) {
    const policyDocument: any = {
      Version: '2012-10-17',
      Statement: []
    };

    const statement = {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    };

    policyDocument.Statement[0] = statement;
    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    stringKey: JSON.stringify(data)
  };

  return authResponse;
};
