import Axios, { AxiosAdapter } from "axios";
import { LoginInfo } from "../Models/Domain/auth/login-info";
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
    let count = 0;

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

        if (count > 10) {
            alert("Server Authorization module error");
            (typeof window !== "undefined" ? window : null)?.location.reload();
            return;
        }

        count++;
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

export const setUrl = (url: string) => {
    if (url === "/") {
        axios.defaults.baseURL = "/";
    }
    else {
        axios.defaults.baseURL = url[url.length - 1] !== "/" ? url + "/" : url;
    }
};

export const setToken = (token: string) => {
    (axios.defaults.headers as any).Authorization = `${token}`;
};
