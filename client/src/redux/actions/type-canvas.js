import { http } from "../../http-common"
import { messageActions } from "../reducers/message"
import { typeCanvasActions } from "../reducers/type-canvas"

export function getTypeCanvases() {
    return async dispatch => {
        try {
            dispatch(typeCanvasActions.setLoading())
            const response = await http.get('/typecanvas')
            dispatch(typeCanvasActions.setAll(response.data))
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
            dispatch(typeCanvasActions.clearLoading())
        }
    }
}

export const addTypeCanvas = (data) => {
    return async dispatch => {
        try {
            dispatch(typeCanvasActions.setLoading())
            dispatch(typeCanvasActions.clearErrors())
            const response = await http.post('/typecanvas', data)
            dispatch(typeCanvasActions.setAddStatus(true))
            dispatch(typeCanvasActions.add(response.data.typeCanvas))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(typeCanvasActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(typeCanvasActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(typeCanvasActions.clearLoading())
        }
    }
}

export const deleteTypeCanvas = (id) => {
    return async dispatch => {
        try {
            dispatch(typeCanvasActions.setLoading())
            const response = await http.delete(`/typecanvas/${id}`)
            dispatch(typeCanvasActions.deleteBy(id))
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
            dispatch(typeCanvasActions.clearLoading())
        }
    }
}

export function getTypeCanvas(id) {
    return async dispatch => {
        try {
            dispatch(typeCanvasActions.setLoading())
            const response = await http.get(`/typecanvas/${id}`)
            dispatch(typeCanvasActions.setSelected(response.data))
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
            dispatch(typeCanvasActions.clearLoading())
        }
    }
}

export const updateTypeCanvas = (id, data) => {
    return async dispatch => {
        try {
            dispatch(typeCanvasActions.setLoading())
            dispatch(typeCanvasActions.clearErrors())
            const response = await http.patch(`/typecanvas/${id}`, data)
            dispatch(typeCanvasActions.setUpdateStatus(true))
            dispatch(typeCanvasActions.update(response.data.typeCanvas))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(typeCanvasActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(typeCanvasActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(typeCanvasActions.clearLoading())
        }
    }
}