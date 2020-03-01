import { userConstants } from '../_constants';
import axios from 'axios';
import { history } from '../_helpers';
import alertify from 'alertifyjs';
import Cookies from 'universal-cookie';
import sha256 from 'sha256';
const cookies = new Cookies();

export const userActions = {
  login,
  logout,
  signup,
  // getAll
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
function login(UserName, Password, history) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/user/login',
        {
          UserName: UserName,
          // Password: sha256(Password),
          Password: Password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(user => {
        if (user.status === 200) {
          if (user.data.message === 'Invalid  username or password') {
            dispatch(failure('error'));
            alertify.error('نام کاربری یا رمز عبور صحیح نمی باشد ');
            return;
          }
          if (user.data) {
            if (user.data.message === 'success') {
              // localStorage.setItem('user', user.data.data);
              // cookies.set('user', user.data.data, { maxAge: 5000 });
              cookies.set('user', user.data.data);
              cookies.set('userInfo', user.data);
              dispatch(success(user));
              if (
                sessionStorage.getItem('demo') &&
                JSON.parse(sessionStorage.getItem('demo')).status === true
              ) {
                history.push({
                  pathname: '/demo/:رایگان',
                  state: {
                    MasterId: 0,
                    ChapterId: `${Number(
                      JSON.parse(sessionStorage.getItem('demo')).id,
                    )}`,
                    Action: 1,
                    name: 'رایگان',
                  },
                });
              } else {
                history.push('/dashboard');
              }
            } else {
              dispatch(failure(user));
              alertify.error(user.data.message);
            }
          }
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: userConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
      return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConstants.LOGIN_FAILURE, error };
    }
  };
}

function signup(Name, LastName, UserName, Email, PhoneNo, TypeCo, Password) {
  return dispatch => {
    dispatch(request());
    axios
      .post(
        url + 'api/User/SignUp',
        {
          Name: Name,
          LastName: LastName,
          UserName: UserName,
          Email: Email,
          Password: Password,
          TypeCo: TypeCo,
          PhoneNo: PhoneNo,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        if (response.status === 200) {
          if (response.data) {
            dispatch(success(response));
            if (response.data.message === 'success') {
              alertify.success('ثبت نام با موفقیت انجام شد.');
            }
            if (response.data.message === 'error') {
              alertify.error('ثبت نام با خطا روبرو شد.');
            }
          }
        } else {
          dispatch(failure('error'));
          return;
        }
      })
      .catch(error => dispatch(failure(error)));

    function request(user) {
      return { type: userConstants.LOGIN_REQUEST, user };
    }
    function success(user) {
      return { type: userConstants.LOGIN_SUCCESS, user };
    }
    function failure(error) {
      return { type: userConstants.LOGIN_FAILURE, error };
    }
  };
}

function logout() {
  return { type: userConstants.LOGOUT };
}

axios.interceptors.response.use(
  response => {
    return response;
  },
  // error => {
  //   if (error.response.status === 401) {
  //     history.push('/login');
  //   }
  //   return error;
  // },
);
