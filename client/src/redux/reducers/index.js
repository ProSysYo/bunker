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
import { hingeSideReducer } from "./hinge-side"
import { hingeTypeReducer } from "./hinge-type"
import { packagingReducer } from "./packaging"
import { orderReducer } from "./order"

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
  hingeSide: hingeSideReducer,
  hingeType: hingeTypeReducer,
  packaging: packagingReducer,
  order: orderReducer,
});

export default reducers;