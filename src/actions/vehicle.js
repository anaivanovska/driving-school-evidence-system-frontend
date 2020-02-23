
import {CREATE_NEW_VEHICLE, EDIT_VEHICLE, FETCH_ALL_VEHICLES, FETCH_ALL_VEHICLES_PAGINATION} from "./types";
import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";


export const fetchAllVehicles = () => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/vehicle/all/list`)
            .then(response => {
                dispatch(setVehicleData(response.data, FETCH_ALL_VEHICLES));
            })
            .catch(error =>{
                throw(error)
            })
    }
};
export const fetchAllVehiclesPagination = (pageNumber) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/vehicle/all?page=${pageNumber}`)
            .then(response => {
                dispatch(setVehicleData(response.data, FETCH_ALL_VEHICLES_PAGINATION));
            })
            .catch(error =>{
                throw(error)
            })
    }
};

export const createNewVehicle = (vehicle) => {
    console.log("CREATE NEW VEHICLE");
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/vehicle/new`, vehicle)
            .then(response => {
                dispatch(setVehicleData(response.data, CREATE_NEW_VEHICLE));
            })
            .catch(error =>{
                throw(error)
            });
    }
};

export const editVehicle = (vehicle) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/vehicle/edit`, vehicle)
            .then(response => {
                console.log(response);
                dispatch(setVehicleData(response.data, EDIT_VEHICLE));
            })
            .catch(error =>{
                throw(error)
            });
    }
};

const setVehicleData = (data, type) => {
    return {
        type: type,
        data: data
    }
};
