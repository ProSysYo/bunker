const types = {
    SET_ALL: "packaging/set-all ",
    ADD: "packaging/add",
    SET_ADD_STATUS: "packaging/set-add-status",
    SET_ERRORS: "packaging/set-valid-errors",
    CLEAR_ERRORS: "packaging/clear-valid-errors",
    DELETE: "packaging/delete",
    SET_SELECTED: "packaging/set-selected",
    REMOVE_SELECTED: "packaging/remove-selected",
    UPDATE: "packaging/update",
    SET_UPDATE_STATUS: "packaging/set-update-status"
}

const initialState = {
    packagings: [],
    packaging: null,
    errors: {},
    submitSuccess: false,
}

export const packagingReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ALL: return { ...state, packagings: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, packagings: [...state.packagings, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            packagings: [...state.packagings.filter(packaging => packaging._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, packaging: action.payload }
        case types.REMOVE_SELECTED: return { ...state, packaging: null }
        case types.UPDATE: return {
            ...state,
            packagings: [...state.packagings.map((packaging) => {
                if (packaging._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return packaging
                }
            })]           
        }
        case types.SET_UPDATE_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

const setAll = (packagings) => ({ type: types.SET_ALL, payload: packagings})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (packaging) => ({ type: types.ADD, payload: packaging })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (packaging) => ({ type: types.SET_SELECTED, payload: packaging })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (packaging) => ({ type: types.UPDATE, payload: packaging })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const packagingActions = {
    setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}