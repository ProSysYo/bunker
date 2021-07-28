const types = {
    SET_LOADING: "bolt/set-loading",
    CLEAR_LOADING: "bolt/clear-loading",
    SET_ALL: "bolt/set-all ",
    ADD: "bolt/add",
    SET_ADD_STATUS: "bolt/set-add-status",
    SET_ERRORS: "bolt/set-valid-errors",
    CLEAR_ERRORS: "bolt/clear-valid-errors",
    DELETE: "bolt/delete",
    SET_SELECTED: "bolt/set-selected",
    REMOVE_SELECTED: "bolt/remove-selected",
    UPDATE: "bolt/update",
    SET_UPDATE_STATUS: "bolt/set-update-status"
}

const initialState = {
    bolts: [],
    bolt: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const boltReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, bolts: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, bolts: [...state.bolts, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            bolts: [...state.bolts.filter(furnitureColor => furnitureColor._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, bolt: action.payload }
        case types.REMOVE_SELECTED: return { ...state, bolt: null }
        case types.UPDATE: return {
            ...state,
            bolts: [...state.bolts.map((bolt) => {
                if (bolt._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return bolt
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

const setAll = (bolts) => ({ type: types.SET_ALL, payload: bolts})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (bolt) => ({ type: types.ADD, payload: bolt })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (bolt) => ({ type: types.SET_SELECTED, payload: bolt })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (bolt) => ({ type: types.UPDATE, payload: bolt })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const boltActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}