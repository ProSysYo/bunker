import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPeepholeLocation } from '../../redux/actions/peephole-location'
import { peepholeLocationActions } from '../../redux/reducers/peephole-location'
import { EditPeepholeLocationForm } from './EditPeepholeLocationForm'

export const EditPeepholeLocationContainer = ({id}) => {
    const dispatch = useDispatch()    
    const peepholeLocation = useSelector(state => state.peepholeLocation.peepholeLocation)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getPeepholeLocation(id))
        }
        return () => {
            dispatch(peepholeLocationActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (peepholeLocation === null) return <></>    
    return <EditPeepholeLocationForm/>
}
