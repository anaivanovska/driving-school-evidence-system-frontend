import {
    FETCH_USER_BY_ID, FETCH_USER_BY_USERNAME,FETCH_INSTRUCTORS, FETCH_CANDIDATES,
    CREATE_NEW_CANDIDATE, CREATE_NEW_INSTRUCTOR
} from "./types";
import {axiosAuthenticated} from "../service/UserAuthentication";
import {Roles, SERVER_URL} from "../Constants";
export const fetchUserByUsername = (username) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/user/byEmail?email=${username}`)
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
        return axiosAuthenticated().get(`${SERVER_URL}/api/user?id=${id}`)
            .then(response => {
                dispatch(setUserData(response.data, FETCH_USER_BY_ID));
            })
            .catch(error =>{
                throw(error)
            });
    }
};


export const fetchUsersWithRole = (role, pageNumber) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/user/all/${role}?page=${pageNumber}`)
            .then(response => {
                console.log("Fetching users");
                console.log(response.data);
                if(role === Roles.instructor) {
                    console.log("fetciing instructors");
                    return dispatch(setUserData(response.data, FETCH_INSTRUCTORS));
                } else {
                    return dispatch(setUserData(response.data, FETCH_CANDIDATES));
                }
            })
            .catch(error => {
                throw(error);
            })
    }
};
const setUserData = (data, type) => {
    return {
        type: type,
        data: data
    }
};