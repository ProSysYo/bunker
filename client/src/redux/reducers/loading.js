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

export const acSetLoading = () => ({ type: ServiceTypes.SET_LOADING })

export const acClearLoading = () => ({ type: ServiceTypes.CLEAR_LOADING })