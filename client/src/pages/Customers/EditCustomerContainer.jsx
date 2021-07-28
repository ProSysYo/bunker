import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCustomer } from '../../redux/actions/customer'
import { customerActions } from '../../redux/reducers/customer'
import { EditCustomerForm } from './EditCustomerForm'

export const EditCustomerContainer = ({id}) => {
    const dispatch = useDispatch()    
    const customer = useSelector(state => state.customer.customer)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getCustomer(id))
        }
        return () => {
            dispatch(customerActions.removeSelected())
            dispatch(customerActions.clearErrors())            
        }
    }, [id, dispatch])

    if (customer === null) return <></>    
    return <EditCustomerForm/>
}
