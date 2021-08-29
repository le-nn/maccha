import { LoginInfo } from "../Models/auth/login-info";
/**
 * repository for authenticatoin
 */
export declare class AuthRepository {
    /**
     * validate token is valid.
     * @param token token for validate
     */
    validate(token: string): Promise<boolean>;
    /**
     * login
     * @param email email
     * @param password password
     */
    login(email: string, password: string): Promise<LoginInfo>;
    /**
     * login
     * @param email email
     * @param password password
     */
    refresh(refreshToken: string, identifier: string): Promise<LoginInfo>;
    /**
     * save login info to local storage
     * @param params login info
     */
    saveToLocalStorage(params: LoginInfo): void;
    /**
     * clear local storage login info.
     */
    clearLocalStorage(): void;
    /**
     * Load from local storage.
     */
    loadFromLocalStorage(): LoginInfo;
}
