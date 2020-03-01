import { allConstants } from '../_constants';
import axios from 'axios';
import alertify from 'alertifyjs';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const apiActions = {
  getDashboard,
  loadGrade,
  loadMajor,
  loadTopic,
  loadSubBook,
  addBook,
  loadTest,
  loadAllTests,
  deleteTest,
  deleteBook,
  deleteTopic,
  loadAllBooks,
  selectedItem,
  selectedTest,
  deleteSubBook,
  changeRowTest,
  loadBookChapter,
  loadBookChapterSearch,
  loadHashtagTrend,
  loadGradeTestBook,
  loadBookChapterModal,
  loadTestBookChapter,
  editBookChapterModal,
  InsertOrUpdateTopic,
  InsertOrUpdateChapter,
  InsertOrUpdateSubBook,
  InsertOrUpdateTestMaster,
  uploadFile,
  loadFile,
  loadHashtagQuiz,
  loadQuiz,
  InsertOrUpdateQuiz,
  selectedQuiz,
  deleteQuiz,
  deleteFile,
  demoTopic,
  loadTopicSetting,
  TestBookSetting,
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
function getDashboard() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + 'api/Book/LoadDashboard', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          // dispatch(apiLoad(response.data.data));
          dispatch({
            type: allConstants.API_LOAD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

function loadAllBooks() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + 'api/Book/LoadBook', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_BOOKS,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

function loadMajor() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + 'api/Book/LoadMajor', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.MAJOR_LOAD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

function loadGrade() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + 'api/Book/LoadGrade', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.GRADE_LOAD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
function loadGradeTestBook(id) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadGradeTestBook/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.GRADE_LOAD_TEST,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

function loadTestBookChapter(id) {
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
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.TEST_BOOK_CHAPTER_LOAD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

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
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.BOOK_CHAPTER_LOAD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load Book  Chapter For Search
function loadBookChapterSearch(id) {
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
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.BOOK_CHAPTER_LOAD_SEARCH,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load and Edit Book Chapter In Modal Add Tast Page
function loadBookChapterModal(id) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadBookChapter/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.BOOK_CHAPTER_LOAD_MODAL,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
function editBookChapterModal(id) {
  if (id !== null) {
    return dispatch => {
      dispatch(request());
      axios
        .get(url + `api/Book/LoadForEditTestBookChapter/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        })
        .then(response => {
          if (response.data.message === 'success') {
            dispatch({
              type: allConstants.EDIT_CHAPTER_LOAD_MODAL,
              data: response.data.data,
            });
          } else {
            alertify.error(response.data.message);
          }
        })
        .catch(error => dispatch(failure(error)));

      function request(user) {
        return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
      }
      function failure(error) {
        return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
      }
    };
  } else {
    return dispatch => {
      dispatch({
        type: allConstants.EDIT_CHAPTER_LOAD_MODAL,
        data: null,
      });
    };
  }
}
// Trend #Hashtags
function loadHashtagTrend() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadHashtagTrend`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_HASHTAG_TREND,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load Test Side
function loadTest(
  FkTestBook,
  FkTestBookChapter,
  FkBookChapter,
  IsComplete,
  SubBookId,
  TopicId,
  HashTagId,
) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/LoadTest',
        {
          FkTestBook: FkTestBook,
          FkTestBookChapter: FkTestBookChapter,
          FkBookChapter: FkBookChapter,
          IsComplete: IsComplete,
          SubBookId,
          TopicId,
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
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_TEST,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load All Test Quiz
function loadAllTests(FkTestBook) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/LoadTest',
        {
          FkTestBook: FkTestBook,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_ALL_TESTS,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

function selectedItem(data) {
  return { type: allConstants.SELECTED_ITEM, data };
}
function selectedTest(data) {
  return { type: allConstants.SELECTED_TEST, data };
}
function addBook(id, BookName, Author, FkMajor, FkGrade, FkBook, Description) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/InsertOrUpdateTestBook',
        {
          id: id,
          BookName: BookName,
          Author: Author,
          FkMajor: FkMajor,
          FkGrade: FkGrade,
          FkBook: FkBook,
          Description: Description,
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
          // if (response.data.data.message === 'Succeed') {
          if (response.data.data[0].message === 'Succeed') {
            alertify.success(response.data.data[0].showMessageToUser);
          }
          if (response.data.data[0].message === 'Faild') {
            alertify.error(response.data.data[0].showMessageToUser);
          }
          if (response.data.data[0].message === 'Bug') {
            alertify.error(response.data.data[0].showMessageToUser);
          }
          dispatch(success(response));
          dispatch({
            type: allConstants.TEST_BOOK_ADD,
            data: response.data.data,
          });
          // dispatch(apiLoad(response.data.data));
          // }
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(response) {
      return { type: allConstants.TEST_BOOK_ADD, response };
    }
    function success(response) {
      return { type: allConstants.TEST_BOOK_ADD, response };
    }
    function failure(error) {
      return { type: allConstants.TEST_BOOK_ADD, error };
    }
  };
}

function InsertOrUpdateChapter(id, Name, FkBookChapter, FkGrade, FkTestBook) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/InsertOrUpdateChapter',
        {
          id: id,
          Name: Name,
          FkBookChapter: FkBookChapter,
          FkGrade: FkGrade,
          FkTestBook: FkTestBook,
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
          if (response.data.data[0].message === 'Succeed') {
            dispatch(success(response.data.data));
            // dispatch(apiLoad(response.data.data));
            alertify.success(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => error);

    function request(response) {
      return { type: allConstants.INSERT_UPDATE_CHAPTER, response };
    }
    function success(response) {
      return { type: allConstants.INSERT_UPDATE_CHAPTER, data: response };
    }
  };
}
function InsertOrUpdateTestMaster(
  id,
  FkTestBook,
  FkTestBookChapter,
  FkBookChapter,
  Level,
  Template,
  Name,
  HTML,
  Ans1,
  Ans2,
  Ans3,
  Ans4,
  TrueAns,
  Hashtag,
  FkSubBookChapter,
  FkTopic,
  files,
) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/InsertOrUpdateTestMaster',
        {
          id: id,
          FkTestBook: FkTestBook,
          FkTestBookChapter: FkTestBookChapter,
          FkBookChapter: FkBookChapter,
          Level: Level,
          Template: Template,
          Name: Name,
          HTML: HTML,
          Ans1: Ans1,
          Ans2: Ans2,
          Ans3: Ans3,
          Ans4: Ans4,
          TrueAns: TrueAns,
          Hashtag: Hashtag,
          SubBookChapter: FkSubBookChapter,
          Topic: FkTopic,
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
          if (response.data.data[0].message === 'Succeed') {
            alertify.success(response.data.data[0].showMessageToUser);
            const pkTestMasterFile = response.data.data[0].pkTestMaster;
            console.log(files);
            if (files.length !== 0) {
              files.forEach(file => {
                dispatch(
                  apiActions.uploadFile(
                    file.id ? file.id : -1,
                    pkTestMasterFile,
                    file.name,
                    file.type,
                    file.size,
                    file.base64,
                  ),
                );
              });
            }
          }
          if (response.data.data[0].message === 'Faild') {
            alertify.error(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => error);

    function request(response) {
      return { type: allConstants.INSERT_UPDATE_TEST_MASTER, response };
    }
    function success(response) {
      return { type: allConstants.INSERT_UPDATE_TEST_MASTER, data: response };
    }
  };
}
// Delete Book
function deleteBook(pkBook) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/DeleteTestBook',
        {
          id: pkBook,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.data.message === 'success') {
          alertify.success(response.data.data[0].showMessageToUser);
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Delete Test
function deleteTest(pkTestMaster) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/DeleteTest',
        {
          id: pkTestMaster,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (response.data.message === 'success') {
          alertify.success(response.data.data[0].showMessageToUser);
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Drag and Drop Test Row Number Changer
function changeRowTest(Source, Destination) {
  return dispatch => {
    dispatch(request());
    axios.post(
      url + 'api/Book/ChangeRow',
      {
        Source,
        Destination,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      },
    );

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// SubBook

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
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_SUB_BOOK,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
//  Insert or Update SubBook
function InsertOrUpdateSubBook(id, BookChapterId, Name) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + '/api/Book/InsertSubBookChapter',
        {
          id,
          BookChapterId,
          Name,
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
          if (response.data.data[0].message === 'Succeed') {
            dispatch(success(response.data.data));
            // dispatch(apiLoad(response.data.data));
            alertify.success(response.data.data[0].showMessageToUser);
          } else if (response.data.data[0].message === 'Error') {
            alertify.error(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => error);

    function request(response) {
      return { type: allConstants.INSERT_UPDATE_CHAPTER, response };
    }
    function success(response) {
      return { type: allConstants.INSERT_UPDATE_CHAPTER, data: response };
    }
  };
}

// Delete
function deleteSubBook(pkSubBookChapter) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/DeleteSubBookChapter',
        {
          id: pkSubBookChapter,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (
          response.data.message === 'success' &&
          response.data.data[0].message !== 'Error'
        ) {
          alertify.success(response.data.data[0].showMessageToUser);
        } else if (response.data.data[0].message === 'Error') {
          alertify.error(response.data.data[0].showMessageToUser);
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Topic

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
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_TOPIC,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Insert Or Update Topic
function InsertOrUpdateTopic(id, SubBookId, Name) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/InsertTopic',
        {
          id,
          SubBookId,
          Name,
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
          if (response.data.data[0].message === 'Succeed') {
            dispatch(success(response.data.data));
            // dispatch(apiLoad(response.data.data));
            alertify.success(response.data.data[0].showMessageToUser);
          } else if (response.data.data[0].message === 'Error') {
            alertify.error(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => error);

    function request(response) {
      return { type: allConstants.INSERT_UPDATE_CHAPTER, response };
    }
    function success(response) {
      return { type: allConstants.INSERT_UPDATE_CHAPTER, data: response };
    }
  };
}

// Delete
function deleteTopic(pkTopic) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/DeleteTopic',
        {
          id: pkTopic,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (
          response.data.message === 'success' &&
          response.data.data[0].message !== 'Error'
        ) {
          alertify.success(response.data.data[0].showMessageToUser);
        } else if (response.data.data[0].message === 'Error') {
          alertify.error(response.data.data[0].showMessageToUser);
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Upload File Teacher
function uploadFile(Id, TestMasterId, name, type, size, base64) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/UploadAssets',
        {
          Id,
          TestMasterId,
          name,
          type,
          MediaName: name,
          base64,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (
          response.data.message === 'success' &&
          response.data.data[0].message !== 'Error'
        ) {
          dispatch({
            type: allConstants.UPLOAD_FILE,
            data: response.data.data,
          });
          dispatch(apiActions.loadFile(response.data.data));
        } else if (response.data.data[0].message === 'Error') {
          alertify.error(response.data.data[0].showMessageToUser);
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
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
          type: allConstants.LOAD_FILE,
          data: response.data,
        });
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Delete File
function deleteFile(Id) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/RemoveMedia',
        {
          Id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        dispatch({
          type: allConstants.DELETE_FILE,
          data: response.data,
        });
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}

// Load Hashtag TestBook For Quiz Page
function loadHashtagQuiz(testBook_id) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadTestBookHashtag/${testBook_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_HASHTAG_QUIZ,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Insert Or Update Quiz
function InsertOrUpdateQuiz(
  id,
  name,
  duration,
  testBookId,
  idTestList,
  Description,
) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/InsertQuizMaster',
        {
          id,
          name,
          duration,
          testBookId,
          idTestList,
          Description,
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
          if (response.data.data[0].message === 'Succeed') {
            dispatch(success(response.data.data));
            alertify.success(response.data.data[0].showMessageToUser);
          } else if (
            response.data.data[0].message === 'Faild' ||
            response.data.data[0].message === 'Bug'
          ) {
            alertify.error(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => error);

    function request(response) {
      return { type: allConstants.INSERT_UPDATE_CHAPTER, response };
    }
    function success(response) {
      return { type: allConstants.INSERT_UPDATE_CHAPTER, data: response };
    }
  };
}

// Load Quiz
function loadQuiz(testBookId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadUserQuiz${testBookId ? `/${testBookId}` : ''}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_QUIZ,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Select Quiz
function selectedQuiz(data) {
  return { type: allConstants.SELECTED_QUIZ, data };
}

// Delete Quiz
function deleteQuiz(pkQuiz) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/DeleteQuiz',
        {
          id: pkQuiz,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (
          response.data.message === 'success' &&
          response.data.data[0].message !== 'Faild'
        ) {
          alertify.success(response.data.data[0].showMessageToUser);
        } else if (response.data.data[0].message === 'Faild') {
          alertify.error(response.data.data[0].showMessageToUser);
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => console.log(error));
    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
  };
}
// Demo Topic
function demoTopic(pkTopic) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/DemoTopic',
        {
          id: pkTopic,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (
          response.data.message === 'success' &&
          response.data.data[0].message !== 'Faild'
        ) {
          alertify.success(response.data.data[0].showMessageToUser);
        } else if (response.data.data[0].message === 'Faild') {
          alertify.error(response.data.data[0].showMessageToUser);
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => console.log(error));
    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
  };
}

// Load Topic Setting
function loadTopicSetting(testBookId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/Book/LoadTopicPerTestBook/${testBookId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstants.LOAD_TOPIC_SETTING,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstants.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Test Book Setting

function TestBookSetting(pkSetting, TopicId, Duration, IsFinish) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/TestBookSetting',
        {
          pkSetting,
          TopicId,
          Duration,
          IsFinish,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + cookies.get('user'),
          },
        },
      )
      .then(response => {
        if (
          response.data.message === 'success' &&
          response.data.data[0].message !== 'Faild'
        ) {
          alertify.success(response.data.data[0].showMessageToUser);
        } else if (response.data.data[0].message === 'Faild') {
          alertify.error(response.data.data[0].showMessageToUser);
        } else {
          alertify.error(response.data.message);
        }
      })
      .catch(error => console.log(error));
    function request(user) {
      return { type: allConstants.LOAD_DASHBOARD_REQUEST, user };
    }
  };
}

function apiLoad(data) {
  return {
    type: allConstants.API_LOAD,
    data: data,
  };
}
