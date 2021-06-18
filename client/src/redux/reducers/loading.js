import { ActionTypes } from "../constants/action-types";

const initialState = {
    isLoading: false
};

export const loadingReducer = (state = initialState, action) => {    
    switch (action.type) {
        case ActionTypes.SET_LOADING:
            return { isLoading: true };

        case ActionTypes.CLEAR_LOADING:
            return { isLoading: false };

        default:
            return state;
    }
}