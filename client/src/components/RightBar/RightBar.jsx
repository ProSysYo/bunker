import React from 'react'

import { CSSTransition } from 'react-transition-group'
import { CloseOutlined } from '@ant-design/icons';

import './RightBar.css'

export const RightBar = ({ children, close, show }) => {
    const nodeRef = React.useRef(null)
    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={show}
            timeout={300}
            classNames="side"
            unmountOnExit
        >
            <div className="rightBar" ref={nodeRef}>
                <p className="closeRightBar" onClick={() => close(false)}><CloseOutlined /></p>
                <div className="rightBarContent">
                    {children}
                </div>
            </div>
        </CSSTransition>
    )
}
