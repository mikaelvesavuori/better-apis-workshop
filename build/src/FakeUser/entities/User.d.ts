import { RandomUserResponse } from '../contracts/RandomUserResponse';
import { JsonPlaceholderResponse } from '../contracts/JsonPlaceholderResponse';
import { CatApiResponse } from '../contracts/CatApiResponse';
export declare class User {
    userData: UserData;
    userDataExtended: UserDataExtended | UserDataNewFeature;
    enableBetaFeatures: boolean;
    constructor(enableBetaFeatures?: boolean);
    applyUserImageFromCatApi(imageResponse: CatApiResponse): void;
    applyUserDataFromJsonPlaceholder(dataResponse: JsonPlaceholderResponse): void;
    applyUserDataFromRandomUser(dataResponse: RandomUserResponse): void;
    viewUserData(): UserData;
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
