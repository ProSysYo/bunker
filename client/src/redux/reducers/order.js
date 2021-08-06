const types = {
    SET_LOADING: "order/set-loading",
    CLEAR_LOADING: "order/clear-loading",    
}

const initialState = {    
    isLoading: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING: return { ...state, isLoading: true }
        case types.CLEAR_LOADING: return { ...state, isLoading: false }
        
        default:
            return state
    }
}

const setLoading = () => ({ type: types.SET_LOADING })

const clearLoading = () => ({ type: types.CLEAR_LOADING })


export const orderActions = {
    setLoading, clearLoading
}