import { http } from "../../http-common"

import { loadingActions } from "../reducers/loading"

import { acAddLock, acClearLockValidErrors, acDeleteLock, acSetAddLockStatus, 
    acSetLocks, acSetLockValidErrors, acSetSelectedLock,
    acSetUpdateLockStatus, acUpdateLock
} from "../reducers/lock"

import { messageActions } from "../reducers/message"

export function getLocks() {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get('/lock')
            dispatch(acSetLocks(response.data))
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

export const addLock = (name, type, insertPlace, isLatch) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(acClearLockValidErrors())
            const response = await http.post('/lock', { name, type, insertPlace, isLatch })
            dispatch(acSetAddLockStatus(true))
            dispatch(acAddLock(response.data.lock))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(acSetAddLockStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetLockValidErrors(e.response.data.errors))
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

export const deleteLock = (id) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.delete(`/lock/${id}`)
            dispatch(acDeleteLock(id))
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

export function getLock(id) {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            const response = await http.get(`/lock/${id}`)
            dispatch(acSetSelectedLock(response.data))
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

export const updateLock = (id, data) => {
    return async dispatch => {
        try {
            dispatch(loadingActions.setLoading())
            dispatch(acClearLockValidErrors())
            const response = await http.patch(`/lock/${id}`, data)
            dispatch(acSetUpdateLockStatus(true))
            dispatch(acUpdateLock(response.data.lock))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(acSetUpdateLockStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(acSetLockValidErrors(e.response.data.errors))
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