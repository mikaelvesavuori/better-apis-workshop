import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

import { createFakeUser } from '../usecases/createFakeUser';

import { validateClientVersion, validateUserId } from '../frameworks/validators';
import { setUserFeatureToggles, getUserFeatureToggles } from '../frameworks/userFeatureToggles';
import { setUserMetadata } from '../frameworks/userMetadata';
import { Logger } from '../frameworks/Logger';

const BETA_VERSION = 2.0;

/**
 * @description The controller for our "fake user" service.
 */
export async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  // Check and validate input
  const clientVersion = checkInput(event);

  const toggles = setToggles(event, context);

  // Send back a canned, simulated "hard" error
  if (toggles.userGroup === 'error') throw new Error('Canned, simulated error');

  try {
    const logger = new Logger();
    logger.log('Pinging in the FakeUser controller');

    /**
     * Run current version for:
     * - Legacy users
     * - If missing version header
     * - If version header is explictly set to an older version
     */
    if (
      !clientVersion ||
      parseFloat(clientVersion) < BETA_VERSION ||
      toggles.userGroup === 'legacy'
    )
      return currentVersion();
    // Run beta version for everyone else
    else return await betaVersion(toggles);
  } catch (error: any) {
    return errorStatus(error.message);
  }
}

/**
 * @description Check and validate input.
 */
function checkInput(event: APIGatewayProxyEvent): string {
  const clientVersion = event?.headers['X-Client-Version'] || event?.headers['x-client-version'];
  const isClientVersionValid = validateClientVersion(clientVersion || '');
  const userId = event?.requestContext?.authorizer?.principalId;
  const isUserValid = validateUserId(userId || '');

  if (!isClientVersionValid || !isUserValid) throw new Error('Invalid client version or user!');

  return clientVersion || '';
}

/**
 * @description Set feature toggles in the environment.
 */
function setToggles(event: APIGatewayProxyEvent, context: Context): Record<string, unknown> {
  setUserMetadata(context.awsRequestId, event?.requestContext?.authorizer?.principalId);
  setUserFeatureToggles(event?.requestContext?.authorizer?.stringKey);
  return getUserFeatureToggles();
}

/**
 * @description Handle the current (v1) hardcoded version.
 * @deprecated Only for users of the old version.
 */
function currentVersion(): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'Someguy Someguyson'
    })
  };
}

/**
 * @description Handle the new (v2) beta version.
 */
async function betaVersion(toggles: Record<string, unknown>): Promise<APIGatewayProxyResult> {
  const response = await createFakeUser(toggles); // Run use case
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
}

/**
 * @description Handle errors.
 */
function errorStatus(error: any) {
  const logger = new Logger();
  logger.error(error);
  return {
    statusCode: 500,
    body: JSON.stringify(error)
  };
}
