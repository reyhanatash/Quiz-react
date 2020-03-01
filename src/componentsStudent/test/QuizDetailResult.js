import React, { Component } from 'react';
import Page from 'components/Page';
import { connect } from 'react-redux';
import { apiActionsStudent } from '../../_actions';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import NumberedIcon from '@material-ui/icons/FormatListNumberedRtl';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { Chart } from 'react-google-charts';

class QuizDetailResult extends Component {
  state = {
    data: [['تاریخ', 'درصد']],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.location.state) {
      this.props.dispatch(
        apiActionsStudent.quizResult(this.props.location.state),
      );
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.quizResult !== this.props.quizResult) {
      this.props.dispatch(
        apiActionsStudent.loadReportPerQuiz(
          this.props.quizResult[0].fldFkMasterQuiz,
        ),
      );
    }
  }
  componentWillUnmount() {
    window.scrollTo(0, 0);
    this.props.dispatch(apiActionsStudent.quizResult(null));
  }

  render() {
    if (this.props.loadReportQuiz) {
      this.props.loadReportQuiz.forEach(report => {
        this.state.data.push([
          report.dateShamsi,
          report.percentageTrueAnswerReal,
        ]);
      });
    }

    return (
      <Page
        className="NewTestPage"
        title={` گزارش کل آزمون  ${
          this.props.quizResult &&
          this.props.quizResult[0].fldRandomeStatus === 0
            ? this.props.quizResult[0].quizName
            : 'تصادفی'
        }`}
      >
        <Row className="d-flex justify-content-center align-items-center">
          <Col sm={10} md={12}>
            <div className="container border bg-white px-0 px-md-1 position-relative">
              <Card className="test_pre_custom_bg">
                <CardBody
                  className={`d-flex flex-wrap pt-4 pb-5`}
                  //   key={id !== -1 ? props.selectedTest : id}
                >
                  <div className={`d-flex flex-column p-3 col-12`}>
                    {this.props.quizResult !== undefined ? (
                      <>
                        {' '}
                        <h3 className="pb-3">گزارش کل </h3>
                        <div className="quiz-result-wrapper d-flex flex-wrap justify-content-around quiz-box-shadow my-2 bg-white">
                          {/* First */}
                          <div className="quiz-result-box col-lg-3 col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center bg-white py-2 rounded border-bottom">
                            <span
                              className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                              style={{
                                width: '40px',
                                height: '39px',
                                backgroundColor: 'rgb(253,223,223)',
                                color: 'rgb(241,43 ,44)',
                              }}
                            >
                              <QuestionAnswerIcon />
                            </span>
                            <span
                              style={{
                                fontSize: '15.5px',
                                color: 'rgb(88, 87, 87)',
                              }}
                              className="py-3"
                            >
                              آزمون{' '}
                            </span>
                            <span className="h5 font-weight-bold">
                              {this.props.quizResult[0].fldRandomeStatus === 0
                                ? this.props.quizResult[0].quizName
                                : 'تصادفی'}
                            </span>
                          </div>
                          {/* Second */}
                          <div className="quiz-result-box col-lg-3 col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center py-2 rounded bg-light border-bottom">
                            <span
                              className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                              style={{
                                width: '40px',
                                height: '39px',
                                backgroundColor: 'rgb(255,246,217)',
                                color: 'rgb(217,188 ,1)',
                              }}
                            >
                              <NumberedIcon />
                            </span>
                            <span
                              style={{
                                fontSize: '15.5px',
                                color: 'rgb(88, 87, 87)',
                              }}
                              className="py-3 "
                            >
                              تعداد کل تست ها
                            </span>{' '}
                            <span className="h5 font-weight-bold">
                              {this.props.quizResult[0].fldTotalQuestion}
                            </span>
                          </div>
                          {/* Third */}
                          <div className="quiz-result-box col-lg-3 col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center bg-white py-2 rounded border-bottom">
                            <span
                              className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                              style={{
                                width: '40px',
                                height: '39px',
                                backgroundColor: 'rgb(235,249,234)',
                                color: 'rgb(52,198 ,53)',
                              }}
                            >
                              <CalendarTodayIcon />
                            </span>
                            <span
                              style={{
                                fontSize: '15.5px',
                                color: 'rgb(88, 87, 87)',
                              }}
                              className="py-3"
                            >
                              تاریخ{' '}
                            </span>{' '}
                            <span className=" h5 font-weight-bold">
                              {
                                this.props.quizResult[0].dateShamsi.split(
                                  ' ',
                                )[0]
                              }
                            </span>
                          </div>
                          {/* Forth */}
                          <div className="quiz-result-box col-lg-3 col-md-6 col-sm-12 d-flex flex-column align-items-center justify-content-center py-2 rounded bg-light border-bottom">
                            <span
                              className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                              style={{
                                width: '40px',
                                height: '39px',
                                backgroundColor: 'rgb(229,243,254)',
                                color: 'rgb(0,136 ,255)',
                              }}
                            >
                              <WatchLaterIcon />
                            </span>
                            <span
                              style={{
                                fontSize: '15.5px',
                                color: 'rgb(88, 87, 87)',
                              }}
                              className="py-3"
                            >
                              مدت زمان{' '}
                            </span>
                            <span className=" h5 font-weight-bold">
                              {this.props.quizResult[0].finalQuizTime}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap quiz-box-shadow my-5 bg-white">
                          <Table striped className="text-center">
                            <thead>
                              <tr>
                                <th className="table-light">#</th>
                                <th className="table-success">زمان واقعی</th>
                                <th className="table-warning">زمان اضافی</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.props.quizResult.map(item => {
                                return (
                                  <>
                                    <tr key={'row1'} className="">
                                      <th scope="row">تست های درست</th>
                                      <td>{item.fldCountTrueAnswerReal}</td>
                                      <td>{item.fldCountTrueAnswerOverTime}</td>
                                    </tr>
                                    <tr key={'row2'} className="">
                                      <th scope="row">تست های غلط</th>
                                      <td>{item.fldCountFalseAnswerReal}</td>
                                      <td>
                                        {item.fldCountFalseAnswerOverTime}
                                      </td>
                                    </tr>
                                    <tr key={'row3'} className="">
                                      <th scope="row">تست های نزده</th>
                                      <td>{item.fldCountNotAnswerReal}</td>
                                      <td>{item.fldCountNotAnswerOverTime}</td>
                                    </tr>
                                    <tr key={'row4'} className="">
                                      <th scope="row">نتیجه</th>
                                      <td className="direction-left">
                                        {item.fldPercentageTrueAnswerReal}%
                                      </td>
                                      <td className="direction-left">
                                        {item.fldPercentageTrueAnswerOverTime}%
                                      </td>
                                    </tr>
                                    <tr key={'row5'} className="table-active">
                                      <th scope="row"> نتیجه نهایی</th>
                                      <td className="text-primary font-weight-bold direction-left">
                                        {item.finalPrecentTrue}%
                                      </td>
                                      <td></td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </Table>
                        </div>
                        <div
                          className="btn-result-wrapper d-flex flex-column my-5 py-3 w-100"
                          style={{
                            width: '400px',
                            height: '400px',
                          }}
                        >
                          <span className="h5">آمار کلی</span>
                          <div className={'w-100 my-pretty-chart-container'}>
                            <Chart
                              height={'400px'}
                              chartType="LineChart"
                              loader={<div>درحال بارگذاری چارت</div>}
                              data={this.state.data}
                              options={{
                                hAxis: {
                                  title: 'تاریخ',
                                },
                                vAxis: {
                                  title: 'درصد آزمون در زمان واقعی',
                                },
                                tooltip: { isHtml: true, trigger: 'visible' },
                              }}
                              rootProps={{ 'data-testid': '1' }}
                            />
                          </div>
                        </div>
                        <div className="btn-result-wrapper d-flex flex-column flex-wrap">
                          <div
                            className="btn btn-outline-primary btn-sm ml-3 mt-3 col-lg-2 col-md-4 col-sm-12"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              this.props.history.push('/dashboard')
                            }
                          >
                            بازگشت به داشبورد
                          </div>
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizResult: state.apiStudent.quizResult,
    loadReportQuiz: state.apiStudent.loadReportQuiz,
  };
}
export default connect(mapStateToProps)(QuizDetailResult);
