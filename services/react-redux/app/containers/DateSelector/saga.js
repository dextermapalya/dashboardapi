/**
 * Gets the repositories of the user from Github
 */

import {
  call, put, select, takeLatest
} from 'redux-saga/effects';
import { CHANGE_DATE, DATE_MODIFIED } from './constants';

// import request from 'utils/request';
import { makeSelectDate } from './selectors';

/**
 * API articles request/response handler
 */
export function* getInstallations() {
  // Select username from store
  // const username = yield select(makeSelectTitle());
  // const requestURL = `http://localhost/api/articles/`;

  try {
    // Call our request helper (see 'utils/request')
    // const articles = yield call(request, requestURL);
    // yield put(articlesLoaded(articles, 'username'));
  } catch (err) {
    yield (console.log(err));
    // yield put(articlesLoadingError(err));
  }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* dateWatcher() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(DATE_MODIFIED, getInstallations);
}
