import {combineReducers} from 'redux';
import {userReducer, usersPageReducer} from "./userReducer";

import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
    user: userReducer,
    userList: usersPageReducer,
    categoryList: categoryReducer
});

export default rootReducer;