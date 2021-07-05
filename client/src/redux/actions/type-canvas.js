import { http } from "../../http-common"

import { acClearLoading, acSetLoading } from "../reducers/loading"

import { acSetMessage } from "../reducers/message"
import { 
    acAddTypeCanvas, acClearTypeCanvasValidErrors, acDeleteTypeCanvas, 
    acSetAddTypeCanvasStatus, acSetSelectedTypeCanvas, acSetTypeCanvases, 
    acSetTypeCanvasValidErrors, acSetUpdateTypeCanvasStatus, acUpdateTypeCanvas 
} from "../reducers/type-canvas"

export function getTypeCanvases() {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get('/typecanvas')
            dispatch(acSetTypeCanvases(response.data))
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

export const addTypeCanvas = (data) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearTypeCanvasValidErrors())
            const response = await http.post('/typecanvas', data)
            dispatch(acSetAddTypeCanvasStatus(true))
            dispatch(acAddTypeCanvas(response.data.typeCanvas))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acSetAddTypeCanvasStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetTypeCanvasValidErrors(e.response.data.errors))
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

export const deleteTypeCanvas = (id) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.delete(`/typecanvas/${id}`)
            dispatch(acDeleteTypeCanvas(id))
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

export function getTypeCanvas(id) {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get(`/typecanvas/${id}`)
            dispatch(acSetSelectedTypeCanvas(response.data))
        } catch (e) {
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))                
            } else if (e.isAxiosError && !e.response) {
                dispatch(acSetMessage("Нет соединения с сервером"))                
            } else {
                dispatch(acSetMessage(e.message))                
            }
            console.log(e);
        } finally {
            dispatch(acClearLoading())
        }
    }
}

export const updateTypeCanvas = (id, data) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearTypeCanvasValidErrors())
            const response = await http.patch(`/typecanvas/${id}`, data)
            dispatch(acSetUpdateTypeCanvasStatus(true))
            dispatch(acUpdateTypeCanvas(response.data.typeCanvas))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acSetUpdateTypeCanvasStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetTypeCanvasValidErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(acSetMessage("Нет соединения с сервером"))                
            } else {
                dispatch(acSetMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(acClearLoading())
        }
    }
}