import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { loadingReducer } from "./loading";
import { messageReducer } from "./message";
import { customerReducer } from "./customer"

const reducers = combineReducers({
  auth: authReducer, 
  message: messageReducer,
  loading: loadingReducer,
  customer: customerReducer
});

export default reducers;