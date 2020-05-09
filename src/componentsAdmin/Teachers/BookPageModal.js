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
  Col,
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Select from 'react-select';
import { apiActions } from '../../_actions';
import alertify from 'alertifyjs';
import VisibilityIcon from '@material-ui/icons/Visibility';

function BookPageModal(props) {
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
  console.log(props.modalData);
  return (
    <Modal
      isOpen={props.isOpen}
      className="modal-teacher"
      //  toggle={props.toggle}
    >
      <ModalHeader>
        جزئیات کتاب {props.modalData ? props.modalData.fldTestBookName : ''}
      </ModalHeader>
      <ModalBody className="d-flex flex-wrap flex-column">
        {/* Cover */}
        <Col
          md={12}
          sm={12}
          className="d-flex justify-content-center align-items-center mb-3"
        >
          {props.modalData && props.modalData.fldCoverAddress ? (
            <img
              src={props.modalData ? props.modalData.fldCoverAddress : ''}
              alt={props.modalData ? props.modalData.fldTestBookName : ''}
              className="img-fluid"
              style={{ maxHeight: '350px' }}
            />
          ) : (
            <span className="d-block mb-4 label">
              عکسی برای جلد کتاب آپلود نشده است
            </span>
          )}
        </Col>
        {/* Forms */}
        <Col md={12} sm={12} className="d-flex">
          <Form className="col-12 d-flex flex-wrap">
            <Col md={6} sm={12} className="d-flex flex-column">
              <FormGroup className="d-flex mb-4">
                <Label
                  htmlFor="booksname"
                  className="d-flex flex-wrap align-items-center ml-2 mb-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  نام کتاب :{' '}
                  <span className="text-dark mr-2">
                    {props.modalData ? props.modalData.fldTestBookName : ''}
                  </span>
                </Label>
              </FormGroup>
              <FormGroup className="d-flex mb-4">
                <Label
                  htmlFor="author"
                  className="d-flex  flex-wrapalign-items-center ml-2 mb-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  نویسنده :{' '}
                  <span className="text-dark mr-2">
                    {props.modalData ? props.modalData.fldAuthor : ''}
                  </span>
                </Label>
              </FormGroup>
              <FormGroup className="d-flex mb-4">
                <Label htmlFor="author" className="d-flex  ml-2 mb-0">
                  <span style={{ whiteSpace: 'nowrap' }}>توضیحات : </span>
                  <span className="text-dark mr-2">
                    {props.modalData
                      ? props.modalData.fldTestBookDiscription
                      : ''}
                  </span>
                </Label>
              </FormGroup>
            </Col>
            <Col md={6} sm={12} className="d-flex flex-column">
              <FormGroup className="d-flex mb-4">
                <Label
                  htmlFor="author"
                  className="d-flex flex-wrap align-items-center ml-2 mb-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  تعداد زیرفصل ها :{' '}
                  <span className="text-dark mr-2">
                    {props.modalData ? props.modalData.countSubBookChapter : ''}
                  </span>
                </Label>
              </FormGroup>
              <FormGroup className="d-flex mb-4">
                <Label
                  htmlFor="author"
                  className="d-flex flex-wrap align-items-center ml-2 mb-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  تعداد مبحث ها :{' '}
                  <span className="text-dark mr-2">
                    {props.modalData ? props.modalData.countTopic : ''}
                  </span>
                </Label>
              </FormGroup>
              <FormGroup className="d-flex mb-4">
                <Label
                  htmlFor="author"
                  className="d-flex flex-wrap align-items-center ml-2 mb-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  نام مبحث رایگان:{' '}
                  <span className="text-dark mr-2">
                    {props.modalData
                      ? props.modalData.fldTopicDemoName
                        ? props.modalData.fldTopicDemoName
                        : 'ندارد'
                      : ''}
                  </span>
                </Label>
              </FormGroup>
              <FormGroup className="d-flex mb-4">
                <Label
                  htmlFor="author"
                  className="d-flex flex-wrap align-items-center ml-2 mb-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  تعداد تست ها :{' '}
                  <span className="text-dark mr-2">
                    {props.modalData ? props.modalData.countAllTest : ''}
                  </span>
                </Label>
              </FormGroup>
              <FormGroup className="d-flex mb-4">
                <Label
                  htmlFor="author"
                  className="d-flex flex-wrap align-items-center ml-2 mb-0"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  تعداد آزمون ها :{' '}
                  <span className="text-dark mr-2">
                    {props.modalData ? props.modalData.countQuiz : ''}
                  </span>
                </Label>
              </FormGroup>
            </Col>

            <FormGroup className="mt-5">
              <ButtonGroup className="d-flex col-lg-3 col-md-12 col-sm-12 pr-0">
                <Button
                  color="secondary"
                  className="rounded"
                  onClick={props.toggle}
                >
                  بازگشت
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
    getDashboard: state.api.dashboard,
  };
}

export default connect(mapStateToProps)(BookPageModal);
