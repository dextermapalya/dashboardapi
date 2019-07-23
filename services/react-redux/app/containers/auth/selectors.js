/**
 * Auth selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectAuth = (state) => {
  // console.log('SELECT AUTH', state.auth, initialState);
  state.auth = (!state.auth) ? initialState : state.auth;
  /* const data = localStorage.getItem('userinfo');
  const jsonObj = JSON.parse(data);
  const { token } = jsonObj; */
  // state.auth.isLoggedIn = (token) ? true : false
  return state.auth;
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
