import { http } from "../../http-common"
import { loadingActions } from "../reducers/loading"

import { messageActions } from "../reducers/message"
import { handleActions } from "../reducers/handle"

export function getHandles() {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get('/handle')
            dispatch(handleActions.setAll(response.data))
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

export const addHandle = (data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(handleActions.clearErrors())
            const response = await http.post('/handle', data)
            dispatch(handleActions.setAddStatus(true))                  
            dispatch(handleActions.add(response.data.handle))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(handleActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(handleActions.setErrors(e.response.data.errors))
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

export const deleteHandle = (id) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.delete(`/handle/${id}`)
            dispatch(handleActions.deleteBy(id))
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

export function getHandle(id) {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get(`/handle/${id}`)
            dispatch(handleActions.setSelected(response.data))
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

export const updateHandle = (id, data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(handleActions.clearErrors())
            const response = await http.patch(`/handle/${id}`, data)
            dispatch(handleActions.setUpdateStatus(true))
            dispatch(handleActions.update(response.data.handle))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(handleActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(handleActions.setErrors(e.response.data.errors))
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