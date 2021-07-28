import { http } from "../../http-common"
import { messageActions } from "../reducers/message"
import { wrapActions } from "../reducers/wrap"

export function getWraps() {
    return async dispatch => {
        try {
            dispatch(wrapActions.setLoading())
            const response = await http.get('/wrap')
            dispatch(wrapActions.setAll(response.data))
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
            dispatch(wrapActions.clearLoading())
        }
    }
}

export const addWrap = (data) => {
    return async dispatch => {
        try {
            dispatch(wrapActions.setLoading())
            dispatch(wrapActions.clearErrors())
            const response = await http.post('/wrap', data)
            dispatch(wrapActions.setAddStatus(true))                  
            dispatch(wrapActions.add(response.data.wrap))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(wrapActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(wrapActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(wrapActions.clearLoading())
        }
    }
}

export const deleteWrap = (id) => {
    return async dispatch => {
        try {
            dispatch(wrapActions.setLoading())
            const response = await http.delete(`/wrap/${id}`)
            dispatch(wrapActions.deleteBy(id))
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
            dispatch(wrapActions.clearLoading())
        }
    }
}

export function getWrap(id) {
    return async dispatch => {
        try {
            dispatch(wrapActions.setLoading())
            const response = await http.get(`/wrap/${id}`)
            dispatch(wrapActions.setSelected(response.data))
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
            dispatch(wrapActions.clearLoading())
        }
    }
}

export const updateWrap = (id, data) => {
    return async dispatch => {
        try {
            dispatch(wrapActions.setLoading())
            dispatch(wrapActions.clearErrors())
            const response = await http.patch(`/wrap/${id}`, data)
            dispatch(wrapActions.setUpdateStatus(true))
            dispatch(wrapActions.update(response.data.wrap))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(wrapActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(wrapActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(wrapActions.clearLoading())
        }
    }
}