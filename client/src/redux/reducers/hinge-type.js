const types = {
    SET_LOADING: "hingeType/set-loading",
    CLEAR_LOADING: "hingeType/clear-loading",
    SET_ALL: "hingeType/set-all ",
    ADD: "hingeType/add",
    SET_ADD_STATUS: "hingeType/set-add-status",
    SET_ERRORS: "hingeType/set-valid-errors",
    CLEAR_ERRORS: "hingeType/clear-valid-errors",
    DELETE: "hingeType/delete",
    SET_SELECTED: "hingeType/set-selected",
    REMOVE_SELECTED: "hingeType/remove-selected",
    UPDATE: "hingeType/update",
    SET_UPDATE_STATUS: "hingeType/set-update-status"
}

const initialState = {
    hingeTypes: [],
    hingeType: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const hingeTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, hingeTypes: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, hingeTypes: [...state.hingeTypes, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            hingeTypes: [...state.hingeTypes.filter(hingeType => hingeType._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, hingeType: action.payload }
        case types.REMOVE_SELECTED: return { ...state, hingeType: null }
        case types.UPDATE: return {
            ...state,
            hingeTypes: [...state.hingeTypes.map((hingeType) => {
                if (hingeType._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return hingeType
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

const setAll = (hingeTypes) => ({ type: types.SET_ALL, payload: hingeTypes})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (hingeType) => ({ type: types.ADD, payload: hingeType })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (hingeType) => ({ type: types.SET_SELECTED, payload: hingeType })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (hingeType) => ({ type: types.UPDATE, payload: hingeType })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const hingeTypeActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}