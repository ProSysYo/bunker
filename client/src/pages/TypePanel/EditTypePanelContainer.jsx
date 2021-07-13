import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypePanel } from '../../redux/actions/type-panel'
import { typePanelActions } from '../../redux/reducers/type-panel'
import { EditTypePanelForm } from './EditTypePanelForm'

export const EditTypePanelContainer = ({id}) => {
    const dispatch = useDispatch()    
    const typePanel = useSelector(state => state.typePanel.typePanel)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getTypePanel(id))
        }
        return () => {
            dispatch(typePanelActions.removeSelected())                      
        }
    }, [id, dispatch])

    if (typePanel === null) return <></>    
    return <EditTypePanelForm/>
}
