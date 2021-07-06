import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCover } from '../../redux/actions/cover'
import { coverActions } from '../../redux/reducers/cover'
import { EditCoverForm } from './EditCoverForm'

export const EditCoverContainer = ({id}) => {
    const dispatch = useDispatch()    
    const cover = useSelector(state => state.cover.cover)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getCover(id))
        }
        return () => {
            dispatch(coverActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (cover === null) return <></>    
    return <EditCoverForm/>
}
