import { UserData, UserDataExtended } from '../entities/User';
export declare function createFakeUser(toggles: Record<string, unknown>): Promise<UserData | UserDataExtended>;
