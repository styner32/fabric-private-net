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

export const ORGS_RETRIEVE = "ORGS_RETRIEVE";
export const ORGS_RETRIEVE_SUCCESS = "ORGS_RETRIEVE_SUCCESS";
export const ORGS_RETRIEVE_FAILURE = "ORGS_RETRIEVE_FAILURE";

export const {
    orgsRetrieve,
    orgsRetrieveSuccess,
    orgsRetrieveFailure
} = createActions(
    ORGS_RETRIEVE,
    ORGS_RETRIEVE_SUCCESS,
    ORGS_RETRIEVE_FAILURE
);

export const fetchOrgEpic = (action$, store) => {
    return action$.ofType(ORGS_RETRIEVE)
        .mergeMap(action => {
            console.log("fetchOrgEpic ==> %o", action);
            return Observable.fromPromise(api.getOrgs())
                .map(response => ([
                    {
                        key: "sg",
                        value: "sg",
                        text: "Singapore"
                    },
                    {
                        key: "au",
                        value: "au",
                        text: "Australia"
                    },
                    {
                        key: "ch",
                        value: "ch",
                        text: "China"
                    }
                ]))
                .map(response => orgsRetrieveSuccess(response))
                .catch(val => Observable.of(orgsRetrieveFailure(val)));
        });
};

const reducer = handleActions(
    {
        ORGS_RETRIEVE: (state, action) => Object.assign({...state}, {isLoading: true}),
        ORGS_RETRIEVE_SUCCESS: (state, action) => ({
            isLoading: false,
            items: action.payload
        })
    },
    {
        isLoading: true,
        items: []
    }
);

export default reducer;