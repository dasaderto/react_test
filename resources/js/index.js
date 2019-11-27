import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './styles/index.scss';
import App from './app';
import {store} from "./reducers/rootReducer";
try{
    window.UIkit = require('uikit');
    window.Icons = require('uikit/dist/js/uikit-icons');

    UIkit.use(Icons);
}catch (e) {

}
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
