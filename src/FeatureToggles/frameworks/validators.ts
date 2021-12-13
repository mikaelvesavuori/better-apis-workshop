// Controller-level validators.

/**
 * @description Validate user group.
 */
export function validateUserId(userId: string) {
  if (userId.match(/[-A-Za-z0-9_@.]{4,30}$/) && userId.length >= 4 && userId.length <= 30)
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
