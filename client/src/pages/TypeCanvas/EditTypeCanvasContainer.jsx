import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeCanvas } from '../../redux/actions/type-canvas'
import { typeCanvasActions } from '../../redux/reducers/type-canvas'

import { EditTypeCanvasForm } from './EditTypeCanvasForm'

export const EditTypeCanvasContainer = ({id}) => {
    const dispatch = useDispatch()    
    const typeCanvas = useSelector(state => state.typeCanvas.typeCanvas)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getTypeCanvas(id))
        }
        return () => {
            dispatch(typeCanvasActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (typeCanvas === null) return <></>    
    return <EditTypeCanvasForm/>
}
