
import {CREATE_NEW_CATEGORY, FETCH_ALL_CATEGORIES} from "../actions/types";

const categoryReducer = (state=[], action) => {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES:
            return  action.data;
        case CREATE_NEW_CATEGORY:
            return [action.data, ...state];
        default:
            return state;
    }
};

export default categoryReducer;