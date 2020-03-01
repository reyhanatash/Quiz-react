import Page from 'components/Page';
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import { apiActionsStudent } from '../../_actions';
import TestStyle from '../test/TestStyle';
import QuizDetailResult from '../test/QuizDetailResult';
import QuizResult from '../test/QuizResult';
import alertify from 'alertifyjs';
import CountdownTimer from 'react-component-countdown-timer';
import 'react-component-countdown-timer/lib/styles.css';
import 'react-component-countdown-timer/lib/styles.scss';

class TestPageStudent extends React.Component {
  state = {
    dropdownOpen: false,
    time: 0,
    extraTime: 0,
    flagExtraTime: false,
    intervalId: null,
    currentTime: '',
    showResult: false,
    showResult2: false,
    fkQuizResultLogMaster: null,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(
      apiActionsStudent.selectedTest(this.props.location.state),
    );
    if (this.props.location.state) {
      const time = this.props.location.state.duration.split(':');
      const hour = Number(time[0]);
      const min = Number(time[1]);
      const converted = hour * 60 * 60 + min * 60;
      this.setState({ time: converted, extraTime: converted });
    }
    console.log(this.props.location.state);
    this.props.dispatch(
      apiActionsStudent.LoadStartQuiz(
        this.props.location.state.QuizId,
        this.props.location.state.isRandom,
        this.props.location.state.TestBookId,
      ),
    );
    // this.props.dispatch(apiActionsStudent.testAnswere(2235, 2));
    // SetInterval
    const intervalId = setInterval(this.timer, 1000);
    this.setState({ intervalId: intervalId });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.loadfirstTestStudent &&
      this.props.loadfirstTestStudent[0] &&
      prevProps.loadfirstTestStudent !== this.props.loadfirstTestStudent
    ) {
      this.props.dispatch(
        apiActionsStudent.navigateQuiz(
          this.props.loadfirstTestStudent[0].pkQuizDetail,
          this.props.loadfirstTestStudent[0].fkQuizResultLogMaster,
          1,
          this.props.location.state.isRandom,
        ),
      );
    }
  }
  // SetInterval
  timer = () => {
    if (
      this.countDownRef.current.state.count > 0 &&
      this.state.flagExtraTime === false
    ) {
      this.convertHMS(
        this.state.time + 1 - this.countDownRef.current.state.count,
      );
    } else if (this.countDownRef.current.state.count <= 0) {
      this.setState({
        extraTime: this.state.extraTime + 1,
        flagExtraTime: true,
      });
      this.convertHMS(this.state.extraTime);
    }
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  };
  selectAnswere = (LogId, TestMasterId, Answer) => {
    this.props.dispatch(
      apiActionsStudent.QuizAnswerForStudent(
        LogId,
        this.props.location.state.QuizId,
        TestMasterId,
        Answer,
        this.state.currentTime,
      ),
    );
  };
  changeAnswere = (QuizDetailid, QuizLogId, Action) => {
    if (this.props.loadTestMasterQuizStudent.message === 'Faild') {
      alertify.error(this.props.loadTestMasterQuizStudent.showMessageToUser);
    }
    this.props.dispatch(
      apiActionsStudent.navigateQuiz(
        QuizDetailid,
        QuizLogId,
        Action,
        this.props.location.state.isRandom,
      ),
    );
  };

  getDetailResult = fkQuizResultLogMaster => {
    this.setState({ fkQuizResultLogMaster, showResult2: true });
    this.props.history.push({
      pathname: `/quiz-result`,
      state: fkQuizResultLogMaster,
    });
  };

  componentWillUnmount() {
    window.scrollTo(0, 0);
    this.props.dispatch(apiActionsStudent.selectedTest(null));
    this.props.dispatch(apiActionsStudent.navigateQuiz(null, null, null, null));
    this.props.dispatch(apiActionsStudent.testAnswere(null));
    clearInterval(this.state.intervalId);
  }
  countDownRef = React.createRef();
  convertHMS = value => {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    // console.log(hours + ':' + minutes + ':' + seconds);
    this.setState({ currentTime: hours + ':' + minutes + ':' + seconds });
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
  };
  render() {
    // console.log(this.props.quizResult);
    return (
      <Page
        className="NewTestPage"
        title={` تست های آزمون  ${this.props.location.state.name}`}
      >
        <Row className="d-flex justify-content-center align-items-center">
          <Col
            sm={10}
            md={12}
            style={
              this.props.loadTestMasterQuizStudent &&
              this.props.loadTestMasterQuizStudent.length > 0 &&
              this.props.loadTestMasterQuizStudent[0].rowNumber <=
                this.props.loadTestMasterQuizStudent[0].allTest
                ? {}
                : { display: 'none' }
            }
          >
            <div className="container border bg-white px-4 px-md-1 position-relative bg-white py-3 mb-2 d-flex align-items-center justify-content-around flex-wrap">
              <div className="col-sm-12 col-lg-6 pr-5 d-flex align-items-center">
                <span className="text-muted">زمان باقی مانده</span>
                <div className="col-sm-6 col-md-8 col-lg-8">
                  <CountdownTimer
                    count={this.state.time}
                    size={20}
                    key={this.state.time}
                    border
                    showTitle
                    hideDay
                    responsive
                    hourTitle="ساعت"
                    secondTitle="ثانیه"
                    minuteTitle="دقیقه"
                    direction="right"
                    // backgroundColor="#C4161C"
                    onEnd={() => {
                      alertify.error(
                        'زمان آزمون به اتمام رسید , شما وارد وقت اضافه شدید !',
                      );
                    }}
                    ref={this.countDownRef}
                  />
                </div>
              </div>
              <div className="col-sm-12 col-lg-6 d-flex align-items-center">
                <span className="mx-4 text-muted">تعداد کل تست ها</span>
                <span className="h5 mb-0">
                  {this.props.loadTestMasterQuizStudent &&
                  this.props.loadTestMasterQuizStudent[0] &&
                  this.props.loadTestMasterQuizStudent !== undefined
                    ? this.props.loadTestMasterQuizStudent[0].allTest
                    : ''}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Col sm={10} md={12}>
            {this.props.loadTestMasterQuizStudent &&
            this.props.loadTestMasterQuizStudent !== undefined &&
            this.props.loadTestMasterQuizStudent.length > 0 &&
            this.state.showResult2 === false &&
            this.state.showResult === false ? (
              <TestStyle
                styleNum={
                  this.props.loadTestMasterQuizStudent
                    ? this.props.loadTestMasterQuizStudent[0].template
                    : 0
                }
                test={this.props.loadTestMasterQuizStudent}
                selectAnswere={this.selectAnswere}
                changeAnswere={this.changeAnswere}
                getDetailResult={this.getDetailResult}
                showResult2={this.state.showResult2}
              />
            ) : (
              <Col className="d-flex align-items-center w-100 mt-5">
                <p className="m-0">فاقد تست میباشد !</p>
                <div
                  className="btn btn-secondary btn-sm mr-3"
                  style={{ cursor: 'pointer' }}
                  onClick={this.props.history.goBack}
                >
                  بازگشت
                </div>
              </Col>
            )}
          </Col>
        </Row>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadfirstTestStudent: state.apiStudent.loadTestQuiz,
    loadTestMasterQuizStudent: state.apiStudent.loadTestNavigateQuiz,
    selectedTest: state.apiStudent.selectedTest,
  };
}
export default connect(mapStateToProps)(TestPageStudent);
