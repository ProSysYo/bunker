import { http } from "../../http-common"
import { loadingActions } from "../reducers/loading"

import { messageActions } from "../reducers/message"
import { cylinderActions } from "../reducers/cylinder"

export function getCylinders() {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get('/cylinder')
            dispatch(cylinderActions.setAll(response.data))
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
            dispatch(loadingActions.clearLoading())
        }
    }
}

export const addCylinder = (data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(cylinderActions.clearErrors())
            const response = await http.post('/cylinder', data)
            dispatch(cylinderActions.setAddStatus(true))                  
            dispatch(cylinderActions.add(response.data.cylinder))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(cylinderActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(cylinderActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(loadingActions.clearLoading())
        }
    }
}

export const deleteCylinder = (id) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.delete(`/cylinder/${id}`)
            dispatch(cylinderActions.deleteBy(id))
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
            dispatch(loadingActions.clearLoading())
        }
    }
}

export function getCylinder(id) {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get(`/cylinder/${id}`)
            dispatch(cylinderActions.setSelected(response.data))
        } catch (e) {
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))                
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);
        } finally {
            dispatch(loadingActions.clearLoading())
        }
    }
}

export const updateCylinder = (id, data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(cylinderActions.clearErrors())
            const response = await http.patch(`/cylinder/${id}`, data)
            dispatch(cylinderActions.setUpdateStatus(true))
            dispatch(cylinderActions.update(response.data.cylinder))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(cylinderActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(cylinderActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(loadingActions.clearLoading())
        }
    }
}