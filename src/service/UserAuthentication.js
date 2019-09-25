import axios from 'axios';
import {HEADER_NAME, TOKEN_NAME, TOKEN_PREFIX} from "../Constants";

export const saveToken = (response) => {
    const authorizationHeader = response.headers[HEADER_NAME];
    const userJwtToken = authorizationHeader.substring(7);
    localStorage.removeItem(TOKEN_NAME);
    localStorage.setItem(TOKEN_NAME, userJwtToken);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_NAME);
};

export const axiosAuthenticated = () => {
    let axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(config => {
        let userJwtToken = localStorage.getItem(TOKEN_NAME);
        config.headers.Authorization = `${TOKEN_PREFIX} ${userJwtToken}`;
        return config;
    });
    return axiosInstance;
};
