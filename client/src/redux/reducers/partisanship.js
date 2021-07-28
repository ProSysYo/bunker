const types = {
    SET_LOADING: "partisanship/set-loading",
    CLEAR_LOADING: "partisanship/clear-loading",
    SET_ALL: "partisanship/set-all ",
    ADD: "partisanship/add",
    SET_ADD_STATUS: "partisanship/set-add-status",
    SET_ERRORS: "partisanship/set-valid-errors",
    CLEAR_ERRORS: "partisanship/clear-valid-errors",
    DELETE: "partisanship/delete",
    SET_SELECTED: "partisanship/set-selected",
    REMOVE_SELECTED: "partisanship/remove-selected",
    UPDATE: "partisanship/update",
    SET_UPDATE_STATUS: "partisanship/set-update-status"
}

const initialState = {
    partisanships: [],
    partisanship: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const partisanshipReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, partisanships: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, partisanships: [...state.partisanships, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            partisanships: [...state.partisanships.filter(partisanship => partisanship._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, partisanship: action.payload }
        case types.REMOVE_SELECTED: return { ...state, partisanship: null }
        case types.UPDATE: return {
            ...state,
            partisanships: [...state.partisanships.map((partisanship) => {
                if (partisanship._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return partisanship
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

const setAll = (partisanships) => ({ type: types.SET_ALL, payload: partisanships})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (partisanship) => ({ type: types.ADD, payload: partisanship })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (partisanship) => ({ type: types.SET_SELECTED, payload: partisanship })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (partisanship) => ({ type: types.UPDATE, payload: partisanship })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const partisanshipActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}