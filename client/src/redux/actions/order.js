import { orderActions } from "../reducers/order"
import { getBolts } from "./bolt"
import { getCovers } from "./cover"
import { getCustomers } from "./customer"
import { getCylinders } from "./cylinder"
import { getDoorColors } from "./door-color"
import { getFurnitureColors } from "./furniture-color"
import { getHandles } from "./handle"
import { getHingeSides } from "./hinge-side"
import { getHingeTypes } from "./hinge-type"
import { getLocks } from "./lock"
import { getPackagings } from "./packaging"
import { getPeepholes } from "./peephole"
import { getPeepholeLocations } from "./peephole-location"
import { getTypeCanvases } from "./type-canvas"
import { getTypePanels } from "./type-panel"
import { getWraps } from "./wrap"

export function getAll() {
    return async dispatch => {
        try {
            dispatch(orderActions.setLoading())

            await dispatch(getCustomers())
            await dispatch(getBolts())
            await dispatch(getCovers())
            await dispatch(getCylinders())
            await dispatch(getDoorColors())
            await dispatch(getFurnitureColors())
            await dispatch(getHandles())
            await dispatch(getHingeSides())
            await dispatch(getHingeTypes())
            await dispatch(getTypeCanvases())
            await dispatch(getPeepholes())
            await dispatch(getPeepholeLocations())
            await dispatch(getPackagings())
            await dispatch(getLocks())
            await dispatch(getTypePanels())
            await dispatch(getWraps())            
        } catch (e) {           
            
        } finally {            
            dispatch(orderActions.clearLoading())
        }
    }
}