
import {CREATE_NEW_QUALIFICATION, FETCH_ALL_QUALIFICATIONS_FOR_DRIVING_COURSE} from "../actions/types";

export const qualificationReducer = (state= [], action) => {
    switch (action.type) {
        case FETCH_ALL_QUALIFICATIONS_FOR_DRIVING_COURSE:
            return action.data
        case CREATE_NEW_QUALIFICATION:
            return [action.data, ...state];
        default:
            return state;

    }
};
