import { http } from "../../http-common";

import { customerActions } from "../reducers/customer";
import { messageActions } from "../reducers/message";

export function getCustomers() {
    return async dispatch => {
        try {
            dispatch(customerActions.setLoading())
            const response = await http.get('/customer')
            dispatch(customerActions.setAll(response.data))
        } catch (e) {
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))                
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }   
            console.log(e)
        } finally {
            dispatch(customerActions.clearLoading())
        }
    }
}

export const addCustomer = (data) => {
    return async dispatch => {
        try {
            dispatch(customerActions.setLoading())
            dispatch(customerActions.clearErrors())
            const response = await http.post('/customer', data)
            dispatch(customerActions.setAddStatus(true))
            dispatch(customerActions.add(response.data.customer))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(customerActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(customerActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(customerActions.clearLoading())
        }
    }
}

export const deleteCustomer = (id) => {
    return async dispatch => {
        try {
            dispatch(customerActions.setLoading())
            const response = await http.delete(`/customer/${id}`)
            dispatch(customerActions.deleteBy(id))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {            
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))                
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(customerActions.clearLoading())
        }
    }
}

export function getCustomer(id) {
    return async dispatch => {
        try {
            dispatch(customerActions.setLoading())
            const response = await http.get(`/customer/${id}`)
            dispatch(customerActions.setSelected(response.data))
        } catch (e) {            
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))                
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(customerActions.clearLoading())
        }
    }
}

export const updateCustomer = (id, data) => {
    return async dispatch => {
        try {
            dispatch(customerActions.setLoading())
            dispatch(customerActions.clearErrors())
            const response = await http.patch(`/customer/${id}`, data)
            dispatch(customerActions.setUpdateStatus(true))
            dispatch(customerActions.update(response.data.customer))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(customerActions.setUpdateStatus(false))            
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(customerActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(customerActions.clearLoading())
        }
    }
}