import React from 'react'
import { CloseOutlined } from '@ant-design/icons';

import './RightBar.css'

export const RightBar = ({ children, close}) => {
    return (
        <div className="rightBar">
            <p className="closeRightBar" onClick={() => close(false)}><CloseOutlined /></p>
            <div className="rightBarContent">
                {children}
            </div>
        </div>
    )
}
