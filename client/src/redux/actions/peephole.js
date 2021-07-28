import { http } from "../../http-common"
import { messageActions } from "../reducers/message"
import { peepholeActions } from "../reducers/peephole"

export function getPeepholes() {
    return async dispatch => {
        try {
            dispatch(peepholeActions.setLoading())
            const response = await http.get('/peephole')
            dispatch(peepholeActions.setAll(response.data))
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
            dispatch(peepholeActions.clearLoading())
        }
    }
}

export const addPeephole = (data) => {
    return async dispatch => {
        try {
            dispatch(peepholeActions.setLoading())
            dispatch(peepholeActions.clearErrors())
            const response = await http.post('/peephole', data)
            dispatch(peepholeActions.setAddStatus(true))                  
            dispatch(peepholeActions.add(response.data.peephole))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(peepholeActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(peepholeActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(peepholeActions.clearLoading())
        }
    }
}

export const deletePeephole = (id) => {
    return async dispatch => {
        try {
            dispatch(peepholeActions.setLoading())
            const response = await http.delete(`/peephole/${id}`)
            dispatch(peepholeActions.deleteBy(id))
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
            dispatch(peepholeActions.clearLoading())
        }
    }
}

export function getPeephole(id) {
    return async dispatch => {
        try {
            dispatch(peepholeActions.setLoading())
            const response = await http.get(`/peephole/${id}`)
            dispatch(peepholeActions.setSelected(response.data))
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
            dispatch(peepholeActions.clearLoading())
        }
    }
}

export const updatePeephole = (id, data) => {
    return async dispatch => {
        try {
            dispatch(peepholeActions.setLoading())
            dispatch(peepholeActions.clearErrors())
            const response = await http.patch(`/peephole/${id}`, data)
            dispatch(peepholeActions.setUpdateStatus(true))
            dispatch(peepholeActions.update(response.data.peephole))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(peepholeActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(peepholeActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(peepholeActions.clearLoading())
        }
    }
}