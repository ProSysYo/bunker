import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

import { Table, Space } from 'antd'


import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux'
import { deleteCustomer, getCustomers } from '../../redux/actions/customer'

import './Customers.css'

const { Column } = Table

export const Customers = () => {
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customer.customers)

    useEffect(() => {
        dispatch(getCustomers())
        // eslint-disable-next-line
    }, [])

    const deleteClick = (id) => {
        dispatch(deleteCustomer(id))
    }

    return (
        <div>
            <h2 className="customerPageTitle">Заказчики</h2>
            <Link to="/addcustomer">
                <span className="addIcon"><PlusOutlined /></span>
            </Link>
            <Table dataSource={customers} size="small" rowKey="_id" >
                <Column title="Код" dataIndex="code" />
                <Column title="Имя заказчика" dataIndex="name" />
                <Column title="Телефон" dataIndex="phone" />
                <Column title="Email" dataIndex="email" />
                <Column title="Адрес" dataIndex="adress" />
                <Column
                    title="Действия"
                    key="actions"
                    render={(text, record) => (
                        <Space size="middle">
                            <Link className="tableItemAction" to={"/customers/" + record._id}><EditOutlined /></Link>
                            <span className="tableItemAction" onClick={() => deleteClick(record._id)}><DeleteOutlined /></span>
                        </Space>
                    )} />

            </Table>

        </div>
    )
}
