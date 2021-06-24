import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"

import { getCustomer } from '../../../redux/actions/customer'
import { ActionTypes } from '../../../redux/constants/action-types'
import { CustomerForm } from './CustomerForm'

export const Customer = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const customer = useSelector(state => state.customer.customer)
    const submitSuccess = useSelector(state => state.customer.submitSuccess)
    
    let history = useHistory()

    useEffect(() => {
        if (id && id !== "") {
            dispatch(getCustomer(id))
        }
        return () => {
            dispatch({ type: ActionTypes.REMOVE_SELECTED_CUSTOMER })
            dispatch({ type: ActionTypes.CLEAR_CUSTOMER_VALIDATE_ERRORS });
        };
    }, [id, dispatch]);
   
    useEffect(() => {
        if (submitSuccess) {
            history.push({ pathname: '/customers' })
        }
    }, [submitSuccess, history])

    if (customer === null) return <></>
    
    return (
        <CustomerForm/>
    )
}
