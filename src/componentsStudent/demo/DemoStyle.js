import Page from 'components/Page';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Label,
  Button,
  FormGroup,
  Input,
  ButtonGroup,
} from 'reactstrap';
import { apiActionsStudent } from '../../_actions';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import parse from 'html-react-parser';
import { Tooltip } from '@material-ui/core';
import alertify from 'alertifyjs';
import { animations } from 'react-animation';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import CloseIcon from '@material-ui/icons/Close';
import Done from '@material-ui/icons/AssignmentTurnedIn';
import Later from '@material-ui/icons/AssignmentLate';
import Ignore from '@material-ui/icons/AssignmentReturn';
import Next from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlusIcon from '@material-ui/icons/Add';
import EasyIcon from '@material-ui/icons/SignalCellular1Bar';
import MediumIcon from '@material-ui/icons/SignalCellular2Bar';
import HardIcon from '@material-ui/icons/SignalCellular3Bar';
import HardFullIcon from '@material-ui/icons/SignalCellular4Bar';

function DemoStyle(props) {
  let classWrapper = '';
  let classQuestion = '';
  let classAnswerWrapper = '';
  let classAnswers = '';
  if (props.styleNum === 1) {
    classWrapper = ' flex-column ';
    classQuestion = ' col-12';
    classAnswerWrapper = ' col-12';
    classAnswers = ' col-lg-2';
  } else if (props.styleNum === 2) {
    classWrapper = ' flex-column ';
    classQuestion = '   col-12';
    classAnswerWrapper = ' col-12 ';
    classAnswers = ' col-lg-5';
  } else {
    classWrapper = ' flex-column';
    classQuestion = ' col-12';
    classAnswerWrapper = ' col-12  flex-column px-md-3';
    classAnswers = ' col-lg-11 card-subtitle-minHeight';
  }
  // select Answere
  const [userSelectAnswere, setUserSelectAnswere] = useState(true);
  const [selectAnswere, setSelectAnswere] = useState([
    false,
    false,
    false,
    false,
  ]);
  const selectAnswereHandler = num => {
    const arr = [false, false, false, false];
    arr[num - 1] = true;
    setSelectAnswere(arr);
  };

  const submitAnswere = (e, action) => {
    e.preventDefault();
    props.selectAnswere(props.test[0].pkTestMaster, action);
    setSelectAnswere([false, false, false, false]);
    setUserSelectAnswere(true);
    if (props.cameFromQuiz === false) {
      props.changeAnswere(props.test[0].pkTestMaster, action);
    }
  };

  // Show Answere
  const [showAnswere, updateShowAnswere] = useState(false);

  return (
    <div className="container border bg-white px-0 px-md-1 position-relativer rounded">
      <Card className="test_pre_custom_bg">
        {props.test ? (
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <FormGroup>
              <Label
                className="row mt-3 px-5 mr-2 d-flex align-items-center"
                style={{ fontSize: '0.9rem' }}
              >
                <Tooltip
                  title={
                    <span style={{ fontSize: '12px' }}>
                      سطح
                      {props.test[0].testLevel && props.test[0].testLevel <= 3
                        ? ' آسان'
                        : props.test[0].testLevel > 3 &&
                          props.test[0].testLevel <= 6
                        ? ' متوسط'
                        : ' سخت'}
                    </span>
                  }
                >
                  {props.test[0].testLevel && props.test[0].testLevel <= 3 ? (
                    <EasyIcon
                      className="ml-1"
                      style={{ fontSize: 25, color: '#45b649' }}
                    />
                  ) : props.test[0].testLevel > 3 &&
                    props.test[0].testLevel <= 6 ? (
                    <MediumIcon
                      className="ml-1"
                      style={{ fontSize: 25, color: '#ffd700' }}
                    />
                  ) : props.test[0].testLevel > 6 &&
                    props.test[0].testLevel <= 8 ? (
                    <HardIcon
                      className="ml-1"
                      style={{ fontSize: 25, color: '#C4161C' }}
                    />
                  ) : (
                    <HardFullIcon
                      className="ml-1"
                      style={{ fontSize: 25, color: '#C4161C' }}
                    />
                  )}
                </Tooltip>
                <span style={{ paddingTop: '5px' }}>
                  تست شماره {props.test[0].rowNumber} از {props.test[0].allTest}
                </span>
              </Label>
            </FormGroup>
          </div>
        ) : null}
        <CardBody
          className={`d-flex flex-wrap${classWrapper} pt-4 pb-5`}
          //   key={id !== -1 ? props.selectedTest : id}
        >
          <div className={` ${classQuestion} d-flex p-0 px-md-1`}>
            <CardTitle
              className={` col-11 card_test_pre_title d-flex flex-wrap card-test-student`}
              //   onClick={e => showTextAnswerEditor(e, 0)}
              style={{ animation: animations.fadeIn }}
            >
              {props.test ? (
                props.test[0].questionName !== null &&
                props.test[0].questionName !== '' ? (
                  parse(props.test[0].questionName)
                ) : (
                  <p>سوال خود را اینجا وارد نمائید</p>
                )
              ) : (
                <p> سوال خود را اینجا وارد نمائید</p>
              )}
            </CardTitle>
          </div>
          <div
            className={` d-flex flex-wrap align-items-stretch ${classAnswerWrapper} px-md-1`}
          >
            <CardSubtitle
              className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title card-answere-student d-flex flex-wrap ${
                selectAnswere[0] === true ? 'selected-answere' : ''
              }`}
              onClick={() =>
                userSelectAnswere ? selectAnswereHandler(1) : null
              }
              style={
                props.test &&
                selectAnswere[0] === true &&
                props.test[0].trueAnswer === 1 &&
                userSelectAnswere === false
                  ? {
                      backgroundColor: '#bbffbdb0',
                      animation: animations.fadeIn,
                    }
                  : props.test &&
                    selectAnswere[0] === true &&
                    props.test[0].trueAnswer !== 1 &&
                    userSelectAnswere === false
                  ? {
                      backgroundColor: '#f9989ce3',
                      animation: animations.fadeIn,
                    }
                  : { animation: animations.fadeIn }
              }
            >
              <>
                <span
                  style={{
                    fontSize: '0.9rem',
                    color: '#676767',
                    paddingBottom: '7px',
                    marginLeft: '5px',
                    display: 'block',
                    width: '100%',
                    marginBottom: '5px',
                  }}
                >
                  گزینه اول
                </span>
                {props.test ? (
                  props.test[0].answer1 !== null &&
                  props.test[0].answer1 !== '' ? (
                    parse(props.test[0].answer1)
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}
              </>
            </CardSubtitle>
            <CardSubtitle
              className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title card-answere-student d-flex flex-wrap ${
                selectAnswere[1] === true ? 'selected-answere' : ''
              }`}
              onClick={() =>
                userSelectAnswere ? selectAnswereHandler(2) : null
              }
              style={
                props.test &&
                selectAnswere[1] === true &&
                props.test[0].trueAnswer === 2 &&
                userSelectAnswere === false
                  ? {
                      backgroundColor: '#bbffbdb0',
                      animation: animations.fadeIn,
                    }
                  : props.test &&
                    selectAnswere[1] === true &&
                    props.test[0].trueAnswer !== 2 &&
                    userSelectAnswere === false
                  ? {
                      backgroundColor: '#f9989ce3',
                      animation: animations.fadeIn,
                    }
                  : { animation: animations.fadeIn }
              }
            >
              {' '}
              <>
                <span
                  style={{
                    fontSize: '0.9rem',
                    color: '#676767',
                    paddingBottom: '7px',
                    marginLeft: '5px',
                    display: 'block',
                    width: '100%',
                    marginBottom: '5px',
                  }}
                >
                  گزینه دوم
                </span>
                {props.test ? (
                  props.test[0].answer2 !== null &&
                  props.test[0].answer2 !== '' ? (
                    parse(props.test[0].answer2)
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}
              </>
            </CardSubtitle>
            <CardSubtitle
              className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title card-answere-student d-flex flex-wrap ${
                selectAnswere[2] === true ? 'selected-answere' : ''
              }`}
              onClick={() =>
                userSelectAnswere ? selectAnswereHandler(3) : null
              }
              style={
                props.test &&
                selectAnswere[2] === true &&
                props.test[0].trueAnswer === 3 &&
                userSelectAnswere === false
                  ? {
                      backgroundColor: '#bbffbdb0',
                      animation: animations.fadeIn,
                    }
                  : props.test &&
                    selectAnswere[2] === true &&
                    props.test[0].trueAnswer !== 3 &&
                    userSelectAnswere === false
                  ? {
                      backgroundColor: '#f9989ce3',
                      animation: animations.fadeIn,
                    }
                  : { animation: animations.fadeIn }
              }
            >
              <>
                <span
                  style={{
                    fontSize: '0.9rem',
                    color: '#676767',
                    paddingBottom: '7px',
                    marginLeft: '5px',
                    display: 'block',
                    width: '100%',
                    marginBottom: '5px',
                  }}
                >
                  گزینه سوم
                </span>
                {props.test ? (
                  props.test[0].answer3 !== null &&
                  props.test[0].answer3 !== '' ? (
                    parse(props.test[0].answer3)
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}{' '}
              </>
            </CardSubtitle>
            <CardSubtitle
              className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title card-answere-student d-flex flex-wrap ${
                selectAnswere[3] === true ? 'selected-answere' : ''
              } `}
              style={
                props.test &&
                selectAnswere[3] === true &&
                props.test[0].trueAnswer === 4 &&
                userSelectAnswere === false
                  ? {
                      backgroundColor: '#bbffbdb0',
                      animation: animations.fadeIn,
                    }
                  : props.test &&
                    selectAnswere[3] === true &&
                    props.test[0].trueAnswer !== 4 &&
                    userSelectAnswere === false
                  ? {
                      backgroundColor: '#f9989ce3',
                      animation: animations.fadeIn,
                    }
                  : { animation: animations.fadeIn }
              }
              onClick={() =>
                userSelectAnswere ? selectAnswereHandler(4) : null
              }
            >
              <>
                <span
                  style={{
                    fontSize: '0.9rem',
                    color: '#676767',
                    paddingBottom: '7px',
                    marginLeft: '7px',
                    display: 'block',
                    width: '100%',
                    marginBottom: '5px',
                  }}
                >
                  گزینه چهارم
                </span>
                {props.test ? (
                  props.test[0].answer4 !== null &&
                  props.test[0].answer4 !== '' ? (
                    parse(props.test[0].answer4)
                  ) : (
                    <p></p>
                  )
                ) : (
                  <p></p>
                )}
              </>
            </CardSubtitle>
          </div>
          {/* Answere */}
          <Row
            className="col-12 mt-3 pr-5"
            // key={props.test ? props.test[0].trueAnswer : 1}
          >
            <Col className="d-flex flex-wrap mt-2 align-items-center px-4">
              <Button
                outline
                color="white"
                className="add-book-btn
                 rounded mt-2 mt-md-4 mr-0 bg-white col-sm-5 col-md-3 col-lg-2"
                onClick={() => {
                  props.showAnswereHandler(props.test[0].pkTestMaster);
                  updateShowAnswere(true);
                  setUserSelectAnswere(false);
                }}
              >
                پاسخنامه
              </Button>
            </Col>
          </Row>

          <Row
            className="col-12 mt-3 pr-5"
            // key={props.test ? props.test[0].trueAnswer : 2}
            style={
              showAnswere
                ? { display: 'flex', opacity: '1', transition: '0.4s' }
                : { display: 'none', opacity: '0', transition: '0.4s' }
            }
          >
            <Col className="d-flex flex-wrap mt-2 align-items-center px-4">
              {' '}
              <ExpansionPanel>
                <Tooltip
                  title={
                    <span style={{ fontSize: '0.75rem' }}>
                      {' '}
                      مشاهده فایل پاسخنامه
                    </span>
                  }
                >
                  <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <span className="py-2">
                      گزینه {props.test ? props.test[0].trueAnswer : ''} صحیح
                      میباشد
                    </span>
                  </ExpansionPanelSummary>
                </Tooltip>

                <ExpansionPanelDetails
                  key={props.loadFile}
                  className="d-flex flex-column flex-wrap"
                >
                  {props.loadFile
                    ? props.loadFile.map((media, i) => {
                        console.log(media);
                        if (media.type.includes('image')) {
                          return (
                            <img
                              src={URL.createObjectURL(media)}
                              alt={media.fldMediaName}
                              key={media.type}
                              className="img-fluid my-2"
                            />
                          );
                        } else if (media.type.includes('audio')) {
                          return (
                            <audio
                              src={URL.createObjectURL(media)}
                              key={media.type}
                              controls
                              controlsList="nodownload"
                              className="my-2"
                            ></audio>
                          );
                        } else if (media.type.includes('video')) {
                          return (
                            <video
                              src={URL.createObjectURL(media)}
                              key={media.type}
                              controls
                              controlsList="nodownload"
                              className="my-2"
                            ></video>
                          );
                        }
                      })
                    : null}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Col>
          </Row>
          {/* Buttons */}

          <Row
            className="col-12 my-4 pr-5 "
            // key={props.test ? props.test[0].trueAnswer : 3}
          >
            {' '}
            <Col className="d-flex flex-wrap mt-2 align-items-center px-4">
              <MainButton
                iconResting={
                  <Tooltip
                    title={<span style={{ fontSize: '12px' }}>تست قبلی</span>}
                  >
                    <span
                      className="d-flex justify-content-center align-items-center"
                      style={{ width: '35px', height: '35px' }}
                    >
                      <Next
                        style={{ fontSize: 20, transform: 'rotate(180deg)' }}
                      />
                    </span>
                  </Tooltip>
                }
                iconActive={<CloseIcon style={{ fontSize: 20 }} />}
                backgroundColor="black"
                size={56}
                style={{ transition: '0.3s' }}
                className="btn-outline-light ml-auto"
                onClick={e =>
                  props.test && props.test[0].rowNumber === 1
                    ? alertify.error('تست قبلی وجود ندارد')
                    : submitAnswere(e, 3)
                }
                disabled={
                  props.test && props.test[0].rowNumber === 1 ? true : false
                }
              />
              {props.test[0].rowNumber === props.test[0].allTest ? (
                <Button
                  className=" col-lg-2 col-md-5 col-sm-12 mt-2 mr-auto"
                  color="outline-secondary"
                  onClick={e => {
                    props.goDashboard();
                  }}
                >
                  بازگشت به داشبورد
                </Button>
              ) : (
                <MainButton
                  iconResting={
                    <Tooltip
                      title={<span style={{ fontSize: '12px' }}>تست بعدی</span>}
                    >
                      <span
                        className="d-flex justify-content-center align-items-center"
                        style={{ width: '35px', height: '35px' }}
                      >
                        <Next style={{ fontSize: 20 }} />
                      </span>
                    </Tooltip>
                  }
                  iconActive={<CloseIcon style={{ fontSize: 20 }} />}
                  backgroundColor="black"
                  onClick={e => submitAnswere(e, 4)}
                  size={56}
                  className="btn-outline-light"
                />
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default DemoStyle;
