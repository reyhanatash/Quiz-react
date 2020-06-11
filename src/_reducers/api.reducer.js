import { allConstants } from '../_constants';

const initialState = [
  {
    dashboard: '',
    loadBooks: '',
    grade: '',
    gradeTest: '',
    major: '',
    addBook: '',
    loadTest: '',
    selectedItem: '',
    selectedTest: '',
    loadBookChapter: '',
    loadBookChapterSearch: '',
    loadHashtagTrend: '',
    loadBookChapterModal: '',
    editBookChapterModal: '',
    loadTestBookChapter: '',
    InsertOrUpdateChapter: '',
    InsertOrUpdateTestMaster: '',
    loadSubBook: '',
    loadTopic: '',
    uploadFile: '',
    loadFile: '',
    loadAllTests: '',
    loadHashtagQuiz: '',
    loadQuiz: '',
    selectedQuiz: '',
    loadTopicSetting: '',
    loadNotifications: '',
    notificationsCount: '',
    loadProfile: '',
    checkBankNumber: '',
  },
];

export function api(state = initialState, action) {
  switch (action.type) {
    case allConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case allConstants.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case allConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case allConstants.API_LOAD:
      return {
        ...state,
        dashboard: action.data,
      };
    case allConstants.LOAD_BOOKS:
      return {
        ...state,
        loadBooks: action.data,
      };
    case allConstants.GRADE_LOAD:
      return {
        ...state,
        grade: action.data,
      };
    case allConstants.GRADE_LOAD_TEST:
      return {
        ...state,
        gradeTest: action.data,
      };
    case allConstants.MAJOR_LOAD:
      return {
        ...state,
        major: action.data,
      };
    case allConstants.TEST_BOOK_ADD:
      return {
        ...state,
        addBook: action.data,
      };
    case allConstants.LOAD_HASHTAG_TREND:
      return {
        ...state,
        loadHashtagTrend: action.data,
      };
    case allConstants.LOAD_TEST:
      return {
        ...state,
        loadTest: action.data,
      };
    case allConstants.LOAD_ALL_TESTS:
      return {
        ...state,
        loadAllTests: action.data,
      };
    case allConstants.SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.data,
      };
    case allConstants.SELECTED_TEST:
      return {
        ...state,
        selectedTest: action.data,
      };
    case allConstants.BOOK_CHAPTER_LOAD:
      return {
        ...state,
        loadBookChapter: action.data,
      };
    case allConstants.BOOK_CHAPTER_LOAD_SEARCH:
      return {
        ...state,
        loadBookChapterSearch: action.data,
      };
    case allConstants.BOOK_CHAPTER_LOAD_MODAL:
      return {
        ...state,
        loadBookChapterModal: action.data,
      };
    case allConstants.EDIT_CHAPTER_LOAD_MODAL:
      return {
        ...state,
        editBookChapterModal: action.data,
      };
    case allConstants.TEST_BOOK_CHAPTER_LOAD:
      return {
        ...state,
        loadTestBookChapter: action.data,
      };
    case allConstants.INSERT_UPDATE_CHAPTER:
      return {
        ...state,
        InsertOrUpdateChapter: action.data,
      };
    case allConstants.INSERT_UPDATE_TEST_MASTER:
      return {
        ...state,
        InsertOrUpdateTestMaster: action.data,
      };
    case allConstants.LOAD_SUB_BOOK:
      return {
        ...state,
        loadSubBook: action.data,
      };
    case allConstants.LOAD_TOPIC:
      return {
        ...state,
        loadTopic: action.data,
      };
    case allConstants.UPLOAD_FILE:
      return {
        ...state,
        uploadFile: action.data,
      };
    case allConstants.LOAD_FILE:
      return {
        ...state,
        loadFile: action.data,
      };
    case allConstants.LOAD_HASHTAG_QUIZ:
      return {
        ...state,
        loadHashtagQuiz: action.data,
      };
    case allConstants.LOAD_QUIZ:
      return {
        ...state,
        loadQuiz: action.data,
      };
    case allConstants.SELECTED_QUIZ:
      return {
        ...state,
        selectedQuiz: action.data,
      };
    case allConstants.LOAD_TOPIC_SETTING:
      return {
        ...state,
        loadTopicSetting: action.data,
      };
    case allConstants.LOAD_NOTIFICATIONS:
      return {
        ...state,
        loadNotifications: action.data,
      };
    case allConstants.NOTIFICATIONS_COUNT:
      return {
        ...state,
        notificationsCount: action.data,
      };
    case allConstants.LOAD_PROFILE:
      return {
        ...state,
        loadProfile: action.data,
      };
    case allConstants.CHECK_BANK_NUMBER:
      return {
        ...state,
        checkBankNumber: action.data,
      };
    default:
      return state;
  }
}
