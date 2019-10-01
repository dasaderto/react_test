import React from 'react';
import {Route, Switch} from "react-router-dom";
import {store} from "./reducers/rootReducer";

import {AdminPanel, Home} from './pages';


function App() {
    return (
        <div className="wrapper">

            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/admin' component={AdminPanel}/>
            </Switch>
        </div>
    );
}

export default App;
