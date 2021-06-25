import { ServiceTypes } from "../constants/service-types";

const initialState = {};

export const messageReducer = (state = initialState, action) => {    
    switch (action.type) {
        case ServiceTypes.SET_MESSAGE:
            return { message: action.payload };

        case ServiceTypes.CLEAR_MESSAGE:
            return { message: "" };

        default:
            return state;
    }
}

export const acSetMessage = (message) => ({ type: ServiceTypes.SET_MESSAGE, payload: message})

export const acClearMessage = () => ({ type: ServiceTypes.CLEAR_MESSAGE})