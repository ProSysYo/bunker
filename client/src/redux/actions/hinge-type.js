import { http } from "../../http-common"
import { messageActions } from "../reducers/message"
import { hingeTypeActions } from "../reducers/hinge-type"

export function getHingeTypes() {
    return async dispatch => {
        try {
            dispatch(hingeTypeActions.setLoading())
            const response = await http.get('/hingetype')
            dispatch(hingeTypeActions.setAll(response.data))
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
            dispatch(hingeTypeActions.clearLoading())
        }
    }
}

export const addHingeType = (data) => {
    return async dispatch => {
        try {
            dispatch(hingeTypeActions.setLoading())
            dispatch(hingeTypeActions.clearErrors())
            const response = await http.post('/hingetype', data)
            dispatch(hingeTypeActions.setAddStatus(true))                  
            dispatch(hingeTypeActions.add(response.data.hingeType))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(hingeTypeActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(hingeTypeActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(hingeTypeActions.clearLoading())
        }
    }
}

export const deleteHingeType = (id) => {
    return async dispatch => {
        try {
            dispatch(hingeTypeActions.setLoading())
            const response = await http.delete(`/hingetype/${id}`)
            dispatch(hingeTypeActions.deleteBy(id))
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
            dispatch(hingeTypeActions.clearLoading())
        }
    }
}

export function getHingeType(id) {
    return async dispatch => {
        try {
            dispatch(hingeTypeActions.setLoading())
            const response = await http.get(`/hingetype/${id}`)
            dispatch(hingeTypeActions.setSelected(response.data))
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
            dispatch(hingeTypeActions.clearLoading())
        }
    }
}

export const updateHingeType = (id, data) => {
    return async dispatch => {
        try {
            dispatch(hingeTypeActions.setLoading())
            dispatch(hingeTypeActions.clearErrors())
            const response = await http.patch(`/hingetype/${id}`, data)
            dispatch(hingeTypeActions.setUpdateStatus(true))
            dispatch(hingeTypeActions.update(response.data.hingeType))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(hingeTypeActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(hingeTypeActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(hingeTypeActions.clearLoading())
        }
    }
}