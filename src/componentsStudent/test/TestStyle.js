import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Label,
  Button,
  Table,
} from 'reactstrap';
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
import NotAnswere from '@material-ui/icons/PriorityHigh';
import { FloatingMenu, MainButton } from 'react-floating-button-menu';
import Next from '@material-ui/icons/KeyboardBackspace';

function TestStyle(props) {
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
    const num = selectAnswere.findIndex(item => item === true);
    // if (num === -1) {
    //   alertify.error('گزینه ای انتخاب نکرده اید');
    //   return;
    // }
    props.selectAnswere(
      props.test[0].fkQuizResultLogMaster,
      props.test[0].pkTestMaster,
      num !== -1 ? num + 1 : null,
    );
    setSelectAnswere([false, false, false, false]);
    props.changeAnswere(
      props.test[0].pkQuizDetail,
      props.test[0].fkQuizResultLogMaster,
      action,
    );
  };
  // if (props.test && props.test[0].message) {
  //   alertify.error(this.props.loadTestMasterQuizStudent.showMessageToUser);
  // }
  const [qusComponent, setqusComponent] = useState(null);
  const [ans1Component, setans1Component] = useState(null);
  const [ans2Component, setans2Component] = useState(null);
  const [ans3Component, setans3Component] = useState(null);
  const [ans4Component, setans4Component] = useState(null);
  useEffect(() => {
    if (
      props.test &&
      props.test[0].userAnswer !== null &&
      props.test[0].message !== 'Failed'
    ) {
      selectAnswereHandler(props.test[0].userAnswer);
    }
    if (props.test && props.test[0].message !== 'Failed') {
      setqusComponent(parse(props.test[0].questionName));
      setans1Component(parse(props.test[0].answer1));
      setans2Component(parse(props.test[0].answer2));
      setans3Component(parse(props.test[0].answer3));
      setans4Component(parse(props.test[0].answer4));
    }
    console.log(props.test[0].message);
  }, [props.test]);

  return (
    <div className="container border bg-white px-0 px-md-1 position-relative">
      <Card className="test_pre_custom_bg">
        {props.test &&
        props.test[0].message !== 'Failed' &&
        props.showResult2 === false ? (
          // {/* Test Num */}
          <>
            {props.test ? (
              <Label
                className="row mt-3 px-5 mr-2"
                style={{ fontSize: '0.9rem' }}
              >
                تست شماره {props.test[0].rowNumber} از {props.test[0].allTest}
              </Label>
            ) : null}
            {/* <Tooltip title={<span> اولین تست</span>} arrow>
              <LastPageIcon
                onClick={props.disablePrev ? '' : props.selectedTestPrev}
                className="btn-preview btn-preview-next"
                style={
                  props.disablePrev
                    ? { color: 'gray', cursor: 'default', right: '-75px' }
                    : { color: 'black', cursor: 'pointer', right: '-75px' }
                }
              />
            </Tooltip>
            <Tooltip title={<span>تست قبلی</span>} arrow>
              <NavigateNextIcon
                onClick={props.disablePrev ? '' : props.selectedTestPrev}
                className="btn-preview btn-preview-next"
                style={
                  props.disablePrev
                    ? { color: 'gray', cursor: 'default' }
                    : { color: 'black', cursor: 'pointer' }
                }
              />
            </Tooltip>
            <Tooltip title={<span>تست بعدی</span>} arrow>
              <NavigateBeforeIcon
                onClick={props.disableNext ? '' : props.selectedTestNext}
                className="btn-preview btn-preview-prev"
                style={
                  props.disableNext
                    ? { color: 'gray', cursor: 'default' }
                    : { color: 'black', cursor: 'pointer' }
                }
              />
            </Tooltip>
            <Tooltip title={<span> آخرین تست</span>} arrow>
              <FirstPageIcon
                onClick={props.disableNext ? '' : props.selectedTestNext}
                className="btn-preview btn-preview-prev"
                style={
                  props.disableNext
                    ? { color: 'gray', cursor: 'default', left: '-35px' }
                    : { color: 'black', cursor: 'pointer', left: '-35px' }
                }
              />
            </Tooltip> */}
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
                      qusComponent
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
                  onClick={() => selectAnswereHandler(1)}
                  style={{ animation: animations.fadeIn }}
                  suppressContentEditableWarning={true}
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
                        ans1Component
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
                  onClick={() => selectAnswereHandler(2)}
                  style={{ animation: animations.fadeIn }}
                  suppressContentEditableWarning={true}
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
                        ans2Component
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
                  onClick={() => selectAnswereHandler(3)}
                  style={{ animation: animations.fadeIn }}
                  suppressContentEditableWarning={true}
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
                        ans3Component
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
                  }`}
                  onClick={() => selectAnswereHandler(4)}
                  style={{ animation: animations.fadeIn }}
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
                        ans4Component
                      ) : (
                        <p></p>
                      )
                    ) : (
                      <p></p>
                    )}
                  </>
                </CardSubtitle>
              </div>
              <Row
                className="col-12 mt-3 pr-5"
                key={props.test ? props.test[0].trueAnswer : props.test}
              >
                <Col className="d-flex flex-wrap mt-2 align-items-center">
                  <MainButton
                    iconResting={
                      <Tooltip
                        title={
                          <span style={{ fontSize: '12px' }}>تست قبلی</span>
                        }
                      >
                        <span
                          className="d-flex justify-content-center align-items-center"
                          style={{ width: '35px', height: '35px' }}
                        >
                          <Next
                            style={{
                              fontSize: 20,
                              transform: 'rotate(180deg)',
                            }}
                          />{' '}
                        </span>
                      </Tooltip>
                    }
                    backgroundColor="black"
                    // onClick={() => setIsOpen(!isOpen)}
                    size={56}
                    style={{ transition: '0.3s' }}
                    className="btn-outline-light ml-3 mt-2"
                    onClick={e =>
                      props.test && props.test[0].rowNumber === 1
                        ? alertify.error('تست قبلی وجود ندارد')
                        : submitAnswere(e, 3)
                    }
                    disabled={props.test[0].rowNumber === 1 ? true : false}
                  />
                  {props.test[0].rowNumber === props.test[0].allTest ? (
                    <Button
                      className=" col-lg-2 col-md-5 col-sm-12 mt-2 mr-auto"
                      color="outline-secondary"
                      onClick={e => {
                        submitAnswere(e, 4);
                        props.getDetailResult(
                          props.test[0].fkQuizResultLogMaster,
                        );
                      }}
                    >
                      اعلام نتیجه
                    </Button>
                  ) : (
                    <MainButton
                      iconResting={
                        <Tooltip
                          title={
                            <span style={{ fontSize: '12px' }}>تست بعدی</span>
                          }
                        >
                          <span
                            className="d-flex justify-content-center align-items-center"
                            style={{ width: '35px', height: '35px' }}
                          >
                            <Next style={{ fontSize: 20 }} />
                          </span>
                        </Tooltip>
                      }
                      backgroundColor="black"
                      onClick={e => submitAnswere(e, 4)}
                      // onClick={e =>  submitAnswere(e, 4, rSelected)}
                      size={56}
                      className="btn-outline-light mt-2 mr-auto"
                    />
                  )}
                </Col>
              </Row>
            </CardBody>
          </>
        ) : // (
        //   <CardBody
        //     className={`d-flex flex-wrap${classWrapper} pt-4 pb-5`}
        //     //   key={id !== -1 ? props.selectedTest : id}
        //   >
        //     <div className={` ${classQuestion} d-flex flex-column p-3`}>
        //       {props.quizDetailResult !== undefined &&
        //       props.showResult2 === true ? (
        //         <>
        //           {' '}
        //           <h3 className="pb-3">نتیجه </h3>
        //           <Table className="text-center my-5" hover>
        //             <thead>
        //               <tr>
        //                 <th>شماره تست</th>
        //                 <th>گزینه انتخاب شده</th>
        //                 <th>گزینه صحیح</th>
        //                 <th>وضعیت</th>
        //               </tr>
        //             </thead>
        //             <tbody>
        //               {props.quizDetailResult.map((item, i) => {
        //                 return (
        //                   <tr
        //                     key={i}
        //                     className="cursor-pointer"
        //                     onClick={() => props.goViewTest(item.fkTestMaster)}
        //                   >
        //                     {/* <td>{item.fldRowNumber}</td> */}
        //                     <td>{i + 1}</td>
        //                     <td>{item.testAnswer}</td>
        //                     <td>{item.trueAnswer}</td>
        //                     <td>
        //                       {item.statusAnswer === 1 ? (
        //                         <DoneIcon style={{ color: 'green' }} />
        //                       ) : item.statusAnswer === 2 ? (
        //                         <ClearIcon style={{ color: 'red' }} />
        //                       ) : (
        //                         <NotAnswere style={{ color: 'gray' }} />
        //                       )}
        //                     </td>
        //                   </tr>
        //                 );
        //               })}
        //             </tbody>
        //           </Table>
        //           <div className="btn-result-wrapper d-flex flex-wrap">
        //             <div
        //               className="btn btn-outline-secondary btn-sm ml-3 mt-3 col-lg-2 col-md-6 col-sm-12"
        //               style={{ cursor: 'pointer' }}
        //               onClick={props.getResult}
        //             >
        //               مشاهده گزارش کل
        //             </div>
        //             <div
        //               className="btn btn-outline-primary btn-sm ml-3 mt-3 col-lg-2 col-md-6 col-sm-12"
        //               style={{ cursor: 'pointer' }}
        //               onClick={props.goBack}
        //             >
        //               بازگشت به داشبورد
        //             </div>
        //           </div>
        //         </>
        //       ) : (
        //         ''
        //       )}
        //     </div>
        //   </CardBody>
        // )
        null}
      </Card>
    </div>
  );
}

export default TestStyle;
