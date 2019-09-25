import {FETCH_USER_BY_ID, FETCH_USER_BY_USERNAME, LOGIN_ACTION, SIGNIN_ACTION} from "./types";
import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";

export const fetchUserByUsername = (username) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/user?email=${username}`)
            .then(response => {
                dispatch(setUserData(response.data, FETCH_USER_BY_USERNAME));
            })
            .catch(error =>{
                throw(error)
            });
    }
};

export const fetchUserById = (id) => {
    return (dispatch) => {
        return axiosAuthenticated(.get(`${SERVER_URL}/api/user?id=${id}`)
            .then(response => {
                dispatch(setUserData(response.data, FETCH_USER_BY_ID));
            })
            .catch(error =>{
                throw(error)
            });
    }
};

const setUserData = (data, type) => {
    return {
        type: type,
        user: data
    }
};