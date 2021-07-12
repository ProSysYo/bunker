import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHandle } from '../../redux/actions/handle'
import { handleActions } from '../../redux/reducers/handle'
import { EditHandleForm } from './EditHandleForm'

export const EditHandleContainer = ({id}) => {
    const dispatch = useDispatch()    
    const handle = useSelector(state => state.handle.handle)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getHandle(id))
        }
        return () => {
            dispatch(handleActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (handle === null) return <></>    
    return <EditHandleForm/>
}
