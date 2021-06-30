import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLock } from '../../redux/actions/lock'
import { acClearLockValidErrors, acRemoveSelectedLock } from '../../redux/reducers/lock'
import { EditLockForm } from './EditLockForm'

export const EditLockContainer = ({id}) => {
    const dispatch = useDispatch()    
    const lock = useSelector(state => state.lock.lock)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getLock(id))
        }
        return () => {
            dispatch(acRemoveSelectedLock())
            dispatch(acClearLockValidErrors())            
        }
    }, [id, dispatch])

    if (lock === null) return <></>    
    return <EditLockForm/>
}
