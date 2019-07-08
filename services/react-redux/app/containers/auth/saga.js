/**
 * authenticates a user for the given credentials
 */

import {
    call, put, select, takeLatest
  } from 'redux-saga/effects';
  import { AUTHENTICATE, AUTH_SUCCESS, AUTH_ERROR } from './constants';
  import { authComplete, authError } from './actions';
  import {AUTH_LOGIN} from 'shared/constants'
  import request from 'utils/request';
  import { makeSelectCredentials, makeSelectUser } from './selectors';
  import ApiClient from "utils/ApiClient";

  /**
   * POST REQUEST TO VERIFY USER CREDENTIALS
   */
  export function* verifyCredentials() {
    // Select credentials from store
    console.log('GET CREDENTIALS....')
    const credentials = yield select(makeSelectCredentials());
    var fd = new FormData()
    fd.set("username", credentials.username)
    fd.set("password", credentials.password)
    fd.set("scope", credentials.scope)
    const key = "userinfo"

    try {
      // Call our request helper (see 'utils/request')
      /*ApiClient.post(AUTH_LOGIN, fd)
      .then(res => {
        return res.data;
      })
      .then(result => {
        localStorage.setItem(key, JSON.stringify(result));
        console.log("result", result);
        put(authComplete(result.user, credentials.username, true) )

      })*/

      const result = yield call(ApiClient.post, AUTH_LOGIN,fd);
      yield put( 
        authComplete( result.data, credentials.username, true ) 
        );

    } catch (err) {
      yield put(authError(err));
    }
  }
  
  
  /**
   * Root saga manages watcher lifecycle
   */
  export default function* login() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(AUTHENTICATE, verifyCredentials);
  }
  