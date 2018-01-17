import {combineReducers} from 'redux';
import users from '../modules/userModule';
import orgs from '../modules/orgsModule';

const rootReducer = combineReducers({
    users,
    orgs
});

export default rootReducer;
