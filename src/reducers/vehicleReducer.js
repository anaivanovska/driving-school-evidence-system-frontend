
import {CREATE_NEW_VEHICLE, FETCH_ALL_VEHICLES} from "../actions/types";

export const vehicleReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ALL_VEHICLES:
            return action.data;
        case CREATE_NEW_VEHICLE:
            return [action.data, ...state];
        default:
            return state;
    }
};

