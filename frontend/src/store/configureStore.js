import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";
import {createEpicMiddleware} from "redux-observable";
import {rootEpic} from "./rootEpic";
import {routerMiddleware} from 'react-router-redux'

import {composeWithDevTools} from 'redux-devtools-extension';


export default function configureStore(history, initialState) {
    const epicMiddleware = createEpicMiddleware(rootEpic);

    const routeMiddleware = routerMiddleware(history);

    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware, routeMiddleware, epicMiddleware)
        )
    );
}
