import { http } from "../../http-common"

import { boltActions} from "../reducers/bolt"

import { messageActions } from "../reducers/message"

export function getBolts() {
    return async dispatch => {
        try {
            dispatch(boltActions.setLoading())
            const response = await http.get('/bolt')
            dispatch(boltActions.setAll(response.data))
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
            dispatch(boltActions.clearLoading())
        }
    }
}

export const addBolt = (data) => {
    return async dispatch => {
        try {
            dispatch(boltActions.setLoading())
            dispatch(boltActions.clearErrors())
            const response = await http.post('/bolt', data)
            dispatch(boltActions.setAddStatus(true))
            dispatch(boltActions.add(response.data.bolt))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(boltActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(boltActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(boltActions.clearLoading())
        }
    }
}

export const deleteBolt = (id) => {
    return async dispatch => {
        try {
            dispatch(boltActions.setLoading())
            const response = await http.delete(`/bolt/${id}`)
            dispatch(boltActions.deleteBy(id))
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
            dispatch(boltActions.clearLoading())
        }
    }
}

export function getBolt(id) {
    return async dispatch => {
        try {
            dispatch(boltActions.setLoading())
            const response = await http.get(`/bolt/${id}`)
            dispatch(boltActions.setSelected(response.data))
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
            dispatch(boltActions.clearLoading())
        }
    }
}

export const updateBolt = (id, data) => {
    return async dispatch => {
        try {
            dispatch(boltActions.setLoading())
            dispatch(boltActions.clearErrors())
            const response = await http.patch(`/bolt/${id}`, data)
            dispatch(boltActions.setUpdateStatus(true))
            dispatch(boltActions.update(response.data.bolt))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(boltActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(boltActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(boltActions.clearLoading())
        }
    }
}