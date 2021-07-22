import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHingeType } from '../../redux/actions/hinge-type'
import { hingeTypeActions } from '../../redux/reducers/hinge-type'
import { EditHingeTypeForm } from './EditHingeTypeForm'

export const EditHingeTypeContainer = ({id}) => {
    const dispatch = useDispatch()    
    const hingeType = useSelector(state => state.hingeType.hingeType)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getHingeType(id))
        }
        return () => {
            dispatch(hingeTypeActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (hingeType === null) return <></>    
    return <EditHingeTypeForm/>
}
