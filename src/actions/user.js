import {
    FETCH_USER_BY_ID, FETCH_USER_BY_USERNAME, FETCH_INSTRUCTORS, FETCH_CANDIDATES,
    CREATE_NEW_CANDIDATE, CREATE_NEW_INSTRUCTOR, FETCH_USERS_WITH_ROLE_GROUPED_BY_CATEGORY,
    FETCH_ALL_INSTRUCTORS_OF_TYPE, REMOVE_USER
} from "./types";
import {axiosAuthenticated} from "../service/UserAuthentication";
import {Roles, SERVER_URL} from "../Constants";

export const fetchAllInstructorsOfType = (type, categoryName) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/instructorCategory/${type}/${categoryName}/all/instructors`)
            .then(response => {
                console.log("Fetch all " + type);
                dispatch(setUserData(response.data, FETCH_ALL_INSTRUCTORS_OF_TYPE))
            })
            .catch(error => {
                throw(error);
            });
    }
};

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
        return axiosAuthenticated().get(`${SERVER_URL}/api/user/${id}`)
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

export const fetchUsersWithRoleGroupedByCategory = (type) => {
    return (dispatch) => {
        console.log("Type: " + type);
        const encodedUrl = encodeURI(SERVER_URL + '/api/instructorCategory/' + type + '/instructorsAndCategories');
        axiosAuthenticated().get(`${encodedUrl}`)
            .then(response => {
                return dispatch(setUserData(response.data, FETCH_USERS_WITH_ROLE_GROUPED_BY_CATEGORY));
            })
            .catch(error => {
                alert("Настана грешка")
            });
    }
}

const setUserData = (data, type) => {
    return {
        type: type,
        data: data
    }
};