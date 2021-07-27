import { http } from "../../http-common"
import { loadingActions } from "../reducers/loading"

import { messageActions } from "../reducers/message"
import { packagingActions } from "../reducers/packaging"

export function getPackagings() {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get('/packaging')
            dispatch(packagingActions.setAll(response.data))
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

export const addPackaging = (data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(packagingActions.clearErrors())
            const response = await http.post('/packaging', data)
            dispatch(packagingActions.setAddStatus(true))                  
            dispatch(packagingActions.add(response.data.packaging))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(packagingActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(packagingActions.setErrors(e.response.data.errors))
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

export const deletePackaging = (id) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.delete(`/packaging/${id}`)
            dispatch(packagingActions.deleteBy(id))
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

export function getPackaging(id) {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get(`/packaging/${id}`)
            dispatch(packagingActions.setSelected(response.data))
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

export const updatePackaging = (id, data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(packagingActions.clearErrors())
            const response = await http.patch(`/packaging/${id}`, data)
            dispatch(packagingActions.setUpdateStatus(true))
            dispatch(packagingActions.update(response.data.packaging))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(packagingActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(packagingActions.setErrors(e.response.data.errors))
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