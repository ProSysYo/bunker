import axios from 'axios'
import { API_URL } from '../../config'
import { ActionTypes } from '../constants/action-types'

export const login =  (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/login`, {
                username,
                password
            })
            dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: response.data.user })            
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            dispatch({ type: ActionTypes.LOGIN_FAIL })
            alert(e.response.data.message)
        }
    }
}

export const registration =  (username, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/registration`, {
                username,
                password
            })
            dispatch({ type: ActionTypes.REGISTER_SUCCESS })            
            alert(response.data.message)
        } catch (e) {
            dispatch({ type: ActionTypes.REGISTER_FAIL })
            alert(e.response.data.message)
        }
    }
}