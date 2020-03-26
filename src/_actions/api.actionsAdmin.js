import { allConstantsAdmin } from '../_constants';
import axios from 'axios';
import alertify from 'alertifyjs';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const apiActionsAdmin = {
  getDashboard,
  loadUsers,
  loadTestBook,
  loadTestBookReadyToPublish,
  loadTestBookSold,
  loadBooksPerUser,
  ChangeActiveTeacher,
  loadTestList,
  loadRejectTypes,
  approveOrRejectTestBook,
  insertOrUpdateTeacher,
  loadUserQuiz,
  setArchiveTestBook,
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
      .get(url + 'api/Book/LoadDashboardAdmin', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstantsAdmin.LOAD_DASHBOARD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load Users
function loadUsers(type) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/user/LoadUsers/${type}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstantsAdmin.LOAD_USERS,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load TestBook
function loadTestBook() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/book/LoadTestBook/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstantsAdmin.LOAD_TEST_BOOKS,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load TestBook Ready To Publish
function loadTestBookReadyToPublish() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/book/LoadTestBookReadyToPublish/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstantsAdmin.LOAD_TEST_BOOKS_READY_TO_PUBLISH,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load TestBook Sold
function loadTestBookSold() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/book/LoadTestBookSold/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstantsAdmin.LOAD_TEST_BOOKS_SOLD,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load Books Per Users
function loadBooksPerUser(userId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/book/LoadUserTestBooks/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstantsAdmin.LOAD_USER_BOOKS,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Change Active Teacher By Admin
function ChangeActiveTeacher(UserId, Status) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/ChangeActiveTeacher',
        {
          UserId,
          Status,
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
          if (response.data.message === 'success') {
            alertify.success(response.data.data[0].showMessageToUser);
            // dispatch({
            //   type: allConstantsAdmin.CHANGE_ACTIVE_TEACHER,
            //   data: response.data.data,
            // });
          } else {
            alertify.error(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, response };
    }
  };
}
// Load Test List
function loadTestList(TestBookId, TestBookChapterId) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + `api/Book/LoadTestList`,
        {
          TestBookId,
          TestBookChapterId,
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
            type: allConstantsAdmin.LOAD_TEST_LIST,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Load Reject Types
function loadRejectTypes() {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/book/LoadRejectType/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstantsAdmin.LOAD_REJECT_TYPES,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Approve Or Reject TestBook
function approveOrRejectTestBook(TestBookId, RejectType, IsApprove, Comment) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/approveOrRejectTestBook',
        {
          TestBookId,
          RejectType,
          IsApprove,
          Comment,
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
          if (response.data.message === 'success') {
            alertify.success(response.data.data[0].showMessageToUser);
          } else {
            alertify.error(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, response };
    }
  };
}
// Insert Or Update Teacher
function insertOrUpdateTeacher(
  id,
  Name,
  LastName,
  UserName,
  Email,
  Password,
  TypeCo,
  PhoneNo,
) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/User/SignUp',
        {
          id: id,
          Name: Name,
          LastName: LastName,
          UserName: UserName,
          Email: Email,
          Password: Password,
          TypeCo: 2,
          PhoneNo: PhoneNo,
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
          if (response.data.message === 'success') {
            alertify.success(response.data.data[0].showMessageToUser);
          } else {
            alertify.error(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, response };
    }
  };
}
// Load Quiz List
function loadUserQuiz(testbookId) {
  return dispatch => {
    dispatch(request());
    axios
      .get(url + `api/book/LoadUserQuizFromAdmin/${testbookId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.get('user'),
        },
      })
      .then(response => {
        if (response.data.message === 'success') {
          dispatch({
            type: allConstantsAdmin.LOAD_USER_QUIZ,
            data: response.data.data,
          });
        } else {
          alertify.error(response.data.data[0].showMessageToUser);
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, user };
    }
    function failure(error) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_FAILURE, error };
    }
  };
}
// Archive TestBook
function setArchiveTestBook(TestBookId) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/SetArchiveTestBook',
        {
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
        if (response.status === 200) {
          if (response.data.message === 'success') {
            alertify.success(response.data.data[0].showMessageToUser);
          } else {
            alertify.error(response.data.data[0].showMessageToUser);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, response };
    }
  };
}
