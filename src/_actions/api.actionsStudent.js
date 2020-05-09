import { allConstantsStudent } from '../_constants';
import axios from 'axios';
import alertify from 'alertifyjs';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const apiActionsStudent = {
  getDashboard,
  quizResult,
  quizResultDetail,
  testAnswere,
  selectedTest,
  loadTestMasterStudent,
  loadTestBookChapterStudent,
  loadQuizStudent,
  LoadStartQuiz,
  navigateQuiz,
  QuizAnswerForStudent,
  loadBookChapter,
  loadSubBook,
  loadTopic,
  loadHashtagStudy,
  loadMediaStudy,
  LoadTestBookDetails,
  loadQuizDetails,
  loadFile,
  demoAnswere,
  loadReportPerQuiz,
};
let url;
// if (
//   window.location.href.includes('localhost') ||
//   window.location.href.includes('192.168.1.18:4235')
// ) {
//   url = 'http://192.168.1.18:4239/';
// } else {
//   url = 'http://94.101.128.11:2526/';
// }
url = 'http://94.101.128.11:2526/';

// let url = 'http://192.168.1.40:5001/';
// let url = 'http://192.168.1.18:4239/';

// Load Dashboard
function getDashboard() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + 'api/Book/LoadStudentBook', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          // dispatch(apiLoad(response.data.data));
          dispatch({
            type: allConstantsStudent.LOAD_DASHBOARD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Load Test Boook Chapter
function loadTestBookChapterStudent(id) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadTestBookChapter/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.TEST_BOOK_CHAPTER_LOAD_STUDENT,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Select Test
function selectedTest(data) {
  return { type: allConstantsStudent.SELECTED_TEST, data };
}

// Load Test Master
function loadTestMasterStudent(
  MasterId,
  ChapterId,
  Action,
  BookChapterId,
  SubBookChapterId,
  TopicId,
  StudyStatus,
  HashTagId,
) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/LoadestMasterStudent',
        {
          MasterId,
          ChapterId,
          Action,
          BookChapterId,
          SubBookChapterId,
          TopicId,
          StudyStatus,
          HashTagId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data.message.toLowerCase() === 'success') {
            dispatch({
              type: allConstantsStudent.LOAD_TEST_MASTER_STUDENT,
              data: response.data.data,
            });
          } else {
            alertify.error(response.data.message);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsStudent.LOAD_TEST_MASTER_STUDENT, response };
    }
  };
}

// Tests Answeres
function testAnswere(MasterId, UserAnswer, Status, Comment, Hashtag, Emoji) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/TestAnswer',
        {
          MasterId,
          UserAnswer,
          Status,
          Comment,
          Hashtag,
          Emoji,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data.message.toLowerCase() === 'success') {
            dispatch({
              type: allConstantsStudent.TEST_ANSWERES,
              data: response.data.data,
            });
          } else {
            alertify.error(response.data.message);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsStudent.TEST_ANSWERES, response };
    }
  };
}

// Quiz Tests Results

function quizResult(logId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadQuizResult/${logId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message.toLowerCase() === 'success') {
            dispatch({
              type: allConstantsStudent.TESTS_RESULT,
              data: response.data.data,
            });
          } else {
            alertify.error(response.data.message);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsStudent.TESTS_RESULT, response };
    }
  };
}

// Quiz Tests Results Detaild
function quizResultDetail(logId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadQuizResultDetail/${logId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message.toLowerCase() === 'success') {
            dispatch({
              type: allConstantsStudent.QUIZ_DETAIL_RESULT,
              data: response.data.data,
            });
          } else {
            alertify.error(response.data.message);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsStudent.TESTS_RESULT, response };
    }
  };
}

// Load Quiz Student
function loadQuizStudent(bookId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadQuizTestBook/${bookId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.QUIZ_STUDENT,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => console.log(error));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
  };
}

// Start Quiz Student
function LoadStartQuiz(QuizMasterId, IsRandome, TestBookId) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/LoadStartQuiz',
        {
          QuizMasterId,
          IsRandome,
          TestBookId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.LOAD_START_QUIZ,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => console.log(error));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
  };
}

// Navigate Test Quiz
function navigateQuiz(QuizDetailid, QuizLogId, Action, IsRandom) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/QuizTestNavigation',
        {
          QuizDetailid,
          QuizLogId,
          Action,
          IsRandom,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data.message.toLowerCase() === 'success') {
            dispatch({
              type: allConstantsStudent.LOAD_TEST_NAVIGATE_QUIZ,
              data: response.data.data,
            });
          } else {
            alertify.error(response.data.message);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsStudent.LOAD_TEST_MASTER_STUDENT, response };
    }
  };
}

// Quiz Test Answere
function QuizAnswerForStudent(LogId, QuizMasterId, TestMasterId, Answer, Time) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/QuizAnswerForStudent',
        {
          LogId,
          QuizMasterId,
          TestMasterId,
          Answer,
          Time,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data.message.toLowerCase() === 'success') {
            dispatch({
              type: allConstantsStudent.QUIZ_ANSWERE_STUDENT,
              data: response.data.data,
            });
          } else {
            alertify.error(response.data.message);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsStudent.TEST_ANSWERES, response };
    }
  };
}

// Load Book Chapter For Filter
function loadBookChapter(id) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadBookChapterForTestBook/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.BOOK_CHAPTER_LOAD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load SubBook
function loadSubBook(id) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadSubBookChapter/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.LOAD_SUB_BOOK,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load Topic
function loadTopic(id) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadTopic/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.LOAD_TOPIC,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Load Hashtag TestBook For Quiz Page
function loadHashtagStudy(testBookId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadHashtagForStudent/${testBookId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.LOAD_HASHTAG_STUDY,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load Media TestBook For Quiz Page
function loadMediaStudy(TestMasterId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadAnswerTestMedia/${TestMasterId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.LOAD_MEDIA_STUDY,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load Test Book Details Table
function LoadTestBookDetails(TestBookId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadTestBookDetails/${TestBookId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.LOAD_TESTBOOK_DETAILS,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Load Quiz Details
function loadQuizDetails(testBookId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadQuizDetailForStudent/${testBookId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.LOAD_QUIZ_DETAILS,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Load File
function loadFile(fileUrl) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `${fileUrl}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
        responseType: 'blob',
      })
      .then(response => {
        dispatch({
          type: allConstantsStudent.LOAD_FILE,
          data: response.data,
        });
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Demo Answeres
function demoAnswere(TestBookId, TestMasterId, Action) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/TestNavigationForDemo',
        {
          TestBookId,
          TestMasterId,
          Action,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data.message.toLowerCase() === 'success') {
            dispatch({
              type: allConstantsStudent.DEMO_ANSWERE,
              data: response.data.data,
            });
          } else {
            alertify.error(response.data.message);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsStudent.DEMO_ANSWERE, response };
    }
  };
}

// Load Report
function loadReportPerQuiz(QuizId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadReportPerQuiz/${QuizId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message.toLowerCase() === 'success') {
          dispatch({
            type: allConstantsStudent.LOAD_REPORT_PER_QUIZ,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsStudent.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
