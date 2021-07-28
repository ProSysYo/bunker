import { http } from "../../http-common"
import { messageActions } from "../reducers/message"
import { partisanshipActions } from "../reducers/partisanship"

export function getPartisanships() {
    return async dispatch => {
        try {
            dispatch(partisanshipActions.setLoading())
            const response = await http.get('/partisanship')
            dispatch(partisanshipActions.setAll(response.data))
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
            dispatch(partisanshipActions.clearLoading())
        }
    }
}

export const addPartisanship = (data) => {
    return async dispatch => {
        try {
            dispatch(partisanshipActions.setLoading())
            dispatch(partisanshipActions.clearErrors())
            const response = await http.post('/partisanship', data)
            dispatch(partisanshipActions.setAddStatus(true))                  
            dispatch(partisanshipActions.add(response.data.partisanship))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(partisanshipActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(partisanshipActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(partisanshipActions.clearLoading())
        }
    }
}

export const deletePartisanship = (id) => {
    return async dispatch => {
        try {
            dispatch(partisanshipActions.setLoading())
            const response = await http.delete(`/partisanship/${id}`)
            dispatch(partisanshipActions.deleteBy(id))
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
            dispatch(partisanshipActions.clearLoading())
        }
    }
}

export function getPartisanship(id) {
    return async dispatch => {
        try {
            dispatch(partisanshipActions.setLoading())
            const response = await http.get(`/partisanship/${id}`)
            dispatch(partisanshipActions.setSelected(response.data))
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
            dispatch(partisanshipActions.clearLoading())
        }
    }
}

export const updatePartisanship = (id, data) => {
    return async dispatch => {
        try {
            dispatch(partisanshipActions.setLoading())
            dispatch(partisanshipActions.clearErrors())
            const response = await http.patch(`/partisanship/${id}`, data)
            dispatch(partisanshipActions.setUpdateStatus(true))
            dispatch(partisanshipActions.update(response.data.partisanship))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(partisanshipActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(partisanshipActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(partisanshipActions.clearLoading())
        }
    }
}