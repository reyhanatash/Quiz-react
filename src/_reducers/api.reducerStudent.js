import { allConstantsStudent } from '../_constants';

const initialState = [
  {
    dashboard: '',
    loadTestBookChapter: '',
    loadTestMaster: '',
    testAnsweres: '',
    selectedTest: '',
    quizResult: '',
    quizDetailResult: '',
    QuizStudent: '',
    loadTestQuiz: '',
    loadTestNavigateQuiz: '',
    loadBookChapter: '',
    loadSubBook: '',
    loadTopic: '',
    loadHashtagStudy: '',
    loadMediaStudy: '',
    loadTestBookDetails: '',
    loadQuizDetails: '',
    loadFile: [],
    loadTestDemo: '',
    loadReportQuiz: '',
  },
];
let loadFiles = [];
export function apiStudent(state = initialState, action) {
  switch (action.type) {
    case allConstantsStudent.GETALL_REQUEST:
      return {
        loading: true,
      };
    case allConstantsStudent.GETALL_SUCCESS:
      return {
        items: action.users,
      };
    case allConstantsStudent.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case allConstantsStudent.LOAD_DASHBOARD:
      return {
        ...state,
        dashboard: action.data,
      };
    case allConstantsStudent.TEST_BOOK_CHAPTER_LOAD_STUDENT:
      return {
        ...state,
        loadTestBookChapter: action.data,
      };
    case allConstantsStudent.LOAD_TEST_MASTER_STUDENT:
      return {
        ...state,
        loadTestMaster: action.data,
      };
    case allConstantsStudent.TEST_ANSWERES:
      return {
        ...state,
        testAnsweres: action.data,
      };
    case allConstantsStudent.SELECTED_TEST:
      return {
        ...state,
        selectedTest: action.data,
      };
    case allConstantsStudent.TESTS_RESULT:
      return {
        ...state,
        quizResult: action.data,
      };
    case allConstantsStudent.QUIZ_DETAIL_RESULT:
      return {
        ...state,
        quizDetailResult: action.data,
      };
    case allConstantsStudent.QUIZ_STUDENT:
      return {
        ...state,
        QuizStudent: action.data,
      };
    case allConstantsStudent.LOAD_START_QUIZ:
      return {
        ...state,
        loadTestQuiz: action.data,
      };
    case allConstantsStudent.LOAD_TEST_NAVIGATE_QUIZ:
      return {
        ...state,
        loadTestNavigateQuiz: action.data,
      };
    case allConstantsStudent.BOOK_CHAPTER_LOAD:
      return {
        ...state,
        loadBookChapter: action.data,
      };
    case allConstantsStudent.LOAD_SUB_BOOK:
      return {
        ...state,
        loadSubBook: action.data,
      };
    case allConstantsStudent.LOAD_TOPIC:
      return {
        ...state,
        loadTopic: action.data,
      };
    case allConstantsStudent.LOAD_HASHTAG_STUDY:
      return {
        ...state,
        loadHashtagStudy: action.data,
      };
    case allConstantsStudent.LOAD_MEDIA_STUDY:
      return {
        ...state,
        loadMediaStudy: action.data,
      };
    case allConstantsStudent.LOAD_TESTBOOK_DETAILS:
      return {
        ...state,
        loadTestBookDetails: action.data,
      };
    case allConstantsStudent.LOAD_QUIZ_DETAILS:
      return {
        ...state,
        loadQuizDetails: action.data,
      };

    case allConstantsStudent.LOAD_FILE:
      if (action.data !== null) {
        loadFiles.push(action.data);
      } else {
        loadFiles = [];
      }
      return {
        ...state,
        loadFile: loadFiles,
      };
    case allConstantsStudent.DEMO_ANSWERE:
      return {
        ...state,
        loadTestDemo: action.data,
      };
    case allConstantsStudent.LOAD_REPORT_PER_QUIZ:
      return {
        ...state,
        loadReportQuiz: action.data,
      };
    default:
      return state;
  }
}
