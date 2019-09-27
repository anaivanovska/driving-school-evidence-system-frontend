import {FETCH_USER_BY_USERNAME, FETCH_USER_BY_ID} from "../actions/types";

const userReducer = (state={},  action) =>{
    switch(action.type) {
        case FETCH_USER_BY_USERNAME:
        case FETCH_USER_BY_ID:
            return action.data;
        default:
            return state;
    }
};

export default userReducer;