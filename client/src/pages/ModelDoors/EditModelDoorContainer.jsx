import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getModelDoor } from '../../redux/actions/model-door'
import { acClearModelDoorValidErrors, acRemoveSelectedModelDoor } from '../../redux/reducers/model-door'
import { EditModelDoorForm } from './EditModelDoorForm'

export const EditModelDoorContainer = ({id}) => {
    const dispatch = useDispatch()    
    const modelDoor = useSelector(state => state.modelDoor.modelDoor)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getModelDoor(id))
        }
        return () => {
            dispatch(acRemoveSelectedModelDoor())
            dispatch(acClearModelDoorValidErrors())            
        }
    }, [id, dispatch])

    if (modelDoor === null) return <></>    
    return <EditModelDoorForm/>
}
