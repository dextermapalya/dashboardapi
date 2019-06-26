import { LOGIN } from './constants';

// The initial state of the App
const initialState = {
  userinfo: {},
  credentials:{username:'', password:'',scope:'read'},
  username:'',
  password:'',
  scope:'read'
};

function loginReducer(state = initialState, action) {
  console.log('state', action, state)

  switch (action.type) {
    case LOGIN: {
      const newState = {
        ...state,
        loading: true,
        error: false,
        userData: {
          userinfo: {username:'', password:'',scope:'read'},
          repositories:false
        },
      };

      return newState;
    }
    case LOGIN_SUCCESS: {
      const newState = {
        ...state,
        loading: false,
        userData: {
          userinfo: action.userinfo,
          repositories: false
        },
        currentUser: action.username,
      };
      return newState;
    }

    case LOGIN_ERROR: {
      return { ...state, error: action.error, loading: false };
    }
    default:
      return state;
  }

}

export default loginReducer;
