
import {CREATE_NEW_VEHICLE, FETCH_ALL_VEHICLES} from "./types";
import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";



export const fetchAllVehicles = () => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/vehicle/all`)
            .then(response => {
                dispatch(setVehicleData(response.data, FETCH_ALL_VEHICLES));
            })
            .catch(error =>{
                throw(error)
            });
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


const setVehicleData = (data, type) => {
    return {
        type: type,
        data: data
    }
}