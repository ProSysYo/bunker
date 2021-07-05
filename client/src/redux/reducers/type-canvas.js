import { TypeCanvasTypes } from '../constants/type-canvas-types'

const initialState = {
    typeCanvases: [],
    typeCanvas: null,
    typeCanvasValidErrors: {},
    submitSuccess: false,
}

export const typeCanvasReducer = (state = initialState, action) => {
    switch (action.type) {
        case TypeCanvasTypes.SET_TYPE_CANVASES: return { ...state, typeCanvases: action.payload }
        case TypeCanvasTypes.SET_ADD_TYPE_CANVAS_STATUS: return { ...state, submitSuccess: action.payload }
        case TypeCanvasTypes.ADD_TYPE_CANVAS: return { ...state, typeCanvases: [...state.typeCanvases, action.payload] }
        case TypeCanvasTypes.SET_TYPE_CANVAS_VALID_ERRORS: return { ...state, typeCanvasValidErrors: action.payload }
        case TypeCanvasTypes.CLEAR_TYPE_CANVAS_VALID_ERRORS: return { ...state, typeCanvasValidErrors: {}, submitSuccess: false}
        case TypeCanvasTypes.DELETE_TYPE_CANVAS: return {
            ...state,
            typeCanvases: [...state.typeCanvases.filter(typeCanvas => typeCanvas._id !== action.payload)]
        }
        case TypeCanvasTypes.SET_SELECTED_TYPE_CANVAS: return { ...state, typeCanvas: action.payload }
        case TypeCanvasTypes.REMOVE_SELECTED_TYPE_CANVAS: return { ...state, typeCanvas: null }
        case TypeCanvasTypes.UPDATE_TYPE_CANVAS: return {
            ...state,
            typeCanvases: [...state.typeCanvases.map((typeCanvas) => {
                if (typeCanvas._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return typeCanvas
                }
            })]           
        }
        case TypeCanvasTypes.SET_UPDATE_TYPE_CANVAS_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

export const acSetTypeCanvases = (typeCanvases) => ({ type: TypeCanvasTypes.SET_TYPE_CANVASES, payload: typeCanvases})

export const acSetAddTypeCanvasStatus = (isSuccess) => ({ type: TypeCanvasTypes.SET_ADD_TYPE_CANVAS_STATUS, payload: isSuccess })

export const acAddTypeCanvas = (typeCanvas) => ({ type: TypeCanvasTypes.ADD_TYPE_CANVAS, payload: typeCanvas })

export const acSetTypeCanvasValidErrors = (errors) => ({ type: TypeCanvasTypes.SET_TYPE_CANVAS_VALID_ERRORS, payload: errors })

export const acClearTypeCanvasValidErrors = () => ({ type: TypeCanvasTypes.CLEAR_TYPE_CANVAS_VALID_ERRORS })

export const acDeleteTypeCanvas = (id) => ({ type: TypeCanvasTypes.DELETE_TYPE_CANVAS, payload: id })

export const acSetSelectedTypeCanvas = (typeCanvas) => ({ type: TypeCanvasTypes.SET_SELECTED_TYPE_CANVAS, payload: typeCanvas })

export const acRemoveSelectedTypeCanvas = () => ({ type: TypeCanvasTypes.REMOVE_SELECTED_TYPE_CANVAS})

export const acUpdateTypeCanvas = (typeCanvas) => ({ type: TypeCanvasTypes.UPDATE_TYPE_CANVAS, payload: typeCanvas })

export const acSetUpdateTypeCanvasStatus = (isSuccess) => ({ type: TypeCanvasTypes.SET_UPDATE_TYPE_CANVAS_STATUS, payload: isSuccess })