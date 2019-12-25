import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";
import {CREATE_NEW_DRIVER_LICENCE, FETCH_ALL_DRIVER_LICENCES_FOR_USER} from "./types";

export const createNewDriverLicence = (driverLicence) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/driverLicence/new`, driverLicence)
            .then(response => {
                console.log("Created driver licence");
                console.log(response);
                dispatch(setDriverLicenceData(response.data, CREATE_NEW_DRIVER_LICENCE));
            })
            .catch(error => {
                throw(error)
            });
    }
}


export const fetchAllDriverLicencesForUser = (userId) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/driverLicence/all/${userId}`)
            .then(response => {
                dispatch(setDriverLicenceData(response.data, FETCH_ALL_DRIVER_LICENCES_FOR_USER));
            })
            .catch(error =>{
                throw(error)
            });
    }
};


const setDriverLicenceData = (data, type) => {
    return {
        type: type,
        data: data
    }
};