import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHingeSide } from '../../redux/actions/hinge-side'
import { hingeSideActions } from '../../redux/reducers/hinge-side'
import { EditHingeSideForm } from './EditHingeSideForm'

export const EditHingeSideContainer = ({id}) => {
    const dispatch = useDispatch()    
    const hingeSide = useSelector(state => state.hingeSide.hingeSide)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getHingeSide(id))
        }
        return () => {
            dispatch(hingeSideActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (hingeSide === null) return <></>    
    return <EditHingeSideForm/>
}
