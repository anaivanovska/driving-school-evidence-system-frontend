import {FETCH_USER_BY_ID, FETCH_USER_BY_USERNAME} from "../actions/types";
import {combineReducers} from 'redux';
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
    user: userReducer,
    categoryList: categoryReducer
});

export default rootReducer;