import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { loadingReducer } from "./loading";
import { messageReducer } from "./message";

const reducers = combineReducers({
  auth: authReducer, 
  message: messageReducer,
  loading: loadingReducer
});

export default reducers;