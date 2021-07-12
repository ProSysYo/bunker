const types = {
    SET_ALL: "peepholeLocation/set-all ",
    ADD: "peepholeLocation/add",
    SET_ADD_STATUS: "peepholeLocation/set-add-status",
    SET_ERRORS: "peepholeLocation/set-valid-errors",
    CLEAR_ERRORS: "peepholeLocation/clear-valid-errors",
    DELETE: "peepholeLocation/delete",
    SET_SELECTED: "peepholeLocation/set-selected",
    REMOVE_SELECTED: "peepholeLocation/remove-selected",
    UPDATE: "peepholeLocation/update",
    SET_UPDATE_STATUS: "peepholeLocation/set-update-status"
}

const initialState = {
    peepholeLocations: [],
    peepholeLocation: null,
    errors: {},
    submitSuccess: false,
}

export const peepholeLocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ALL: return { ...state, peepholeLocations: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, peepholeLocations: [...state.peepholeLocations, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            peepholeLocations: [...state.peepholeLocations.filter(peepholeLocation => peepholeLocation._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, peepholeLocation: action.payload }
        case types.REMOVE_SELECTED: return { ...state, peepholeLocation: null }
        case types.UPDATE: return {
            ...state,
            peepholeLocations: [...state.peepholeLocations.map((peepholeLocation) => {
                if (peepholeLocation._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return peepholeLocation
                }
            })]           
        }
        case types.SET_UPDATE_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

const setAll = (peepholeLocations) => ({ type: types.SET_ALL, payload: peepholeLocations})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (peepholeLocation) => ({ type: types.ADD, payload: peepholeLocation })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (peepholeLocation) => ({ type: types.SET_SELECTED, payload: peepholeLocation })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (peepholeLocation) => ({ type: types.UPDATE, payload: peepholeLocation })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const peepholeLocationActions = {
    setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}