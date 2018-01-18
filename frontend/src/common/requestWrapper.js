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

const defaultHeaders = (token) => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
});

export default {
    get: (endpoint, headers, store) => Observable.ajax
        .get(endpoint, Object.assign({}, defaultHeaders(store.getState().users.creds.token), headers))
        .map(x => x.response),
    post: (endpoint, body, headers, store) => {
        const finalHeaders = Object.assign({}, defaultHeaders(store.getState().users.creds.token), headers)
        return Observable.ajax
            .post(endpoint, body, finalHeaders)
            .map(x => x.response)
    }
}