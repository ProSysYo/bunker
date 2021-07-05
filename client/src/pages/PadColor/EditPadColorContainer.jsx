import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPadColor } from '../../redux/actions/pad-color'
import { acRemoveSelectedPadColor } from '../../redux/reducers/pad-color'
import { EditPadColorForm } from './EditPadColorForm'



export const EditPadColorContainer = ({id}) => {
    const dispatch = useDispatch()    
    const padColor = useSelector(state => state.padColor.padColor)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getPadColor(id))
        }
        return () => {
            dispatch(acRemoveSelectedPadColor())                      
        }
    }, [id, dispatch])

    if (padColor === null) return <></>    
    return <EditPadColorForm/>
}
