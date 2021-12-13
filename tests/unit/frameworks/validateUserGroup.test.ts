import { validateUserGroup as validateUserGroupFakeUser } from '../../../src/FakeUser/frameworks/validators';
import { validateUserGroup as validateUserGroupToggles } from '../../../src/FeatureToggles/frameworks/validators';

describe('Failure cases', () => {
  describe('Invalidations', () => {
    test('It should invalidate a name with less than 2 characters', () => {
      const result1 = validateUserGroupFakeUser('x');
      const result2 = validateUserGroupToggles('x');
      expect(result1 && result2).toBe(false);
    });

    test('It should invalidate a name with more than 24 characters', () => {
      const result1 = validateUserGroupFakeUser('lfj2h978hioskhdfposfgsdfsfd3');
      const result2 = validateUserGroupToggles('lfj2h978hioskhdfposfgsdfsfd3');
      expect(result1 && result2).toBe(false);
    });

    test('It should validate a name with number', () => {
      const result1 = validateUserGroupFakeUser('-abcdefgh123ABCDEFGH_');
      const result2 = validateUserGroupToggles('-abcdefgh123ABCDEFGH_');
      expect(result1 && result2).toBe(false);
    });
  });
});

describe('Success cases', () => {
  describe('Validations', () => {
    test('It should validate a group with mixed-case name with dashes', () => {
      const result1 = validateUserGroupFakeUser('--abcdefghABCDEFGH__');
      const result2 = validateUserGroupToggles('--abcdefghABCDEFGH__');
      expect(result1 && result2).toBe(true);
    });
  });
});
