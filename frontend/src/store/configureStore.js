import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";
import {createEpicMiddleware} from "redux-observable";
import {rootEpic} from "./rootEpic";

export default function configureStore(initialState) {
    const epicMiddleware = createEpicMiddleware(rootEpic);

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, epicMiddleware)
    );
}
