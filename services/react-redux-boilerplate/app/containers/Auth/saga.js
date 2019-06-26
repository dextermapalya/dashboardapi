/**
 * Gets the repositories of the user from Github
 */

import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import { LOGIN } from './constants';
import { loginSuccess, loginError } from './actions';

import ApiClient from 'utils/ApiClient';

import { makeSelectUserName, makeSelectPassword } from './selectors';

/**
 * Github repos request/response handler
 */
export function* authenticate() {
  // Select username from store
  const username = yield select(makeSelectUserName());
  const password = yield select(makeSelectPassword());
  const options = {username: username, password:password, scope:'read'}
  //const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;
  const requestURL = `auth/login`;
  //create an object from FormData
  var fd = new FormData();
  fd.set('username', username);
  fd.set('password', password);
  fd.set('action', 'read');
  
  fd.set('scope', 'read');

  try {
    // Call our request helper (see 'utils/request')
    const userinfo = yield call(ApiClient.get, requestURL, fd);
    yield put(loginSuccess(userinfo, username));
  } catch (err) {
    yield put(loginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userdata() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGIN, authenticate);
}
