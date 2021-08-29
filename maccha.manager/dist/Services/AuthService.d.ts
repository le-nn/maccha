import { LoginInfo } from "../Models/auth/login-info";
export declare class AuthService {
    private readonly repository;
    /**
     * login info
     */
    loginInfo: LoginInfo;
    /**
     * is login.
     */
    isLogin: boolean;
    /**
     * Constructor.
     */
    constructor();
    logout(): void;
    /**
     * load login info from local storage.
     */
    loadFromLocalStorage(): void;
    /**
     * valide is token enabled.
     */
    validateAuth(): Promise<void>;
    refreshAsync(identifier?: string): Promise<void>;
    /**
     * invoke login.
     * @param email email
     * @param password password
     */
    login(email: string, password: string): Promise<void>;
    initialize(): void;
    /**
     * check login status from stored login info.
     */
    private checkIsLogin;
}
