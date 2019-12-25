
import {CREATE_NEW_TRIAL_TEST, FETCH_ALL_TRIAL_TESTS_FOR_DRIVING_COURSE} from "../actions/types";

export const trialTestReducer = (state= [], action) => {
    switch (action.type) {
        case FETCH_ALL_TRIAL_TESTS_FOR_DRIVING_COURSE:
            return action.data
        case CREATE_NEW_TRIAL_TEST:
            return [action.data, ...state];
        default:
            return state;

    }
};
