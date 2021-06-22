import axios from "axios";
import { API_URL } from "../../config";
import { ActionTypes } from "../constants/action-types";

export function getCustomers() {
    return async dispatch => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING })

            const response = await axios.get(`${API_URL}api/customer`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
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