import { http } from "../../http-common"
import { loadingActions } from "../reducers/loading"

import { messageActions } from "../reducers/message"
import { peepholeLocationActions } from "../reducers/peephole-location"

export function getPeepholeLocations() {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get('/peepholelocation')
            dispatch(peepholeLocationActions.setAll(response.data))
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

export const addPeepholeLocation = (data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(peepholeLocationActions.clearErrors())
            const response = await http.post('/peepholelocation', data)
            dispatch(peepholeLocationActions.setAddStatus(true))                  
            dispatch(peepholeLocationActions.add(response.data.peepholeLocation))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(peepholeLocationActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(peepholeLocationActions.setErrors(e.response.data.errors))
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

export const deletePeepholeLocation = (id) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.delete(`/peepholelocation/${id}`)
            dispatch(peepholeLocationActions.deleteBy(id))
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

export function getPeepholeLocation(id) {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get(`/peepholelocation/${id}`)
            dispatch(peepholeLocationActions.setSelected(response.data))
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

export const updatePeepholeLocation = (id, data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(peepholeLocationActions.clearErrors())
            const response = await http.patch(`/peepholelocation/${id}`, data)
            dispatch(peepholeLocationActions.setUpdateStatus(true))
            dispatch(peepholeLocationActions.update(response.data.peepholeLocation))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(peepholeLocationActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(peepholeLocationActions.setErrors(e.response.data.errors))
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