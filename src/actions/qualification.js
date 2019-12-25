import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";
import {CREATE_NEW_QUALIFICATION, FETCH_ALL_QUALIFICATIONS_FOR_DRIVING_COURSE} from "./types";

export const createNewQualification = (qualification, drivingCourseId) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/qualification/new/${drivingCourseId}`, qualification)
            .then(response => {
                console.log("Created qualification");
                console.log(response);
                dispatch(setQualificationData(response.data, CREATE_NEW_QUALIFICATION));
            })
            .catch(error => {
                throw(error)
            });
    }
};


export const fetchAllQualificationsForDrivingCourse = (drivingCourseId) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/qualification/all/${drivingCourseId}`)
            .then(response => {
                dispatch(setQualificationData(response.data, FETCH_ALL_QUALIFICATIONS_FOR_DRIVING_COURSE));
            })
            .catch(error =>{
                throw(error)
            });
    }
};


const setQualificationData = (data, type) => {
    return {
        type: type,
        data: data
    }
};