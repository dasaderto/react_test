// require('./bootstrap');
// require('./components/Example');

import React from 'react';
import {Route, Switch} from "react-router-dom";
import {store} from "./reducers/rootReducer";

import {Home} from './components';


function App() {
    return (
        <div className="wrapper">

            <Switch>
                <Route exact path='/' component={Home}/>
            </Switch>
        </div>
    );
}

export default App;