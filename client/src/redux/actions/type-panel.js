import { http } from "../../http-common"
import { messageActions } from "../reducers/message"
import { typePanelActions } from "../reducers/type-panel"

export function getTypePanels() {
    return async dispatch => {
        try {
            dispatch(typePanelActions.setLoading())
            const response = await http.get('/typepanel')
            dispatch(typePanelActions.setAll(response.data))
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
            dispatch(typePanelActions.clearLoading())
        }
    }
}

export const addTypePanel = (data) => {
    return async dispatch => {
        try {
            dispatch(typePanelActions.setLoading())
            dispatch(typePanelActions.clearErrors())
            const response = await http.post('/typepanel', data)
            dispatch(typePanelActions.setAddStatus(true))                  
            dispatch(typePanelActions.add(response.data.typePanel))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(typePanelActions.setAddStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(typePanelActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e)
        } finally {
            dispatch(typePanelActions.clearLoading())
        }
    }
}

export const deleteTypePanel = (id) => {
    return async dispatch => {
        try {
            dispatch(typePanelActions.setLoading())
            const response = await http.delete(`/typepanel/${id}`)
            dispatch(typePanelActions.deleteBy(id))
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
            dispatch(typePanelActions.clearLoading())
        }
    }
}

export function getTypePanel(id) {
    return async dispatch => {
        try {
            dispatch(typePanelActions.setLoading())
            const response = await http.get(`/typepanel/${id}`)
            dispatch(typePanelActions.setSelected(response.data))
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
            dispatch(typePanelActions.clearLoading())
        }
    }
}

export const updateTypePanel = (id, data) => {
    return async dispatch => {
        try {
            dispatch(typePanelActions.setLoading())
            dispatch(typePanelActions.clearErrors())
            const response = await http.patch(`/typepanel/${id}`, data)
            dispatch(typePanelActions.setUpdateStatus(true))
            dispatch(typePanelActions.update(response.data.typePanel))
            dispatch(messageActions.setMessage(response.data.message))
        } catch (e) {
            dispatch(typePanelActions.setUpdateStatus(false))
            if (e.response) {
                if (e.response.data?.message) dispatch(messageActions.setMessage(e.response.data.message))
                if (e.response.data?.errors) dispatch(typePanelActions.setErrors(e.response.data.errors))
            } else if (e.isAxiosError && !e.response) {
                dispatch(messageActions.setMessage("Нет соединения с сервером"))                
            } else {
                dispatch(messageActions.setMessage(e.message))                
            }
            console.log(e);            
        } finally {
            dispatch(typePanelActions.clearLoading())
        }
    }
}