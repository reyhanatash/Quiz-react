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
import { allConstantsStudent } from '../../_constants';
import parse from 'html-react-parser';
import { animations } from 'react-animation';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function TestStyle(props) {
  useEffect(() => {
    props.dispatch(
      apiActionsStudent.loadTestMasterStudent(props.location.state.id, 0, 5),
    );
    setfileLoaded(false);
  }, []);
  let classWrapper = '';
  let classQuestion = '';
  let classAnswerWrapper = '';
  let classAnswers = '';
  const [styleNum, setstyleNum] = useState(0);
  const [fileLoaded, setfileLoaded] = useState(false);
  useEffect(() => {
    if (props.test) {
      setstyleNum(props.test[0].template);
      props.dispatch(
        apiActionsStudent.loadMediaStudy(props.test[0].pkTestMaster),
      );
    }
  }, [props.test]);
  useEffect(() => {
    if (props.Media) {
      props.dispatch({ type: allConstantsStudent.LOAD_FILE, data: null });
      props.Media.forEach(media => {
        props.dispatch(apiActionsStudent.loadFile(media.mediaAddress));
      });
    }
  }, [props.Media]);
  if (styleNum === 1) {
    classWrapper = ' flex-column ';
    classQuestion = ' col-12';
    classAnswerWrapper = ' col-12';
    classAnswers = ' col-lg-2';
  } else if (styleNum === 2) {
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

  return (
    <Page className="TestPage">
      <div className="container border bg-white px-0 px-md-1 position-relativer rounded">
        <Card className="test_pre_custom_bg">
          {props.test ? (
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <FormGroup>
                <Label
                  className="row mt-3 px-5 mr-2 d-flex align-items-center"
                  style={{ fontSize: '0.9rem' }}
                >
                  <span style={{ paddingTop: '5px' }}>
                    تست شماره{' '}
                    {props.location.state ? props.location.state.rowNumber : ''}
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
                className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title card-answere-student d-flex flex-wrap`}
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
                className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title card-answere-student d-flex flex-wrap`}
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
                className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title card-answere-student d-flex flex-wrap `}
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
                className={`${classAnswers} col-md-12  col-sm-12 card_test_pre_sub_title card-answere-student d-flex flex-wrap `}
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
            <Row
              className="col-12 mt-3 pr-5"
              style={{ display: 'flex', opacity: '1', transition: '0.4s' }}
            >
              <Col className="d-flex flex-wrap mt-2 align-items-center px-4">
                {' '}
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    expandIcon={<ExpandMoreIcon className="text-dark" />}
                    onClick={() => setfileLoaded(!fileLoaded)}
                  >
                    <span className="py-2">فایل پاسخنامه</span>
                  </ExpansionPanelSummary>
                  {/* </Tooltip> */}
                  <ExpansionPanelDetails
                    key={fileLoaded}
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
            <Row className="col-12 my-4 pr-5">
              <Col className="d-flex flex-wrap mt-2 align-items-center px-4">
                <Button
                  className=" col-lg-2 col-md-6 col-sm-12 my-3 ml-auto"
                  color="outline-secondary"
                  onClick={() => {
                    props.history.goBack();
                  }}
                >
                  بازگشت
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </Page>
  );
}

function mapStateToProps(state) {
  return {
    test: state.apiStudent.loadTestMaster,
    Media: state.apiStudent.loadMediaStudy,
    loadFile: state.apiStudent.loadFile,
  };
}

export default connect(mapStateToProps)(TestStyle);
