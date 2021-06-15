import React from 'react'

import './Topbar.css'

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Бункер</span>
                </div>
                <div className="topRight"> 
                    <span className="topUsername">Программист</span>                  
                    <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}

export default Topbar
