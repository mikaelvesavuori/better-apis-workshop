// Controller-level validators.

/**
 * @description Validate client version. Must be 1 or 2.
 */
export function validateClientVersion(clientVersion: string) {
  if (clientVersion === '1' || clientVersion === '2') return true;
  else return false;
}

/**
 * @description Validate user ID. Must be between 4 and 30 characters.
 */
export function validateUserId(userId: string) {
  if (userId.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && userId.length >= 4 && userId.length <= 30)
    return true;
  return false;
}

/**
 * @description Validate user group.
 */
export function validateUserGroup(userGroup: string) {
  if (userGroup.match(/^[A-Za-z_-]{2,24}$/)) return true;
  return false;
}
