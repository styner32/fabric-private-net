import api from '../utils/fabricConnector';
import {createActions, handleActions} from "redux-actions";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/observable/of";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/defer";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/concatMap";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";

export const USER_CREATE = 'USER_CREATE';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE';

export const ORGS_RETRIEVE = "ORGS_RETRIEVE";
export const ORGS_RETRIEVE_SUCCESS = "ORGS_RETRIEVE_SUCCESS";
export const ORGS_RETRIEVE_FAILURE = "ORGS_RETRIEVE_FAILURE";

export const {
    userCreate,
    userCreateSuccess,
    userCreateFailure,
    orgsRetrieve,
    orgsRtrieveSuccess,
    orgsRetrieveFailure
} = createActions(
    USER_CREATE,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAILURE,
    ORGS_RETRIEVE,
    ORGS_RETRIEVE_SUCCESS,
    ORGS_RETRIEVE_FAILURE
);

export const fetchUserEpic = (action$, store) => {
    return action$.ofType(USER_CREATE)
        .mergeMap(action => {
            console.log("fetchUserEpic ==> %o", action);
            return Observable.fromPromise(api.postUser({...action.payload}))
                .map(response => userCreateSuccess(response))
                .catch(val => Observable.of(userCreateFailure(val)));
        });
};

const reducer = handleActions(
    {
        USER_CREATE: (state, action) => ({
            ...state,
            org: action.payload
        }),
        USER_CREATE_SUCCESS: (state, action) => ({
            ...state,
            result: Object.assign({}, action.item)
        })
    },
    {}
);

export default reducer;