import React, { useEffect, useState } from 'react'

import { Table, Space, Modal } from 'antd'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux'

import './Locks.css'
import { RightBar } from '../../components/RightBar/RightBar';
import { AddLockForm } from './AddLockForm'

import { deleteLock, getLocks } from '../../redux/actions/lock';
import { EditLockContainer } from './EditLockContainer';

const { Column } = Table

export const Locks = () => {
    const dispatch = useDispatch()
    const locks = useSelector(state => state.lock.locks)
    const submitSuccess = useSelector(state => state.lock.submitSuccess)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedLockId, setSelectedLockId] = useState("")
    const [deleteLockId, setDeleteLockId] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getLocks())
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
        dispatch(deleteLock(deleteLockId))
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
            <h2 className="locksTitle">Модели замков</h2>
            <span className="locksAddIcon" onClick={() => setShowAddForm(true)}><PlusOutlined /></span>
            <Table dataSource={locks} size="small" rowKey="_id" pagination={{ pageSize: 20 }}>
                <Column title="Наименование" dataIndex="name" />
                <Column title="Тип" dataIndex="type" />
                <Column title="Место установки" dataIndex="insertPlace" />
                <Column 
                    title="Задвижка" 
                    dataIndex="isLatch" 
                    render={(isLatch) => <span>{isLatch ? "да" : "нет"}</span>}
                />               
                <Column
                    title="Действия"
                    key="actions"
                    render={(record) => (
                        <Space size="middle">
                            <span className="locksTableItemAction" onClick={() => editClick(record._id)}><EditOutlined /></span>
                            <span className="locksTableItemAction" onClick={() => deleteClick(record._id)}><DeleteOutlined /></span>
                        </Space>
                    )} />
            </Table>

            <RightBar close={setShowAddForm} show={showAddForm}><AddLockForm /></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><EditLockContainer id={selectedLockId} /></RightBar>
            
            <Modal
                title="Удаление замка"
                visible={isModalVisible}
                cancelText="Нет"
                okText="Да"
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                centered                
            >
                <p>Вы действительно хотите удалить замок?</p>
                <span>Удаление нельзя отменить</span>
            </Modal>
        </div>
    )
}
