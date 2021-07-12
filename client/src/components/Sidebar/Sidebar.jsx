import React from 'react'
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import './Sidebar.css'

const { SubMenu } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2'];

const Sidebar = () => {
    const [openKeys, setOpenKeys] = React.useState(['']);
    const [collapseSidebar, setCollapseSidebar] = React.useState(true);

    const onOpenChange = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <>              
            <MenuUnfoldOutlined className={collapseSidebar ? "nocollapse" : "collapse"} onClick={() => setCollapseSidebar(prev => !prev)}/>
               
            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} inlineCollapsed={collapseSidebar} style={{maxWidth: 280}}>                
                <Menu.Item icon={<AppstoreOutlined />} key="1"><Link to="/">Главная</Link></Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="Заказы">
                    <Menu.Item key="2">Текущие</Menu.Item>
                    <Menu.Item key="3">Архив</Menu.Item>
                    <Menu.Item key="4">Возврат</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Таблицы">
                    <Menu.Item key="5"><Link to="/customers">Заказчики</Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/typecanvases">Типы полотен</Link></Menu.Item>                    
                    <Menu.Item key="7"><Link to="/locks">Замки</Link></Menu.Item>
                    <Menu.Item key="8"><Link to="/furniturecolors">Цвета фурнитуры</Link></Menu.Item>
                    <Menu.Item key="9"><Link to="/bolts">Засовы</Link></Menu.Item>
                    <Menu.Item key="10"><Link to="/covers">Накладки</Link></Menu.Item>
                    <Menu.Item key="11"><Link to="/cylindres">Цилиндровые механизмы</Link></Menu.Item>
                    <Menu.Item key="12"><Link to="/handles">Ручки</Link></Menu.Item>
                    <Menu.Item key="13"><Link to="/peepholes">Глазки</Link></Menu.Item>
                </SubMenu>
            </Menu>   
        </>     
    );
};

export default Sidebar
