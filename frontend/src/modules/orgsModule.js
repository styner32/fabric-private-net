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
import {ORGS} from "../common/endpoints";


export const ORGS_GET = "ORGS_GET";
export const ORGS_GET_SUCCESS = "ORGS_GET_SUCCESS";
export const ORGS_GET_FAILURE = "ORGS_GET_FAILURE";

export const {
    orgsGet,
    orgsGetSuccess,
    orgsGetFailure
} = createActions(
    ORGS_GET,
    ORGS_GET_SUCCESS,
    ORGS_GET_FAILURE
);


export const fetchOrgEpic = (action$, store) => {
    return action$.ofType(ORGS_GET)
        .mergeMap(action => {
            console.log("fetchOrgEpic ==> %o", action);
            return Observable.ajax
                .get(ORGS)
                .map(x => x.response)
                .map(response => ([
                    {
                        key: "ch",
                        value: "org1",
                        text: "Switzerland"
                    },
                    {
                        key: "sg",
                        value: "org2",
                        text: "Singapore"
                    },
                ]))
                .map(response => orgsGetSuccess(response))
                .catch(val => Observable.of(orgsGetFailure(val)));
        });
};

const initialState = {
    isLoading: true,
    items: []
};

const reducer = handleActions(
    {
        ORGS_GET: (state, action) => Object.assign({...state}, {isLoading: true}),
        ORGS_GET_SUCCESS: (state, action) => ({
            isLoading: false,
            items: action.payload
        })
    },
    initialState
);

export default reducer;