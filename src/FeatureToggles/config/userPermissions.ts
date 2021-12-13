import { UserGroup } from '../contracts/Toggles';

/**
 * @description Simplistic mock of an authorization system and/or database. Key is a user name, and the value is the user group access ("user bucketing").
 */
export const userPermissions: Record<string, UserGroup> = {
  'erroruser@company.com': 'error',
  'legacyuser@company.com': 'legacy',
  'betauser@company.com': 'beta',
  'standarduser@company.com': 'standard',
  'devuser@company.com': 'dev',
  'devnewfeatureuser@company.com': 'devNewFeature',
  'qauser@company.com': 'qa'
};
