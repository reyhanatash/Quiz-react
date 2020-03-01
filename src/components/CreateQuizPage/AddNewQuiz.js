import React, { useState, useEffect } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ListGroupItem,
} from 'reactstrap';
import { TimePicker } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import { animations } from 'react-animation';
import alertify from 'alertifyjs';
const format = 'HH:mm';

export default function AddNewQuiz(props) {
  /////////////// Load Tests ///////////////
  const [selectedTest, setselectedTest] = useState([]);
  useEffect(() => {
    if (props.selectedTests && props.Tests) {
      setselectedTest(
        props.Tests.filter(test =>
          props.selectedTests.includes(test.pkTestMaster),
        ),
      );
    }
  }, [props.Tests, props.selectedTests]);
  // Load When Edit
  useEffect(() => {
    if (props.selectedQuiz && props.Tests) {
      const newArr = [];
      if (props.selectedQuiz.testArry !== null) {
        props.selectedQuiz.testArry
          .split(',')
          .map(id => newArr.push(Number(id)));
        setselectedTest(
          props.Tests.filter(test => newArr.includes(test.pkTestMaster)),
        );
      }
      console.log(newArr);
    }
  }, [props.selectedQuiz]);
  ///////////// Remove Test //////////////
  const removeTest = test => {
    props.removeSelectedTest(test.pkTestMaster);
  };
  ///////////// Save Quiz //////////////
  const quizName = React.createRef();
  const quizDesc = React.createRef();
  const form = React.createRef();
  const quizTimeInput = React.createRef();
  const [quizTime, setQuizTime] = useState('');
  const [reload, setReload] = useState(0);
  const createQuiz = e => {
    e.preventDefault();
    if (quizName.current.value === undefined || quizName.current.value === '') {
      alertify.error('پر کردن نام آزمون اجباری است');
      return;
    }
    if (quizTime === undefined || quizTime === '') {
      alertify.error('زمان آزمون انتخاب نشده است');
      return;
    }
    if (selectedTest === undefined || selectedTest.length === 0) {
      alertify.error('تستی انتخاب نشده است');
      return;
    }
    // console.log(quizName.current.value);
    // console.log(quizTime);
    // console.log(selectedTest)
    const pkselectedTests = [];
    selectedTest.forEach(test => {
      pkselectedTests.push(test.pkTestMaster);
    });
    props.addOrUpdateQuiz(
      quizName.current.value,
      quizTime,
      pkselectedTests.join(','),
      quizDesc.current.value !== '' ? quizDesc.current.value : null,
    );

    // Reset Form
    form.current.reset();
    setReload(1);
    quizTimeInput.current.timePickerRef.picker.value = '';
    props.resetSelectedTest();
  };
  useEffect(() => {
    if (props.selectedQuiz) {
      setReload(1);
      setQuizTime(props.selectedQuiz.time);
    }
    return () => {
      setReload(0);
      setQuizTime('');
    };
  }, [props.selectedQuiz]);

  return (
    <Col className="bg-white py-2 quiz-box-shadow">
      <h5 className="py-2">ساخت آزمون</h5>
      <Form className="mt-4 px-1 position-relative col-md-12" innerRef={form}>
        {/* Name */}
        <FormGroup className="d-flex flex-column col-12 p-0 flex-wrap">
          <Label for="hashtag" className="ml-auto">
            <span className="validation-red">* &nbsp;</span>
            نام آزمون
          </Label>
          <Input
            name="hashtag"
            id="hashtag"
            placeholder="شیمی"
            className={'direction-right col-12'}
            innerRef={quizName}
            defaultValue={
              props.selectedQuiz || props.selectedQuiz !== null
                ? props.selectedQuiz.name
                : ''
            }
            // onKeyPress={e => (e.which === 13 ? addHashtag(e) : '')}
          />
        </FormGroup>
        {/* Time */}
        <FormGroup className="d-flex flex-column col-lg-4 col-md-6 col-sm-7 p-0 flex-wrap">
          <Label for="hashtag" className="ml-auto">
            <span className="validation-red">* &nbsp;</span>
            زمان آزمون
          </Label>
          <TimePicker
            placeholder="دقیقه : ساعت"
            defaultValue={
              props.selectedQuiz || props.selectedQuiz !== null
                ? moment(props.selectedQuiz.time, format)
                : null
            }
            // defaultValue={moment('03:15', format)}
            format={format}
            onChange={(time, timeString) => setQuizTime(timeString)}
            defaultOpenValue={moment('03:30', format)}
            ref={quizTimeInput}
            key={reload}
          />
        </FormGroup>
        {/* Tests */}
        <FormGroup className="d-flex flex-column col-12 p-0 flex-wrap">
          <Label for="hashtag" className="ml-auto">
            <span className="validation-red">* &nbsp;</span>
            تست های انتخاب شده
          </Label>
          <ListGroupItem
            className="d-flex flex-column"
            style={{
              minHeight: '29vh',
              maxHeight: '29vh',
              overflowY: 'scroll',
              padding: '0',
            }}
            key={
              // props.editMode
              // ? props.loadTestData.questionName
              selectedTest ? selectedTest.pkTestMaster : ''
            }
          >
            {selectedTest
              ? selectedTest.map((item, pkTestDetail) => {
                  return (
                    <ListGroupItem
                      action
                      className="flex border-ligh direction-right justify-content-start align-items-center test_wrapper position-relative list-group-quiz"
                      style={{
                        display: 'flex',
                        animation: animations.fadeIn,
                      }}
                      key={pkTestDetail}
                    >
                      <span className="md-parent flex-row align-self-center justify-content-center">
                        <RemoveIcon
                          style={{ fontSize: '1.3rem' }}
                          className="delete-btn-quiz"
                          onClick={() => removeTest(item)}
                        />
                      </span>
                      <span className="test_title d-flex align-items-baseline">
                        <strong>{pkTestDetail + 1}</strong> -{' '}
                        {item.name.length >= 60
                          ? item.name.substr(0, 60) + '...'
                          : item.name}
                      </span>
                    </ListGroupItem>
                  );
                })
              : null}
          </ListGroupItem>
        </FormGroup>
        {/* Description */}
        <FormGroup className="d-flex flex-column col-12 p-0 flex-wrap">
          <Label for="hashtag" className="ml-auto">
            توضیحات آزمون
          </Label>
          <Input
            className="direction-right col-12 form-control desc-quiz"
            type="textarea"
            name="text"
            id="exampleText"
            placeholder="آزمون..."
            innerRef={quizDesc}
            defaultValue={
              props.selectedQuiz || props.selectedQuiz !== null
                ? props.selectedQuiz.desc
                : ''
            }
          />
        </FormGroup>
        {/* Buttons */}
        <FormGroup className="text-right d-flex flex-wrap align-items-start">
          {props.editMode === true ? (
            <>
              <Button
                color="outline-primary"
                onClick={e => {
                  createQuiz(e);
                }}
                className="ml-3 mb-3 col-lg-3 col-md-5 col-sm-12 px-1"
                style={{ fontSize: '0.85rem' }}
              >
                ویرایش
              </Button>
              <Button
                color="outline-secondary"
                onClick={e => {
                  e.preventDefault();
                  form.current.reset();
                  setReload(1);
                  quizTimeInput.current.timePickerRef.picker.value = '';
                  props.resetSelectedTest();
                }}
                className="ml-3 col-lg-3 col-md-5 col-sm-12 px-1"
                style={{ fontSize: '0.85rem' }}
              >
                لغو
              </Button>
            </>
          ) : (
            <Button
              className="ml-2 col-lg-3 col-md-4 col-sm-12"
              color="outline-secondary"
              onClick={e => {
                createQuiz(e);
              }}
              style={{ fontSize: '0.85rem' }}
            >
              ذخیره
            </Button>
          )}
        </FormGroup>
      </Form>
    </Col>
  );
}
