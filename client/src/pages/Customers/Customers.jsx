import React, { useEffect, useState } from 'react'


import { Table, Space } from 'antd'


import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux'
import { deleteCustomer, getCustomers } from '../../redux/actions/customer'

import './Customers.css'
import { RightBar } from '../../components/RightBar/RightBar';
import { AddCustomer } from './AddCustomer/AddCustomer';
import { Customer } from './Customer/Customer';

const { Column } = Table

export const Customers = () => {
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customer.customers)
    const submitSuccess = useSelector(state => state.customer.submitSuccess)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedCustomerId, setSelectedCustomerId] = useState("")

    useEffect(() => {
        dispatch(getCustomers())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setShowEditForm(false)
        setShowAddForm(false)
        // eslint-disable-next-line
    }, [submitSuccess])

    const deleteClick = (id) => {
        dispatch(deleteCustomer(id))
    }

    const editClick = (id) => {
        setSelectedCustomerId(id)
        setShowEditForm(true)
    }

    return (
        <div>
            <h2 className="customerPageTitle">Заказчики</h2>            
            <span className="addIcon" onClick={() => setShowAddForm(true)}><PlusOutlined /></span>            
            <Table dataSource={customers} size="small" rowKey="_id" pagination={{ pageSize: 20 }}>
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
                            <span className="tableItemAction" onClick={() => editClick(record._id)}><EditOutlined /></span>
                            <span className="tableItemAction" onClick={() => deleteClick(record._id)}><DeleteOutlined /></span>
                        </Space>
                    )} />
            </Table>
            
            <RightBar close={setShowAddForm} show={showAddForm}><AddCustomer/></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><Customer id={selectedCustomerId}/></RightBar>
        </div>
    )
}
