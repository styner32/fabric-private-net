import {combineReducers} from 'redux';
import users from '../modules/userModule';

const rootReducer = combineReducers({
    users
});

export default rootReducer;
