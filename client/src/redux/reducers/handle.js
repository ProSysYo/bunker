const types = {
    SET_LOADING: "handle/set-loading",
    CLEAR_LOADING: "handle/clear-loading",
    SET_ALL: "handle/set-all ",
    ADD: "handle/add",
    SET_ADD_STATUS: "handle/set-add-status",
    SET_ERRORS: "handle/set-valid-errors",
    CLEAR_ERRORS: "handle/clear-valid-errors",
    DELETE: "handle/delete",
    SET_SELECTED: "handle/set-selected",
    REMOVE_SELECTED: "handle/remove-selected",
    UPDATE: "handle/update",
    SET_UPDATE_STATUS: "handle/set-update-status"
}

const initialState = {
    handles: [],
    handle: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const handleReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, handles: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, handles: [...state.handles, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            handles: [...state.handles.filter(handle => handle._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, handle: action.payload }
        case types.REMOVE_SELECTED: return { ...state, handle: null }
        case types.UPDATE: return {
            ...state,
            handles: [...state.handles.map((handle) => {
                if (handle._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return handle
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

const setAll = (handles) => ({ type: types.SET_ALL, payload: handles})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (handle) => ({ type: types.ADD, payload: handle })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (handle) => ({ type: types.SET_SELECTED, payload: handle })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (handle) => ({ type: types.UPDATE, payload: handle })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const handleActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}