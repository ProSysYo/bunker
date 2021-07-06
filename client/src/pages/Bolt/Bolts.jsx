import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Modal } from 'antd'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { RightBar } from '../../components/RightBar/RightBar';
import { AddBoltForm } from './AddBoltForm';
import { EditBoltContainer } from './EditBoltContainer';

import { deleteBolt, getBolts } from '../../redux/actions/bolt';

const { Column } = Table

export const Bolts = () => {
    const dispatch = useDispatch()
    const bolts = useSelector(state => state.bolt.bolts)
    const submitSuccess = useSelector(state => state.bolt.submitSuccess)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [deleteId, setDeleteId] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getBolts())
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
        dispatch(deleteBolt(deleteId))
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
            <Title>Засовы</Title>
            <AddIcon onClick={() => setShowAddForm(true)}><PlusOutlined /></AddIcon>
            <Table dataSource={bolts} size="small" rowKey="_id" pagination={{ pageSize: 15 }}>
                <Column title="Наименование" dataIndex="name" />
                <Column title="Тип" dataIndex="type" />                             
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

            <RightBar close={setShowAddForm} show={showAddForm}><AddBoltForm /></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><EditBoltContainer id={selectedId} /></RightBar>
            
            <Modal
                title="Удаление цвета фурнитуры"
                visible={isModalVisible}
                cancelText="Нет"
                okText="Да"
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                centered                
            >
                <p>Вы действительно хотите удалить цвет фурнитуры?</p>
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