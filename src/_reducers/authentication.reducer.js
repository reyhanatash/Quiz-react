import { userConstants } from '../_constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
let initialState = '';
if (!cookies.get('user') && cookies.get('user') !== undefined) {
  let user = JSON.parse(cookies.get('user'));
  initialState = user ? { loggedIn: true, user } : {};
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        error: action.error,
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: cookies.remove('user', { path: '/' }),
        userInfo: cookies.remove('userInfo', { path: '/' }),
      };
    default:
      return state;
  }
}
