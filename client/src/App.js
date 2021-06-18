import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { notification, Spin } from 'antd';
import { useDispatch } from 'react-redux'

import 'antd/dist/antd.css'
import './App.css';

import Topbar from "./components/Topbar/Topbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Home from "./pages/Home/Home"
import Registration from "./pages/Registration/Registration"
import { clearMessage } from './redux/actions/message';


function App() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const message = useSelector(state => state.message.message)
    const isLoading = useSelector(state => state.loading.isLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        const openNotification = () => {
            notification.info({
                description: message
            })
        }

        if (message) {
            openNotification()
            dispatch(clearMessage())
        }
    }, [message, dispatch]);

    return (
        <BrowserRouter>
            <div className="app">
                <Topbar />
                {isLoggedIn
                    ? <div className="container">
                        <Sidebar />
                        <div className="pages">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Redirect to='/' />
                            </Switch>
                        </div>

                    </div>
                    :
                    <div className="containerCenter">
                        <Switch>
                            <Route path="/registration" component={Registration} />
                            <Route path="/login" component={Registration} />
                            <Redirect to='/registration' />
                        </Switch>
                    </div>
                }
                <div className="spinner">
                    {isLoading && <Spin size="large" />}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
