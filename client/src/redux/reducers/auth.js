import { AuthTypes } from "../constants/auth-types"

const initialState = {
    isLoggedIn: undefined,
    user: null,
    registerValidateErrors: {},
    loginValidateErrors: {}
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypes.REGISTER_SUCCESS: return { ...state, isLoggedIn: false}
        case AuthTypes.REGISTER_FAIL: return { ...state, isLoggedIn: false }
        case AuthTypes.SET_REGISTER_VALIDATE_ERRORS: return { ...state, registerValidateErrors: action.payload }
        case AuthTypes.CLEAR_REGISTER_VALIDATE_ERRORS: return { ...state, registerValidateErrors: {} }
        case AuthTypes.AUTH_SUCCESS: return { ...state, isLoggedIn: true, user: action.payload }
        case AuthTypes.LOGIN_SUCCESS: return { ...state, isLoggedIn: true, user: action.payload }
        case AuthTypes.AUTH_FAIL: return { ...state, isLoggedIn: false, user: null }
        case AuthTypes.LOGIN_FAIL: return { ...state, isLoggedIn: false, user: null }
        case AuthTypes.SET_LOGIN_VALIDATE_ERRORS: return { ...state, loginValidateErrors: action.payload }
        case AuthTypes.CLEAR_LOGIN_VALIDATE_ERRORS: return { ...state, loginValidateErrors: {} }
        case AuthTypes.LOGOUT:
            localStorage.removeItem('token')          
            return { ...state, isLoggedIn: false, user: null }
        default:
            return state
    }
}

export const acRegisterSuccess = () => ({ type: AuthTypes.REGISTER_SUCCESS })

export const acRegisterFail = () => ({ type: AuthTypes.REGISTER_FAIL })

export const acSetRegisterValidateErrors = (errors) => ({ type: AuthTypes.SET_REGISTER_VALIDATE_ERRORS, payload: errors })

export const acClearRegisterValidateErrors = () => ({ type: AuthTypes.CLEAR_REGISTER_VALIDATE_ERRORS })

export const acAuthSuccess = (user) => ({ type: AuthTypes.AUTH_SUCCESS, payload: user})

export const acLoginSuccess = (user) => ({ type: AuthTypes.LOGIN_SUCCESS, payload: user})

export const acAuthFail = () => ({ type: AuthTypes.AUTH_FAIL })

export const acLoginFail = () => ({ type: AuthTypes.LOGIN_FAIL })

export const acSetLoginValidateErrors = (errors) => ({ type: AuthTypes.SET_LOGIN_VALIDATE_ERRORS, payload: errors })

export const acClearLoginValidateErrors = () => ({ type: AuthTypes.CLEAR_LOGIN_VALIDATE_ERRORS })

export const acLogout = () => ({ type: AuthTypes.LOGOUT })