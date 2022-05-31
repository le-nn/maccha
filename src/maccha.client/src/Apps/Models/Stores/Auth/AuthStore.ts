import { LoginInfo } from "Apps/Models/Domain/auth/login-info";
import { AuthRepository } from "Apps/Repositories/AuthRepository";
import { setToken } from "Apps/Repositories/config";
import { Message, State, Store, store } from "relux.js";

class AuthStoreState extends State<AuthStoreState> {
    /**
     * login info
     */
    loginInfo: LoginInfo | null = null;

    /**
     * is login.
     */
    isLogin = false;
}

class Login extends Message<LoginInfo>{ }
class Logout extends Message { }

@store({ name: "AuthStore" })
export class AuthStore extends Store<AuthStoreState> {
    constructor(
        private readonly repository: AuthRepository
    ) {
        super(new AuthStoreState(), AuthStore.mutation);
    }

    static mutation(state: AuthStoreState, message: Message): AuthStoreState {
        switch (message.constructor) {
            case Login: {
                const { payload } = message as Login;
                return state.clone({
                    loginInfo: payload,
                    isLogin: true,
                });
            }
            case Logout: {
                return state.clone({ isLogin: false, loginInfo: null });
            }
        }
        return state;
    }

    public logout() {
        this.repository.clearLocalStorage();
        this.mutate(new Logout());
    }

    /**
     * valide is token enabled.
     */
    public async validateAuth() {
        if (!this.state.loginInfo) {
            throw new Error();
        }

        try {
            if (await this.repository.validate(this.state.loginInfo.token)) {
                this.repository.saveToLocalStorage(this.state.loginInfo);
                this.mutate(new Login(this.state.loginInfo));
            }
            else {
                throw new Error();
            }
        }
        catch {
            console.error("Failed to login.");
            this.repository.clearLocalStorage();
            this.mutate(new Logout());
            throw new Error("Failed to login.");
        }
    }

    public async refreshAsync(webSiteId?: string) {
        if (!this.state.loginInfo) {
            throw new Error("Login info is not set.");
        }

        try {
            const loginInfo = await this.repository.refresh(
                this.state.loginInfo.refreshToken,
                webSiteId ?? this.state.loginInfo.webSiteId);
            this.repository.saveToLocalStorage(loginInfo);
            setToken(loginInfo.token);
            this.mutate(new Login(loginInfo));
        }
        catch {
            console.error("Failed to login.");
            this.repository.clearLocalStorage();
            this.mutate(new Logout());
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
            const info = await this.repository.login(email, password);
            this.mutate(new Login(info));
            this.repository.saveToLocalStorage(info);
        }
        catch {
            console.error("Failed to login.");
            this.mutate(new Logout());
            this.repository.clearLocalStorage();
            throw new Error("Failed to login.");
        }
    }

    public initialize() {
        const info = this.repository.loadFromLocalStorage();
        if (info && this.checkIsLogin(info)) {
            this.mutate(new Login(info));
        }
        else {
            this.mutate(new Logout());
        }
    }

    /**
     * check login status from stored login info.
     */
    private checkIsLogin(loginInfo: LoginInfo) {
        return (loginInfo.exp) < Date.now();
    }
}