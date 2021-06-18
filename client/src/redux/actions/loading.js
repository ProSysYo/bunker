import { ActionTypes } from "../constants/action-types"

export const setLoading = (message) => ({
  type: ActionTypes.SET_LOADING  
})

export const clearLoading = () => ({
  type: ActionTypes.CLEAR_LOADING
})