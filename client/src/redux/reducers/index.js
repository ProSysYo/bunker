import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { loadingReducer } from "./loading";
import { messageReducer } from "./message";
import { customerReducer } from "./customer"
import { modelDoorReducer } from "./model-door"
import { lockReducer } from "./lock"

const reducers = combineReducers({
  auth: authReducer, 
  message: messageReducer,
  loading: loadingReducer,
  customer: customerReducer,
  modelDoor: modelDoorReducer,
  lock: lockReducer,
});

export default reducers;