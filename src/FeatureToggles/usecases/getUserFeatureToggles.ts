import fetch from 'cross-fetch';

import { Toggles } from '../contracts/Toggles';
import { userPermissions } from '../config/userPermissions';

const TOGGLES_URL = process.env.TOGGLES_URL || '';

/**
 * @description This is where we orchestrate the work needed to fulfill our use case "get user feature toggles".
 */
export async function getUserFeatureToggles(userName: string | 'standard'): Promise<Toggles> {
  const authorizationLevel = getUserAuthorizationLevel(userName);
  const toggleSet: any = await getToggleSet(TOGGLES_URL);
  return toggleSet[authorizationLevel];
}

/**
 * @description Retrieve the toggles from our mock API.
 */
async function getToggleSet(togglesUrl: string): Promise<any> {
  if (!togglesUrl) throw new Error('Missing togglesUrl!');
  return await fetch(TOGGLES_URL)
    .then((res) => res.json())
    .catch((error) => console.error(error));
}

/**
 * @description Get user's authorization level keyed for their name. Fallback is "standard" features.
 */
function getUserAuthorizationLevel(user: string): string {
  const authorizationLevel = userPermissions[user];
  if (!authorizationLevel) return 'standard';
  else return authorizationLevel;
}
