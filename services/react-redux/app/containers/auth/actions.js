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

import {
  AUTHENTICATE, AUTH_SUCCESS, AUTH_ERROR, AUTH_STATE
} from './constants';

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
    user
  };
}


/**
 * Dispatched when the articles are loaded by the request saga
 *
 * @param  {array} articles The repository data
 * @param  {string} username The current username
 *
 * @return {object}  An action object with a type of LOAD_ARTICLES_SUCCESS passing the repos
 */
export function authComplete(user, username, isLoggedIn) {
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
  return {
    type: AUTH_ERROR,
    error,
  };
}
