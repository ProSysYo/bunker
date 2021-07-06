import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFurnitureColor } from '../../redux/actions/furniture-color'
import { furnitureColorActions } from '../../redux/reducers/furniture-color'
import { EditFurnitureColorForm } from './EditFurnitureColorForm'



export const EditFurnitureColorContainer = ({id}) => {
    const dispatch = useDispatch()    
    const furnitureColor = useSelector(state => state.furnitureColor.furnitureColor)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getFurnitureColor(id))
        }
        return () => {
            dispatch(furnitureColorActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (furnitureColor === null) return <></>    
    return <EditFurnitureColorForm/>
}
