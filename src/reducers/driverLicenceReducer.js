
import {CREATE_NEW_DRIVER_LICENCE, FETCH_ALL_DRIVER_LICENCES_FOR_USER} from "../actions/types";

export const driverLicenceReducer = (state= [], action) => {
    switch (action.type) {
        case FETCH_ALL_DRIVER_LICENCES_FOR_USER:
            return action.data;
        case CREATE_NEW_DRIVER_LICENCE:
            return [action.data, ...state];
        default:
            return state;

    }
};
