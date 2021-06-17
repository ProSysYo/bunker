import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { messageReducer } from "./message";

const reducers = combineReducers({
  auth: authReducer, 
  message: messageReducer
});

export default reducers;