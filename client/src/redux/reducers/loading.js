import { ServiceTypes } from "../constants/service-types";

const initialState = {
    isLoading: false
};

export const loadingReducer = (state = initialState, action) => {    
    switch (action.type) {
        case ServiceTypes.SET_LOADING:
            return { isLoading: true };

        case ServiceTypes.CLEAR_LOADING:
            return { isLoading: false };

        default:
            return state;
    }
}

const setLoading = () => ({ type: ServiceTypes.SET_LOADING })

const clearLoading = () => ({ type: ServiceTypes.CLEAR_LOADING })

export const loadingActions = {
    setLoading, clearLoading
}