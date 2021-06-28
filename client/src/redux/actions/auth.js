import { http, httpDefault } from '../../http-common'

import {
    acAuthFail, acAuthSuccess, acClearLoginValidateErrors,
    acClearRegisterValidateErrors, acLoginFail, acLoginSuccess,
    acRegisterFail, acRegisterSuccess, acSetLoginValidateErrors,
    acSetRegisterValidateErrors
} from '../reducers/auth'

import { acClearLoading, acSetLoading } from '../reducers/loading'
import { acSetMessage } from '../reducers/message'

export const auth = () => {
    return async dispatch => {
        try {
            const response = await http.get('/auth')
            dispatch(acAuthSuccess(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            if (e.response) {
                dispatch(acAuthFail())
                localStorage.removeItem('token')
            } else if (e.isAxiosError && !e.response) {
                dispatch(acSetMessage("Нет соединения с сервером"))                
            } else {
                dispatch(acSetMessage(e.message))                
            }
            console.log(e)
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await httpDefault.post('/login', { username, password })
            dispatch(acClearLoginValidateErrors())
            dispatch(acLoginSuccess(response.data.user))
            dispatch(acSetMessage(response.data.message))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            dispatch((acLoginFail()))
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetLoginValidateErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {                
                dispatch(acSetMessage("Нет соединения с сервером"))                
            } else {
                dispatch(acSetMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(acClearLoading())
        }
    }
}

export const registration = (username, password) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearRegisterValidateErrors())
            const response = await httpDefault.post('/registration', { username, password })
            dispatch(acRegisterSuccess())
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acRegisterFail())
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetRegisterValidateErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(acSetMessage("Нет соединения с сервером"))                
            } else {
                dispatch(acSetMessage(e.message))                
            } 
            console.log(e)          
        } finally {
            dispatch(acClearLoading())
        }
    }
}