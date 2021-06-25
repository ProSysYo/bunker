import { http } from "../../http-common"
import { acClearLoading, acSetLoading } from "../reducers/loading"
import { acSetMessage } from "../reducers/message"
import { acSetModelDoors } from "../reducers/model-door"

export function getModelDoors() {
    return async dispatch => {
        try {
            dispatch(acSetLoading())
            const response = await http.get('/modeldoor')            
            dispatch(acSetModelDoors(response.data))
            
        } catch (e) {            
            if (e.response?.data?.message) dispatch(acSetMessage(e.response.data.message))            
        } finally {
            dispatch(acClearLoading())
        }
    }
}