import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'

import Home from './components/Home';
import Login from './components/Login';

const history = createHistory();
const store = configureStore(history);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Redirect to="/login"/>
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
