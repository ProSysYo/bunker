const types = {
    SET_LOADING: "cover/set-loading",
    CLEAR_LOADING: "cover/clear-loading",
    SET_ALL: "cover/set-all ",
    ADD: "cover/add",
    SET_ADD_STATUS: "cover/set-add-status",
    SET_ERRORS: "cover/set-valid-errors",
    CLEAR_ERRORS: "cover/clear-valid-errors",
    DELETE: "cover/delete",
    SET_SELECTED: "cover/set-selected",
    REMOVE_SELECTED: "cover/remove-selected",
    UPDATE: "cover/update",
    SET_UPDATE_STATUS: "cover/set-update-status"
}

const initialState = {
    covers: [],
    cover: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const coverReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, covers: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, covers: [...state.covers, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            covers: [...state.covers.filter(cover => cover._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, cover: action.payload }
        case types.REMOVE_SELECTED: return { ...state, cover: null }
        case types.UPDATE: return {
            ...state,
            covers: [...state.covers.map((cover) => {
                if (cover._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return cover
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

const setAll = (covers) => ({ type: types.SET_ALL, payload: covers})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (cover) => ({ type: types.ADD, payload: cover })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (cover) => ({ type: types.SET_SELECTED, payload: cover })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (cover) => ({ type: types.UPDATE, payload: cover })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const coverActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}