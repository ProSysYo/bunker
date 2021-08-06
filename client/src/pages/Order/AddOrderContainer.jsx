import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd';
import { getAll } from '../../redux/actions/order'
import { AddOrderForm } from './AddOrderForm'


export const AddOrderContainer = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.order.isLoading)    

    useEffect(() => {              
        dispatch(getAll())        
    }, [])


    
    if (isLoading === null || isLoading ) {
        return <Spin className="spinner" size="large"/>
    }    
    
    return <AddOrderForm/>
}
