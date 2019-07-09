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
import { fromJS } from 'immutable';
import cloneDeep from 'lodash';

import {
  AUTHENTICATE, IS_LOGGED_IN,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_STATE
} from './constants';

// The initial state of the App
const initialState = {
  user: { isLoggedIn: false },
  credentials: { username: '', password: '', scope: 'read' },
  isLoggedIn: false
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE: {
      console.log('Authenticating a user', action);
      // set any checks or filters here
      return { ...state, loading: false, credentials: action.credentials };
    }

    case AUTH_STATE: {
      console.log('STATE AUTH_STATE', AUTH_STATE);
      const newState = {
        ...state,
        loading: true,
        user: action.user,
      };
      console.log('STATE AUTH_STATE', newState);
      return newState;
    }

    case AUTH_SUCCESS: {
      console.log('AUTH SUCCESS...', action);
      const newState = {
        ...state,
        loading: false,
        user: action.user,
        isLoggedIn: action.isLoggedIn
      };
      return newState;
    }

    case AUTH_ERROR: {
      return {
        ...state, error: action.error, loading: false, user: { isLoggedIn: false }
      };
    }

    default:
      console.log('DEFAULT AUTH STATE', state);
      return state;
  }
}

export default authReducer;
