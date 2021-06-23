import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"

import { getCustomer } from '../../../redux/actions/customer'
import { ActionTypes } from '../../../redux/constants/action-types'
import { CustomerForm } from './CustomerForm'

export const Customer = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const customer = useSelector(state => state.customer.customer)

    useEffect(() => {
        if (id && id !== "") {
            dispatch(getCustomer(id))
        }
        return () => {
            dispatch({ type: ActionTypes.REMOVE_SELECTED_CUSTOMER })
        };
    }, [id, dispatch]);
   
    if (customer === null) return <></>
    
    return (
        <CustomerForm/>
    )
}
