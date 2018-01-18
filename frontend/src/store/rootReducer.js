import {combineReducers} from 'redux';
import users from '../modules/userModule';
import orgs from '../modules/orgsModule';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    router: routerReducer,
    users,
    orgs
});

export default rootReducer;
