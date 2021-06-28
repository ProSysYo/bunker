import { ModelDoorTypes } from '../constants/model-door-types'

const initialState = {
    modelDoors: [],
    modelDoor: null,
    modelDoorValidErrors: {},
    submitSuccess: false,
}

export const modelDoorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ModelDoorTypes.SET_MODEL_DOORS: return { ...state, modelDoors: action.payload }
        case ModelDoorTypes.SET_ADD_MODEL_DOOR_STATUS: return { ...state, submitSuccess: action.payload }
        case ModelDoorTypes.ADD_MODEL_DOOR: return { ...state, modelDoors: [...state.modelDoors, action.payload] }
        case ModelDoorTypes.SET_MODEL_DOOR_VALID_ERRORS: return { ...state, modelDoorValidErrors: action.payload }
        case ModelDoorTypes.CLEAR_MODEL_DOOR_VALID_ERRORS: return { ...state, modelDoorValidErrors: {}, submitSuccess: false}
        case ModelDoorTypes.DELETE_MODEL_DOOR: return {
            ...state,
            modelDoors: [...state.modelDoors.filter(model => model._id !== action.payload)]
        }
        case ModelDoorTypes.SET_SELECTED_MODEL_DOOR: return { ...state, modelDoor: action.payload }
        case ModelDoorTypes.REMOVE_SELECTED_MODEL_DOOR: return { ...state, modelDoor: null }
        case ModelDoorTypes.UPDATE_MODEL_DOOR: return {
            ...state,
            modelDoors: [...state.modelDoors.map((model) => {
                if (model._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return model
                }
            })]           
        }
        case ModelDoorTypes.SET_UPDATE_MODEL_DOOR_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

export const acSetModelDoors = (models) => ({ type: ModelDoorTypes.SET_MODEL_DOORS, payload: models})

export const acSetAddModelDoorStatus = (isSuccess) => ({ type: ModelDoorTypes.SET_ADD_MODEL_DOOR_STATUS, payload: isSuccess })

export const acAddModelDoor = (model) => ({ type: ModelDoorTypes.ADD_MODEL_DOOR, payload: model })

export const acSetModelDoorValidErrors = (errors) => ({ type: ModelDoorTypes.SET_MODEL_DOOR_VALID_ERRORS, payload: errors })

export const acClearModelDoorValidErrors = () => ({ type: ModelDoorTypes.CLEAR_MODEL_DOOR_VALID_ERRORS })

export const acDeleteModelDoor = (id) => ({ type: ModelDoorTypes.DELETE_MODEL_DOOR, payload: id })

export const acSetSelectedModelDoor = (model) => ({ type: ModelDoorTypes.SET_SELECTED_MODEL_DOOR, payload: model })

export const acRemoveSelectedModelDoor = () => ({ type: ModelDoorTypes.REMOVE_SELECTED_MODEL_DOOR })

export const acUpdateModelDoor = (model) => ({ type: ModelDoorTypes.UPDATE_MODEL_DOOR, payload: model })

export const acSetUpdateModelDoorStatus = (isSuccess) => ({ type: ModelDoorTypes.SET_UPDATE_MODEL_DOOR_STATUS, payload: isSuccess })