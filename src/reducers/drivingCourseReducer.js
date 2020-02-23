
import {CREATE_NEW_DRIVING_COURSE, FETCH_ALL_DRIVING_COURSES_FOR_USER} from "../actions/types";

export const drivingCourseReducer = (state= [], action) => {
    switch (action.type) {
        case FETCH_ALL_DRIVING_COURSES_FOR_USER:
            return action.data;
        case CREATE_NEW_DRIVING_COURSE:
            return [action.data, ...state];
        default:
            return state;

    }
};
