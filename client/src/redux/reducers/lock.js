const types = {
    SET_LOADING: "lock/set-loading",
    CLEAR_LOADING: "lock/clear-loading",
    SET_ALL: "lock/set-all",
    ADD: "lock/add",
    SET_ADD_STATUS: "lock/set-add-status",
    SET_ERRORS: "lock/set-valid-errors",
    CLEAR_ERRORS: "lock/clear-valid-errors",
    DELETE: "lock/delete",
    SET_SELECTED: "lock/set-selected",
    REMOVE_SELECTED: "lock/remove-selected",
    UPDATE: "lock/update",
    SET_UPDATE_STATUS: "lock/set-update-status"
}

const initialState = {
    locks: [],
    lock: null,
    lockValidErrors: {},
    submitSuccess: false,
    isLoading: false
}

export const lockReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, locks: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, locks: [...state.locks, action.payload] }
        case types.SET_ERRORS: return { ...state, lockValidErrors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, lockValidErrors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            locks: [...state.locks.filter(lock => lock._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, lock: action.payload }
        case types.REMOVE_SELECTED: return { ...state, lock: null }
        case types.UPDATE: return {
            ...state,
            locks: [...state.locks.map((lock) => {
                if (lock._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return lock
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

const setAll = (locks) => ({ type: types.SET_ALL, payload: locks})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (lock) => ({ type: types.ADD, payload: lock })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (lock) => ({ type: types.SET_SELECTED, payload: lock })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (lock) => ({ type: types.UPDATE, payload: lock })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const lockActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}