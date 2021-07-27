import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPackaging } from '../../redux/actions/packaging'
import { packagingActions } from '../../redux/reducers/packaging'
import { EditPackagingForm } from './EditPackagingForm'

export const EditPackagingContainer = ({id}) => {
    const dispatch = useDispatch()    
    const packaging = useSelector(state => state.packaging.packaging)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getPackaging(id))
        }
        return () => {
            dispatch(packagingActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (packaging === null) return <></>    
    return <EditPackagingForm/>
}
