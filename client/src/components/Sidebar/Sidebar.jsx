import React from 'react'
import { Link } from "react-router-dom";

import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link sidebarListLink">
                            <li className="sidebarListItem active">                                
                                Home
                            </li>
                        </Link>
                        <Link to="/sales" className="link">
                            <li className="sidebarListItem">                                
                                Sales
                            </li>
                        </Link>
                        <Link to="/customers" className="link">
                            <li className="sidebarListItem">                                
                                Customers
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Sidebar
