import React, { Component } from 'react';
import Page from 'components/Page';
import { connect } from 'react-redux';
import { apiActionsStudent } from '../../_actions';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import NotAnswere from '@material-ui/icons/PriorityHigh';
import { Row, Col, Card, CardBody, Table } from 'reactstrap';

class QuizResult extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props.location.state);
    if (this.props.location.state) {
      this.props.dispatch(
        apiActionsStudent.quizResultDetail(this.props.location.state),
      );
    }
  }
  goViewTest = MasterId => {
    const data = {
      // goBack: this.props.history.goBack,
      cameFromQuiz: true,
      MasterId: MasterId,
      ChapterId: 0,
      Action: 5,
      name: 'تست',
    };
    this.props.history.push({
      pathname: `/study/تست`,
      state: data,
    });
  };
  componentWillUnmount() {
    window.scrollTo(0, 0);
    // this.props.dispatch(apiActionsStudent.quizResultDetail(null));
  }

  render() {
    return (
      <Page className="NewTestPage" title={` نتیجه آزمون `}>
        <Row className="d-flex justify-content-center align-items-center">
          <Col sm={10} md={12}>
            <div className="container border bg-white px-0 px-md-1 position-relative">
              <Card className="test_pre_custom_bg">
                <CardBody
                  className={`d-flex flex-wrap pt-4 pb-5`}
                  //   key={id !== -1 ? props.selectedTest : id}
                >
                  <div className={`col-12 d-flex flex-column p-3`}>
                    {this.props.quizDetailResult &&
                    this.props.quizDetailResult !== undefined ? (
                      <>
                        {' '}
                        <h3 className="pb-3">نتیجه </h3>
                        <Table className="text-center my-5" hover>
                          <thead>
                            <tr>
                              <th>شماره تست</th>
                              <th>گزینه انتخاب شده</th>
                              <th>گزینه صحیح</th>
                              <th>وضعیت</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.quizDetailResult.map((item, i) => {
                              return (
                                <tr
                                  key={i}
                                  className="cursor-pointer"
                                  onClick={() =>
                                    this.goViewTest(item.fkTestMaster)
                                  }
                                >
                                  {/* <td>{item.fldRowNumber}</td> */}
                                  <td>{i + 1}</td>
                                  <td>{item.testAnswer}</td>
                                  <td>{item.trueAnswer}</td>
                                  <td>
                                    {item.statusAnswer === 1 ? (
                                      <DoneIcon style={{ color: 'green' }} />
                                    ) : item.statusAnswer === 2 ? (
                                      <ClearIcon style={{ color: 'red' }} />
                                    ) : (
                                      <NotAnswere style={{ color: 'gray' }} />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        <div className="btn-result-wrapper d-flex flex-wrap">
                          <div
                            className="btn btn-outline-secondary btn-sm ml-3 mt-3 col-lg-2 col-md-6 col-sm-12"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              this.props.history.push({
                                pathname: `/quiz-result-detailes`,
                                state: this.props.location.state,
                              })
                            }
                          >
                            مشاهده گزارش کل
                          </div>
                          <div
                            className="btn btn-outline-primary btn-sm ml-3 mt-3 col-lg-2 col-md-6 col-sm-12"
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
    quizDetailResult: state.apiStudent.quizDetailResult,
  };
}

export default connect(mapStateToProps)(QuizResult);
