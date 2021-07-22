import { React, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { notification, Spin } from 'antd';
import { useDispatch } from 'react-redux'

import 'antd/dist/antd.css'
import './App.css';

import Topbar from "./components/Topbar/Topbar"
import Sidebar from "./components/Sidebar/Sidebar"

import { Home } from "./pages/Home/Home"
import Registration from "./pages/Registration/Registration"
import { Login } from "./pages/Login/Login"

import { auth } from './redux/actions/auth';
import { Customers } from './pages/Customers/Customers';
import { messageActions } from './redux/reducers/message';
import { Locks } from './pages/Locks/Locks';
import { TypeCanvases } from './pages/TypeCanvas/TypeCanvases'
import { FurnitureColors } from './pages/FurnitureColor/FurnitureColors'
import { Bolts } from './pages/Bolt/Bolts'
import { Covers } from './pages/Cover/Covers'
import { Cylinders } from './pages/Cylinder/Cylinders'
import { Handles } from './pages/Handle/Handles'
import { Peepholes } from './pages/Peephole/Peepholes'
import { PeepholeLocations } from './pages/PeepholeLocation/PeepholeLocations'
import { DoorColors } from './pages/DoorColor/DoorColors'
import { TypePanels } from './pages/TypePanel/TypePanels'
import { Wraps } from './pages/Wrap/Wraps'
import { Partisanships } from './pages/Partisanship/Partisanships'
import { HingeSides } from './pages/HingeSide/HingeSides'
import { HingeTypes } from './pages/HingeType/HingeTypes'

function App() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const activeUser = useSelector(state => state.auth.user)
    const message = useSelector(state => state.message.message)
    const isLoading = useSelector(state => state.loading.isLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const openNotification = () => {
            notification.info({
                description: message
            })
        }

        if (message) {
            openNotification()
            dispatch(messageActions.clearMessage())
        }
    }, [message, dispatch]);

    if (isLoggedIn === undefined) {
        return (
            <div className="spinner">
                <Spin size="large"/>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <div className="app">
                <Topbar user={activeUser}/>
                {isLoggedIn
                    ? <div className="container">                       
                        <Sidebar /> 
                        <div className="pages">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/customers" component={Customers} />
                                <Route exact path="/locks" component={Locks} />
                                <Route exact path="/typecanvases" component={TypeCanvases} /> 
                                <Route exact path="/furniturecolors" component={FurnitureColors} /> 
                                <Route exact path="/bolts" component={Bolts} />
                                <Route exact path="/covers" component={Covers} />
                                <Route exact path="/cylindres" component={Cylinders} />
                                <Route exact path="/handles" component={Handles} />
                                <Route exact path="/peepholes" component={Peepholes} />
                                <Route exact path="/peepholelocations" component={PeepholeLocations} />
                                <Route exact path="/doorcolors" component={DoorColors} />
                                <Route exact path="/typepanels" component={TypePanels} />
                                <Route exact path="/wraps" component={Wraps} />
                                <Route exact path="/partisanships" component={Partisanships} />
                                <Route exact path="/hingesides" component={HingeSides} />
                                <Route exact path="/hingetypes" component={HingeTypes} />

                                <Redirect to='/' />
                            </Switch>
                        </div>
                    </div>
                    :
                    <div className="containerCenter">
                        <Switch>
                            <Route path="/registration" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Redirect to='/login' />
                        </Switch>
                    </div>
                }
                {isLoading && <span className="spinner"><Spin size="large"/></span>}
            </div>
        </BrowserRouter>
    );
}

export default App;
