import React from 'react';
import Page from 'components/Page';
import { Col, Row, Button } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardPageTable from 'componentsStudent/dashboard/DashboardStudentTable';
import DashboardStudentModal from 'componentsStudent/dashboard/DashboardStudentModal';
import { apiActionsStudent } from '../../_actions';
import { apiActions } from '../../_actions';
import { connect } from 'react-redux';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
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
    const { dispatch } = this.props;
    dispatch(apiActionsStudent.getDashboard());
    console.log(this.props);
  }

  // Toogle Modal
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.props.dispatch(apiActions.getDashboard());
  };

  getTableData = id => {
    const data = this.props.getDashboard.find(filter => {
      return filter.fldPkTestBook === id;
    });
    setTimeout(() => {
      this.props.dispatch(apiActions.selectedItem(data));
      this.setState({ isEditing: true });
      this.toggle();
    }, 10);
  };
  // Open Quiz Modal
  openQuizModal = (name, id, modalRole) => {
    this.setState({ modalRole });
    const data = this.props.getDashboard.find(filter => {
      return filter.fldPkTestBook === id;
    });
    this.setState({ TestBookId: data.fldPkTestBook });
    this.props.dispatch(apiActionsStudent.loadQuizStudent(data.fldPkTestBook));
    this.toggle();
  };
  // Open Study Modal
  openStudyModal = (name, id, modalRole) => {
    this.setState({ modalRole });
    const data = this.props.getDashboard.find(filter => {
      return filter.fldPkTestBook === id;
    });
    this.props.dispatch(
      apiActionsStudent.loadTestBookChapterStudent(data.fldPkTestBook),
    );
    this.toggle();
  };
  // Go TO Test Page
  goToStartTest = data => {
    // this.props.dispatch(apiActionsStudent.LoadStartQuiz(data.QuizId));
    this.props.history.push({
      pathname: `/new-test/${data.name}`,
      state: data,
    });
  };
  // GO To Quiz Page
  goToQuizPage = data => {
    // this.props.dispatch(apiActionsStudent.LoadStartQuiz(data.QuizId));
    this.props.history.push({
      pathname: `/load-quiz/${data.name}`,
      state: data,
    });
  };
  // Go TO Study Page
  goToStudyPage = data => {
    this.props.history.push({
      pathname: `/study/${data.name}`,
      state: data,
    });
  };

  // Go TO Test Book Details Page
  goToDetailsPage = data => {
    this.props.history.push({
      pathname: `/test-book-details/${data.name}`,
      state: data,
    });
  };

  // Clear
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActionsStudent.getDashboard(0));
  }
  render() {
    return (
      <Page className="DashboardPage" title="داشبورد">
        <Row>
          <Col>
            <div className="d-flex flex-column justify-content-start align-items-start">
              {/* Modal */}
              <DashboardStudentModal
                isOpen={this.state.modal}
                toggle={this.toggle}
                loadTestBookChapter={this.props.loadTestBookChapter}
                modalRole={this.state.modalRole}
                loadQuiz={this.props.loadQuiz}
                goToStartTest={this.goToStartTest}
                goToStudyPage={this.goToStudyPage}
                TestBookId={this.state.TestBookId}
              />
              {/* Button */}
              {/* Table */}
              <Col sm={11} md={12}>
                <DashboardPageTable
                  key={this.props.getDashboard}
                  newdata={this.props.getDashboard}
                  openQuizModal={this.openQuizModal}
                  openStudyModal={this.openStudyModal}
                  changeModalRole={this.changeModalRole}
                  goToDetailsPage={this.goToDetailsPage}
                  goToQuizPage={this.goToQuizPage}
                />
              </Col>
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    getDashboard: state.apiStudent.dashboard,
    loadTestBookChapter: state.apiStudent.loadTestBookChapter,
    loadQuiz: state.apiStudent.QuizStudent,
  };
}
export default connect(mapStateToProps)(DashboardPage);
