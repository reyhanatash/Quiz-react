import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonGroup,
  Col,
} from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { apiActions } from '../_actions';
import alertify from 'alertifyjs';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import userImage from 'assets/img/users/avatar.png';

function ProfileModal(props) {
  const firstName = React.createRef();
  const lastName = React.createRef();
  const phoneNumber = React.createRef();
  const email = React.createRef();
  const bankNumber = React.createRef();
  const password = React.createRef();
  const password2 = React.createRef();
  const form = React.createRef();
  const [bankNumber2, setbankNumber] = useState(null);
  const [showPassword, setshowPassword] = useState(true);
  const showPasswordHandler = () => {
    setshowPassword(!showPassword);
  };
  const [showPassword2, setshowPassword2] = useState(true);
  const showPasswordHandler2 = () => {
    setshowPassword2(!showPassword2);
  };
  const submit = e => {
    // Send Data
    const getProfileModal = {
      Name: firstName.current.value,
      LastName: lastName.current.value,
      Email: email.current.value,
      Password: password.current.value,
      PhoneNumber: phoneNumber.current.value,
      BankAccountNumber: bankNumber.current.value,
    };
    // Validation
    if (
      !lastName.current.value ||
      //   !phoneNumber.current.value ||
      !firstName.current.value
    ) {
      alertify.error('پر کردن فیلدهای الزامی است');
      return;
    }
    if (password.current.value !== password2.current.value) {
      alertify.error('رمزعبور و تکرار رمزعبور یکسان نمیباشد');
      return;
    }
    props.getProfileModal(getProfileModal);
    setTimeout(() => {
      form.current.reset();
      props.getProfile();
      props.toggle();
    }, 50);
  };
  //   Check Bank Account
  //   const checkBankNumber = () => {
  //     const getProfileModal = {
  //       Name: firstName.current.value,
  //       LastName: lastName.current.value,
  //       Email: email.current.value,
  //       Password: password.current.value,
  //       PhoneNumber: phoneNumber.current.value,
  //       BankAccountNumber: bankNumber.current.value,
  //     };
  //     props.getProfileModal(getProfileModal);
  //     setTimeout(() => {
  //       props.getProfile();
  //     }, 50);
  //   };
  useEffect(() => {
    if (bankNumber2 && bankNumber2.length === 26) {
      props.checkBankNumber(bankNumber.current.value);
    }
  }, [bankNumber2]);
  useEffect(() => {
    if (!props.isOpen) {
      props.clearBankCheck();
    }
  }, [props.isOpen]);
  return (
    <Modal
      isOpen={props.isOpen}
      className="modal-profile"
      toggle={props.toggle}
    >
      <ModalHeader>پروفایل من</ModalHeader>
      <ModalBody>
        {/* Forms */}
        <Col md={12} sm={12}>
          <Form innerRef={form} className="form-profile direction-right">
            <FormGroup className="d-flex flex-column flex-wrap align-items-center justify-content-center">
              <img
                src={userImage}
                alt={props.loadProfile ? props.loadProfile[0].fldName : ''}
                className="img-profile img-fluid rounded-circle"
              />
              {/* <Button
                color="primary"
                className="rounded mt-2"
                onClick={props.toggle}
                outline
              >
                ویرایش
              </Button> */}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="firstName">نام</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder=""
                className="text-right direction-right"
                defaultValue={
                  props.loadProfile ? props.loadProfile[0].fldName : ''
                }
                innerRef={firstName}
              />
            </FormGroup>
            {/* Last Name */}
            <FormGroup>
              <Label htmlFor="lastName">نام خانوادگی</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder=""
                className="text-right direction-right"
                defaultValue={
                  props.loadProfile ? props.loadProfile[0].fldLastName : ''
                }
                innerRef={lastName}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="userName">نام کاربری</Label>
              <Input
                disabled
                type="text"
                name="userName"
                id="userName"
                className="text-right"
                defaultValue={
                  props.loadProfile ? props.loadProfile[0].fldUserName : ''
                }
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="phoneNumber">شماره تماس</Label>
              <Input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder=""
                // className="text-right"
                defaultValue={
                  props.loadProfile ? props.loadProfile[0].fldPhoneNo : ''
                }
                innerRef={phoneNumber}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">ایمیل</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder=""
                // className="text-right"
                defaultValue={
                  props.loadProfile ? props.loadProfile[0].fldEmail : ''
                }
                innerRef={email}
              />
            </FormGroup>
            <FormGroup className="d-flex flex-column">
              <Label htmlFor="bankNumber">شماره شبا</Label>
              <div className="d-flex align-items-center">
                {!props.resultBankNumber &&
                props.loadProfile &&
                props.loadProfile[0].fldFnResult === 1 ? (
                  <CheckIcon className="text-success" />
                ) : props.resultBankNumber &&
                  props.resultBankNumber[0].message === 'Succeed' ? (
                  <CheckIcon className="text-success" />
                ) : (!props.resultBankNumber &&
                    props.loadProfile &&
                    props.loadProfile[0].fldFnResult === 0) ||
                  (props.resultBankNumber &&
                    props.resultBankNumber[0].message === 'Faild') ? (
                  <CancelIcon className="text-danger" />
                ) : null}
                <Input
                  type="text"
                  maxLength={26}
                  name="bankNumber"
                  id="bankNumber"
                  placeholder="IR..."
                  // className="text-right"
                  onChange={e => setbankNumber(e.currentTarget.value)}
                  defaultValue={
                    props.loadProfile
                      ? props.loadProfile[0].fldBankAccountNumber
                      : ''
                  }
                  innerRef={bankNumber}
                />
              </div>
            </FormGroup>
            {!props.resultBankNumber &&
            props.loadProfile &&
            props.loadProfile[0].fldFnResult === 1 ? (
              <p
                className="text-right d-flex flex-column bg-light p-2 rounded"
                style={{ fontSize: '0.9rem' }}
              >
                <span>کشور : {props.loadProfile[0].fldFnCountry}</span>
                <br></br>
                <span>بانک : {props.loadProfile[0].fldFnBankName}</span>
                <br></br>
                <span>
                  شماره حساب : {props.loadProfile[0].fldFnAccountNumber}
                </span>
              </p>
            ) : props.resultBankNumber &&
              props.resultBankNumber[0].message === 'Faild' ? (
              <span className="my-3 mr-4 d-inline-flex text-muted">
                {props.resultBankNumber[0].showMessageToUser}
              </span>
            ) : props.resultBankNumber &&
              props.resultBankNumber[0].message === 'Succeed' ? (
              <p
                className="text-right d-flex flex-column bg-light p-2 rounded"
                style={{ fontSize: '0.9rem' }}
              >
                <span>کشور : {props.resultBankNumber[0].country}</span>
                <br></br>
                <span>بانک : {props.resultBankNumber[0].bankName}</span>
                <br></br>
                <span>
                  شماره حساب : {props.resultBankNumber[0].accountNumber}
                </span>
              </p>
            ) : null}
            {/* passwords */}
            <FormGroup className="position-relative">
              <div
                className="custom-select-react-label mb-2"
                htmlFor="password"
              >
                {props.isEditing === false ? (
                  <span className="validation-red">* &nbsp;</span>
                ) : null}
                تغییر رمزعبور
              </div>
              <Input
                type={showPassword ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder=""
                className="text-right position-relative"
                // defaultValue={props.isEditing ? props.editData.authorName : ''}
                innerRef={password}
              />
              <VisibilityIcon
                style={{
                  width: '22px',
                  height: '38px',
                  position: 'absolute',
                  top: '47%',
                  left: '2%',
                  transform: 'translate (0px , -12px)',
                  cursor: 'pointer',
                }}
                onClick={showPasswordHandler}
              />
            </FormGroup>
            <FormGroup className="position-relative">
              <div
                className="custom-select-react-label mb-2"
                htmlFor="password"
              >
                {props.isEditing === false ? (
                  <span className="validation-red">* &nbsp;</span>
                ) : null}
                تکرار رمزعبور جدید
              </div>
              <Input
                type={showPassword2 ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder=""
                className="text-right position-relative"
                // defaultValue={props.isEditing ? props.editData.authorName : ''}
                innerRef={password2}
              />
              <VisibilityIcon
                style={{
                  width: '22px',
                  height: '38px',
                  position: 'absolute',
                  top: '47%',
                  left: '2%',
                  transform: 'translate (0px , -12px)',
                  cursor: 'pointer',
                }}
                onClick={showPasswordHandler2}
              />
            </FormGroup>

            <FormGroup className="mt-4">
              <ButtonGroup className="d-flex">
                <Button
                  color="primary"
                  className="ml-2 rounded"
                  onClick={submit}
                >
                  ویرایش
                </Button>{' '}
                <Button
                  color="secondary"
                  className="rounded"
                  onClick={props.toggle}
                >
                  لغو
                </Button>
              </ButtonGroup>
            </FormGroup>
          </Form>
        </Col>
      </ModalBody>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    editData: state.api.selectedItem,
    getDashboard: state.api.dashboard,
    resultBankNumber: state.api.checkBankNumber,
  };
}

export default connect(mapStateToProps)(ProfileModal);
