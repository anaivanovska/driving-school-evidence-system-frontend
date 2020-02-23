
import {CREATE_NEW_DRIVER_LICENCE, FETCH_ALL_DRIVER_LICENCES_FOR_USER, REMOVE_DRIVER_LICENCE} from "../actions/types";

export const driverLicenceReducer = (state= [], action) => {
    switch (action.type) {
        case FETCH_ALL_DRIVER_LICENCES_FOR_USER:
            return action.data;
        case CREATE_NEW_DRIVER_LICENCE:
            return [action.data, ...state];
        case REMOVE_DRIVER_LICENCE:
            const index = findIndex(action.data, state);
            const tmpState = [...state];
            if (index !== -1) {
                tmpState.splice(index, 1);
            }
            return tmpState;
        default:
            return state;

    }
};

const findIndex = (id, driverLicences) => {
    for (let i=0; i<driverLicences.length; i++) {
        if (driverLicences[i].id == id) {
            return i;
        }
    }
    return -1;
}