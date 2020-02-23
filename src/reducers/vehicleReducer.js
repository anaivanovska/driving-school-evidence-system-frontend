
import {CREATE_NEW_VEHICLE, EDIT_VEHICLE, FETCH_ALL_VEHICLES, FETCH_ALL_VEHICLES_PAGINATION} from "../actions/types";

export const vehicleReducer = (state = {pagination: {}, list: []}, action) => {
    switch (action.type) {
        case FETCH_ALL_VEHICLES_PAGINATION:
            console.log(action)
            state.pagination= action.data;
            return {...state};
        case FETCH_ALL_VEHICLES:
            console.log(action)
            state.list= action.data;
            console.log(state);
            return {...state};
        case CREATE_NEW_VEHICLE:
            return state;
        case EDIT_VEHICLE: 
            const editedVehicle = action.data;
            const index = findIndexOfVehicleWithId(editedVehicle.id, state.content);
            const afterEditState = {...state};
            afterEditState.content[index] = editedVehicle;
            return {...afterEditState};
        default:
            return state;
    }
};

const findIndexOfVehicleWithId = (vehicleId, vehicleList) => {
    let index = -1;
    for (let vehicle of vehicleList) {
        index++;
        if (vehicle.id === vehicleId) {
            break;
        }
    }
    return index;
}