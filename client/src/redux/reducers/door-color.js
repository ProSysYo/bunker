const types = {
    SET_LOADING: "doorColor/set-loading",
    CLEAR_LOADING: "doorColor/clear-loading",
    SET_ALL: "doorColor/set-all ",
    ADD: "doorColor/add",
    SET_ADD_STATUS: "doorColor/set-add-status",
    SET_ERRORS: "doorColor/set-valid-errors",
    CLEAR_ERRORS: "doorColor/clear-valid-errors",
    DELETE: "doorColor/delete",
    SET_SELECTED: "doorColor/set-selected",
    REMOVE_SELECTED: "doorColor/remove-selected",
    UPDATE: "doorColor/update",
    SET_UPDATE_STATUS: "doorColor/set-update-status"
}

const initialState = {
    doorColors: [],
    doorColor: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const doorColorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, doorColors: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, doorColors: [...state.doorColors, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            doorColors: [...state.doorColors.filter(doorColor => doorColor._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, doorColor: action.payload }
        case types.REMOVE_SELECTED: return { ...state, doorColor: null }
        case types.UPDATE: return {
            ...state,
            doorColors: [...state.doorColors.map((doorColor) => {
                if (doorColor._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return doorColor
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

const setAll = (doorColors) => ({ type: types.SET_ALL, payload: doorColors})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (doorColor) => ({ type: types.ADD, payload: doorColor })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (doorColor) => ({ type: types.SET_SELECTED, payload: doorColor })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (doorColor) => ({ type: types.UPDATE, payload: doorColor })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const doorColorActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}