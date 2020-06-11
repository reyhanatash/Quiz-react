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
  selectedFilterChapter,
  updatePrice,
  updatePercentage,
  publishToWordpress,
  updateTestBookWordpress,
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
        if (response.data.message.toLowerCase() === 'success') {
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
        if (response.data.message.toLowerCase() === 'success') {
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
        if (response.data.message.toLowerCase() === 'success') {
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
        if (response.data.message.toLowerCase() === 'success') {
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
        if (response.data.message.toLowerCase() === 'success') {
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
        if (response.data.message.toLowerCase() === 'success') {
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
          if (response.data.message.toLowerCase() === 'success') {
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
        if (response.data.message.toLowerCase() === 'success') {
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
        if (response.data.message.toLowerCase() === 'success') {
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
          if (response.data.message.toLowerCase() === 'success') {
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
  Percentage,
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
          Percentage: Percentage,
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
        if (response.data.message.toLowerCase() === 'success') {
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
function setArchiveTestBook(TestBookId, IsArchive) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/SetArchive',
        {
          TestBookId,
          IsArchive,
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
// Update Price TestBook
function updatePrice(TestBookId, price) {
  return dispatch => {
    dispatch(request());
    axios
      .patch(
        url + `api/Book/UpdatePrice/${TestBookId}`,
        {
          Price: price,
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
// Update Percent TestBook
function updatePercentage(TestBookId, percent) {
  return dispatch => {
    dispatch(request());
    axios
      .patch(
        url + `api/Book/updatePercent/${TestBookId}`,
        {
          Percent: percent,
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
// Publish Testbook to WordPress
function publishToWordpress(
  Id,
  Title,
  Category,
  Description,
  ShortDescription,
  Price,
  Image,
) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/PublishBook',
        {
          Id,
          Title,
          Category,
          Description,
          ShortDescription,
          Price,
          Image,
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
          console.log(response);
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, response };
    }
  };
}

// Update Testbook to WordPress
function updateTestBookWordpress(Id, Status, Price) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/Book/UpdateWPBook',
        {
          Id,
          Status,
          Price,
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
          console.log(response);
        }
      })
      .catch(error => console.log(error));

    function request(response) {
      return { type: allConstantsAdmin.LOAD_DASHBOARD_REQUEST, response };
    }
  };
}

// Defualt value for filter in view test admin
function selectedFilterChapter(data) {
  return { type: allConstantsAdmin.SELECTED_CHAPTER, data };
}
