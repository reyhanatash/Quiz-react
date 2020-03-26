import { allConstantsAdmin } from '../_constants';

const initialState = [
  {
    dashboard: '',
    users: '',
    loadTestBooks: '',
    loadTestBooksReadyToPublish: '',
    loadTestBookSold: '',
    userBooks: '',
    loadTestList: '',
    loadRejectTypes: '',
    loadUserQuiz: '',
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
    case allConstantsAdmin.LOAD_TEST_BOOKS:
      return {
        ...state,
        loadTestBooks: action.data,
      };
    case allConstantsAdmin.LOAD_TEST_BOOKS_READY_TO_PUBLISH:
      return {
        ...state,
        loadTestBooksReadyToPublish: action.data,
      };
    case allConstantsAdmin.LOAD_TEST_BOOKS_SOLD:
      return {
        ...state,
        loadTestBookSold: action.data,
      };
    case allConstantsAdmin.LOAD_USER_BOOKS:
      return {
        ...state,
        userBooks: action.data,
      };
    case allConstantsAdmin.LOAD_TEST_LIST:
      return {
        ...state,
        loadTestList: action.data,
      };
    case allConstantsAdmin.LOAD_REJECT_TYPES:
      return {
        ...state,
        loadRejectTypes: action.data,
      };
    case allConstantsAdmin.LOAD_USER_QUIZ:
      return {
        ...state,
        loadUserQuiz: action.data,
      };
    default:
      return state;
  }
}
