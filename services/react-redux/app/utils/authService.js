/* service for managing user authentication status
 *  this service reads data from localStorage and verifies if token is still alive
 *  it is also responsible for clearing tokens on logout
 */
import { LOCAL_STORAGE_USERINFO_KEY } from 'shared/constants';
import Log from 'logger-init';

const authService = {
  // we pass the redux store and history in order to dispatch the logout actions
  // and push the user to login
  authenticated: false,

  getUser: (defaultValue) => {
    const userinfo = localStorage.getItem(LOCAL_STORAGE_USERINFO_KEY);
    if (userinfo === null) {
      return defaultValue;
    }
    // return default_value;
    return JSON.parse(userinfo);
  },

  // checks if the user is authenticated
  isAuthenticated: () => {
    Log.info('IS AUTHENTICATED....');
    // Check whether the current time is past the
    // access token's expiry time
    let auth = false;

    const userinfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERINFO_KEY));
    Log.info('USERINFO', userinfo, userinfo.expiresAt);
    // userinfo = getUserFromLocalStorage( LOCAL_STORAGE_USERINFO_KEY, {});
    if (userinfo !== null && userinfo) {
      Log.info('USERINFO..', new Date().getTime(), userinfo.expiresAt);
      auth = new Date().getTime() < userinfo.expiresAt;
    }
    Log.info('IS AUTHENTICATED....', auth);
    return auth;
  },

  logout: () => {
    localStorage.clear();
  },
  /* retrieve the stored cookie extract and return the token */

  getToken: () => {
    // return localStorage.getItem( LOCAL_STORAGE_USERINFO_KEY );
    const data = localStorage.getItem(LOCAL_STORAGE_USERINFO_KEY);
    const jsonObj = JSON.parse(data);
    const { token } = jsonObj;
    return token;
  },
  /* store the token received into cookie using localstorage */
  setToken: (response) => {
    Log.info('USERINFO...', response);
    localStorage.setItem(LOCAL_STORAGE_USERINFO_KEY, JSON.stringify(response));
  }
};

authService.authenticated = authService.isAuthenticated();

export default authService;
