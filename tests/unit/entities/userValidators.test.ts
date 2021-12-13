import {
  validateImage,
  validateName,
  validateId,
  validateEmail
} from '../../../src/FakeUser/entities/logic/validators';

describe('Failure cases', () => {
  describe('Invalidate name', () => {
    test('It should invalidate an incorrect name', () => {
      const result = validateName('HEY there $');
      expect(result).toBe(false);
    });
  });

  describe('Invalidate image URL', () => {
    test('It should invalidate an image URL that includes unacceptable symbols', () => {
      const result = validateImage('company.com/$][|img/jre93ud.png');
      expect(result).toBe(false);
    });
  });

  describe('Invalidate ID', () => {
    test('It should invalidate an ID that contains unacceptable symbols', () => {
      const result = validateId('123-asdf-qwerty£|[');
      expect(result).toBe(false);
    });
  });

  describe('Invalidate email', () => {
    test('It should invalidate a string that does not seem to be an email', () => {
      const result = validateEmail('devuser.com');
      expect(result).toBe(false);
    });
  });
});

describe('Success cases', () => {
  describe('Validate name', () => {
    test('It should validate a correct name', () => {
      const result = validateName('asdf');
      expect(result).toBe(true);
    });
  });

  describe('Validate image URL', () => {
    test('It should validate a correct-looking image URL', () => {
      const result = validateImage('https://asdf.com/img/jre93ud.png');
      expect(result).toBe(true);
    });
  });

  describe('Validate ID', () => {
    test('It should validate a correct ID', () => {
      const result = validateId('123-asdf-qwerty');
      expect(result).toBe(true);
    });
  });

  describe('Validate email', () => {
    test('It should validate a correct email', () => {
      const result = validateEmail('devuser@company.com');
      expect(result).toBe(true);
    });
  });
});
