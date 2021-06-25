import { CustomerTypes } from '../constants/customer-types'

const initialState = {
    customers: [],
    customer: null,
    customerValidateErrors: {},
    submitSuccess: false,
}

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CustomerTypes.SET_CUSTOMERS: return { ...state, customers: action.payload }
        case CustomerTypes.SET_ADD_CUSTOMER_STATUS: return { ...state, submitSuccess: action.payload }
        case CustomerTypes.ADD_CUSTOMER: return { ...state, customers: [...state.customers, action.payload] }
        case CustomerTypes.SET_CUSTOMER_VALIDATE_ERRORS: return { ...state, customerValidateErrors: action.payload }
        case CustomerTypes.CLEAR_CUSTOMER_VALIDATE_ERRORS: return { ...state, customerValidateErrors: {}, submitSuccess: false }
        case CustomerTypes.DELETE_CUSTOMER: return {
            ...state,
            customers: [...state.customers.filter(customer => customer._id !== action.payload)]
        }
        case CustomerTypes.SET_SELECTED_CUSTOMER: return { ...state, customer: action.payload }
        case CustomerTypes.REMOVE_SELECTED_CUSTOMER: return { ...state, customer: null }
        case CustomerTypes.SET_UPDATE_CUSTOMER_STATUS: return { ...state, submitSuccess: action.payload }
        case CustomerTypes.UPDATE_CUSTOMER: return {
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

export const acSetCustomers = (customers) => ({ type: CustomerTypes.SET_CUSTOMERS, payload: customers})

export const acSetAddCustomerStatus = (isSuccess) => ({ type: CustomerTypes.SET_ADD_CUSTOMER_STATUS, payload:  isSuccess })

export const acAddCustomer = (customer) => ({ type: CustomerTypes.ADD_CUSTOMER, payload: customer})

export const acSetCustomerValidateErrors = (errors) => ({ type: CustomerTypes.SET_CUSTOMER_VALIDATE_ERRORS, payload: errors })

export const acClearCastomerValidateErrors = () => ({ type: CustomerTypes.CLEAR_CUSTOMER_VALIDATE_ERRORS })

export const acDeleteCustomer = (id) => ({ type: CustomerTypes.DELETE_CUSTOMER, payload: id })

export const acSetSelectedCustomer = (customer) => ({ type: CustomerTypes.SET_SELECTED_CUSTOMER, payload: customer })

export const acRemoveSelectedCustomer = () => ({ type: CustomerTypes.REMOVE_SELECTED_CUSTOMER })

export const acSetUpdateCustomerStatus = (isSuccess) => ({ type: CustomerTypes.SET_UPDATE_CUSTOMER_STATUS, payload: isSuccess})

export const acUpdateCustomer = (customer) => ({ type: CustomerTypes.UPDATE_CUSTOMER, payload: customer})

