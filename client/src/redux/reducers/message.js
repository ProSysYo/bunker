import { ServiceTypes } from "../constants/service-types";

const initialState = {
    message: null
};

export const messageReducer = (state = initialState, action) => {    
    switch (action.type) {
        case ServiceTypes.SET_MESSAGE:
            return { message: action.payload };

        case ServiceTypes.CLEAR_MESSAGE:            
            return { message: null };

        default:
            return state;
    }
}

const setMessage = (message) => ({ type: ServiceTypes.SET_MESSAGE, payload: message})

const clearMessage = () => ({ type: ServiceTypes.CLEAR_MESSAGE})

export const messageActions = {
    setMessage, clearMessage
}