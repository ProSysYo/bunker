import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWrap } from '../../redux/actions/wrap'
import { wrapActions } from '../../redux/reducers/wrap'
import { EditWrapForm } from './EditWrapForm'

export const EditWrapContainer = ({id}) => {
    const dispatch = useDispatch()    
    const wrap = useSelector(state => state.wrap.wrap)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getWrap(id))
        }
        return () => {
            dispatch(wrapActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (wrap === null) return <></>    
    return <EditWrapForm/>
}
