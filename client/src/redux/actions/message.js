import { ActionTypes } from "../constants/action-types";

export const setMessage = (message) => ({
  type: ActionTypes.SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: ActionTypes.CLEAR_MESSAGE,
});