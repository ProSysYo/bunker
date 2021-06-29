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
                <Menu.Item icon={<AppstoreOutlined />} key="1"><Link to="/">Главная</Link></Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="Заказы">
                    <Menu.Item key="2">Текущие</Menu.Item>
                    <Menu.Item key="3">Архив</Menu.Item>
                    <Menu.Item key="4">Возврат</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Таблицы">
                    <Menu.Item key="5"><Link to="/customers">Заказчики</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/modeldoors">Модели дверей</Link></Menu.Item>
                    <Menu.Item key="7"><Link to="/locks">Замки</Link></Menu.Item>

                    
                    <Menu.Item key="8">Ручки</Menu.Item>
                    <Menu.Item key="9">Накладки</Menu.Item>
                    <Menu.Item key="10">Уплотнители</Menu.Item>
                    <Menu.Item key="11">Засовы</Menu.Item>
                    <Menu.Item key="12">Типы панелей</Menu.Item>
                    <Menu.Item key="13">Типы пленок</Menu.Item>
                    <Menu.Item key="14">Цвета дверей</Menu.Item>
                    <Menu.Item key="15">Фрезеровки</Menu.Item>
                </SubMenu>
            </Menu>
        </div>

    );
};

export default Sidebar
