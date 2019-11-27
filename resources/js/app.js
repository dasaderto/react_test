import React, {Component, lazy} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import axios from 'axios';
import {Home,AdminPanel,ProjectEdit} from './pages';
import setAuthToken from "./auth/setAuthToken";
import {store} from "./reducers/rootReducer";
import {tokenRevoked, tokenValid} from "./actions/auth-actions";


class App extends Component {

    constructor(props) {
        super(props);

        // if(localStorage['appState']){
        //     axios.get('/api/user', {
        //         headers: {Authorization: "Bearer " + JSON.parse(localStorage['appState']).user.auth_token}
        //     }).then(res => {
        //         setAuthToken(JSON.parse(localStorage['appState']).user.auth_token);
        //         store.dispatch(tokenValid());
        //     }).catch(err => {
        //         console.log(err);
        //         if (err.response.status === 401) {
        //             console.log("token revoke");
        //             setAuthToken(false);
        //             store.dispatch(tokenRevoked());
        //         }
        //     });
        // }else{
        //     setAuthToken(false);
        //     store.dispatch(tokenRevoked());
        // }
    }

    render() {
        return (
            <div className="page">
                <div className="page__wrapper">
                    <BrowserRouter>
                        <div className="wrapper">
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <PrivateRoute exact path="/admin" component={AdminPanel}/>
                                <PrivateRoute exact path="/admin/project/:id" component={ProjectEdit}/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default App;
