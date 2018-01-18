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

import {ORGS_USERS} from "../common/endpoints"

export const ORGS_USERS_POST = "ORGS_USERS_POST";
export const ORGS_USERS_POST_SUCCESS = "ORGS_USERS_POST_SUCCESS";
export const ORGS_USERS_POST_FAILURE = "ORGS_USERS_POST_FAILURE";

export const {
    orgsUsersPost,
    orgsUsersPostSuccess,
    orgsUsersPostFailure
} = createActions(
    ORGS_USERS_POST,
    ORGS_USERS_POST_SUCCESS,
    ORGS_USERS_POST_FAILURE
);

export const orgsUserPostEpic = (action$, store) => {
    return action$.ofType(ORGS_USERS_POST)
        .mergeMap(action => {
            console.log("orgsUserPostEpic ==> %o", action);
            return Observable.ajax
                .post(ORGS_USERS(action.payload.orgName), action.payload)
                .map(x => x.response)
                .map(response => orgsUsersPostSuccess(response))
                .catch(val => Observable.of(orgsUsersPostFailure(val)));
        });
};


const initialState = {
    orgsUsersPosting: false,
    isLoggedIn: false,
    creds: {}
};

const reducer = handleActions(
    {
        ORGS_USERS_POST: (state, action) => ({
            ...state,
            organization: action.payload.organization,
            orgsUsersPosting: true,
            isLoggedIn: false
        }),
        ORGS_USERS_POST_SUCCESS: (state, action) => ({
            ...state,
            orgsUsersPosting: false,
            isLoggedIn: true,
            creds: Object.assign({}, action.payload)
        }),
        ORGS_USERS_POST_FAILURE: (state, action) => ({
            ...state,
            orgsUsersPosting: false,
            creds: {}
        })
    },
    initialState
);

export default reducer;