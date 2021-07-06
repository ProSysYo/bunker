const types = {
    SET_ALL: "furnityreColor/set-all ",
    ADD: "furnityreColor/add",
    SET_ADD_STATUS: "furnityreColor/set-add-status",
    SET_ERRORS: "furnityreColor/set-valid-errors",
    CLEAR_ERRORS: "furnityreColor/clear-valid-errors",
    DELETE: "furnityreColor/delete",
    SET_SELECTED: "furnityreColor/set-selected",
    REMOVE_SELECTED: "furnityreColor/remove-selected",
    UPDATE: "furnityreColor/update",
    SET_UPDATE_STATUS: "furnityreColor/set-update-status"
}

const initialState = {
    furnitureColors: [],
    furnitureColor: null,
    errors: {},
    submitSuccess: false,
}

export const furnitureColorReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ALL: return { ...state, furnitureColors: action.payload }
        case types.SET_ADD_STATUS: return { ...state, submitSuccess: action.payload }
        case types.ADD: return { ...state, furnitureColors: [...state.furnitureColors, action.payload] }
        case types.SET_ERRORS: return { ...state, errors: action.payload }
        case types.CLEAR_ERRORS: return { ...state, errors: {}, submitSuccess: false}
        case types.DELETE: return {
            ...state,
            furnitureColors: [...state.furnitureColors.filter(furnitureColor => furnitureColor._id !== action.payload)]
        }
        case types.SET_SELECTED: return { ...state, furnitureColor: action.payload }
        case types.REMOVE_SELECTED: return { ...state, furnitureColor: null }
        case types.UPDATE: return {
            ...state,
            furnitureColors: [...state.furnitureColors.map((furnitureColor) => {
                if (furnitureColor._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return furnitureColor
                }
            })]           
        }
        case types.SET_UPDATE_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

const setAll = (furnitureColors) => ({ type: types.SET_ALL, payload: furnitureColors})

const setAddStatus = (isSuccess) => ({ type: types.SET_ADD_STATUS, payload: isSuccess })

const add = (furnitureColor) => ({ type: types.ADD, payload: furnitureColor })

const setErrors = (errors) => ({ type: types.SET_ERRORS, payload: errors })

const clearErrors = () => ({ type: types.CLEAR_ERRORS })

const deleteBy = (id) => ({ type: types.DELETE, payload: id })

const setSelected = (furnitureColor) => ({ type: types.SET_SELECTED, payload: furnitureColor })

const removeSelected = () => ({ type: types.REMOVE_SELECTED })

const update = (furnitureColor) => ({ type: types.UPDATE, payload: furnitureColor })

const setUpdateStatus = (isSuccess) => ({ type: types.SET_UPDATE_STATUS, payload: isSuccess })

export const furnitureColorActions = {
    setAll, setAddStatus, add, setErrors, clearErrors, deleteBy, setSelected, removeSelected, update, setUpdateStatus
}