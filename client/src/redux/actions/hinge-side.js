import { http } from "../../http-common"
import { messageActions } from "../reducers/message"
import { hingeSideActions } from "../reducers/hinge-side"

export function getHingeSides() {
    return async dispatch => {
        try {
            dispatch(hingeSideActions.setLoading())
            const response = await http.get('/hingeside')
            dispatch(hingeSideActions.setAll(response.data))
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
            dispatch(hingeSideActions.clearLoading())
        }
    }
}

export const addHingeSide = (data) => {
    return async dispatch => {
        try {
            dispatch(hingeSideActions.setLoading())
            dispatch(hingeSideActions.clearErrors())
            const response = await http.post('/hingeside', data)
            dispatch(hingeSideActions.setAddStatus(true))                  
            dispatch(hingeSideActions.add(response.data.hingeSide))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(hingeSideActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(hingeSideActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(hingeSideActions.clearLoading())
        }
    }
}

export const deleteHingeSide = (id) => {
    return async dispatch => {
        try {
            dispatch(hingeSideActions.setLoading())
            const response = await http.delete(`/hingeside/${id}`)
            dispatch(hingeSideActions.deleteBy(id))
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
            dispatch(hingeSideActions.clearLoading())
        }
    }
}

export function getHingeSide(id) {
    return async dispatch => {
        try {
            dispatch(hingeSideActions.setLoading())
            const response = await http.get(`/hingeside/${id}`)
            dispatch(hingeSideActions.setSelected(response.data))
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
            dispatch(hingeSideActions.clearLoading())
        }
    }
}

export const updateHingeSide = (id, data) => {
    return async dispatch => {
        try {
            dispatch(hingeSideActions.setLoading())
            dispatch(hingeSideActions.clearErrors())
            const response = await http.patch(`/hingeside/${id}`, data)
            dispatch(hingeSideActions.setUpdateStatus(true))
            dispatch(hingeSideActions.update(response.data.hingeSide))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(hingeSideActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(hingeSideActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(hingeSideActions.clearLoading())
        }
    }
}