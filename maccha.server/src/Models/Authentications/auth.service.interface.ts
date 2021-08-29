import { Token } from "./token";
import { LoginUser } from "./login-user";

export interface IAuthService {
    /**
     * login and get login info async.
     * @param email user email
     * @param password password
     */
    loginAsync(email: string, password: string): Promise<Token & LoginUser>;

    /**
     * validate token and get login info async.
     * @param token target token
     * @returns login user info
     */
    validateAsync(token: string): Promise<(Token & LoginUser) | undefined>;
}