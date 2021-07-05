import { PadColorTypes } from '../constants/pad-color-types'

const initialState = {
    padColors: [],
    padColor: null,
    padColorValidErrors: {},
    submitSuccess: false,
}

export const padColorReducer = (state = initialState, action) => {
    switch (action.type) {
        case PadColorTypes.SET_PAD_COLORS: return { ...state, padColors: action.payload }
        case PadColorTypes.SET_ADD_PAD_COLOR_STATUS: return { ...state, submitSuccess: action.payload }
        case PadColorTypes.ADD_PAD_COLOR: return { ...state, padColors: [...state.padColors, action.payload] }
        case PadColorTypes.SET_PAD_COLOR_VALID_ERRORS: return { ...state, padColorValidErrors: action.payload }
        case PadColorTypes.CLEAR_PAD_COLOR_VALID_ERRORS: return { ...state, padColorValidErrors: {}, submitSuccess: false}
        case PadColorTypes.DELETE_PAD_COLOR: return {
            ...state,
            padColors: [...state.padColors.filter(padColor => padColor._id !== action.payload)]
        }
        case PadColorTypes.SET_SELECTED_PAD_COLOR: return { ...state, padColor: action.payload }
        case PadColorTypes.REMOVE_SELECTED_PAD_COLOR: return { ...state, padColor: null }
        case PadColorTypes.UPDATE_PAD_COLOR: return {
            ...state,
            padColors: [...state.padColors.map((padColor) => {
                if (padColor._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return padColor
                }
            })]           
        }
        case PadColorTypes.SET_UPDATE_PAD_COLOR_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

export const acSetPadColors = (padColors) => ({ type: PadColorTypes.SET_PAD_COLORS, payload: padColors})

export const acSetAddPadColorStatus = (isSuccess) => ({ type: PadColorTypes.SET_ADD_PAD_COLOR_STATUS, payload: isSuccess })

export const acAddPadColor = (padColor) => ({ type: PadColorTypes.ADD_PAD_COLOR, payload: padColor })

export const acSetPadColorValidErrors = (errors) => ({ type: PadColorTypes.SET_PAD_COLOR_VALID_ERRORS, payload: errors })

export const acClearPadColorValidErrors = () => ({ type: PadColorTypes.CLEAR_PAD_COLOR_VALID_ERRORS })

export const acDeletePadColor = (id) => ({ type: PadColorTypes.DELETE_PAD_COLOR, payload: id })

export const acSetSelectedPadColor = (padColor) => ({ type: PadColorTypes.SET_SELECTED_PAD_COLOR, payload: padColor })

export const acRemoveSelectedPadColor = () => ({ type: PadColorTypes.REMOVE_SELECTED_PAD_COLOR })

export const acUpdatePadColor = (padColor) => ({ type: PadColorTypes.UPDATE_PAD_COLOR, payload: padColor })

export const acSetUpdatePadColorStatus = (isSuccess) => ({ type: PadColorTypes.SET_UPDATE_PAD_COLOR_STATUS, payload: isSuccess })