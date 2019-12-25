import {combineReducers} from 'redux';
import {userReducer, usersPageReducer} from "./userReducer";import categoryReducer from "./categoryReducer";
import {vehicleReducer} from "./vehicleReducer";
import {driverLicenceReducer} from "./driverLicenceReducer";

const rootReducer = combineReducers({
    user: userReducer,
    userList: usersPageReducer,
    categoryList: categoryReducer,
    vehicleList: vehicleReducer,
    driverLicenceForUserList: driverLicenceReducer
});

export default rootReducer;