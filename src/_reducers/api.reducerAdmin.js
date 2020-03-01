import { allConstantsAdmin } from '../_constants';

const initialState = [
  {
    dashboard: '',
    users: '',
    userBooks: '',
  },
];
export function apiAdmin(state = initialState, action) {
  switch (action.type) {
    case allConstantsAdmin.GETALL_REQUEST:
      return {
        loading: true,
      };
    case allConstantsAdmin.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case allConstantsAdmin.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case allConstantsAdmin.LOAD_DASHBOARD:
      return {
        ...state,
        dashboard: action.data,
      };
    case allConstantsAdmin.LOAD_USERS:
      return {
        ...state,
        users: action.data,
      };
    case allConstantsAdmin.LOAD_USER_BOOKS:
      return {
        ...state,
        userBooks: action.data,
      };
    default:
      return state;
  }
}
