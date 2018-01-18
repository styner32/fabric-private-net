import {createActions, handleActions} from "redux-actions";
import {Observable} from "rxjs/Observable";
import rw from "../common/requestWrapper"
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
import {CHANNELS} from "../common/endpoints";


export const CHANNELS_GET = "CHANNELS_GET";
export const CHANNELS_GET_SUCCESS = "CHANNELS_GET_SUCCESS";
export const CHANNELS_GET_FAILURE = "CHANNELS_GET_FAILURE";

export const {
    channelsGet,
    channelsGetSuccess,
    channelsGetFailure
} = createActions(
    CHANNELS_GET,
    CHANNELS_GET_SUCCESS,
    CHANNELS_GET_FAILURE
);


export const fetchChannelsEpic = (action$, store) => {
    return action$.ofType(CHANNELS_GET)
        .mergeMap(action => {
            console.log("fetchChannelsEpic ==> %o", action);
            return rw
                .get(CHANNELS, {}, store)
                .map(response => channelsGetSuccess(response))
                .catch(val => Observable.of(channelsGetFailure(val)));
        });
};

const initialState = {
    isLoading: true,
    items: []
};

const reducer = handleActions(
    {
        CHANNELS_GET: (state, action) => Object.assign({...state}, {isLoading: true}),
        CHANNELS_GET_SUCCESS: (state, action) => ({
            isLoading: false,
            items: action.payload
        })
    },
    initialState
);

export default reducer;