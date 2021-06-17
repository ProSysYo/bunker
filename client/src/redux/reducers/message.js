import { ActionTypes } from "../constants/action-types";

const initialState = {};

export const messageReducer = (state = initialState, action) => {    
    switch (action.type) {
        case ActionTypes.SET_MESSAGE:
            return { message: action.payload };

        case ActionTypes.CLEAR_MESSAGE:
            return { message: "" };

        default:
            return state;
    }
}