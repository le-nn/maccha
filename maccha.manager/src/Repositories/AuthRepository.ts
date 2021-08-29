import { axios, repositoryConfig, setToken } from "./config";
import { LoginInfo } from "../Models/auth/login-info";

/**
 * repository for authenticatoin
 */
export class AuthRepository {
    /**
     * validate token is valid.
     * @param token token for validate
     */
    public async validate(token: string): Promise<boolean> {
        try {
            await axios.get<LoginInfo>(repositoryConfig.path.auth, {
                headers: { Authorization: `${token}` }
            });
            return true;
        }
        catch (ex) {
            console.error("token is invalid.");
        }
        return false;
    }

    /**
     * login
     * @param email email
     * @param password password
     */
    public async login(email: string, password: string): Promise<LoginInfo> {
        try {
            const response = await axios.post<LoginInfo>(repositoryConfig.path.auth, {
                email,
                password
            });
            setToken(response.data.token);
            return new LoginInfo(response.data);
        }
        catch (ex) {
            console.error("failed to login");
            throw new Error("failed to login");
        }
    }

    /**
     * login
     * @param email email
     * @param password password
     */
    public async refresh(refreshToken: string, identifier: string): Promise<LoginInfo> {
        try {
            const response = await axios.put<LoginInfo>(repositoryConfig.path.auth, {
                refreshToken,
                identifier
            });
            setToken(response.data.token);
            return new LoginInfo(response.data);
        }
        catch (ex) {
            console.error("failed to refresh token and identifier");
            throw new Error("failed to refresh token and identifier");
        }
    }

    /**
     * save login info to local storage
     * @param params login info
     */
    public saveToLocalStorage(params: LoginInfo) {
        const info = JSON.stringify(params);
        localStorage.setItem("loginInfo", info);
    }

    /**
     * clear local storage login info.
     */
    public clearLocalStorage() {
        this.saveToLocalStorage(new LoginInfo());
    }

    /**
     * Load from local storage.
     */
    public loadFromLocalStorage(): LoginInfo {
        try {
            const info = localStorage.getItem("loginInfo");
            if (info) {
                const json = JSON.parse(info) as LoginInfo;
                setToken(json.token);
                return json;
            }
        }
        catch (ex) {
            console.error("failed to load login info from local storage", ex);
        }
        return new LoginInfo();
    }
}