const types = {
    SET_ALL: "peephole/set-all ",
    ADD: "peephole/add",
    SET_ADD_STATUS: "peephole/set-add-status",
    SET_ERRORS: "peephole/set-valid-errors",
    CLEAR_ERRORS: "peephole/clear-valid-errors",
    DELETE: "peephole/delete",
    SET_SELECTED: "peephole/set-selected",
    REMOVE_SELECTED: "peephole/remove-selected",
    UPDATE: "peephole/update",
    SET_UPDATE_STATUS: "peephole/set-update-status"
}

const initialState = {
    peepholes: [],
    peephole: null,
    errors: {},
    submitSuccess: false,
}

export const peepholeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ALL: return { ...state, peepholes: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, peepholes: [...state.peepholes, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            peepholes: [...state.peepholes.filter(peephole => peephole._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, peephole: action.payload }
        case types.REMOVE_SELECTED: return { ...state, peephole: null }
        case types.UPDATE: return {
            ...state,
            peepholes: [...state.peepholes.map((peephole) => {
                if (peephole._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return peephole
                }
            })]           
        }
        case types.SET_UPDATE_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

const setAll = (peepholes) => ({ type: types.SET_ALL, payload: peepholes})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (peephole) => ({ type: types.ADD, payload: peephole })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (peephole) => ({ type: types.SET_SELECTED, payload: peephole })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (peephole) => ({ type: types.UPDATE, payload: peephole })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const peepholeActions = {
    setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}