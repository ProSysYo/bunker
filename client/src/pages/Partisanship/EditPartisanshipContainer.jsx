import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPartisanship } from '../../redux/actions/partisanship'
import { partisanshipActions } from '../../redux/reducers/partisanship'
import { EditPartisanshipForm } from './EditPartisanshipForm'

export const EditPartisanshipContainer = ({id}) => {
    const dispatch = useDispatch()    
    const partisanship = useSelector(state => state.partisanship.partisanship)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getPartisanship(id))
        }
        return () => {
            dispatch(partisanshipActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (partisanship === null) return <></>    
    return <EditPartisanshipForm/>
}
