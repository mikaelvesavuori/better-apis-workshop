import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { getUserFeatureToggles } from '../usecases/getUserFeatureToggles';

import { validateUserId, validateUserGroup } from '../frameworks/validators';

/**
 * @description The controller for our feature toggling service.
 */
export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const body = event.body ? JSON.parse(event.body) : event;
    const { userName } = body;
    const isUserNameValid = validateUserId(userName);
    if (!userName || !isUserNameValid) throw new Error('Missing or invalid userName!');

    const toggles = await getUserFeatureToggles(userName);

    const isValid = validateUserGroup(toggles.userGroup);
    if (!isValid) throw new Error('Invalid userGroup');

    return {
      statusCode: 200,
      body: JSON.stringify(toggles)
    };
  } catch (error: any) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify(error.message)
    };
  }
}
