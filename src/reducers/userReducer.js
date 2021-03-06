import {
    FETCH_USER_BY_USERNAME, FETCH_USER_BY_ID, FETCH_CANDIDATES, FETCH_INSTRUCTORS, CREATE_NEW_CANDIDATE,
    CREATE_NEW_INSTRUCTOR, FETCH_USERS_WITH_ROLE_GROUPED_BY_CATEGORY, FETCH_ALL_INSTRUCTORS_OF_TYPE, REMOVE_INSTRUCTOR
} from "../actions/types";

export const userReducer = (state={},  action) =>{
    switch(action.selectedType) {
        case FETCH_USER_BY_USERNAME:
        case FETCH_USER_BY_ID:
            return action.data;
        default:
            return state;
    }
};

const initialUsersState = {
    users: {},
    instructors: {},
    candidates: {},
    usersByCategory: {},
    userByID: {},
    instructorsOfType: [],
    currentUser: {}
};
export const usersPageReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case CREATE_NEW_INSTRUCTOR:
        case FETCH_INSTRUCTORS:
            state.instructors = action.data;
            return {...state }
        case CREATE_NEW_CANDIDATE:
        case FETCH_CANDIDATES:
            state.candidates = action.data;
            return {...state };
        case FETCH_USERS_WITH_ROLE_GROUPED_BY_CATEGORY:
            state.usersByCategory = action.data;
            return {...state};
        case FETCH_USER_BY_ID:
            state.userByID = action.data;
            return {...state};
        case FETCH_ALL_INSTRUCTORS_OF_TYPE:
            state.instructorsOfType = action.data;
            return {...state};
        case FETCH_USER_BY_USERNAME:
            state.currentUser = action.data;
            return {...state};
        default:
            return state;
    }
};

