import { ActionTypes } from '../constants/action-types'

const initialState = {
    customers: [],
    customer: null,
    customerValidateErrors: {},
    submitSuccess: false,    
}

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_CUSTOMERS: return { ...state, customers: action.payload }
        case ActionTypes.ADD_CUSTOMER_STATUS: return { ...state, submitSuccess: action.payload }
        case ActionTypes.ADD_CUSTOMER: return { ...state, customers: [...state.customers, action.payload] }
        case ActionTypes.SET_CUSTOMER_VALIDATE_ERRORS: return { ...state, customerValidateErrors: action.payload }
        case ActionTypes.CLEAR_CUSTOMER_VALIDATE_ERRORS: return { ...state, customerValidateErrors: {}, submitSuccess: false }
        case ActionTypes.DELETE_CUSTOMER: return { ...state, customers: [...state.customers.filter(customer => customer._id !== action.payload)] }
        case ActionTypes.SELECTED_CUSTOMER: return { ...state, customer: action.payload }
        case ActionTypes.REMOVE_SELECTED_CUSTOMER: return { ...state, customer: null }
        case ActionTypes.UPDATE_CUSTOMER_STATUS: return { ...state, submitSuccess: action.payload }
        case ActionTypes.UPDATE_CUSTOMER: return {
            ...state,
            customers: [...state.customers.map((customer) => {
                if (customer._id === action.payload.id) {
                    return {
                        ...customer,
                        ...action.payload
                    }
                } else {
                    return customer
                }
            })
            ]
        }

        default:
            return state
    }
}