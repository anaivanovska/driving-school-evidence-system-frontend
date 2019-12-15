import axios from 'axios';
import {AUTHORITIES_HEADER, HEADER_NAME, Roles, TOKEN_NAME, TOKEN_PREFIX} from "../Constants";

export const saveToken = (response) => {
    const authorizationHeader = response.headers[HEADER_NAME];
    const userJwtToken = authorizationHeader.substring(7);
    removeToken();
    localStorage.setItem(TOKEN_NAME, userJwtToken);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_NAME);
}

export const saveAuthorities = (response) => {
    removeAuthorities();
    const auths = response.headers[AUTHORITIES_HEADER];
    localStorage.setItem(AUTHORITIES_HEADER, auths);
};

export const removeAuthorities = () => {
    localStorage.removeItem(AUTHORITIES_HEADER);
};

export const getAuthority = () => {
    const allAuths =  localStorage.getItem(AUTHORITIES_HEADER);
    console.log(allAuths);
    const authList = allAuths.trim().split(",")
                             .map((auth) => auth.split("_")[1]);
    if(authList.includes(Roles.admin)) {
        console.log(Roles.admin);
        return Roles.admin.toLowerCase();
    } else if(authList.includes(Roles.instructor)) {
        return Roles.instructor.toLowerCase();
    } else {
        return Roles.candidate.toLowerCase();
    }
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
