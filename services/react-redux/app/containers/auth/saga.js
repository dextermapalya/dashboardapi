/**
 * authenticates a user for the given credentials
 */

import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import request from 'utils/request';
import { AUTH_LOGIN } from 'shared/constants';
import { AUTHENTICATE } from './constants';
import { authComplete, authError } from './actions';
import { makeSelectCredentials } from './selectors';
import Log from 'logger-init';

/**
   * POST REQUEST TO VERIFY USER CREDENTIALS
   */
export function* verifyCredentials() {
  // Select credentials from store
  // console.log('GET CREDENTIALS....');
  const credentials = yield select(makeSelectCredentials());

  const emailCheck = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  const fd = new FormData();
  if (emailCheck.test(credentials.username) && credentials.username.indexOf('@') > 0) {
    fd.append('email', credentials.username);
  }
  fd.append('username', credentials.username);
  fd.append('password', credentials.password);
  fd.append('scope', credentials.scope);
  try {
    // Call our request helper (see 'utils/request')
    const options = {
      method: 'POST',
      body: fd,
      headers: {}
    };

    const result = yield call(request, AUTH_LOGIN, options);

    yield put(
      authComplete(result, credentials.username, true)
    );
  } catch (err) {
    yield put(authError(err));
  }
}

/**
   * Root saga manages watcher lifecycle
   */
export default function* login() {
  // Watches for AUTHENTICATE actions and calls verifyCredentials when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(AUTHENTICATE, verifyCredentials);
}
