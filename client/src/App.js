import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Registration from './pages/Registration';



function App() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    return (
        <BrowserRouter>      
            <div className="App">
                <div className="wrap">
                    {!isLoggedIn ?
                        <Switch>
                            <Route path="/registration" component={Registration} />
                            {/* <Route path="/login" component={Login} />
                            <Redirect to='/login' /> */}
                        </Switch>
                        :
                        <Switch>
                            {/* <Route exact path="/" component={Disk} />
                            <Route exact path="/profile" component={Profile} />
                            <Redirect to="/" /> */}
                        </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
