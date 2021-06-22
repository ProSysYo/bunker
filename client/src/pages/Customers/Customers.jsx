import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

import { Table, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from '../../redux/actions/customer'

import './Customers.css'

const columns = [
    { title: 'Код', dataIndex: 'code' },
    { title: 'Имя заказчика', dataIndex: 'name' },
    { title: 'Телефон', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Адрес', dataIndex: 'adress' },
    {
        title: 'Действия',
        key: 'action',
        render: () => (
            <Space size="middle">
                <span><EditOutlined /></span>
                <span><DeleteOutlined /></span>                
            </Space>
        ),
    }
]

export const Customers = () => {
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customer.customers)

    useEffect(() => {
        dispatch(getCustomers())
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2 className="customerPageTitle">Заказчики</h2>
            <Link to="/addcustomer">
                <span className="addIcon"><PlusOutlined/></span> 
            </Link>                      
            <Table columns={columns} dataSource={customers} size="middle" rowKey="_id" />
            
        </div>
    )
}
