import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";
import {CREATE_NEW_TRIAL_TEST, FETCH_ALL_TRIAL_TESTS_FOR_DRIVING_COURSE} from "./types";

export const createNewTrialTest = (trialTest, drivingCourseId) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/trialTest/new/${drivingCourseId}`, trialTest)
            .then(response => {
                console.log("Created trial test");
                console.log(response);
                dispatch(setTrialTestData(response.data, CREATE_NEW_TRIAL_TEST));
            })
            .catch(error => {
                throw(error)
            });
    }
};


export const fetchTrialTestsForDrivingCourse = (drivingCourseId) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/trialTest/all/${drivingCourseId}`)
            .then(response => {
                dispatch(setTrialTestData(response.data, FETCH_ALL_TRIAL_TESTS_FOR_DRIVING_COURSE));
            })
            .catch(error =>{
                throw(error)
            });
    }
};


const setTrialTestData = (data, type) => {
    return {
        type: type,
        data: data
    }
};