import {FETCH_USER_BY_ID, FETCH_USER_BY_USERNAME} from "../actions/types";
import {combineReducers} from 'redux';

const userDataReducer = (state=[],  action) =>{
    switch(action.type) {
        case FETCH_USER_BY_USERNAME:
        case FETCH_USER_BY_ID:
            return [...state, action.payload];
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    userData: userDataReducer
});

export default rootReducer;