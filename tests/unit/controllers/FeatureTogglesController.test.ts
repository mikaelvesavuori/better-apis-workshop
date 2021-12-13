import { handler as FeatureTogglesController } from '../../../src/FeatureToggles/controllers/FeatureTogglesController';

import { getToggles } from '../../utils';

import {
  errorToggles,
  legacyToggles,
  betaToggles,
  standardToggles,
  devToggles,
  devNewFeatureToggles,
  qaToggles
} from '../../../testdata/responses/FeatureToggles/toggles';

describe('Failure cases', () => {
  test('It should return an error message if using an invalid user ID', async () => {
    const result = await getToggles(
      FeatureTogglesController,
      'asdfoui2hf928hf7gaquiss76fd72@company.com'
    );
    expect(result).toBe('Missing or invalid userName!');
  });
});

describe('Success cases', () => {
  test('It should return standard toggles for an unknown usergroup', async () => {
    const result = await getToggles(FeatureTogglesController, 'asdf@company.com');
    expect(result).toMatchObject(standardToggles);
  });

  test('It should get "erroruser" toggles', async () => {
    const result = await getToggles(FeatureTogglesController, 'erroruser@company.com');
    expect(result).toMatchObject(errorToggles);
  });

  test('It should get "legacyuser" toggles', async () => {
    const result = await getToggles(FeatureTogglesController, 'legacyuser@company.com');
    expect(result).toMatchObject(legacyToggles);
  });

  test('It should get "betauser" toggles', async () => {
    const result = await getToggles(FeatureTogglesController, 'betauser@company.com');
    expect(result).toMatchObject(betaToggles);
  });

  test('It should get "standarduser" toggles', async () => {
    const result = await getToggles(FeatureTogglesController, 'standarduser@company.com');
    expect(result).toMatchObject(standardToggles);
  });

  test('It should get "devuser" toggles', async () => {
    const result = await getToggles(FeatureTogglesController, 'devuser@company.com');
    expect(result).toMatchObject(devToggles);
  });

  test('It should get "devnewfeatureuser" toggles', async () => {
    const result = await getToggles(FeatureTogglesController, 'devnewfeatureuser@company.com');
    expect(result).toMatchObject(devNewFeatureToggles);
  });

  test('It should get "qauser" toggles', async () => {
    const result = await getToggles(FeatureTogglesController, 'qauser@company.com');
    expect(result).toMatchObject(qaToggles);
  });
});
