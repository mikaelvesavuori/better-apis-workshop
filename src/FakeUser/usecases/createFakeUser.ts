import { UserData, UserDataExtended, User } from '../entities/User';

import { getData } from './interactors/getData';
import { getImage } from './interactors/getImage';

/**
 * @description This is where we orchestrate the work needed to fulfill our use case "create a fake user".
 */
export async function createFakeUser(
  toggles: Record<string, unknown>
): Promise<UserData | UserDataExtended> {
  // Use of CatAPI is same in all cases
  const user = new User(toggles.enableBetaFeatures as boolean | false);
  const imageResponse = await getImage('CatAPI');
  user.applyUserImageFromCatApi(imageResponse);

  // Use code branching for new development feature
  if (toggles.enableNewUserApi) {
    const dataResponse = await getData('RandomUser');
    user.applyUserDataFromRandomUser(dataResponse);
  }
  // Otherwise return regular response
  else {
    const dataResponse = await getData('JSONPlaceholder');
    user.applyUserDataFromJsonPlaceholder(dataResponse);
  }

  return user.viewUserData();
}
