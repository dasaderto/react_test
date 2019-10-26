import React from 'react';
import {BrowserRouter, Route, Switch,Link} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import {AdminPanel, Home} from './pages';
import {store} from "./reducers/rootReducer";
import setAuthToken from "./auth/setAuthToken";

if(localStorage["appState"]){

    setAuthToken(JSON.parse(localStorage['appState']).user.auth_token);
}

function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <PrivateRoute path="/admin" component={AdminPanel}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
