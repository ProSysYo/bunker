import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBolt } from '../../redux/actions/bolt'
import { boltActions } from '../../redux/reducers/bolt'
import { EditBoltForm } from './EditBoltForm'

export const EditBoltContainer = ({id}) => {
    const dispatch = useDispatch()    
    const bolt = useSelector(state => state.bolt.bolt)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getBolt(id))
        }
        return () => {
            dispatch(boltActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (bolt === null) return <></>    
    return <EditBoltForm/>
}
