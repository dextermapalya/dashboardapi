/*
 * Auth Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import Log from 'logger-init';
import authService from 'utils/authService';
import {
  AUTHENTICATE, AUTH_SUCCESS, AUTH_ERROR, AUTH_STATE,
  CHANGE_USERNAME, CHANGE_PASSWORD,
  USER_LOGOUT,
} from './constants';
import {TOKEN_EXPIRY_MINUTES} from 'shared/constants';

/**
 * Authenticates a user with given credentials
 *
 * @param  {object} credentials The username, password and any other data
 *
 * @return {object}    An action object with a type of AUTHENTICATE
 */
export function authenticateUser(credentials) {
  return {
    type: AUTHENTICATE,
    credentials
  };
}

/**
 * Retur a user with given details
 *
 * @param  {object} user The username, firstname, lastname etc
 *
 * @return {object}    An action object with a type of AUTH_STATE
 */
export function getAuthState(credentials) {
  return {
    type: AUTH_STATE,
    credentials
  };
}


/**
 * Dispatched when the user is succesfully authenticated by api endpoint initiated by the request saga
 *
 * @param  {array} articles The repository data
 * @param  {string} username The current username
 *
 * @return {object}  An action object with a type of LOAD_ARTICLES_SUCCESS passing the repos
 */
export function authComplete(user, username, isLoggedIn) {
  Log.info('$$$$$$%%%', user);
  const expiresIn = TOKEN_EXPIRY_MINUTES; // in minutes * 1000 milli seconds = 1 second
  const expiresAt = (expiresIn * (1000 * 60)) + new Date().getTime();
  user.expiresAt = expiresAt;
  authService.setToken(user);
  // localStorage.setItem('userinfo', JSON.stringify(user));
  return {
    type: AUTH_SUCCESS,
    user,
    username,
    isLoggedIn
  };
}

/**
   * Dispatched when loading the repositories fails
   *
   * @param  {object} error The error
   *
   * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
   */
export function authError(error) {
  localStorage.removeItem('userinfo');
  return {
    type: AUTH_ERROR,
    error,
  };
}


/**
 * Changes the input field of the form
 *
 * @param  {username} username The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username
  };
}

/**
 * Changes the input field of the form
 *
 * @param  {password} title The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_PASSWORD
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password
  };
}

/**
 * Dispatched when the user clicks the logout button
 *
 * @param  {isLoggedIn} boolean set isLoggedIn false
 *
 * @return {object}  An action object with a type of LOAD_ARTICLES_SUCCESS passing the repos
 */
export function authLogout(isLoggedIn) {
  localStorage.clear();
  return {
    type: USER_LOGOUT,
    isLoggedIn
  };
}
