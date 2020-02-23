import {
    CREATE_NEW_CATEGORY, EDIT_CATEGORY, FETCH_ALL_CATEGORIES_LIST,
    FETCH_ALL_CATEGORIES_PAGEABLE, REMOVE_CATEGORY
} from "./types";
import {axiosAuthenticated} from "../service/UserAuthentication";
import {Roles, SERVER_URL} from "../Constants";

export const fetchAllCategoriesPageable = (role, page = 0, userId = 0) => {
    return (dispatch) => {
        let url = SERVER_URL;
        if (Roles.admin === role) {
            url += "/api/category/all?page=" + page;
        } else if (Roles.instructor === role) {
            url += "/api/instructorCategory/allCategories/page/" + userId + "?page=" + page;
        } else {
            url += "/api/category/all/" + userId + "?page=" + page;
        }

        console.log("Fetch categories");
        console.log("url: " + url);
        return axiosAuthenticated().get(`${url}`)
            .then(response => {
                console.log(response);
                dispatch(setCategoryData(response.data, FETCH_ALL_CATEGORIES_PAGEABLE));
            })
            .catch(error => {
                throw(error);
            });
    }
};


export const fetchAllCategories = () => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/category/allAsList`)
            .then(response => {
                console.log(response.data);
                dispatch(setCategoryData(response.data, FETCH_ALL_CATEGORIES_LIST));
            })
            .catch(error => {
                throw(error)
            });
    }
}

export const createNewCategory = (category) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/category/createNew`, category)
            .then(response => {
                console.log("NEw category created");
                console.log(response.data);
                dispatch(setCategoryData(response.data, CREATE_NEW_CATEGORY));
            })
            .catch(error => {
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
            .catch(error => {
                throw(error)
            });
    }
};

export const removeCategory = (categoryId) => {
    return (dispatch) => {
        return axiosAuthenticated().delete(`${SERVER_URL}/api/category/remove?id=${categoryId}`)
            .then(response => {
                console.log("Remove cateogry: " + response.data);
                dispatch(setCategoryData(response.data, REMOVE_CATEGORY));
            })
            .catch(error => {
                console.log("Remove category error ");
                throw(error)
            });
    }
};

const setCategoryData = (data, type) => {
    return {
        type: type,
        data: data
    }
}