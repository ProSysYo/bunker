import { combineReducers } from "redux"
import { authReducer } from "./auth"
import { loadingReducer } from "./loading"
import { messageReducer } from "./message"
import { customerReducer } from "./customer"
import { lockReducer } from "./lock"
import { typeCanvasReducer } from './type-canvas'
import { furnitureColorReducer } from './furniture-color'
import { boltReducer } from "./bolt"
import { coverReducer } from "./cover"
import { cylinderReducer } from "./cylinder"
import { handleReducer } from "./handle"
import { peepholeReducer } from "./peephole"
import { peepholeLocationReducer } from "./peephole-location"
import { doorColorReducer } from "./door-color"
import { typePanelReducer } from "./type-panel"
import { wrapReducer } from "./wrap"
import { partisanshipReducer } from "./partisanship"

const reducers = combineReducers({
  auth: authReducer, 
  message: messageReducer,
  loading: loadingReducer,
  customer: customerReducer,
  typeCanvas: typeCanvasReducer,
  lock: lockReducer,
  furnitureColor: furnitureColorReducer,
  bolt: boltReducer,
  cover: coverReducer,
  cylinder: cylinderReducer,
  handle: handleReducer,
  peephole: peepholeReducer,
  peepholeLocation: peepholeLocationReducer,
  doorColor: doorColorReducer,
  typePanel: typePanelReducer,
  wrap: wrapReducer,
  partisanship: partisanshipReducer,
});

export default reducers;