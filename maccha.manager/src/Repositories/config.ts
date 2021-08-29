import Axios, { AxiosAdapter } from "axios";
import { LoginInfo } from "../Models/auth/login-info";
import { ServiceContext, services } from "../Services";

export const repositoryConfig = {
    path: {
        auth: "/api/auth"
    }
};

export const axios = Axios.create({
    timeout: 1000,
    headers: {},
});

function registerAutoTokeRefresh() {
    let interceptor = 0;

    const register = () => {
        interceptor = axios.interceptors.response.use(
            async response => response,
            onError
        );
    };

    const unresister = () => {
        axios.interceptors.response.eject(interceptor);
    };

    const onError = async (error: any) => {
        if (error.response.status !== 401) {
            return Promise.resolve(error);
        }

        unresister();

        await services.authService.refreshAsync();
        const config = error.response.config;
        config.headers.Authorization = services.authService.loginInfo.token;

        register();

        return axios.request(config);
    };

    register();
}
registerAutoTokeRefresh();

export function setUrl(url: string) {
    axios.defaults.baseURL = url;
}

export function setToken(token: string) {
    axios.defaults.headers.Authorization = `${token}`;
}
