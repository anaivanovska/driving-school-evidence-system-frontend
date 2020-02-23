

import {FETCH_ALL_CATEGORIES_FOR_INSTRUCTOR} from "../actions/types";

export const instructorCategoryReducer = (state= {}, action) => {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES_FOR_INSTRUCTOR:
            return action.data;
        default:
            return state;

    }
};