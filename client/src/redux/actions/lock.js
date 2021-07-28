import { http } from "../../http-common"
import { lockActions} from "../reducers/lock"
import { messageActions } from "../reducers/message"

export function getLocks() {
    return async dispatch => {
        try {
            dispatch(lockActions.setLoading())
            const response = await http.get('/lock')
            dispatch(lockActions.setAll(response.data))
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
            dispatch(lockActions.clearLoading())
        }
    }
}

export const addLock = (name, type, insertPlace, isLatch) => {
    return async dispatch => {
        try {
            dispatch(lockActions.setLoading())
            dispatch(lockActions.clearErrors())
            const response = await http.post('/lock', { name, type, insertPlace, isLatch })
            dispatch(lockActions.setAddStatus(true))
            dispatch(lockActions.add(response.data.lock))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(lockActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(lockActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(lockActions.clearLoading())
        }
    }
}

export const deleteLock = (id) => {
    return async dispatch => {
        try {
            dispatch(lockActions.setLoading())
            const response = await http.delete(`/lock/${id}`)
            dispatch(lockActions.deleteBy(id))
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
            dispatch(lockActions.clearLoading())
        }
    }
}

export function getLock(id) {
    return async dispatch => {
        try {
            dispatch(lockActions.setLoading())
            const response = await http.get(`/lock/${id}`)
            dispatch(lockActions.setSelected(response.data))
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
            dispatch(lockActions.clearLoading())
        }
    }
}

export const updateLock = (id, data) => {
    return async dispatch => {
        try {
            dispatch(lockActions.setLoading())
            dispatch(lockActions.clearErrors())
            const response = await http.patch(`/lock/${id}`, data)
            dispatch(lockActions.setUpdateStatus(true))
            dispatch(lockActions.update(response.data.lock))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(lockActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(lockActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(lockActions.clearLoading())
        }
    }
}