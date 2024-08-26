import { User } from '../../../src/FakeUser/entities/User';

describe('Failure cases', () => {
  test('It should throw an error for a missing image response', () => {
    const user = new User();
    expect(() => {
      // @ts-ignore
      user.applyUserImageFromCatApi();
    }).toThrowError();
  });

  test('It should throw an error for an invalid CatAPI response', () => {
    const user = new User();
    // @ts-ignore
    expect(() => {
      // @ts-ignore
      user.applyUserImageFromCatApi({ url: 'x' });
    }).toThrowError();
  });

  test('It should throw an error for an invalid JSONPlaceholder response', () => {
    const user = new User();
    // @ts-ignore
    expect(() => {
      // @ts-ignore
      user.applyUserDataFromJsonPlaceholder([]);
    }).toThrowError();
  });

  test('It should throw an error for an invalid name in the JSONPlaceholder response', () => {
    const user = new User();
    // @ts-ignore
    expect(() => {
      // @ts-ignore
      user.applyUserDataFromJsonPlaceholder([{ name: 'x' }]);
    }).toThrowError();
  });

  test('It should throw an error for an invalid RandomUser response', () => {
    const user = new User();
    // @ts-ignore
    expect(() => {
      // @ts-ignore
      user.applyUserDataFromRandomUser([]);
    }).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return a basic data object', () => {
    const user = new User();

    const result = user.viewUserData();
    expect(result).toMatchObject({ image: '', name: '' });
  });

  test('It should return an extended data object', () => {
    const user = new User(true);

    const result = user.viewUserData();
    expect(result).toMatchObject({
      image: '',
      name: '',
      id: '',
      email: ''
    });
  });

  test('It should apply user data from a valid JSONPlaceholder response', () => {
    const user = new User();
    // @ts-ignore
    user.applyUserDataFromJsonPlaceholder([{ name: 'Some Person' }]);
    const result = user.viewUserData();
    expect(result).toMatchObject({
      name: 'Some Person'
    });
  });

  test('It should apply user data (with enabled beta functionality) from a valid JSONPlaceholder response', () => {
    const user = new User(true);
    // @ts-ignore
    user.applyUserDataFromJsonPlaceholder([{ name: 'Some Person' }]);
    const result = user.viewUserData();
    expect(result).toMatchObject({
      name: 'Some Person',
      id: '123-abc-asdf',
      email: 'some_test_email@company.com'
    });
  });
});
