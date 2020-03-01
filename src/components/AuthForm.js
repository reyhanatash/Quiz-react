import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { userActions } from '../_actions';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    // this.props.dispatch(userActions.logout());

    this.state = {
      Name: '',
      Password: '',
      signUpPassword: '',
      UserName: '',
      signUpUserName: '',
      Email: '',
      LastName: '',
      TypeCo: '',
      PhoneNo: '',
    };

    this.loginClick = this.loginClick.bind(this);
    this.signUpClick = this.signUpClick.bind(this);
  }

  loginClick() {
    const UserName = this.UserValue;
    const Password = this.PassInput;
    this.setState({ UserName, Password });
    const { dispatch } = this.props;
    if (UserName && Password) {
      dispatch(userActions.login(UserName, Password, this.props.history));
    }
  }

  signUpClick() {
    const Name = this.FirstValue;
    const LastName = this.LastValue;
    const signUpUserName = this.UserNameValue;
    const Email = this.EmailValue;
    const PhoneNo = this.PhoneValue;
    const TypeCo = 2;
    const signUpPassword = this.PassInput;
    this.setState({
      Name,
      LastName,
      signUpUserName,
      Email,
      PhoneNo,
      TypeCo,
      signUpPassword,
    });
    if (this.PassInput !== this.ConfirmPassInput) {
      alertify.error(' رمز عبور و تکرار رمز عبور یکی نیستند .');
    }
    const { dispatch } = this.props;
    dispatch(
      userActions.signup(
        Name,
        LastName,
        signUpUserName,
        Email,
        PhoneNo,
        TypeCo,
        signUpPassword,
      ),
    );
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  // };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'ورود';
    }

    if (!buttonText && this.isSignup) {
      return 'ثبت نام';
    }

    return buttonText;
  }
  render() {
    const {
      showLogo,
      usernameLabel,
      emailLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      signUpPasswordLabel,
      signUpPasswordInputProps,
      NameLabel,
      lastNameLabel,
      signUpUsernameLabel,
      PhoneLabel,
      NameInputProps,
      children,
      onLogoClick,
    } = this.props;
    return (
      <Form
        onSubmit={this.loginClick}
        className="login-form direction-right h-100"
        onKeyPress={e => {
          if (this.isLogin) {
            if (e.which === 13 || e.keyCode === 13) {
              this.loginClick();
            }
          } else if (this.isSignup) {
            if (e.which === 13 || e.keyCode === 13) {
              this.signUpClick();
            }
          }
        }}
      >
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        {/* First name */}
        {this.isSignup && (
          <FormGroup className="half_width login-input-padding-left">
            <Label for={NameLabel}>{NameLabel}</Label>
            <Input
              {...NameInputProps}
              onChange={UserInput =>
                (this.FirstValue = UserInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        {/* Last name */}
        {this.isSignup && (
          <FormGroup className="half_width login-input-padding-right">
            <Label for={lastNameLabel}>{lastNameLabel}</Label>
            <Input
              {...NameInputProps}
              onChange={UserInput =>
                (this.LastValue = UserInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        {/* user Name */}
        {this.isSignup && (
          <FormGroup className="half_width login-input-padding-left">
            <Label for={signUpUsernameLabel}>{signUpUsernameLabel}</Label>
            <Input
              {...NameInputProps}
              onChange={UserInput =>
                (this.UserNameValue = UserInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        {/* Phone number */}
        {this.isSignup && (
          <FormGroup className="half_width login-input-padding-right">
            <Label for={PhoneLabel}>{PhoneLabel}</Label>
            <Input
              {...NameInputProps}
              onChange={UserInput =>
                (this.PhoneValue = UserInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        {/* Email */}
        {this.isSignup && (
          <FormGroup>
            <Label for={emailLabel}>{emailLabel}</Label>
            <Input
              {...usernameInputProps}
              onChange={UserInput =>
                (this.EmailValue = UserInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        {/* Password */}
        {this.isSignup && (
          <FormGroup className="half_width login-input-padding-left">
            <Label for={signUpPasswordLabel}>{signUpPasswordLabel}</Label>
            <Input
              {...signUpPasswordInputProps}
              onChange={PassInput =>
                (this.PassInput = PassInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        {/* Confirm password */}
        {this.isSignup && (
          <FormGroup className="half_width login-input-padding-right">
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input
              {...confirmPasswordInputProps}
              onChange={PassInput =>
                (this.ConfirmPassInput = PassInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        {/* Login Username */}
        {this.isLogin && (
          <FormGroup>
            <Label for={usernameLabel}>{usernameLabel}</Label>
            <Input
              {...usernameInputProps}
              onChange={UserInput =>
                (this.UserValue = UserInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        {/* Login password */}
        {this.isLogin && (
          <FormGroup>
            <Label for={passwordLabel}>{passwordLabel}</Label>
            <Input
              {...passwordInputProps}
              onChange={PassInput =>
                (this.PassInput = PassInput.currentTarget.value)
              }
            />
          </FormGroup>
        )}
        <FormGroup check>
          <Label className="login-check-input" check>
            <Input type="checkbox" />{' '}
            {this.isSignup
              ? 'با کلیه ی شرایط و قوانین سایت موافقم'
              : 'مرا به خاطر بسپار'}
          </Label>
        </FormGroup>
        <hr />
        {this.isSignup ? (
          <Button
            size="lg"
            className="bg-gradient-theme-left border-0 login-btn"
            block
            onClick={this.signUpClick}
          >
            {this.renderButtonText()}
          </Button>
        ) : (
          <Button
            size="lg"
            className="bg-gradient-theme-left border-0 login-btn"
            block
            onClick={this.loginClick}
          >
            {this.renderButtonText()}
          </Button>
        )}

        <div className="text-center pt-1">
          <br></br>
          <h6>
            {this.isSignup ? (
              <a
                className="loginTo text-white"
                href="#login"
                onClick={this.changeAuthState(STATE_LOGIN)}
              >
                ورود
              </a>
            ) : (
              <a
                href="#signup"
                className="text-white"
                onClick={this.changeAuthState(STATE_SIGNUP)}
              >
                ثبت نام
              </a>
            )}
          </h6>
        </div>
        {this.props.loggingIn ? (
          <div className="d-flex flex-column w-100 text-center">
            <span className="text-light mb-2" style={{ fontSize: '0.9rem' }}>
              در حال ورود ...
            </span>
            <CircularProgress className="m-auto" color="primary" />
          </div>
        ) : null}
        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  emailLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  signUpPasswordInputProps: PropTypes.object,
  NameInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  NameLabel: PropTypes.string,
  lastNameLabel: PropTypes.string,
  signUpUsernameLabel: PropTypes.string,
  PhoneLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  // authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'ایمیل',
  usernameInputProps: {
    type: 'text',
  },
  passwordLabel: 'رمز عبور',
  passwordInputProps: {
    type: 'password',
  },

  emailLabel: 'ایمیل',
  emailInputProps: {
    type: 'email',
  },
  NameLabel: 'نام',
  NameInputProps: {
    type: 'text',
  },
  lastNameLabel: 'نام خانوادگی',
  lastNameInputProps: {
    type: 'text',
  },
  signUpUsernameLabel: 'نام کاربری',
  signUpUsernameInputProps: {
    type: 'text',
  },
  PhoneLabel: 'موبایل',
  phoneInputProps: {
    type: 'text',
  },
  signUpPasswordLabel: 'رمز عبور',
  signUpPasswordInputProps: {
    type: 'password',
  },
  confirmPasswordLabel: 'تکرار رمز عبور',
  confirmPasswordInputProps: {
    type: 'password',
  },
  onLogoClick: () => {},
};

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

// const connectedAuthForm = connect(mapStateToProps)(AuthForm);
// export { connectedAuthForm as AuthForm };
export default connect(mapStateToProps)(AuthForm);
