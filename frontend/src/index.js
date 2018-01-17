import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Document from './components/Document';
import Login from './components/Login';

const store = configureStore();

render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/about" component={About}/>
                <Route path="/documents" component={Document}/>
                <Redirect to="/login"/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
