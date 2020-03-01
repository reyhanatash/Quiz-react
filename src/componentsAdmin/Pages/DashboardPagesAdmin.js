import React from 'react';
import Page from 'components/Page';
import { Col, Row, Button } from 'reactstrap';
import { apiActionsAdmin } from '../../_actions';
import { connect } from 'react-redux';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
class DashboardPage extends React.Component {
  state = {
    modal: false,
    books: [],
    TestBookId: null,
    isEditing: false,
    modalRole: null,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props);
    this.props.dispatch(apiActionsAdmin.getDashboard());
  }
  // Go TO Test Page
  goToUsers = data => {
    this.props.history.push({
      pathname: `/users`,
      state: data,
    });
  };
  // Go TO Book Page
  goToBookPage = () => {
    this.props.history.push('/books');
  };

  // Clear
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActionsAdmin.getDashboard(0));
  }
  render() {
    return (
      <Page className="DashboardPage" title="داشبورد">
        <Row>
          <Col>
            <div
              className="col-12 d-flex flex-wrap justify-content-center align-items-center dashboard-admin-container"
              style={{ height: '60vh' }}
            >
              <div
                className="col-lg-3 col-md-6 col-sm-12 bg-light dashboard-admin-Box quiz-box-shadow m-4 rounded cursor-pointer"
                onClick={this.goToBookPage}
              >
                <div className="d-flex flex-column align-items-center justify-content-center py-2 rounded bg-light border-bottom">
                  <span
                    className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                    style={{
                      width: '40px',
                      height: '39px',
                    }}
                  >
                    <LibraryBooksIcon />
                  </span>
                  <span className="py-3">کتاب ها</span>
                  <span className="h5 font-weight-bold">
                    {this.props.getDashboard
                      ? this.props.getDashboard[0].countAllTestBook
                      : 0}
                  </span>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 bg-light dashboard-admin-Box quiz-box-shadow m-4 rounded cursor-pointer"
                onClick={() => this.goToUsers(2)}
              >
                <div className="d-flex flex-column align-items-center justify-content-center py-2 rounded bg-light border-bottom">
                  <span
                    className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                    style={{
                      width: '40px',
                      height: '39px',
                    }}
                  >
                    <SupervisedUserCircleIcon />
                  </span>
                  <span className="py-3 ">طراحان</span>
                  <span className="h5 font-weight-bold">
                    {this.props.getDashboard
                      ? this.props.getDashboard[0].countAllTeacher
                      : 0}
                  </span>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 bg-light dashboard-admin-Box quiz-box-shadow m-4 rounded cursor-pointer"
                onClick={() => this.goToUsers(3)}
              >
                <div className="d-flex flex-column align-items-center justify-content-center py-2 rounded bg-light border-bottom">
                  <span
                    className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                    style={{
                      width: '40px',
                      height: '39px',
                    }}
                  >
                    <PeopleIcon />
                  </span>
                  <span className="py-3">کاربران</span>
                  <span className="h5 font-weight-bold">
                    {this.props.getDashboard
                      ? this.props.getDashboard[0].countAllTeacher
                      : 0}
                  </span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 bg-light dashboard-admin-Box quiz-box-shadow m-4 rounded cursor-pointer">
                <div className="d-flex flex-column align-items-center justify-content-center py-2 rounded bg-light border-bottom">
                  <span
                    className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                    style={{
                      width: '40px',
                      height: '39px',
                    }}
                  >
                    <LibraryAddIcon />
                  </span>
                  <span className="py-3">کتاب های آماده انتشار</span>
                  <span className="h5 font-weight-bold">
                    {this.props.getDashboard
                      ? this.props.getDashboard[0].countPublishTestBook
                      : 0}
                  </span>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 bg-light dashboard-admin-Box quiz-box-shadow mx-4 my-2">
                <div className="d-flex flex-column align-items-center justify-content-center py-2 rounded bg-light border-bottom cursor-pointer">
                  <span
                    className="d-flex flex-column justify-content-center align-items-center rounded-circle"
                    style={{
                      width: '40px',
                      height: '39px',
                    }}
                  >
                    <MonetizationOnIcon />
                  </span>
                  <span className="py-3">کتاب های فروخته شده</span>
                  <span className="h5 font-weight-bold">
                    {this.props.getDashboard
                      ? this.props.getDashboard[0].countSoldTestBook
                      : 0}
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    getDashboard: state.apiAdmin.dashboard,
    loadTestBookChapter: state.apiAdmin.loadTestBookChapter,
    loadQuiz: state.apiAdmin.QuizStudent,
  };
}
export default connect(mapStateToProps)(DashboardPage);
