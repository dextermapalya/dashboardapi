/*
 * Home Actions
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

import { LOGIN_SUCCESS, 
         LOGIN_ERROR, 
         LOGIN ,
         CHANGE_USER_NAME,
         CHANGE_PASSWORD
        } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USER_NAME
 */
export function changeUserName(name) {
  return {
    type: CHANGE_USER_NAME,
    name
  };
}
        
/**
 * Changes the input field of the form
 *
 * @param  {password} password The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USER_NAME
 */
export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password
  };
}

/**
 * Login to api, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGIN
 */
export function login() {
  return {
    type: LOGIN,
  };
}

/**
 * Dispatched when the user logs in successfully
 *
 * @param  {object} userinfo The userinfo object with bearer token
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function loginSuccess(userinfo, username) {
  return {
    type: LOGIN_SUCCESS,
    userinfo,
    username,
  };
}

/**
 * Dispatched when login fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}


