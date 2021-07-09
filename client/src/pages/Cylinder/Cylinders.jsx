import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Modal } from 'antd'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { RightBar } from '../../components/RightBar/RightBar';
import { AddCylinderForm } from './AddCylinderForm';
import { EditCylinderContainer } from './EditCylinderContainer';

import { deleteCylinder, getCylinders } from '../../redux/actions/cylinder';

const { Column } = Table

export const Cylinders = () => {
    const dispatch = useDispatch()
    const cylinders = useSelector(state => state.cylinder.cylinders)
    const submitSuccess = useSelector(state => state.cylinder.submitSuccess)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [deleteId, setDeleteId] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getCylinders())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setShowEditForm(false)
        setShowAddForm(false)             
    }, [submitSuccess])

    const deleteClick = (id) => {
        setDeleteId(id)
        setIsModalVisible(true)
    }

    const handleOkModal = () => {
        dispatch(deleteCylinder(deleteId))
        setIsModalVisible(false)
    }

    const handleCancelModal = () => {
        setIsModalVisible(false)
    }

    const editClick = (id) => {
        setSelectedId(id)
        setShowEditForm(true)
    }

    return (
        <div>
            <Title>Цилиндовые механизмы</Title>
            <AddIcon onClick={() => setShowAddForm(true)}><PlusOutlined /></AddIcon>
            <Table dataSource={cylinders} size="small" rowKey="_id" pagination={{ pageSize: 15 }}>
                <Column title="Наименование" dataIndex="name" />
                <Column title="Оригинальное название" dataIndex="originalName" /> 
                <Column
                    title="Действия"
                    key="actions"
                    render={(record) => (
                        <Space size="middle">
                            <ActionItem onClick={() => editClick(record._id)}><EditOutlined /></ActionItem>
                            <ActionItem onClick={() => deleteClick(record._id)}><DeleteOutlined /></ActionItem>
                        </Space>
                    )} />
            </Table>

            <RightBar close={setShowAddForm} show={showAddForm}><AddCylinderForm /></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><EditCylinderContainer id={selectedId} /></RightBar>
            
            <Modal
                title="Удаление цилиндра"
                visible={isModalVisible}
                cancelText="Нет"
                okText="Да"
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                centered                
            >
                <p>Вы действительно хотите удалить цилиндр?</p>
                <span>Удаление нельзя отменить</span>
            </Modal>
        </div>
    )
}

const Title = styled.h2`
    text-align: center;    
`

const AddIcon = styled.span`
    font-size: 30px;
    :hover {
        cursor: pointer;
    }  
`
const ActionItem = styled.span`    
    :hover {
        cursor: pointer;
    }  
`