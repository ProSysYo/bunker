import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPeephole } from '../../redux/actions/peephole'
import { peepholeActions } from '../../redux/reducers/peephole'
import { EditPeepholeForm } from './EditPeepholeForm'

export const EditPeepholeContainer = ({id}) => {
    const dispatch = useDispatch()    
    const peephole = useSelector(state => state.peephole.peephole)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getPeephole(id))
        }
        return () => {
            dispatch(peepholeActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (peephole === null) return <></>    
    return <EditPeepholeForm/>
}
