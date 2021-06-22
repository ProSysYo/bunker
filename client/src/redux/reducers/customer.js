import { ActionTypes } from '../constants/action-types'

const initialState = {
    customers: [],
    customer: null
}

export const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload
            }
        default:
            return state
    }
}