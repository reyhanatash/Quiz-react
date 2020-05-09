import React, { useState } from 'react';
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
} from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { apiActions } from '../../_actions';
import alertify from 'alertifyjs';
import VisibilityIcon from '@material-ui/icons/Visibility';

function TeachersPageModal(props) {
  console.log(props.editData);
  let statusOptions = [
    {
      id: 0,
      label: 'غیر فعال',
      value: 0,
    },
    {
      id: 1,
      label: 'فعال',
      value: 1,
    },
  ];

  const [showPassword, setshowPassword] = useState(true);
  const showPasswordHandler = () => {
    setshowPassword(!showPassword);
  };
  const [showPassword2, setshowPassword2] = useState(true);
  const showPasswordHandler2 = () => {
    setshowPassword2(!showPassword2);
  };
  const form = React.createRef();
  const name = React.createRef();
  const lastName = React.createRef();
  const userName = React.createRef();
  const phone = React.createRef();
  const email = React.createRef();
  const password = React.createRef();
  const password2 = React.createRef();
  const status = React.createRef();
  const percentage = React.createRef();

  const submit = e => {
    let id = props.isEditing ? props.editData.id : -1;
    // Send Data
    const getBookModal = {
      id,
      name: name.current.value,
      lastName: lastName.current.value,
      userName: userName.current.value,
      email: email.current.value,
      password: password.current.value,
      typeco: 2,
      phone: phone.current.value,
      percentage: Number(percentage.current.value),
      // status: status.current.state.value.value,
    };
    // Validation
    if (
      !lastName.current.value ||
      !name.current.value ||
      !userName.current.value ||
      !email.current.value ||
      !phone.current.value ||
      !percentage.current.value
    ) {
      alertify.error('پر کردن فیلدهای ستاره دار الزامی است');
      return;
    }
    if (props.isEditing === false && !password.current.value) {
      alertify.error('پر کردن فیلدهای ستاره دار الزامی است');
      return;
    }
    if (
      Number(percentage.current.value) < 0 ||
      Number(percentage.current.value) > 100
    ) {
      alertify.error('درصد باید بین 0 - 100 باشد');
      return;
    }
    if (password.current.value !== password2.current.value) {
      alertify.error('رمزعبور و تکرار رمزعبور یکسان نمیباشد');
      return;
    }
    // console.log(getBookModal);
    // if (
    //   status.current.state.value === '' ||
    //   status.current.state.value === null ||
    //   status.current.state.value === undefined ||
    //   status.current.state.value.length === 0
    // ) {
    //   alertify.error('انتخاب وضعیت');
    //   return;
    // }

    props.getBookModal(getBookModal);
    setTimeout(() => {
      form.current.reset();
      props.reloadData();
      props.toggle();
    }, 10);
    // if (
    //   FkGrade.current.state.value === '' ||
    //   FkGrade.current.state.value === null ||
    //   FkGrade.current.state.value === undefined ||
    //   FkGrade.current.state.value.length === 0
    // ) {
    //   alertify.error('فیلد مقطع اجباری است');
    //   return;
    // }
    // if (
    //   FkMajor.current.state.value === '' ||
    //   FkMajor.current.state.value === null ||
    //   FkMajor.current.state.value === undefined
    // ) {
    //   alertify.error('فیلد رشته اجباری است');
    // }
    // if (
    //   FkGrade.current.state.value === '' ||
    //   FkGrade.current.state.value === null ||
    //   FkGrade.current.state.value === undefined
    // ) {
    //   alertify.error('فیلد مقطع اجباری است');
    // }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      className="modal-teacher"
      //  toggle={props.toggle}
    >
      {props.isEditing === false ? (
        <ModalHeader>تعریف طراح</ModalHeader>
      ) : (
        <ModalHeader>ویرایش طراح</ModalHeader>
      )}
      <ModalBody>
        {/* Forms */}
        <Form innerRef={form}>
          <FormGroup className="d-flex mb-4">
            <Label
              htmlFor="booksname"
              className="d-flex align-items-center ml-2 mb-0"
              style={{ whiteSpace: 'nowrap' }}
            >
              <span className="validation-red">* &nbsp;</span>نام{' '}
            </Label>
            <Input
              required
              type="text"
              name="booksname"
              id="booksname"
              placeholder="شایان"
              className="text-right col-4 offset-1"
              defaultValue={
                props.isEditing && props.editData ? props.editData.name : ''
              }
              innerRef={name}
            />
            <Label
              htmlFor="author"
              className="d-flex align-items-center ml-2 mb-0"
              style={{ whiteSpace: 'nowrap' }}
            >
              <span className="validation-red">* &nbsp;</span>نام خانوادگی
            </Label>
            <Input
              required
              type="text"
              name="author"
              id="author"
              placeholder="داوودی"
              className="text-right col-4"
              defaultValue={
                props.isEditing && props.editData ? props.editData.lastName : ''
              }
              innerRef={lastName}
            />
          </FormGroup>
          {/* Author */}
          <FormGroup>
            <div className="custom-select-react-label mb-2" htmlFor="username">
              <span className="validation-red">* &nbsp;</span>
              نام کاربری
            </div>
            <Input
              required
              type="text"
              name="username"
              id="username"
              placeholder="teacher"
              className="text-right"
              defaultValue={
                props.isEditing && props.editData ? props.editData.userName : ''
              }
              readOnly={props.isEditing ? true : false}
              innerRef={userName}
            />
          </FormGroup>
          <FormGroup>
            <div
              className="custom-select-react-label mb-2"
              htmlFor="phoneNumber"
            >
              <span className="validation-red">* &nbsp;</span>
              شماره تلفن
            </div>
            <Input
              required
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="09377777777"
              className="text-right"
              defaultValue={
                props.isEditing && props.editData ? props.editData.phone : ''
              }
              innerRef={phone}
            />
          </FormGroup>
          <FormGroup>
            <div className="custom-select-react-label mb-2" htmlFor="email">
              <span className="validation-red">* &nbsp;</span>
              ایمیل
            </div>
            <Input
              required
              type="email"
              name="email"
              id="email"
              placeholder="teacher@gmail.com"
              className="text-right"
              defaultValue={
                props.isEditing && props.editData ? props.editData.email : ''
              }
              innerRef={email}
            />
          </FormGroup>
          <FormGroup className="position-relative">
            <div className="custom-select-react-label mb-2" htmlFor="password">
              {props.isEditing === false ? (
                <span className="validation-red">* &nbsp;</span>
              ) : null}
              رمزعبور
            </div>
            <Input
              required
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
            <div className="custom-select-react-label mb-2" htmlFor="password">
              {props.isEditing === false ? (
                <span className="validation-red">* &nbsp;</span>
              ) : null}
              تکرار رمزعبور
            </div>
            <Input
              required
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
          {/* <FormGroup>
            <div
              className="custom-select-react-label mb-2"
              htmlFor="section-select"
            >
              <span className="validation-red">* &nbsp;</span>
              وضعیت
            </div>
            <Select
              key={statusOptions}
              defaultValue={
                props.isEditing && props.editData
                  ? statusOptions.find(
                      opt => opt.id === Number(props.editData.isActive),
                    )
                  : ''
              }
              closeMenuOnSelect={true}
              required
              name="section-select"
              id="section-select"
              ref={status}
              className={'direction-right col-4'}
              noOptionsMessage={() => 'گزینه ای وجود ندارد'}
              placeholder="انتخاب کنید..."
              options={statusOptions}
            />
          </FormGroup> */}
          {/* Percentage */}
          <FormGroup className="d-flex flex-column flex-wrap">
            <div
              className="custom-select-react-label mb-2"
              htmlFor="Percentage"
            >
              <span className="validation-red">* &nbsp;</span>
              درصد سهم
            </div>
            <div className="d-flex align-items-center">
              <span>%</span>
              <Input
                required
                type="number"
                name="Percentage"
                id="Percentage"
                placeholder="56"
                className="text-center col-2"
                defaultValue={
                  props.isEditing && props.editData
                    ? props.editData.Percentage
                    : '60'
                }
                innerRef={percentage}
              />
            </div>
          </FormGroup>
          <FormGroup className="mt-4">
            <ButtonGroup className="d-flex">
              <Button color="primary" className="ml-2 rounded" onClick={submit}>
                {props.isEditing ? 'ذخیره' : 'افزودن'}
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
      </ModalBody>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    getDashboard: state.api.dashboard,
  };
}

export default connect(mapStateToProps)(TeachersPageModal);
