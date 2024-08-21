import { RandomUserResponse } from '../contracts/RandomUserResponse';
import { JsonPlaceholderResponse } from '../contracts/JsonPlaceholderResponse';
import { CatApiResponse } from '../contracts/CatApiResponse';

import { validateImage, validateName, validateId, validateEmail } from './logic/validators';

/**
 * @description The "fake user".
 *
 * This uses a very simple, easy-to-use (but non-optimized) implementation where we keep
 * distinct properties per each use-case (i.e. regular, beta, or "new feature").
 *
 * Adding many more of those (`UserData`, `UserDataExtended` etc) will make it messy.
 * For cleanliness and peace-of-mind, the number of these variants should anyway stay
 * as low as possible, though we do demonstrate that we can support both innovation AND
 * stability at the same time.
 */
export class User {
  userData: UserData;
  userDataExtended: UserDataExtended | UserDataNewFeature;
  enableBetaFeatures: boolean;

  constructor(enableBetaFeatures = false) {
    this.userData = { name: '', image: '' };
    this.userDataExtended = { name: '', image: '', id: '', email: '' };
    this.enableBetaFeatures = enableBetaFeatures;
  }

  /**
   * @description Set the user's image based on response from the Cat API.
   * @todo Response is object in array.
   */
  public applyUserImageFromCatApi(imageResponse: CatApiResponse) {
    if (!imageResponse || !imageResponse[0].url) throw new Error('No imageResponse!');

    const image = imageResponse[0].url as string;
    const isImageValid = validateImage(image);
    if (!isImageValid) throw new Error('Image is invalid');

    if (this.enableBetaFeatures) this.userDataExtended.image = image;
    else this.userData.image = image;
  }

  /**
   * @description Set the user's data based on response from JSONPlaceholder.
   * @version 1.0 (current)
   */
  public applyUserDataFromJsonPlaceholder(dataResponse: JsonPlaceholderResponse) {
    if (!dataResponse || !dataResponse[0]) throw new Error('No dataResponse!');

    const data = dataResponse[0];

    const name = data.name;
    const isNameValid = validateName(name);
    if (!isNameValid) throw new Error('Name is invalid');

    // Beta users get new (but hardcoded) fields
    if (this.enableBetaFeatures) {
      this.userDataExtended.name = name;
      this.userDataExtended.id = '123-abc-asdf';
      this.userDataExtended.email = 'some_test_email@company.com';
    } else this.userData.name = name;
  }

  /**
   * @description Set the user's data based on response from RandomUser.
   * This is the new underlying service that we are driving beta users to.
   * NOTE: This implementation is currently only for developers of this new feature!
   * @version 2.0 (to be released)
   */
  public applyUserDataFromRandomUser(dataResponse: RandomUserResponse) {
    if (!dataResponse || !dataResponse.results[0]) throw new Error('No dataResponse!');

    const data = dataResponse.results[0];

    const name = `${data.name.first} ${data.name.last}`;
    const isNameValid = validateName(name);
    if (!isNameValid) throw new Error('Name is invalid');

    const id = data.login.uuid;
    const isIdValid = validateId(id);
    if (!isIdValid) throw new Error('ID is invalid');

    const email = data.email;
    const isEmailValid = validateEmail(email);
    if (!isEmailValid) throw new Error('Email is invalid');

    this.userDataExtended.name = name;
    this.userDataExtended.id = id;
    this.userDataExtended.email = email;
  }

  /**
   * @description Get or view this user's complete dataset.
   */
  public viewUserData() {
    return this.enableBetaFeatures ? this.userDataExtended : this.userData;
  }
}

export interface UserData {
  name: string;
  image: string;
}

export interface UserDataExtended extends UserData {
  id: string;
  email: string;
}

export type UserDataNewFeature = UserDataExtended;
