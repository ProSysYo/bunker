import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Modal } from 'antd'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { RightBar } from '../../components/RightBar/RightBar';
import { AddPackagingForm } from './AddOrderContainer';
import { EditPackagingContainer } from './EditPackagingContainer';

import { deletePackaging, getPackagings } from '../../redux/actions/packaging';

const { Column } = Table

export const Packagings = () => {
    const dispatch = useDispatch()
    const packagings = useSelector(state => state.packaging.packagings)
    const submitSuccess = useSelector(state => state.packaging.submitSuccess)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [deleteId, setDeleteId] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getPackagings())
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
        dispatch(deletePackaging(deleteId))
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
            <Title>Текущие заказы</Title>
            <AddIcon onClick={() => setShowAddForm(true)}><PlusOutlined /></AddIcon>
            <MyTable dataSource={packagings} size="small" rowKey="_id" pagination={{ pageSize: 15 }}>
                <Column title="Наименование" dataIndex="name" />
                <Column title="Владелец" dataIndex="owner" />
                <Column
                    title="Действия"
                    key="actions"
                    render={(record) => (
                        <Space size="middle">
                            <ActionItem onClick={() => editClick(record._id)}><EditOutlined /></ActionItem>
                            <ActionItem onClick={() => deleteClick(record._id)}><DeleteOutlined /></ActionItem>
                        </Space>
                    )} />
            </MyTable>

            <RightBar close={setShowAddForm} show={showAddForm}><AddPackagingForm /></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><EditPackagingContainer id={selectedId} /></RightBar>

            <Modal
                title="Удаление упаковки"
                visible={isModalVisible}
                cancelText="Нет"
                okText="Да"
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                centered
            >
                <p>Вы действительно хотите удалить упаковку?</p>
                <span>Удаление нельзя отменить</span>
            </Modal>
        </div>
    )
}

const Title = styled.h2`
    text-align: center;    
`
const MyTable = styled(Table)`
  tbody {
    tr {             
        font-size: 13px;
    }    
  }
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