import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Topbar from "./components/Topbar/Topbar"
import Sidebar from "./components/Sidebar/Sidebar"
import Home from "./pages/Home/Home"
import Registration from "./pages/Registration"

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
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/registration">
                                <Registration />
                            </Route>
                        </Switch>
                    </div>

                </div>
                :
                <div>
                    <Switch>                        
                        <Route path="/registration">
                            <Registration />
                        </Route>
                    </Switch>
                </div>
            }

        </BrowserRouter>
    );
}

export default App;
