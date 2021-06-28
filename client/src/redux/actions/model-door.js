import { http } from "../../http-common"
import { acClearLoading, acSetLoading } from "../reducers/loading"
import { acSetMessage } from "../reducers/message"
import { 
    acAddModelDoor, acClearModelDoorValidErrors, acDeleteModelDoor, acSetAddModelDoorStatus, 
    acSetModelDoors, 
    acSetModelDoorValidErrors,
    acSetSelectedModelDoor,
    acSetUpdateModelDoorStatus,
    acUpdateModelDoor
} from "../reducers/model-door"

export function getModelDoors() {
    return async dispatch => {
        try {            
            dispatch(acSetLoading())
            const response = await http.get('/modeldoor')            
            dispatch(acSetModelDoors(response.data))            
        } catch (e) {            
            if (e.response?.data?.message) dispatch(acSetMessage(e.response.data.message))
            console.log(e);                     
        } finally {
            dispatch(acClearLoading())
        }
    }
}

export const addModelDoor = (abbreviation, name) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearModelDoorValidErrors())
            const response = await http.post('/modeldoor', { abbreviation, name })            
            dispatch(acSetAddModelDoorStatus(true))
            dispatch(acAddModelDoor(response.data.modelDoor))
            dispatch(acSetMessage(response.data.message))            
        } catch (e) { 
            dispatch(acSetAddModelDoorStatus(false))
            if (e.response?.data?.message) dispatch(acSetMessage(e.response.data.message))
            if (e.response?.data?.errors) dispatch(acSetModelDoorValidErrors(e.response.data.errors))                     
        } finally {
            dispatch(acClearLoading())
        }
    }
}

export const deleteModelDoor = (id) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.delete(`/modeldoor/${id}`)            
            dispatch(acDeleteModelDoor(id))                      
            dispatch(acSetMessage(response.data.message))  
        } catch (e) {            
            if (e.response?.data?.message) dispatch(acSetMessage(e.response.data.message))                 
        } finally {
            dispatch(acClearLoading())
        }
    }
}

export function getModelDoor(id) {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get(`/modeldoor/${id}`)            
            dispatch(acSetSelectedModelDoor(response.data))
        } catch (e) {
            if (e.response?.data?.message) dispatch(acSetMessage(e.response.data.message))            
        } finally {
            dispatch(acClearLoading())
        }
    }
}

export const updateModelDoor = (id, data) => {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            dispatch(acClearModelDoorValidErrors())
            const response = await http.patch(`/modeldoor/${id}`, data)          
            dispatch(acSetUpdateModelDoorStatus(true))            
            dispatch(acUpdateModelDoor(response.data.model))
            dispatch(acSetMessage(response.data.message))            
        } catch (e) { 
            dispatch(acSetUpdateModelDoorStatus(false))            
            if (e.response?.data?.message) dispatch(acSetMessage(e.response.data.message))
            if (e.response?.data?.errors) dispatch(acSetModelDoorValidErrors(e.response.data.errors))
            console.log(e);            
        } finally {
            dispatch(acClearLoading())
        }
    }
}