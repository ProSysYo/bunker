import { ActionTypes } from "../constants/action-types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user 
    ? {isLoggedIn: true, user} 
    : {isLoggedIn: false, user: null};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            }
        case ActionTypes.REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn:false
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn:true,
                user: action.payload
            }
        case ActionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn:false,
                user: null
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default: 
            return state;
    }
}