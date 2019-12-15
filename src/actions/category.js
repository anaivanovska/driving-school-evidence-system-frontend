import {
    CREATE_NEW_CATEGORY, EDIT_CATEGORY,
    FETCH_ALL_CATEGORIES, REMOVE_CATEGORY
} from "./types";
import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";

export const fetchAllCategories = () => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/category/all`)
            .then(response => {
                dispatch(setCategoryData(response.data, FETCH_ALL_CATEGORIES));
            })
            .catch(error =>{
                throw(error)
            });
    }
};

export const createNewCategory = (category) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/category/createNew`, category)
            .then(response => {
                dispatch(setCategoryData(response.data, CREATE_NEW_CATEGORY));
            })
            .catch(error =>{
                throw(error)
            });
    }
};

export const editCategory = (category) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/category/edit`, category)
            .then(response => {
                dispatch(setCategoryData(response.data, EDIT_CATEGORY));
            })
            .catch(error =>{
                throw(error)
            });
    }
};

export const removeCategory = (categoryId) => {
    return (dispatch) => {
        return axiosAuthenticated().delete(`${SERVER_URL}/api/category/remove?id=${categoryId}`)
            .then(response => {
                dispatch(setCategoryData(response.data, REMOVE_CATEGORY));
            })
            .catch(error =>{
                throw(error)
            });
    }
};

const setCategoryData= (data, type) => {
    return {
        type: type,
        data: data
    }
};