import { http } from "../../http-common"

import { acClearLoading, acSetLoading } from "../reducers/loading"

import { acAddLock, acClearLockValidErrors, acDeleteLock, acSetAddLockStatus, 
    acSetLocks, acSetLockValidErrors, acSetSelectedLock,
    acSetUpdateLockStatus, acUpdateLock
} from "../reducers/lock"

import { acSetMessage } from "../reducers/message"

export function getLocks() {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get('/lock')
            dispatch(acSetLocks(response.data))
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

export const addLock = (name, type, insertPlace, isLatch) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearLockValidErrors())
            const response = await http.post('/lock', { name, type, insertPlace, isLatch })
            dispatch(acSetAddLockStatus(true))
            dispatch(acAddLock(response.data.lock))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acSetAddLockStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetLockValidErrors(e.response.data.errors))
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

export const deleteLock = (id) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.delete(`/lock/${id}`)
            dispatch(acDeleteLock(id))
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

export function getLock(id) {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get(`/lock/${id}`)
            dispatch(acSetSelectedLock(response.data))
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

export const updateLock = (id, data) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearLockValidErrors())
            const response = await http.patch(`/lock/${id}`, data)
            dispatch(acSetUpdateLockStatus(true))
            dispatch(acUpdateLock(response.data.lock))
            dispatch(acSetMessage(response.data.message))
        } catch (e) {
            dispatch(acSetUpdateLockStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(acSetMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetLockValidErrors(e.response.data.errors))
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