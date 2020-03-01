import { allConstantsAdmin } from '../_constants';
import axios from 'axios';
import alertify from 'alertifyjs';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const apiActionsAdmin = {
  getDashboard,
  loadUsers,
  loadBooksPerUser,
  ChangeActiveTeacher,
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
          alertify.error(response.data.message);
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
          alertify.error(response.data.message);
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
          alertify.error(response.data.message);
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
            alertify.success(response.data.message);
            // dispatch({
            //   type: allConstantsAdmin.CHANGE_ACTIVE_TEACHER,
            //   data: response.data.data,
            // });
          } else {
            alertify.error(response.data.message);
          }
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, response };
    }
  };
}

// // Load Quiz Student
// function loadQuizStudent(bookId) {
//   return dispatch => {
//     dispatch(request());
//     axios
//       .get(url + `api/Book/LoadQuizTestBook/${bookId}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + cookies.get('user'),
//         },
//       })
//       .then(response => {
//         if (response.data.message === 'success') {
//           dispatch({
//             type: allConstantsStudent.QUIZ_STUDENT,
//             data: response.data.data,
//           });
//         } else {
//           alertify.error(response.data.message);
//         }
//       })
//       .catch(error => console.log(error));

//     function request(user) {
//       return { type: allConstantsStudent.LOAD_DASHBOARD_REQUEST, user };
//     }
//   };
// }
