import { Toggles } from '../contracts/Toggles';

/**
 * @description The (local) set of feature toggles ordered under user groups.
 */
export const toggleSet: Record<string, Toggles> = {
  legacy: {
    enableBetaFeatures: false,
    userGroup: 'legacy'
  },
  beta: {
    enableBetaFeatures: true,
    userGroup: 'beta'
  },
  standard: {
    enableBetaFeatures: false,
    userGroup: 'standard'
  },
  dev: {
    enableBetaFeatures: true,
    userGroup: 'dev'
  },
  devNewFeature: {
    enableBetaFeatures: true,
    userGroup: 'devNewFeature'
  },
  qa: {
    enableBetaFeatures: false,
    userGroup: 'qa'
  }
};
