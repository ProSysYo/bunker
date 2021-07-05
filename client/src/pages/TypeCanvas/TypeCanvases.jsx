import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Modal } from 'antd'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { RightBar } from '../../components/RightBar/RightBar';
import { deleteTypeCanvas, getTypeCanvases } from '../../redux/actions/type-canvas';
import { AddTypeCanvasForm } from './AddTypeCanvasForm';
import { EditTypeCanvasContainer } from './EditTypeCanvasContainer';

const { Column } = Table

export const TypeCanvases = () => {
    const dispatch = useDispatch()
    const typeCanvases = useSelector(state => state.typeCanvas.typeCanvases)
    const submitSuccess = useSelector(state => state.typeCanvas.submitSuccess)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedTypeCanvasId, setSelectedLockId] = useState("")
    const [deleteTypeCanvasId, setDeleteLockId] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getTypeCanvases())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setShowEditForm(false)
        setShowAddForm(false)             
    }, [submitSuccess])

    const deleteClick = (id) => {
        setDeleteLockId(id)
        setIsModalVisible(true)
    }

    const handleOkModal = () => {
        dispatch(deleteTypeCanvas(deleteTypeCanvasId))
        setIsModalVisible(false)
    }

    const handleCancelModal = () => {
        setIsModalVisible(false)
    }

    const editClick = (id) => {
        setSelectedLockId(id)
        setShowEditForm(true)
    }

    return (
        <div>
            <Title>Типы полотен</Title>
            <AddIcon onClick={() => setShowAddForm(true)}><PlusOutlined /></AddIcon>
            <Table dataSource={typeCanvases} size="small" rowKey="_id" pagination={{ pageSize: 15 }}>
                <Column title="Сокращение" dataIndex="value" />
                <Column title="Описание" dataIndex="description" />
                <Column title="Отделка снаружи" dataIndex="trimOutside" />
                <Column title="Отделка внутри" dataIndex="trimInside" />              
                <Column title="Утеплитель" dataIndex="insulation" />              
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

            <RightBar close={setShowAddForm} show={showAddForm}><AddTypeCanvasForm /></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><EditTypeCanvasContainer id={selectedTypeCanvasId} /></RightBar>
            
            <Modal
                title="Удаление типа полотна"
                visible={isModalVisible}
                cancelText="Нет"
                okText="Да"
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                centered                
            >
                <p>Вы действительно хотите удалить тип полотна?</p>
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