import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCylinder } from '../../redux/actions/cylinder'
import { cylinderActions } from '../../redux/reducers/cylinder'
import { EditCylinderForm } from './EditCylinderForm'

export const EditCylinderContainer = ({id}) => {
    const dispatch = useDispatch()    
    const cylinder = useSelector(state => state.cylinder.cylinder)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getCylinder(id))
        }
        return () => {
            dispatch(cylinderActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (cylinder === null) return <></>    
    return <EditCylinderForm/>
}
