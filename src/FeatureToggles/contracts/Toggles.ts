export type Toggles = {
  enableBetaFeatures: boolean;
  userGroup: UserGroup;
};

export type UserGroup = 'error' | 'legacy' | 'beta' | 'standard' | 'dev' | 'devNewFeature' | 'qa';
