import awsEventRequest from './mocks/requests/awsEventRequest.json';
import awsContextRequest from './mocks/requests/awsContextRequest.json';

/**
 * @description Get feature toggles.
 */
export async function getToggles(featureTogglesController: any, userName: string) {
  const body = JSON.stringify({ userName });
  // @ts-ignore
  const response = await featureTogglesController({ body });
  return JSON.parse(response.body);
}

/**
 * @description Get fake user API result.
 */
export async function getResult(handler: any, user?: string, version?: string) {
  try {
    const event = updateEvent(user || 'nonexistentuser', version || '1');
    const response = await handler(event as any, awsContextRequest as any);
    const body = JSON.parse(response.body);
    const statusCode = response.statusCode;
    return {
      body,
      statusCode
    };
  } catch (error: any) {
    return error.message;
  }
}

/**
 * @description Helper that updates the AWS test event request with another user and/or client version.
 */
function updateEvent(user: string, version: string) {
  const _awsEventRequest = JSON.parse(JSON.stringify(awsEventRequest)); // This is to ensure a "new" un-recycled payload every time

  _awsEventRequest.headers.Authorization = user;
  _awsEventRequest.multiValueHeaders.Authorization = [user];
  _awsEventRequest.requestContext.authorizer.principalId = user;

  _awsEventRequest.requestContext.authorizer.stringKey = updateAuthorizerStringKey(user);

  _awsEventRequest.headers['x-client-version'] = version;
  _awsEventRequest.multiValueHeaders['x-client-version'] = [version];

  return _awsEventRequest;
}

/**
 * @description Helper to update the AWS authorizer string key to a matching payload.
 */
function updateAuthorizerStringKey(user: string) {
  if (user === 'erroruser@company.com')
    return '"{\\"enableBetaFeatures\\":false,\\"userGroup\\":\\"error\\"}"';
  else if (user === 'legacyuser@company.com')
    return '"{\\"enableBetaFeatures\\":false,\\"userGroup\\":\\"legacy\\"}"';
  else if (user === 'betauser@company.com')
    return '"{\\"enableBetaFeatures\\":true,\\"userGroup\\":\\"beta\\"}"';
  else if (user === 'standarduser@company.com')
    return '"{\\"enableBetaFeatures\\":false,\\"userGroup\\":\\"standard\\"}"';
  else if (user === 'devuser@company.com')
    return '"{\\"enableBetaFeatures\\":true,\\"userGroup\\":\\"dev\\"}"';
  else if (user === 'devnewfeatureuser@company.com')
    return '"{\\"enableBetaFeatures\\":true,\\"enableNewUserApi\\":true,\\"userGroup\\":\\"devNewFeature\\"}"';
  else if (user === 'qauser@company.com')
    return '"{\\"enableBetaFeatures\\":false,\\"userGroup\\":\\"qa\\"}"';
  else return '';
}
