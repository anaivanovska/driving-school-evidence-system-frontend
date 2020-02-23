import {axiosAuthenticated} from "../service/UserAuthentication";
import {SERVER_URL} from "../Constants";
import {CREATE_NEW_DRIVING_COURSE, FETCH_ALL_DRIVING_COURSES_FOR_USER} from "./types";

export const createNewDrivingCourse = (drivingCourse) => {
    return (dispatch) => {
        return axiosAuthenticated().post(`${SERVER_URL}/api/drivingCourse/new`, drivingCourse)
            .then(response => {
                console.log("Created driving course");
                console.log(response);
                dispatch(setDrivingCourseData(response.data, CREATE_NEW_DRIVING_COURSE));
            })
            .catch(error => {
                throw(error)
            });
    }
};

export const fetchAllDrivingCoursesForCandidate = (id) => {
    return (dispatch) => {
        return axiosAuthenticated().get(`${SERVER_URL}/api/drivingCourse/all/${id}`)
            .then(response => {
                dispatch(setDrivingCourseData(response.data, FETCH_ALL_DRIVING_COURSES_FOR_USER));
            })
            .catch(error =>{
                throw(error)
            });
    }
};


const setDrivingCourseData = (data, type) => {
    return {
        type: type,
        data: data
    }
};