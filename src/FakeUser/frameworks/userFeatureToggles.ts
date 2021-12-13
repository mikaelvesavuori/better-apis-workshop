/**
 * @description This is where we orchestrate the work needed to fulfill our use case "set user feature toggles".
 */
export function setUserFeatureToggles(authorizerStringKey: string | undefined): void {
  if (!authorizerStringKey) return;
  const stringKey = JSON.parse(authorizerStringKey);
  const toggles = JSON.parse(stringKey);
  process.env.FEATURE_TOGGLES = JSON.stringify(toggles);
}

/**
 * @description Sets current user's feature toggles in process environment.
 */
export function getUserFeatureToggles(): Record<string, unknown> {
  if (process.env.FEATURE_TOGGLES) return JSON.parse(process.env.FEATURE_TOGGLES);
  return {};
}
