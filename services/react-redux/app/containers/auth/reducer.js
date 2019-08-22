/*
 * AuthReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import authService from 'utils/authService';
import Log from 'logger-init';
import {
  AUTHENTICATE,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_STATE,
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  USER_LOGOUT,
} from './constants';

// The initial state of the App
export const initialState = {
  user: authService.getUser({}),
  credentials: { username: '', password: '', scope: 'read' },
  isLoggedIn: authService.isAuthenticated(),
  tokenExpired: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE: {
      Log.info('Authenticate.....++');
      // console.log('Authenticating a user', action);
      // set any checks or filters here
      return { ...state, loading: false, credentials: action.credentials };
    }

    case AUTH_STATE: {
      // console.log('STATE AUTH_STATE', AUTH_STATE);
      const newState = {
        ...state,
        loading: true,
        user: action.user,
      };
      // console.log('STATE AUTH_STATE', newState);
      return newState;
    }

    case AUTH_SUCCESS: {
      // console.log('AUTH SUCCESS...', action);
      const newState = {
        ...state,
        loading: false,
        user: action.user,
        isLoggedIn: action.isLoggedIn
      };
      return newState;
    }

    case AUTH_ERROR: {
      // console.log('AUTH ERROR...', action);

      const newState = {
        ...state,
        loading: false,
        isLoggedIn: false,
        tokenExpired: true
      };

      return newState;

      /* return {
        ...state, error: action.error, loading: false, user: { isLoggedIn: false }
      }; */
    }

    case CHANGE_USERNAME: {
      // console.log('CHANGING_USERNAME......', action, state);
      // set any checks or filters here
      const credentialClone = Object.assign({}, state.credentials);
      credentialClone.username = action.username;
      const newState = {
        ...state,
        loading: false,
        credentials: credentialClone,
      };
      return newState;
    }

    case CHANGE_PASSWORD: {
      // console.log('CHANGING_PASSWORD......', action, state);
      // var articleClone = cloneDeep(state.article)
      const credentialClone = Object.assign({}, state.credentials);
      credentialClone.password = action.password;
      const newState = {
        ...state,
        loading: false,
        credentials: credentialClone,
      };
      // console.log('CHANGING_PASSWORD........', credentialClone);
      return newState;
    }

    case USER_LOGOUT: {
      Log.info('LOGOUT', authService.isAuthenticated());
      const newState = {
        ...state,
        loading: false,
        isLoggedIn: action.isLoggedIn,
        user: authService.getUser({}),
        tokenExpired: true
      };

      return newState;
    }

    default:
      // console.log('DEFAULT AUTH STATE', state);
      return state;
  }
}

export default authReducer;
