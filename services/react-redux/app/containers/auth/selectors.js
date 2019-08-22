/**
 * Auth selectors
 */

import { createSelector } from 'reselect';
import Log from 'logger-init';
import { initialState } from './reducer';
import authService from 'utils/authService';

const selectAuth = (state) => {
  Log.info('SELECT AUTH', state);
  state.authenticate = (!state.authenticate) ? initialState : state.authenticate;
  /* const data = localStorage.getItem('userinfo');
  const jsonObj = JSON.parse(data);
  const { token } = jsonObj; */
  // state.auth.isLoggedIn = (token) ? true : false
  return state.authenticate;
};

// const selectGlobal = (state) => state.global || initialState;

const makeSelectUser = () => createSelector(
  selectAuth,
  (authState) => authState.user
);


const makeSelectCredentials = () => createSelector(
  selectAuth,
  (authState) => authState.credentials
);

const makeSelectAuthStatus = () => createSelector(
  selectAuth,
  (authState) => authState.isLoggedIn
);

const makeSelectTokenExpired = () => createSelector(
  selectAuth,
  (authState) => authState.tokenExpired
);

export {
  selectAuth,
  makeSelectUser,
  makeSelectCredentials,
  makeSelectAuthStatus,
  makeSelectTokenExpired
};
