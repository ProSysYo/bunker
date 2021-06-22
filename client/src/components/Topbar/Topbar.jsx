import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Avatar, Popover, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { ActionTypes } from '../../redux/constants/action-types';

import './Topbar.css'

const Topbar = ({ user }) => {
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()

    const buttonClick = () => {
        setVisible(state => !state)
        dispatch({ type: ActionTypes.LOGOUT });
    }

    const handleVisibleChange = () => {
        setVisible(state => !state)
    }

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Бункер</span>
                </div>
                <div className="topRight">
                    <Popover content={<Button onClick={buttonClick} type="text">Выйти</Button>}                         
                        trigger="click" 
                        placement="bottom" 
                        className="popover"
                        visible={visible}
                        onVisibleChange={handleVisibleChange}                    
                    >
                        <span className="topUsername">{user?.username}</span>
                        <Avatar icon={<UserOutlined />} />
                    </Popover>
                </div>
            </div>
        </div>
    )
}

export default Topbar
