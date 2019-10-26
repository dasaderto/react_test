import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import {store} from "../../reducers/rootReducer";

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={routeProps => (
                store.getState().authReducer.isLoggedIn ?
                    <Component {...routeProps} />
                    :
                    <Redirect to={'/'}/>
            )}
        />
    )
}

export default PrivateRoute;
