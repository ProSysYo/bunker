const types = {
    SET_LOADING: "customer/set-loading",
    CLEAR_LOADING: "customer/clear-loading",
    SET_ALL: "customer/set-all",
    ADD: "customer/add",
    SET_ADD_STATUS: "customer/set-add-status",
    SET_ERRORS: "customer/set-valid-errors",
    CLEAR_ERRORS: "customer/clear-valid-errors",
    DELETE: "customer/delete",
    SET_SELECTED: "customer/set-selected",
    REMOVE_SELECTED: "customer/remove-selected",
    UPDATE: "customer/update",
    SET_UPDATE_STATUS: "customer/set-update-status"
}

const initialState = {
    customers: [],
    customer: null,
    customerValidateErrors: {},
    submitSuccess: false,
    isLoading: false
}

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        case types.SET_ALL: return { ...state, customers: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, customers: [...state.customers, action.payload] }
        case types.SET_ERRORS: return { ...state, customerValidateErrors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, customerValidateErrors: {}, submitSuccess: false }
        case types.DELETE: return {
            ...state,
            customers: [...state.customers.filter(customer => customer._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, customer: action.payload }
        case types.REMOVE_SELECTED: return { ...state, customer: null }
        case types.SET_UPDATE_STATUS: return { ...state, submitSuccess: action.payload }
        case types.UPDATE: return {
            ...state,
            customers: [...state.customers.map((customer) => {
                if (customer._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return customer
                }
            })]           
        }

        default:
            return state
    }
}

const setLoading = () => ({ type: types.SET_LOADING })

const clearLoading = () => ({ type: types.CLEAR_LOADING })

const setAll = (customers) => ({ type: types.SET_ALL, payload: customers})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload:  isSuccess })

const add = (customer) => ({ type: types.ADD, payload: customer})

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (customer) => ({ type: types.SET_SELECTED, payload: customer })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess})

const update = (customer) => ({ type: types.UPDATE, payload: customer})

export const customerActions = {
    setLoading, clearLoading, setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}