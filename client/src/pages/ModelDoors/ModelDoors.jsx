import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Modal } from 'antd'
import styled from 'styled-components'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

import { RightBar } from '../../components/RightBar/RightBar';
import { deleteModelDoor, getModelDoors } from '../../redux/actions/model-door'
import { AddModelDoorForm } from './AddModelDoorForm';
import { EditModelDoorContainer } from './EditModelDoorContainer';

const { Column } = Table

export const ModelDoors = () => {
    const dispatch = useDispatch()
    const modelDoors = useSelector(state => state.modelDoor.modelDoors)
    const submitSuccess = useSelector(state => state.modelDoor.submitSuccess)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedModelDoorId, setSelectedModelDoorId] = useState("")
    const [deleteModelDoorId, setDeleteModelDoorId] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getModelDoors())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setShowEditForm(false)
        setShowAddForm(false)             
    }, [submitSuccess])

    const deleteClick = (id) => {
        setDeleteModelDoorId(id)
        setIsModalVisible(true)
    }

    const handleOkModal = () => {
        dispatch(deleteModelDoor(deleteModelDoorId))
        setIsModalVisible(false)
    }

    const handleCancelModal = () => {
        setIsModalVisible(false)
    }

    const editClick = (id) => {
        setSelectedModelDoorId(id)
        setShowEditForm(true)
    }

    return (
        <div>
            <Title>Модели дверей</Title>
            <AddIcon onClick={() => setShowAddForm(true)}><PlusOutlined /></AddIcon>
            <Table dataSource={modelDoors} size="small" rowKey="_id" pagination={{ pageSize: 20 }}>
                <Column title="Сокращение" dataIndex="abbreviation" />
                <Column title="Наименование" dataIndex="name" />
                <Column title="Наружная отделка" dataIndex="trimOutside" />
                <Column title="Внутренная отделка" dataIndex="trimInside" />
                <Column 
                    title="Двустворчатая" 
                    dataIndex="isDoubleDoors" 
                    render={(isDoubleDoors) => <span>{isDoubleDoors ? "да" : "нет"}</span>}
                />
                <Column title="Утеплитель" dataIndex="insulation" /> 
                <Column title="Кол-во конутров" dataIndex="countContour" />                 
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

            <RightBar close={setShowAddForm} show={showAddForm}><AddModelDoorForm /></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><EditModelDoorContainer id={selectedModelDoorId} /></RightBar>
            
            <Modal
                title="Удаление модели двери"
                visible={isModalVisible}
                cancelText="Нет"
                okText="Да"
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                centered                
            >
                <p>Вы действительно хотите удалить модель двери?</p>
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