import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Topbar from "./components/Topbar/Topbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Home from "./pages/Home/Home"
import Registration from "./pages/Registration/Registration"

function App() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

    return (
        <BrowserRouter>
            <Topbar />
            {isLoggedIn
                ? <div className="container">
                    <Sidebar />
                    <div className="pages">
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Redirect to='/'/>
                        </Switch>
                    </div>

                </div>
                :
                <div className="containerCenter">
                    <Switch>                        
                        <Route path="/registration" component={Registration}/> 
                        <Route path="/login" component={Registration}/>                          
                        <Redirect to='/registration'/>
                    </Switch>
                </div>
            }

        </BrowserRouter>
    );
}

export default App;
