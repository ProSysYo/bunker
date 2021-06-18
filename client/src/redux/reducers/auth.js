import { ActionTypes } from "../constants/action-types"

const initialState = {
    isLoggedIn: undefined,
    user: null,
    registerValidateErrors: {},
    loginValidateErrors: {}
}

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
                isLoggedIn: false
            }

        case ActionTypes.SET_REGISTER_VALIDATE_ERRORS:
            return {
                ...state,
                registerValidateErrors: action.payload
            }

        case ActionTypes.CLEAR_REGISTER_VALIDATE_ERRORS:
            return {
                ...state,
                registerValidateErrors: {}
            }

        case ActionTypes.AUTH_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case ActionTypes.AUTH_FAIL:
        case ActionTypes.LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            }

        case ActionTypes.SET_LOGIN_VALIDATE_ERRORS:
            return {
                ...state,
                loginValidateErrors: action.payload
            }

        case ActionTypes.CLEAR_LOGIN_VALIDATE_ERRORS:
            return {
                ...state,
                loginValidateErrors: {}
            }

        case ActionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }

        default:
            return state
    }
}