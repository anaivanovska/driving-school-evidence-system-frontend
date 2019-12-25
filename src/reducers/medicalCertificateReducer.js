
import {CREATE_NEW_MEDICAL_CERTIFICATE, FETCH_MEDICAL_CERTIFICATE} from "../actions/types";

export const medicalCertificateReducer = (state= {}, action) => {
    switch (action.type) {
        case FETCH_MEDICAL_CERTIFICATE:
        case CREATE_NEW_MEDICAL_CERTIFICATE:
            return action.data;
        default:
            return state;

    }
};
