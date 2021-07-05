import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypeCanvas } from '../../redux/actions/type-canvas'
import { acClearTypeCanvasValidErrors, acRemoveSelectedTypeCanvas } from '../../redux/reducers/type-canvas'

import { EditTypeCanvasForm } from './EditTypeCanvasForm'

export const EditTypeCanvasContainer = ({id}) => {
    const dispatch = useDispatch()    
    const typeCanvas = useSelector(state => state.typeCanvas.typeCanvas)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getTypeCanvas(id))
        }
        return () => {
            dispatch(acRemoveSelectedTypeCanvas())
            dispatch(acClearTypeCanvasValidErrors())            
        }
    }, [id, dispatch])

    if (typeCanvas === null) return <></>    
    return <EditTypeCanvasForm/>
}
