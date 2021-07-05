const types = {
    SET_ALL: "furnityreColor/set-all ",
    ADD: "furnityreColor/add",
    SET_ADD_STATUS: "furnityreColor/set-add-status",
    SET_VALID_ERRORS: "furnityreColor/set-valid-errors",
    CLEAR_VALID_ERRORS: "furnityreColor/clear-valid-errors",
    DELETE: "furnityreColor/delete",
    SET_SELECTED: "furnityreColor/set-selected",
    REMOVE_SELECTED: "furnityreColor/remove-selected",
    UPDATE: "furnityreColor/update",
    SET_UPDATE_STATUS: "furnityreColor/set-update-status"
}

const initialState = {
    padColors: [],
    padColor: null,
    padColorValidErrors: {},
    submitSuccess: false,
}

export const padColorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ALL: return { ...state, padColors: action.payload }
        case types.ADD: return { ...state, submitSuccess: action.payload }
        case types.SET_ADD_STATUS: return { ...state, padColors: [...state.padColors, action.payload] }
        case types.SET_VALID_ERRORS: return { ...state, padColorValidErrors: action.payload }
        case types.CLEAR_VALID_ERRORS: return { ...state, padColorValidErrors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            padColors: [...state.padColors.filter(padColor => padColor._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, padColor: action.payload }
        case types.REMOVE_SELECTED: return { ...state, padColor: null }
        case types.UPDATE: return {
            ...state,
            padColors: [...state.padColors.map((padColor) => {
                if (padColor._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return padColor
                }
            })]           
        }
        case types.SET_UPDATE_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

export const acSetPadColors = (padColors) => ({ type: types.SET_ALL, payload: padColors})

export const acSetAddPadColorStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

export const acAddPadColor = (padColor) => ({ type: types.ADD, payload: padColor })

export const acSetPadColorValidErrors = (errors) => ({ type: types.SET_VALID_ERRORS, payload: errors })

export const acClearPadColorValidErrors = () => ({ type: types.CLEAR_VALID_ERRORS })

export const acDeletePadColor = (id) => ({ type: types.DELETE, payload: id })

export const acSetSelectedPadColor = (padColor) => ({ type: types.SET_SELECTED, payload: padColor })

export const acRemoveSelectedPadColor = () => ({ type: types.REMOVE_SELECTED })

export const acUpdatePadColor = (padColor) => ({ type: types.UPDATE, payload: padColor })

export const acSetUpdatePadColorStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })