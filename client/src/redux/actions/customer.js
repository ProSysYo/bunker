import axios from "axios";
import { API_URL } from "../../config";
import { ActionTypes } from "../constants/action-types";

export function getCustomers() {
    return async dispatch => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING })

            const response = await axios.get(`${API_URL}api/customer`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            )
            dispatch({ type: ActionTypes.SET_CUSTOMERS, payload: response.data })
        } catch (e) {
            if (e.response?.data?.message) {
                dispatch({ type: ActionTypes.SET_MESSAGE, payload: e.response.data.message });
            }
        } finally {
            dispatch({ type: ActionTypes.CLEAR_LOADING });
        }
    }
}

export const addCustomer = (code, name, phone, email, adress) => {
    return async dispatch => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING });
            dispatch({ type: ActionTypes.CLEAR_CUSTOMER_VALIDATE_ERRORS });

            const response = await axios.post(`${API_URL}api/customer`, {
                code,
                name,
                phone,
                email,
                adress
            })
            dispatch({ type: ActionTypes.ADD_CUSTOMER_STATUS, payload: true })
            dispatch({ type: ActionTypes.ADD_CUSTOMER, payload: response.data.customer })
            dispatch({ type: ActionTypes.SET_MESSAGE, payload: response.data.message });
        } catch (e) {            
            dispatch({ type: ActionTypes.ADD_CUSTOMER_FAIL })
            dispatch({ type: ActionTypes.ADD_CUSTOMER_STATUS, payload: false })
            if (e.response?.data?.message) {
                dispatch({ type: ActionTypes.SET_MESSAGE, payload: e.response.data.message });
            }

            if (e.response?.data?.errors) {
                dispatch({ type: ActionTypes.SET_CUSTOMER_VALIDATE_ERRORS, payload: e.response.data.errors });
            }
        } finally {
            dispatch({ type: ActionTypes.CLEAR_LOADING });
        }
    }
}
