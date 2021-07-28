import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBolts } from '../../redux/actions/bolt'
import { getCovers } from '../../redux/actions/cover'
import { getCustomers } from '../../redux/actions/customer'
import { getCylinders } from '../../redux/actions/cylinder'
import { getDoorColors } from '../../redux/actions/door-color'
import { getFurnitureColors } from '../../redux/actions/furniture-color'
import { getHandles } from '../../redux/actions/handle'
import { getHingeSides } from '../../redux/actions/hinge-side'

export const AddOrderContainer = () => {
    const dispatch = useDispatch()    
    const[isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            dispatch(getCustomers()),
            dispatch(getBolts()),
            dispatch(getCovers()),
            dispatch(getCylinders()),
            dispatch(getDoorColors()),
            dispatch(getFurnitureColors()),
            dispatch(getHandles()),
            dispatch(getHingeSides())
        ])
        setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return <></>
    }

    return <div>Контент</div>
}
