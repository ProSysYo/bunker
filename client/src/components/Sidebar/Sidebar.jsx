import React from 'react'
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';

import './Sidebar.css'

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2'];

const Sidebar = () => {
    const [openKeys, setOpenKeys] = React.useState(['']);

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (

        <div className="sidebar">
            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
                <Menu.Item icon={<AppstoreOutlined />} key="1"><Link to="/">Home</Link></Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="Коммуникации">
                    <Menu.Item key="2">Viber</Menu.Item>
                    <Menu.Item key="3">Watsap</Menu.Item>
                    <Menu.Item key="4">Telegram</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Заказы">
                    <Menu.Item key="5">Активные заказы</Menu.Item>
                    <Menu.Item key="6">Отгруженные заказы</Menu.Item>
                </SubMenu>
            </Menu>
        </div>

    );
};

export default Sidebar
