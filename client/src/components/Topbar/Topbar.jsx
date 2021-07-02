import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Avatar, Popover, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './Topbar.css'
import logo from '../../assets/img/logo.png'
import { acLogout } from '../../redux/reducers/auth';

const Topbar = ({ user }) => {
    const [visible, setVisible] = useState(false)

    const dispatch = useDispatch()

    const leaveHandle = () => {
        setVisible(state => !state)
        dispatch(acLogout())        
    }

    const handleVisibleChange = () => {
        setVisible(state => !state)
    }

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">                    
                    <img src={logo} alt="logo" />
                </div>
                <div className="topRight">
                    <Popover content={<Button onClick={leaveHandle} type="text">Выйти</Button>}                         
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
