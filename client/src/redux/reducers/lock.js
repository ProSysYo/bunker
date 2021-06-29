import { LockTypes } from '../constants/lock-types'

const initialState = {
    locks: [],
    lock: null,
    lockValidErrors: {},
    submitSuccess: false,
}

export const lockReducer = (state = initialState, action) => {
    switch (action.type) {
        case LockTypes.SET_LOCKS: return { ...state, locks: action.payload }
        case LockTypes.SET_ADD_LOCK_STATUS: return { ...state, submitSuccess: action.payload }
        case LockTypes.ADD_LOCK: return { ...state, locks: [...state.locks, action.payload] }
        case LockTypes.SET_LOCK_VALID_ERRORS: return { ...state, lockValidErrors: action.payload }
        case LockTypes.CLEAR_LOCK_VALID_ERRORS: return { ...state, lockValidErrors: {}, submitSuccess: false}
        case LockTypes.DELETE_LOCK: return {
            ...state,
            locks: [...state.locks.filter(lock => lock._id !== action.payload)]
        }
        case LockTypes.SET_SELECTED_LOCK: return { ...state, lock: action.payload }
        case LockTypes.REMOVE_SELECTED_LOCK: return { ...state, lock: null }
        case LockTypes.UPDATE_LOCK: return {
            ...state,
            locks: [...state.locks.map((lock) => {
                if (lock._id === action.payload._id) {
                    return { ...action.payload }
                } else {
                    return lock
                }
            })]           
        }
        case LockTypes.SET_UPDATE_LOCK_STATUS: return { ...state, submitSuccess: action.payload }

        default:
            return state
    }
}

export const acSetLocks = (locks) => ({ type: LockTypes.SET_LOCKS, payload: locks})

export const acSetAddLockStatus = (isSuccess) => ({ type: LockTypes.SET_ADD_LOCK_STATUS, payload: isSuccess })

export const acAddLock = (lock) => ({ type: LockTypes.ADD_LOCK, payload: lock })

export const acSetLockValidErrors = (errors) => ({ type: LockTypes.SET_LOCK_VALID_ERRORS, payload: errors })

export const acClearLockValidErrors = () => ({ type: LockTypes.CLEAR_LOCK_VALID_ERRORS })

export const acDeleteLock = (id) => ({ type: LockTypes.DELETE_LOCK, payload: id })

export const acSetSelectedLock = (lock) => ({ type: LockTypes.SET_SELECTED_LOCK, payload: lock })

export const acRemoveSelectedLock = () => ({ type: LockTypes.REMOVE_SELECTED_LOCK })

export const acUpdateLock = (lock) => ({ type: LockTypes.UPDATE_LOCK, payload: lock })

export const acSetUpdateLocktatus = (isSuccess) => ({ type: LockTypes.SET_UPDATE_LOCK_STATUS, payload: isSuccess })