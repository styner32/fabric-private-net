import api from '../utils/fabricConnector';

export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE';

export const ORGS_RETRIEVE_REQUEST = "ORGS_RETRIEVE_REQUEST";
export const ORGS_RETRIEVE_SUCCESS = "ORGS_RETRIEVE_SUCCESS";
export const ORGS_RETRIEVE_FAILURE = "ORGS_RETRIEVE_FAILURE";

export function createUser(username, orgName) {
    return (dispatch) => {
        dispatch({type: USER_CREATE_REQUEST});
        return api.postUser(username, orgName)
            .then((postedItem) => {
                console.log('done', postedItem);
                dispatch({type: USER_CREATE_SUCCESS, item: postedItem});
            })
            .catch((e) => {
                console.log('failed', e);
                dispatch({type: USER_CREATE_FAILURE, msg: e});
            });
    };
}

export function retrieveOrgs() {
    return (dispatch) => {
        dispatch({type: ORGS_RETRIEVE_REQUEST});
        return api.getOrgs()
            .then((orgs) => {
                console.log('done', orgs);
                dispatch({type: ORGS_RETRIEVE_SUCCESS, item: orgs});
            })
            .catch((e) => {
                console.log('failed', e);
                dispatch({type: ORGS_RETRIEVE_FAILURE, msg: e});
            });
    };
}