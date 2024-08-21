import { handler as FakeUserController } from '../../../src/FakeUser/controllers/FakeUserController';

import { getResult } from '../../utils';

import v1Hardcoded from '../../../testdata/responses/FakeUser/v1Hardcoded.json';
import v2Basic from '../../../testdata/responses/FakeUser/v2Basic.json';
import v2HardcodedFields from '../../../testdata/responses/FakeUser/v2HardcodedFields.json';
import v2NewFeature from '../../../testdata/responses/FakeUser/v2NewFeature.json';

function isValidCatApiImageUrl(url: string) {
  const regex = /^https:\/\/cdn2\.thecatapi\.com\/images\/[a-zA-Z0-9_-]+\.jpg$/;
  return regex.test(url);
}

// Remove Cat API image response from expected result since the end of the URL is not deterministic
function getDeterministicResult(obj: Record<string, any>) {
  const newObj = JSON.parse(JSON.stringify(obj));
  delete newObj.body.image;
  return newObj;
}

describe('Failure cases', () => {
  test('It should throw an error if calling without any arguments', async () => {
    // @ts-ignore
    await expect(() => FakeUserController()).rejects.toThrowError();
  });

  test('It should throw an error if using the error group user', async () => {
    const result = await getResult(FakeUserController, 'erroruser@company.com');
    expect(result).toBe('Canned, simulated error');
  });
});

describe('Success cases', () => {
  describe('Version 1', () => {
    test('It should return a hardcoded response for a legacy user', async () => {
      const result = await getResult(FakeUserController, 'legacyuser@company.com');
      expect(result).toMatchObject(v1Hardcoded);
    });

    test('It should return a hardcoded response for a standard user who has set the client version to 1', async () => {
      const result = await getResult(FakeUserController, 'standarduser@company.com', '1');
      expect(result).toMatchObject(v1Hardcoded);
    });

    test('It should return a hardcoded response for a QA user who has set the client version to 1', async () => {
      const result = await getResult(FakeUserController, 'qauser@company.com', '1');
      expect(result).toMatchObject(v1Hardcoded);
    });

    test('It should return a hardcoded response for a beta user who has set the client version to 1', async () => {
      const result = await getResult(FakeUserController, 'betauser@company.com', '1');
      expect(result).toMatchObject(v1Hardcoded);
    });

    test('It should return a hardcoded response for a dev user who has set the client version to 1', async () => {
      const result = await getResult(FakeUserController, 'devuser@company.com', '1');
      expect(result).toMatchObject(v1Hardcoded);
    });

    test('It should return a hardcoded response for a dev user ("new feature") who has set the client version to 1', async () => {
      const result = await getResult(FakeUserController, 'devnewfeatureuser@company.com', '1');
      expect(result).toMatchObject(v1Hardcoded);
    });
  });

  describe('Version 2', () => {
    test('It should return the hardcoded response (version 1) for a legacy user', async () => {
      const result = await getResult(FakeUserController, 'legacyuser@company.com', '2');
      expect(result).toMatchObject(v1Hardcoded);
    });

    test('It should return the version 2 (beta) response for a standard user', async () => {
      const result = await getResult(FakeUserController, 'standarduser@company.com', '2');
      expect(isValidCatApiImageUrl(result.body.image)).toBe(true);
      expect(result).toMatchObject(getDeterministicResult(v2Basic));
    });

    test('It should return the version 2 (beta) response for a QA user', async () => {
      const result = await getResult(FakeUserController, 'qauser@company.com', '2');
      expect(isValidCatApiImageUrl(result.body.image)).toBe(true);
      expect(result).toMatchObject(getDeterministicResult(v2Basic));
    });

    test('It should return the version 2 (beta) response for a beta user', async () => {
      const result = await getResult(FakeUserController, 'betauser@company.com', '2');
      expect(isValidCatApiImageUrl(result.body.image)).toBe(true);
      expect(result).toMatchObject(getDeterministicResult(v2HardcodedFields));
    });

    test('It should return the version 2 (beta) response for a dev user', async () => {
      const result = await getResult(FakeUserController, 'devuser@company.com', '2');
      expect(isValidCatApiImageUrl(result.body.image)).toBe(true);
      expect(result).toMatchObject(getDeterministicResult(v2HardcodedFields));
    });

    test('It should return a variant with content hidden behind a feature toggle, for a dev user that is allowed to see it', async () => {
      const result = await getResult(FakeUserController, 'devnewfeatureuser@company.com', '2');
      expect(isValidCatApiImageUrl(result.body.image)).toBe(true);
      expect(result).toMatchObject(getDeterministicResult(v2NewFeature));
    });
  });
});
