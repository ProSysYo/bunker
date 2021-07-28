const types = {
    SET_LOADING: "wrap/set-loading",
    CLEAR_LOADING: "wrap/clear-loading",
    SET_ALL: "wrap/set-all ",
    ADD: "wrap/add",
    SET_ADD_STATUS: "wrap/set-add-status",
    SET_ERRORS: "wrap/set-valid-errors",
    CLEAR_ERRORS: "wrap/clear-valid-errors",
    DELETE: "wrap/delete",
    SET_SELECTED: "wrap/set-selected",
    REMOVE_SELECTED: "wrap/remove-selected",
    UPDATE: "wrap/update",
    SET_UPDATE_STATUS: "wrap/set-update-status"
}

const initialState = {
    wraps: [],
    wrap: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const wrapReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, wraps: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, wraps: [...state.wraps, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            wraps: [...state.wraps.filter(wrap => wrap._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, wrap: action.payload }
        case types.REMOVE_SELECTED: return { ...state, wrap: null }
        case types.UPDATE: return {
            ...state,
            wraps: [...state.wraps.map((wrap) => {
                if (wrap._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return wrap
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

const setAll = (wraps) => ({ type: types.SET_ALL, payload: wraps})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (wrap) => ({ type: types.ADD, payload: wrap })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (wrap) => ({ type: types.SET_SELECTED, payload: wrap })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (wrap) => ({ type: types.UPDATE, payload: wrap })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const wrapActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}