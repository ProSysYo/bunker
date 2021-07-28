const types = {
    SET_LOADING: "typePanel/set-loading",
    CLEAR_LOADING: "typePanel/clear-loading",
    SET_ALL: "typePanel/set-all ",
    ADD: "typePanel/add",
    SET_ADD_STATUS: "typePanel/set-add-status",
    SET_ERRORS: "typePanel/set-valid-errors",
    CLEAR_ERRORS: "typePanel/clear-valid-errors",
    DELETE: "typePanel/delete",
    SET_SELECTED: "typePanel/set-selected",
    REMOVE_SELECTED: "typePanel/remove-selected",
    UPDATE: "typePanel/update",
    SET_UPDATE_STATUS: "typePanel/set-update-status"
}

const initialState = {
    typePanels: [],
    typePanel: null,
    errors: {},
    submitSuccess: false,
    isLoading: false
}

export const typePanelReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, typePanels: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, typePanels: [...state.typePanels, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            typePanels: [...state.typePanels.filter(typePanel => typePanel._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, typePanel: action.payload }
        case types.REMOVE_SELECTED: return { ...state, typePanel: null }
        case types.UPDATE: return {
            ...state,
            typePanels: [...state.typePanels.map((typePanel) => {
                if (typePanel._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return typePanel
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

const setAll = (typePanels) => ({ type: types.SET_ALL, payload: typePanels})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (typePanel) => ({ type: types.ADD, payload: typePanel })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (typePanel) => ({ type: types.SET_SELECTED, payload: typePanel })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (typePanel) => ({ type: types.UPDATE, payload: typePanel })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const typePanelActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}