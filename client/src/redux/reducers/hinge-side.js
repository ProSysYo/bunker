const types = {
    SET_LOADING: "hingeSide/set-loading",
    CLEAR_LOADING: "hingeSide/clear-loading",
    SET_ALL: "hingeSide/set-all ",
    ADD: "hingeSide/add",
    SET_ADD_STATUS: "hingeSide/set-add-status",
    SET_ERRORS: "hingeSide/set-valid-errors",
    CLEAR_ERRORS: "hingeSide/clear-valid-errors",
    DELETE: "hingeSide/delete",
    SET_SELECTED: "hingeSide/set-selected",
    REMOVE_SELECTED: "hingeSide/remove-selected",
    UPDATE: "hingeSide/update",
    SET_UPDATE_STATUS: "hingeSide/set-update-status"
}

const initialState = {
    hingeSides: [],
    hingeSide: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const hingeSideReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, hingeSides: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, hingeSides: [...state.hingeSides, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            hingeSides: [...state.hingeSides.filter(hingeSide => hingeSide._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, hingeSide: action.payload }
        case types.REMOVE_SELECTED: return { ...state, hingeSide: null }
        case types.UPDATE: return {
            ...state,
            hingeSides: [...state.hingeSides.map((hingeSide) => {
                if (hingeSide._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return hingeSide
                }
            })]           
        }
        case types.SET_UPDATE_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

const setLoading = () => ({ type: types.SET_LOADING })

const clearLoading = () => ({ type: types.CLEAR_LOADING })

const setAll = (hingeSides) => ({ type: types.SET_ALL, payload: hingeSides})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (hingeSide) => ({ type: types.ADD, payload: hingeSide })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (hingeSide) => ({ type: types.SET_SELECTED, payload: hingeSide })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (hingeSide) => ({ type: types.UPDATE, payload: hingeSide })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const hingeSideActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}