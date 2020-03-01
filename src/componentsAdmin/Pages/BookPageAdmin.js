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
                newdata={this.props.userBooks}
                openStudyModal={this.openStudyModal}
                goToBookPage={this.goToBookPage}
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
    userBooks: state.apiAdmin.userBooks,
  };
}
export default connect(mapStateToProps)(BookPage);
