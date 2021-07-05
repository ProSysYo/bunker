import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { loadingReducer } from "./loading";
import { messageReducer } from "./message";
import { customerReducer } from "./customer"
import { lockReducer } from "./lock"
import { typeCanvasReducer } from './type-canvas'

const reducers = combineReducers({
  auth: authReducer, 
  message: messageReducer,
  loading: loadingReducer,
  customer: customerReducer,
  typeCanvas: typeCanvasReducer,
  lock: lockReducer,
});

export default reducers;