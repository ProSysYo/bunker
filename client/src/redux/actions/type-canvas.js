import { http } from "../../http-common"

import { loadingActions } from "../reducers/loading"

import { messageActions } from "../reducers/message"
import { 
    acAddTypeCanvas, acClearTypeCanvasValidErrors, acDeleteTypeCanvas, 
    acSetAddTypeCanvasStatus, acSetSelectedTypeCanvas, acSetTypeCanvases, 
    acSetTypeCanvasValidErrors, acSetUpdateTypeCanvasStatus, acUpdateTypeCanvas 
} from "../reducers/type-canvas"

export function getTypeCanvases() {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get('/typecanvas')
            dispatch(acSetTypeCanvases(response.data))
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

export const addTypeCanvas = (data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(acClearTypeCanvasValidErrors())
            const response = await http.post('/typecanvas', data)
            dispatch(acSetAddTypeCanvasStatus(true))
            dispatch(acAddTypeCanvas(response.data.typeCanvas))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(acSetAddTypeCanvasStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetTypeCanvasValidErrors(e.response.data.errors))
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

export const deleteTypeCanvas = (id) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.delete(`/typecanvas/${id}`)
            dispatch(acDeleteTypeCanvas(id))
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

export function getTypeCanvas(id) {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get(`/typecanvas/${id}`)
            dispatch(acSetSelectedTypeCanvas(response.data))
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

export const updateTypeCanvas = (id, data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(acClearTypeCanvasValidErrors())
            const response = await http.patch(`/typecanvas/${id}`, data)
            dispatch(acSetUpdateTypeCanvasStatus(true))
            dispatch(acUpdateTypeCanvas(response.data.typeCanvas))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(acSetUpdateTypeCanvasStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetTypeCanvasValidErrors(e.response.data.errors))
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