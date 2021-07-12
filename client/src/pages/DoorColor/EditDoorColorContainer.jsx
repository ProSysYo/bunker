import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoorColor } from '../../redux/actions/door-color'
import { doorColorActions } from '../../redux/reducers/door-color'
import { EditDoorColorForm } from './EditDoorColorForm'

export const EditDoorColorContainer = ({id}) => {
    const dispatch = useDispatch()    
    const doorColor = useSelector(state => state.doorColor.doorColor)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getDoorColor(id))
        }
        return () => {
            dispatch(doorColorActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (doorColor === null) return <></>    
    return <EditDoorColorForm/>
}
