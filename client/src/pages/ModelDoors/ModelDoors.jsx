import React, { useEffect, useState } from 'react'

import { Table, Space, Modal } from 'antd'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux'

import './ModelDoors.css'
import { RightBar } from '../../components/RightBar/RightBar';
import { deleteModelDoor, getModelDoors } from '../../redux/actions/model-door';
import { AddModelDoor } from './AddModelDoor/AddModelDoor';
import { EditModelDoor } from './EditModelDoor/EditModelDoor';

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
            <h2 className="modelDoorsTitle">Модели дверей</h2>
            <span className="modelDoorsAddIcon" onClick={() => setShowAddForm(true)}><PlusOutlined /></span>
            <Table dataSource={modelDoors} size="small" rowKey="_id" pagination={{ pageSize: 20 }}>
                <Column title="Сокращение" dataIndex="abbreviation" />
                <Column title="Наименование" dataIndex="name" />                
                <Column
                    title="Действия"
                    key="actions"
                    render={(record) => (
                        <Space size="middle">
                            <span className="modelDoorsTableItemAction" onClick={() => editClick(record._id)}><EditOutlined /></span>
                            <span className="modelDoorsTableItemAction" onClick={() => deleteClick(record._id)}><DeleteOutlined /></span>
                        </Space>
                    )} />
            </Table>

            <RightBar close={setShowAddForm} show={showAddForm}><AddModelDoor /></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><EditModelDoor id={selectedModelDoorId} /></RightBar>
            
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
