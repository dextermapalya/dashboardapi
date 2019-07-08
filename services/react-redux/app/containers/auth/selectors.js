/**
 * Auth selectors
 */

import { createSelector } from 'reselect';
//import { initialState } from './reducer';

const selectAuth = (state) => {
  console.log('SELECT AUTH', state.auth)
  return state.auth
} 
//const selectGlobal = (state) => state.global || initialState;

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

export {
    selectAuth,
    makeSelectUser,
    makeSelectCredentials,
    makeSelectAuthStatus
};
