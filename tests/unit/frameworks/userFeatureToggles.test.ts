import {
  setUserFeatureToggles,
  getUserFeatureToggles
} from '../../../src/FakeUser/frameworks/userFeatureToggles';

describe('Success cases', () => {
  describe('Set user feature toggles', () => {
    test('It should return if missing an authorizer string key', () => {
      setUserFeatureToggles('');
      const result = process.env.FEATURE_TOGGLES;
      expect(result).toBe(undefined);
    });

    test('It should set feature toggles in process environment', () => {
      const authorizerStringKey = JSON.stringify({ something: 'value' });
      setUserFeatureToggles(JSON.stringify(authorizerStringKey));
      const result = process.env.FEATURE_TOGGLES;
      expect(result).toBe(authorizerStringKey);
    });
  });

  describe('Get user feature toggles', () => {
    test('It should get feature toggles from process environment if they exist', () => {
      const toggles = { something: 'value' };
      process.env.FEATURE_TOGGLES = JSON.stringify(toggles);
      const result = getUserFeatureToggles();
      expect(result).toMatchObject(toggles);
    });

    test('It should return an object if no feature toggles exist in process environment', () => {
      process.env.FEATURE_TOGGLES = '';
      const result = getUserFeatureToggles();
      expect(result).toMatchObject({});
    });
  });
});
