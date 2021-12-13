import { validateUserId as validateUserIdFakeUser } from '../../../src/FakeUser/frameworks/validators';
import { validateUserId as validateUserIdToggles } from '../../../src/FeatureToggles/frameworks/validators';

describe('Failure cases', () => {
  describe('Invalidations', () => {
    test('It should invalidate a string with numbers', () => {
      const result1 = validateUserIdFakeUser('abc123');
      const result2 = validateUserIdToggles('abc123');
      expect(result1 && result2).toBe(false);
    });

    test('It should invalidate a string that is less than 4 characters long', () => {
      const result1 = validateUserIdFakeUser('abc');
      const result2 = validateUserIdToggles('abc');
      expect(result1 && result2).toBe(false);
    });

    test('It should invalidate a string that is more than 30 characters long', () => {
      const result1 = validateUserIdFakeUser('abcdefghijklmnopqrstuvwxyz1234567890');
      const result2 = validateUserIdToggles('abcdefghijklmnopqrstuvwxyz1234567890');
      expect(result1 && result2).toBe(false);
    });
  });
});

describe('Success cases', () => {
  describe('Validations', () => {
    test('It should validate a short mixed-case string', () => {
      const result1 = validateUserIdFakeUser('HEY there');
      const result2 = validateUserIdToggles('HEY there');
      expect(result1 && result2).toBe(true);
    });

    test('It should validate an email address', () => {
      const result1 = validateUserIdFakeUser('devnewfeatureuser@company.com');
      const result2 = validateUserIdToggles('devnewfeatureuser@company.com');
      expect(result1 && result2).toBe(true);
    });
  });
});
