import { validateClientVersion } from '../../../src/FakeUser/frameworks/validators';

describe('Failure cases', () => {
  describe('Invalidations', () => {
    test('It should invalidate version 3', () => {
      const result = validateClientVersion('3');
      expect(result).toBe(false);
    });
  });

  test('It should invalidate a null version', () => {
    // @ts-ignore
    const result = validateClientVersion();
    expect(result).toBe(false);
  });
});

describe('Success cases', () => {
  describe('Validations', () => {
    test('It should validate version 1', () => {
      const result = validateClientVersion('1');
      expect(result).toBe(true);
    });

    test('It should validate version 2', () => {
      const result = validateClientVersion('2');
      expect(result).toBe(true);
    });
  });
});
