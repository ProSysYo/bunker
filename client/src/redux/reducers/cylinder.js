const types = {
    SET_LOADING: "cylinder/set-loading",
    CLEAR_LOADING: "cylinder/clear-loading",
    SET_ALL: "cylinder/set-all ",
    ADD: "cylinder/add",
    SET_ADD_STATUS: "cylinder/set-add-status",
    SET_ERRORS: "cylinder/set-valid-errors",
    CLEAR_ERRORS: "cylinder/clear-valid-errors",
    DELETE: "cylinder/delete",
    SET_SELECTED: "cylinder/set-selected",
    REMOVE_SELECTED: "cylinder/remove-selected",
    UPDATE: "cylinder/update",
    SET_UPDATE_STATUS: "cylinder/set-update-status"
}

const initialState = {
    cylinders: [],
    cylinder: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const cylinderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, cylinders: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, cylinders: [...state.cylinders, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            cylinders: [...state.cylinders.filter(cylinder => cylinder._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, cylinder: action.payload }
        case types.REMOVE_SELECTED: return { ...state, cylinder: null }
        case types.UPDATE: return {
            ...state,
            cylinders: [...state.cylinders.map((cylinder) => {
                if (cylinder._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return cylinder
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

const setAll = (cylinders) => ({ type: types.SET_ALL, payload: cylinders})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (cylinder) => ({ type: types.ADD, payload: cylinder })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (cylinder) => ({ type: types.SET_SELECTED, payload: cylinder })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (cylinder) => ({ type: types.UPDATE, payload: cylinder })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const cylinderActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}