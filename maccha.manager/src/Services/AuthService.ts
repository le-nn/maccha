import { makeAutoObservable } from "mobx";
import { AuthRepository } from "../Repositories/AuthRepository";
import { LoginInfo } from "../Models/auth/login-info";
import { RoleType } from "../Models";
import { setToken } from "../Repositories/config";

export class AuthService {
    private readonly repository = new AuthRepository();

    /**
     * login info
     */
    loginInfo!: LoginInfo;

    /**
     * is login.
     */
    isLogin = false;

    /**
     * Constructor.
     */
    constructor() {
        makeAutoObservable(this);
    }

    public logout() {
        this.repository.clearLocalStorage();
    }

    /**
     * load login info from local storage.
     */
    public loadFromLocalStorage() {
        this.loginInfo = this.repository.loadFromLocalStorage();
    }

    /**
     * valide is token enabled.
     */
    public async validateAuth() {
        try {
            if (await this.repository.validate(this.loginInfo.token)) {
                this.repository.saveToLocalStorage(this.loginInfo);
                this.isLogin = true;
            }
            else {
                throw new Error();
            }
        }
        catch {
            console.error("Failed to login.");
            this.repository.clearLocalStorage();
            this.isLogin = false;
            this.loginInfo = new LoginInfo();
            throw new Error("Failed to login.");
        }
    }

    public async refreshAsync(identifier?: string) {
        try {
            this.loginInfo = await this.repository.refresh(this.loginInfo.refreshToken, identifier ?? this.loginInfo.identifier);
            this.repository.saveToLocalStorage(this.loginInfo);
            setToken(this.loginInfo.token);
            this.isLogin = true;
        }
        catch {
            console.error("Failed to login.");
            this.repository.clearLocalStorage();
            this.isLogin = false;
            throw new Error("Failed to login.");
        }
    }

    /**
     * invoke login.
     * @param email email
     * @param password password
     */
    public async login(email: string, password: string) {
        try {
            this.loginInfo = await this.repository.login(email, password);
            this.repository.saveToLocalStorage(this.loginInfo);
            this.isLogin = true;
        }
        catch {
            console.error("Failed to login.");
            this.isLogin = false;
            this.repository.clearLocalStorage();
            throw new Error("Failed to login.");
        }
    }

    public initialize() {
        this.loadFromLocalStorage();
        this.isLogin = this.checkIsLogin();
    }

    /**
     * check login status from stored login info.
     */
    private checkIsLogin() {
        return this.loginInfo.exp < Date.now();
    }
}
