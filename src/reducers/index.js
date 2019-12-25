import {combineReducers} from 'redux';
import {userReducer, usersPageReducer} from "./userReducer";import categoryReducer from "./categoryReducer";
import {vehicleReducer} from "./vehicleReducer";
import {driverLicenceReducer} from "./driverLicenceReducer";
import {medicalCertificateReducer} from "./medicalCertificateReducer";
import {trialTestReducer} from "./trialTestReducer";
import {qualificationReducer} from "./qualificationReducer";

const rootReducer = combineReducers({
    user: userReducer,
    userList: usersPageReducer,
    categoryList: categoryReducer,
    vehicleList: vehicleReducer,
    driverLicenceForUserList: driverLicenceReducer,
    medicalCertificateForUser: medicalCertificateReducer,
    trialTestList: trialTestReducer,
    qualificationList: qualificationReducer
});

export default rootReducer;