import React from 'react';
import Page from 'components/Page';
import { MdAdd } from 'react-icons/md';
import { Col, Row, Button } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardPageTable from 'components/Dashboard/DashboardPageTable';
import DashboardPageModal from 'components/Dashboard/DashboardPageModal';
import DashboardPageSetting from 'components/Dashboard/DashboardPageSetting';
import { apiActions } from '../_actions';
import { connect } from 'react-redux';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import QuizIcon from '@material-ui/icons/Ballot';

class DashboardPage extends React.Component {
  state = {
    modal: false,
    modalSetting: false,
    books: [],
    isEditing: false,
    testBookSetting: {},
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const { dispatch } = this.props;
    dispatch(apiActions.getDashboard());
    dispatch(apiActions.loadGrade());
    dispatch(apiActions.loadMajor());
    dispatch(apiActions.loadAllBooks());
    dispatch(apiActions.selectedItem({ name: 'test' }));
  }
  // Toogle Modal
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.props.dispatch(apiActions.getDashboard());
  };
  // Toogle Setting
  toggleSetting = () => {
    this.setState(prevState => ({
      modalSetting: !prevState.modalSetting,
    }));
    this.props.dispatch(apiActions.getDashboard());
  };
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      isEditing: false,
    }));
  };

  // Add Book
  addBook = e => {
    e.preventDefault();
    const id = 2;
    const name = this.bookNameValue;
    const author = this.authorValue;
    const selectedField = Array.from(this.fieldSelectValue).filter(select => {
      return select.selected;
    });
    const field = selectedField[0].innerHTML;
    const selectedSection = Array.from(this.sectionSelectValue).filter(
      select => {
        return select.selected;
      },
    );
    const section = selectedSection[0].innerHTML;
    const sesstion = this.sesstionValue;
    const desc = this.descValue;
    const newbooks = [...this.state.books];
    newbooks.push({
      name,
      field,
      section,
      id,
      desc,
      sesstion,
      author,
    });
    // this.setState(prevState => {
    //   return { books: newbooks, modal: !prevState.modal };
    // });
    e.currentTarget.reset();
  };
  getBookModal = getBookModal => {
    const {
      id,
      BookName,
      Author,
      FkMajor,
      FkGrade,
      FkBook,
      numChapterTestBook,
      Description,
      Price,
    } = getBookModal;
    this.props.dispatch(
      apiActions.addBook(
        id,
        BookName,
        Author,
        FkMajor,
        FkGrade,
        FkBook,
        Description,
        Price,
        numChapterTestBook,
      ),
    );
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

  goToTestPage = (name, id) => {
    const data = this.props.getDashboard.find(filter => {
      return filter.fldPkTestBook === id;
    });
    this.props.dispatch(apiActions.selectedItem(data));
    this.props.history.push({
      pathname: `/add-test/${name}`,
      state: { name, id: data.fldPkTestBook },
    });
  };
  // Delete Book
  deleteBook = id => {
    this.props.dispatch(apiActions.deleteBook(Number(id)));
    setTimeout(() => {
      this.props.dispatch(apiActions.getDashboard());
    }, 10);
  };
  // Go To Quiz Page
  goToQuizPage = () => {
    this.props.history.push('/CreateQuizPage');
  };
  // Setting Book
  OpensettingBook = id => {
    const data = this.props.getDashboard.find(filter => {
      return filter.fldPkTestBook === id;
    });
    const defaultSetting = {
      fldPkTestBook: data.fldPkTestBook,
      pkSetting: data.pkSetting,
      fkTopic: data.fkTopic,
      randomeQuizDuration: data.randomeQuizDuration,
      isFinish: data.isFinish,
      cover: data.fldCoverAddress,
    };
    setTimeout(() => {
      this.props.dispatch(apiActions.loadTopicSetting(id));
      this.setState({ testBookSetting: defaultSetting });
      this.toggleSetting();
    }, 10);
  };
  getSettingModal = getSettingModal => {
    const {
      TestBookId,
      TopicId,
      Duration,
      IsFinish,
      Coverbase64,
      format,
    } = getSettingModal;
    this.props.dispatch(
      apiActions.TestBookSetting(
        TestBookId,
        TopicId,
        Duration,
        IsFinish,
        Coverbase64,
        format,
      ),
    );
  };
  render() {
    return (
      <Page className="DashboardPage" title="داشبورد">
        <Row>
          <Col>
            <div className="d-flex flex-column justify-content-start align-items-start">
              {/* Button */}
              <Col className="text-right mb-0">
                <Tooltip title={<span>افزودن کتاب جدید</span>}>
                  <Button
                    outline
                    color="white"
                    onClick={this.toggleModal}
                    className="my-2 ml-2 add-book-btn btn-floating bg-white"
                  >
                    <LibraryBooksIcon />
                  </Button>
                </Tooltip>
                <Tooltip title={<span>ساخت آزمون</span>}>
                  <Button
                    outline
                    color="white"
                    onClick={this.goToQuizPage}
                    className="my-2 add-book-btn btn-floating bg-white"
                  >
                    <QuizIcon />
                  </Button>
                </Tooltip>
              </Col>
              {/* Modal */}
              <DashboardPageModal
                isOpen={this.state.modal}
                toggle={this.toggle}
                isEditing={this.state.isEditing}
                GradeData={this.props.loadGrade}
                MajorData={this.props.loadMajor}
                getBookModal={this.getBookModal}
                loadBooks={this.props.loadBooks}
              />
              {/* Modal Setting */}
              <DashboardPageSetting
                isOpen={this.state.modalSetting}
                toggle={this.toggleSetting}
                loadTopicSetting={this.props.loadTopicSetting}
                getSettingModal={this.getSettingModal}
                testBookSetting={this.state.testBookSetting}
              />
              {/* Table */}
              <Col sm={11} md={12}>
                <DashboardPageTable
                  key={this.props.getDashboard}
                  newdata={this.props.getDashboard}
                  editTableData={this.getTableData}
                  goToTestPage={this.goToTestPage}
                  deleteBook={this.deleteBook}
                  OpensettingBook={this.OpensettingBook}
                />
              </Col>
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}

// export default DashboardPage;
function mapStateToProps(state) {
  return {
    getDashboard: state.api.dashboard,
    loadGrade: state.api.grade,
    loadMajor: state.api.major,
    addBook: state.api.addBook,
    loadBooks: state.api.loadBooks,
    loadTopicSetting: state.api.loadTopicSetting,
  };
}
export default connect(mapStateToProps)(DashboardPage);
