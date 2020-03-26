import React from 'react';
import Page from 'components/Page';
import { Col, Row, Button } from 'reactstrap';
import { apiActionsAdmin } from '../../_actions';
import { connect } from 'react-redux';
import UsersBooksTable from '../Users/UsersBooksTable';
import TeachersBooksTable from '../Teachers/TeachersBooksTable';

class BookPage extends React.Component {
  state = {
    modal: false,
    type: 0,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.location.state) {
      console.log(this.props.location.state);
      this.props.dispatch(
        apiActionsAdmin.loadBooksPerUser(this.props.location.state.data.id),
      );
      this.setState({ type: this.props.location.state.type });
    } else {
      this.props.dispatch(apiActionsAdmin.loadBooksPerUser(''));
    }
  }
  // Go TO Book Page
  goToBookPageUser = data => {
    // this.props.dispatch(apiActionsStudent.LoadStartQuiz(data.QuizId));
    this.props.history.push({
      pathname: `/new-test/${data.name}`,
      state: data,
    });
  };
  // Modal
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.props.dispatch(apiActionsAdmin.loadUsers(this.props.location.state));
  };
  toggleModalDetails = data => {
    let find;
    if (this.state.type === 2) {
      find = this.props.userBooks.find(item => item.fldPkTestBook === data.id);
    }
    if (this.state.type === 'booksReadyToPublish') {
      find = this.props.loadTestBooksReadyToPublish.find(
        item => item.fldPkTestBook === data.id,
      );
    }

    console.log(find);
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalData: find,
    }));
  };
  goToTestPage = data => {
    this.props.history.push({
      pathname: `/tests`,
      state: data,
    });
  };
  goToQuizPage = data => {
    this.props.history.push({
      pathname: `/quiz`,
      state: data,
    });
  };
  // Go TO Book Page
  goToBookPageUser = data => {
    // this.props.dispatch(apiActionsStudent.LoadStartQuiz(data.QuizId));
    this.props.history.push({
      pathname: `/new-test/${data.name}`,
      state: data,
    });
  };
  approveOrRejectTestBook = (id, status, comment, type) => {
    const IsApprove = status === 0 ? true : status === 1 ? false : null;
    this.props.dispatch(
      apiActionsAdmin.approveOrRejectTestBook(id, type, IsApprove, comment),
    );
    setTimeout(() => {
      if (this.props.location.state) {
        if (this.props.location.state) {
          this.props.dispatch(
            apiActionsAdmin.loadBooksPerUser(this.props.location.state.data.id),
          );
          this.setState({ type: this.props.location.state.type });
        } else {
          this.props.dispatch(apiActionsAdmin.loadBooksPerUser(''));
        }
      }
    }, 500);
  };
  // Clear
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActionsAdmin.loadBooksPerUser(0));
  }
  render() {
    return (
      <Page className="BookPage" title="کتاب ها">
        <Row>
          <Col>
            {this.state.type === 2 ? (
              <TeachersBooksTable
                key={this.props.users}
                title={'لیست کتاب طراح'}
                newdata={this.props.userBooks}
                // goToBookPage={this.goToBookPage}
                toggleModalDetails={this.toggleModalDetails}
                goToTestPage={this.goToTestPage}
                loadRejectTypes={this.props.loadRejectTypes}
                approveOrRejectTestBook={this.approveOrRejectTestBook}
                goToQuizPage={this.goToQuizPage}
              />
            ) : this.state.type === 3 ? (
              <UsersBooksTable
                key={this.props.users}
                newdata={this.props.userBooks}
                openStudyModal={this.openStudyModal}
                goToBookPageUser={this.goToBookPageUser}
              />
            ) : (
              <h2>اررور</h2>
            )}
          </Col>
        </Row>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadTestBooks: state.apiAdmin.loadTestBooks,
    userBooks: state.apiAdmin.userBooks,
    loadTestBooksReadyToPublish: state.apiAdmin.loadTestBooksReadyToPublish,
    loadRejectTypes: state.apiAdmin.loadRejectTypes,
  };
}
export default connect(mapStateToProps)(BookPage);
