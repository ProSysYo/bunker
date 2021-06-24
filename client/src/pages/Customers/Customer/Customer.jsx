import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getCustomer } from '../../../redux/actions/customer'
import { ActionTypes } from '../../../redux/constants/action-types'
import { CustomerForm } from './CustomerForm'

export const Customer = ({id}) => {
    const dispatch = useDispatch()    
    const customer = useSelector(state => state.customer.customer)
    
    useEffect(() => {
        if (id && id !== "") {
            dispatch(getCustomer(id))
        }
        return () => {
            dispatch({ type: ActionTypes.REMOVE_SELECTED_CUSTOMER })
            dispatch({ type: ActionTypes.CLEAR_CUSTOMER_VALIDATE_ERRORS });
        };
    }, [id, dispatch]);

    if (customer === null) return <></>
    
    return (
        <CustomerForm/>
    )
}
