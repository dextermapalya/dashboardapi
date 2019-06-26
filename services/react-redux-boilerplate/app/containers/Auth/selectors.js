import { createSelector } from 'reselect';
import { initialState } from 'containers/App/reducer';

const selectGlobal = (state) => state.global || initialState;

const selectRoute = (state) => state.router;
const selectLogin = (state) => state.login;


const makeSelectLogin = () => createSelector(
  selectGlobal,
  (globalState) => globalState.userData.userinfo
);

const makeSelectUserName = () => createSelector(
  selectLogin,
  (loginState) => loginState.userinfo.username
);

const makeSelectPassword = () => createSelector(
  selectLogin,
  (loginState) => loginState.userinfo.password
);

export {
  selectGlobal,
  makeSelectLogin,
  makeSelectUserName,
  makeSelectPassword
};

