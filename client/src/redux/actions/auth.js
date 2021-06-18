import axios from 'axios'
import { API_URL } from '../../config'
import { ActionTypes } from '../constants/action-types'

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch({ type: ActionTypes.AUTH_SUCCESS, payload: response.data.user })            
            localStorage.setItem('token', response.data.token)            
        } catch (e) {
            dispatch({ type: ActionTypes.AUTH_FAIL}) 
            localStorage.removeItem('token')
        }
    }
}
export const login =  (username, password) => {
    return async dispatch => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING });
            const response = await axios.post(`${API_URL}api/login`, {
                username,
                password
            })
            dispatch({ type: ActionTypes.CLEAR_LOADING });
            dispatch({ type: ActionTypes.CLEAR_LOGIN_VALIDATE_ERRORS});
            dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: response.data.user })

            localStorage.setItem('token', response.data.token)
        } catch (e) {
            dispatch({ type: ActionTypes.CLEAR_LOADING });
            dispatch({ type: ActionTypes.LOGIN_FAIL })

            if (e.response?.data?.message) {
                dispatch({ type: ActionTypes.SET_MESSAGE, payload: e.response.data.message });
            } 

            if (e.response?.data?.errors) {
                dispatch({ type: ActionTypes.SET_LOGIN_VALIDATE_ERRORS, payload: e.response.data.errors });
            }
        }
    }
}

export const registration =  (username, password) => {
    return async dispatch => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING });
            dispatch({ type: ActionTypes.CLEAR_REGISTER_VALIDATE_ERRORS });

            const response = await axios.post(`${API_URL}api/registration`, {
                username,
                password
            })
            dispatch({ type: ActionTypes.CLEAR_LOADING });
            dispatch({ type: ActionTypes.REGISTER_SUCCESS })
            dispatch({ type: ActionTypes.SET_MESSAGE, payload: response.data.message });
        } catch (e) {
            dispatch({ type: ActionTypes.CLEAR_LOADING });
            dispatch({ type: ActionTypes.REGISTER_FAIL })

            if (e.response?.data?.message) {
                dispatch({ type: ActionTypes.SET_MESSAGE, payload: e.response.data.message });
            }      
            
            if (e.response?.data?.errors) {
                dispatch({ type: ActionTypes.SET_REGISTER_VALIDATE_ERRORS, payload: e.response.data.errors });
            }

            console.log(e);
        }
    }
}