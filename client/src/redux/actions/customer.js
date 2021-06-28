import { http } from "../../http-common";

import {
    acAddCustomer, acClearCastomerValidateErrors, acDeleteCustomer,
    acSetAddCustomerStatus, acSetCustomers, acSetCustomerValidateErrors,
    acSetSelectedCustomer, acSetUpdateCustomerStatus, acUpdateCustomer
} from "../reducers/customer";

import { acClearLoading, acSetLoading } from "../reducers/loading";
import { acSetMessage } from "../reducers/message";

export function getCustomers() {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get('/customer')
            dispatch(acSetCustomers(response.data))
        } catch (e) {
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))                
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

export const addCustomer = (code, name, phone, email, adress) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearCastomerValidateErrors())
            const response = await http.post('/customer', { code, name, phone, email, adress })
            dispatch(acSetAddCustomerStatus(true))
            dispatch(acAddCustomer(response.data.customer))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acSetAddCustomerStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetCustomerValidateErrors(e.response.data.errors))
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

export const deleteCustomer = (id) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.delete(`/customer/${id}`)
            dispatch(acDeleteCustomer(id))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {            
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))                
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

export function getCustomer(id) {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get(`/customer/${id}`)
            dispatch(acSetSelectedCustomer(response.data))
        } catch (e) {            
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))                
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

export const updateCustomer = (id, data) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearCastomerValidateErrors())
            const response = await http.patch(`/customer/${id}`, data)
            dispatch(acSetUpdateCustomerStatus(true))
            dispatch(acUpdateCustomer(response.data.customer))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acSetUpdateCustomerStatus(false))            
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetCustomerValidateErrors(e.response.data.errors))
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