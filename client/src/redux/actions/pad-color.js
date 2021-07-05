import { http } from "../../http-common"

import { acClearLoading, acSetLoading } from "../reducers/loading"

import { acSetMessage } from "../reducers/message"
import { acAddPadColor, acClearPadColorValidErrors, acDeletePadColor, acSetAddPadColorStatus, acSetPadColors, acSetPadColorValidErrors, acSetSelectedPadColor, acSetUpdatePadColorStatus, acUpdatePadColor } from "../reducers/pad-color"

export function getPadColors() {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get('/padcolor')
            dispatch(acSetPadColors(response.data))
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

export const addPadColor = (data) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearPadColorValidErrors())
            const response = await http.post('/padcolor', data)
            dispatch(acSetAddPadColorStatus(true))
            dispatch(acAddPadColor(response.data.padColor))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acSetAddPadColorStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetPadColorValidErrors(e.response.data.errors))
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

export const deletePadColor = (id) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.delete(`/padcolor/${id}`)
            dispatch(acDeletePadColor(id))
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

export function getPadColor(id) {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get(`/padcolor/${id}`)
            dispatch(acSetSelectedPadColor(response.data))
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

export const updatePadColor = (id, data) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearPadColorValidErrors())
            const response = await http.patch(`/padcolor/${id}`, data)
            dispatch(acSetUpdatePadColorStatus(true))
            dispatch(acUpdatePadColor(response.data.padColor))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acSetUpdatePadColorStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetPadColorValidErrors(e.response.data.errors))
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