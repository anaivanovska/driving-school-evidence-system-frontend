import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";
import {CREATE_NEW_MEDICAL_CERTIFICATE, FETCH_MEDICAL_CERTIFICATE} from "./types";

export const createNewMedicalCertificate = (medicalCertificate, drivingCourseId) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/medicalCertificate/new/${drivingCourseId}`, medicalCertificate)
            .then(response => {
                console.log("Created medical certificate");
                console.log(response);
                dispatch(setMedicalCertificateData(response.data, CREATE_NEW_MEDICAL_CERTIFICATE));
            })
            .catch(error => {
                throw(error)
            });
    }
};


export const fetchMedicalCertificateForUser = (drivingCourseId) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/medicalCertifcate/${drivingCourseId}`)
            .then(response => {
                dispatch(setMedicalCertificateData(response.data, FETCH_MEDICAL_CERTIFICATE));
            })
            .catch(error =>{
                throw(error)
            });
    }
};


const setMedicalCertificateData = (data, type) => {
    return {
        type: type,
        data: data
    }
};