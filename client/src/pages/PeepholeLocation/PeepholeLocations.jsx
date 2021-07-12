import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Modal } from 'antd'

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { RightBar } from '../../components/RightBar/RightBar';
import { AddPeepholeLocationForm } from './AddPeepholeLocationForm';
import { EditPeepholeLocationContainer } from './EditPeepholeLocationContainer';

import { deletePeepholeLocation, getPeepholeLocations } from '../../redux/actions/peephole-location';

const { Column } = Table

export const PeepholeLocations = () => {
    const dispatch = useDispatch()
    const peepholeLocations = useSelector(state => state.peepholeLocation.peepholeLocations)
    const submitSuccess = useSelector(state => state.peepholeLocation.submitSuccess)

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [deleteId, setDeleteId] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(getPeepholeLocations())
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
        dispatch(deletePeepholeLocation(deleteId))
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
            <Title>Расположения глазков</Title>
            <AddIcon onClick={() => setShowAddForm(true)}><PlusOutlined /></AddIcon>
            <Table dataSource={peepholeLocations} size="small" rowKey="_id" pagination={{ pageSize: 15 }}>
                <Column title="Наименование" dataIndex="name" />                
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

            <RightBar close={setShowAddForm} show={showAddForm}><AddPeepholeLocationForm /></RightBar>
            <RightBar close={setShowEditForm} show={showEditForm}><EditPeepholeLocationContainer id={selectedId} /></RightBar>
            
            <Modal
                title="Удаление расположения цилиндра"
                visible={isModalVisible}
                cancelText="Нет"
                okText="Да"
                onOk={handleOkModal}
                onCancel={handleCancelModal}
                centered                
            >
                <p>Вы действительно хотите удалить расположение цилиндра?</p>
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