import api from '../utils/fabricConnector';

export const USER_CREATE_REQUEST = 'USER_CREATE_REQUEST';
export const USER_CREATE_SUCCESS = 'USER_CREATE_SUCCESS';
export const USER_CREATE_FAILURE = 'USER_CREATE_FAILURE';

export function create(username, orgName) {
  return (dispatch) => {
    dispatch({ type: USER_CREATE_REQUEST });
    return api.registerUser(username, orgName)
      .then((postedItem) => {
        console.log('done', postedItem);
        dispatch({ type: USER_CREATE_SUCCESS, item: postedItem });
      })
      .catch((e) => {
        console.log('failed', e);
        dispatch({ type: USER_CREATE_FAILURE, msg: e });
      });
  };
}
