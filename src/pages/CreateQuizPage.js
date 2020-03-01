import React, { Component } from 'react';
import Page from 'components/Page';
import { Container, Col, Row, Button } from 'reactstrap';
import { apiActions } from '../_actions';
import { connect } from 'react-redux';
import FilterQuiz from '../components/CreateQuizPage/FilterQuiz';
import AddNewQuiz from '../components/CreateQuizPage/AddNewQuiz';
import LoadTestsTable from '../components/CreateQuizPage/LoadTestsTable';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PreviewTestModal from '../components/CreateQuizPage/PreviewTestModal';

class CreateQuizPage extends Component {
  state = {
    modal: false,
    modalTest: null,
    books: [],
    // isEditing: false,
    editMode: false,
    selectedBookId: null,
    selectedTestBook: null,
    selectedBookChapter: null,
    selectedSubBook: null,
    selectedTopic: null,
    selectedTests: [],
    selectedHashtag: null,
    selectedQuiz: null,
    Tests: null,
    allTests: null,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    const { dispatch } = this.props;
    dispatch(apiActions.getDashboard());
    if (this.props.selectedQuiz && this.props.selectedQuiz !== null) {
      const newArr = [];
      if (
        this.props.selectedQuiz.testArry &&
        this.props.selectedQuiz.testArry !== null &&
        this.props.selectedQuiz.testArry.length !== 0
      ) {
        this.props.selectedQuiz.testArry
          .split(',')
          .map(id => newArr.push(Number(id)));
      }
      this.setState({
        editMode: true,
        selectedBookId: this.props.selectedQuiz.bookId,
        selectedQuiz: this.props.selectedQuiz,
        selectedTests: newArr,
      });

      dispatch(
        apiActions.loadAllTests(
          this.props.selectedQuiz.bookId,
          null,
          null,
          1,
          null,
          null,
          null,
        ),
      );
    }
  }
  ////////////// Load Test Book /////////////////
  loadTestBookChapter = data => {
    const { dispatch } = this.props;
    if (data.target.value !== '') {
      dispatch(apiActions.loadTestBookChapter(data.target.value));
      dispatch(apiActions.loadBookChapter(0));
      dispatch(apiActions.loadSubBook(0));
      dispatch(apiActions.loadTopic(0));
      this.setState({ selectedBookId: data.target.value });
    } else {
      dispatch(apiActions.loadTestBookChapter(0));
      dispatch(apiActions.loadBookChapter(0));
      dispatch(apiActions.loadSubBook(0));
      dispatch(apiActions.loadTopic(0));
      this.setState({ selectedBookId: null });
    }
  };
  ////////////// Load Book Chapter /////////////////
  loadBookChapter = data => {
    const { dispatch } = this.props;
    if (data.target.value !== '') {
      dispatch(apiActions.loadBookChapter(data.target.value));
      dispatch(apiActions.loadSubBook(0));
      dispatch(apiActions.loadTopic(0));
      this.setState({ selectedTestBook: data.target.value });
    } else {
      dispatch(apiActions.loadBookChapter(0));
      dispatch(apiActions.loadSubBook(0));
      dispatch(apiActions.loadTopic(0));
      this.setState({ selectedTestBook: null });
    }
  };
  //////////////// Load SubBook //////////////////
  loadSubBook = data => {
    const { dispatch } = this.props;
    if (data.target.value !== '') {
      dispatch(apiActions.loadSubBook(data.target.value));
      dispatch(apiActions.loadTopic(0));

      this.setState({ selectedBookChapter: data.target.value });
    } else {
      dispatch(apiActions.loadSubBook(0));
      dispatch(apiActions.loadTopic(0));
      this.setState({ selectedBookChapter: null });
    }
  };
  //////////////// Load Topic //////////////////
  loadTopic = data => {
    const { dispatch } = this.props;
    if (data.target.value !== '') {
      dispatch(apiActions.loadTopic(data.target.value));
      this.setState({ selectedSubBook: data.target.value });
    } else {
      dispatch(apiActions.loadTopic(0));
      this.setState({ selectedSubBook: null });
    }
  };
  // On Change Topic
  onChangeTopic = data => {
    if (data.target.value !== '') {
      this.setState({ selectedTopic: data.target.value });
    } else {
      this.setState({ selectedTopic: null });
    }
  };
  // On Change Hashtag
  onChangeHashtag = data => {
    if (data.target.value !== '') {
      this.setState({ selectedHashtag: data.target.value });
    } else {
      this.setState({ selectedHashtag: null });
    }
  };
  //////////////// Load Test //////////////////
  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;
    // Filter Test To Unique
    if (prevProps.Tests !== this.props.Tests) {
      const tests = [];
      let poll = [];
      let uniqueTest = this.props.Tests.filter(x => {
        if (poll.includes(x.pkTestMaster)) return false;
        else {
          poll.push(x.pkTestMaster);
          return true;
        }
      });
      uniqueTest.forEach((data, index) => {
        tests.push({
          pkTestMaster: data.pkTestMaster,
          name: data.name,
          rowNumber: data.rowNumber,
        });
      });
      this.setState({ Tests: tests });
    }
    if (prevProps.allTests !== this.props.allTests) {
      const allTests = [];
      let poll = [];
      let uniqueTest = this.props.allTests.filter(x => {
        if (poll.includes(x.pkTestMaster)) return false;
        else {
          poll.push(x.pkTestMaster);
          return true;
        }
      });
      uniqueTest.forEach((data, index) => {
        allTests.push({
          pkTestMaster: data.pkTestMaster,
          name: data.name,
          rowNumber: data.rowNumber,
        });
      });
      this.setState({ allTests: allTests });
    }

    //////////////// Filter Test Book ID ////////////////
    if (
      prevState.selectedBookId !== this.state.selectedBookId &&
      this.props.Books
    ) {
      if (this.state.selectedBookId !== null) {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            null,
            null,
            1,
            null,
            null,
            null,
          ),
        );
        dispatch(apiActions.loadAllTests(this.state.selectedBookId));
        dispatch(apiActions.loadHashtagQuiz(this.state.selectedBookId));
      } else {
        dispatch(apiActions.loadTest(0));
        dispatch(apiActions.loadAllTests(0));
        dispatch(apiActions.loadHashtagQuiz(0));
      }
    }
    //////////////// Filter Test TestBookChapter ////////////////
    else if (
      prevState.selectedTestBook !== this.state.selectedTestBook &&
      this.props.TestBookChapter
    ) {
      if (this.state.selectedTestBook !== null) {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            null,
            1,
            null,
            null,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            null,
            null,
            1,
            null,
            null,
            this.state.selectedHashtag,
          ),
        );
      }
    }
    //////////////// Filter Test BookChapter ////////////////
    else if (
      prevState.selectedBookChapter !== this.state.selectedBookChapter &&
      this.props.BookChapter
    ) {
      if (this.state.selectedBookChapter !== null) {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            this.state.selectedBookChapter,
            1,
            null,
            null,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            null,
            1,
            null,
            null,
            this.state.selectedHashtag,
          ),
        );
      }
    }
    //////////////// Filter Test SubBook ////////////////
    else if (
      prevState.selectedSubBook !== this.state.selectedSubBook &&
      this.props.SubBook
    ) {
      if (this.state.selectedSubBook !== null) {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            this.state.selectedBookChapter,
            1,
            this.state.selectedSubBook,
            null,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            this.state.selectedBookChapter,
            1,
            null,
            null,
            this.state.selectedHashtag,
          ),
        );
      }
    }
    //////////////// Filter Test Topic ////////////////
    else if (
      prevState.selectedTopic !== this.state.selectedTopic &&
      this.props.Topic
    ) {
      if (this.state.selectedTopic !== null) {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            this.state.selectedBookChapter,
            1,
            this.state.selectedSubBook,
            this.state.selectedTopic,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            this.state.selectedBookChapter,
            1,
            this.state.selectedSubBook,
            null,
            this.state.selectedHashtag,
          ),
        );
      }
    }
    //////////////// Filter Test Hashtag ////////////////
    else if (
      prevState.selectedHashtag !== this.state.selectedHashtag &&
      this.props.Hashtags
    ) {
      if (this.state.selectedHashtag !== null) {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            this.state.selectedBookChapter,
            1,
            this.state.selectedSubBook,
            this.state.selectedTopic,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActions.loadTest(
            this.state.selectedBookId,
            this.state.selectedTestBook,
            this.state.selectedBookChapter,
            1,
            this.state.selectedSubBook,
            this.state.selectedTopic,
            null,
          ),
        );
      }
    }

    ////  Clear When Book Change
    if (prevState.selectedBookId !== this.state.selectedBookId) {
      if (
        this.props.selectedQuiz &&
        this.props.selectedQuiz.bookId === this.state.selectedBookId
      ) {
        return;
      }
      this.setState({
        selectedTests: [],
        allTests: [],
        selectedTestBook: null,
        selectedBookChapter: null,
        selectedSubBook: null,
        selectedTopic: null,
        selectedHashtag: null,
      });
    }
    ///// Select Quiz Edit MODE
    // if (prevProps.selectedQuiz !== this.props.selectedQuiz) {
    //   if (this.props.selectedQuiz) {
    //     this.setState({ isEditing: true });
    //   }
    // }
  }
  //////////////////// Select Test ////////////////////
  selectedTest = (selected, newStatus) => {
    const newSelected = [...this.state.selectedTests];
    selected.forEach(test => {
      if (newStatus) {
        console.log('NEW');
        newSelected.push(test);
      } else if (
        newStatus === false &&
        this.state.selectedTests.includes(test)
      ) {
        console.log('REMOVE');
        newSelected.splice(
          newSelected.findIndex(item => item === test),
          1,
        );
      }
    });
    this.setState({ selectedTests: newSelected });
  };
  ////////////////// Remove Selected Test ////////////////////
  removeSelectedTest = test => {
    const newSelected = this.state.selectedTests.filter(
      selected => selected !== test,
    );
    this.setState({
      selectedTests: newSelected,
    });
  };
  ////////////////// Reset Selected Test ////////////////////
  resetSelectedTest = () => {
    this.setState({
      selectedTests: [],
      editMode: false,
      selectedQuiz: null,
    });
    setTimeout(() => {
      this.props.history.push('/LoadQuizPage');
    }, 50);
  };
  ////////////////// Add Quiz ////////////////////
  addOrUpdateQuiz = (name, duration, idTestList, Description) => {
    // console.log(
    //   this.props.selectedQuiz && this.state.selectedBookId === null
    //     ? this.props.selectedQuiz.bookId
    //     : this.state.selectedBookId,
    // );
    // console.log(name);
    // console.log(duration);
    // console.log(idTestList);
    // console.log(id);
    this.props.dispatch(
      apiActions.InsertOrUpdateQuiz(
        this.state.editMode ? this.state.selectedQuiz.id : -1,
        name,
        duration,
        this.props.selectedQuiz && this.state.selectedBookId === null
          ? this.props.selectedQuiz.bookId
          : this.state.selectedBookId,
        idTestList,
        Description,
      ),
    );
    // this.props.history.push('/LoadQuizPage');
  };
  ////////////////// Privew Test //////////////
  handleClickOpen = () => {
    this.setState({ modal: true });
  };
  handleClose = () => {
    this.setState({ modal: false });
  };
  previewTest = id => {
    const find = this.props.loadTest.find(test => test.pkTestMaster === id);
    this.setState({ modalTest: find });
    this.handleClickOpen();
  };

  ////////////////// Clear ////////////////////
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActions.getDashboard(0));
    dispatch(apiActions.loadTestBookChapter(0));
    dispatch(apiActions.loadBookChapter(0));
    dispatch(apiActions.loadSubBook(0));
    dispatch(apiActions.loadTopic(0));
    dispatch(apiActions.loadTest(0));
    dispatch(apiActions.loadAllTests(0));
    dispatch(apiActions.loadHashtagQuiz(0));
    this.setState({
      editMode: false,
      selectedQuiz: null,
      selectedTest: null,
    });
    this.props.dispatch(apiActions.selectedQuiz(null));
  }

  render() {
    console.log(this.state.selectedTests);
    console.log(this.props.selectedQuiz);
    console.log(this.state.Tests);
    return (
      <>
        <Page className="CreateQuizPage" title="ساخت آزمون">
          <Container fluid className="my-3">
            {/* Filter Quiz */}
            <Row>
              <Col sm={12} md={12}>
                <FilterQuiz
                  Books={this.props.Books}
                  loadTestBookChapter={this.loadTestBookChapter}
                  TestBookChapter={this.props.TestBookChapter}
                  loadBookChapter={this.loadBookChapter}
                  BookChapter={this.props.BookChapter}
                  loadSubBook={this.loadSubBook}
                  SubBook={this.props.SubBook}
                  loadTopic={this.loadTopic}
                  Topic={this.props.Topic}
                  onChangeTopic={this.onChangeTopic}
                  Hashtags={this.props.Hashtags}
                  onChangeHashtag={this.onChangeHashtag}
                  selectedQuiz={this.props.selectedQuiz}
                />
              </Col>
            </Row>
            {/* Create New Quiz */}
            <Row className="px-3">
              {/* Tests */}
              <Col sm={12} md={12} lg={7}>
                <LoadTestsTable
                  Tests={this.state.Tests}
                  selectedTest={this.selectedTest}
                  DefaultSelect={this.state.selectedTests}
                  previewTest={this.previewTest}
                />
              </Col>
              {/* Quiz */}
              <Col sm={12} md={12} lg={5} className="mb-0">
                <AddNewQuiz
                  Tests={this.state.allTests}
                  selectedTests={this.state.selectedTests}
                  removeSelectedTest={this.removeSelectedTest}
                  resetSelectedTest={this.resetSelectedTest}
                  addOrUpdateQuiz={this.addOrUpdateQuiz}
                  editMode={this.state.editMode}
                  selectedQuiz={this.state.selectedQuiz}
                />
              </Col>
            </Row>
            {/* Go TO LoadPageTest Button */}
            <Row className="px-3">
              <Col sm={12} md={11} lg={11} className="mb-0">
                <Button
                  outline
                  color="info"
                  className="col-lg-3 col-md-5 col-sm-12"
                  onClick={e => {
                    e.preventDefault();
                    this.props.history.push('/LoadQuizPage');
                  }}
                >
                  برو به آزمون های من
                </Button>
              </Col>
            </Row>
          </Container>
        </Page>
        <div>
          <Dialog
            open={this.state.modal}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            className="direction-right col-12 preview-test-quiz"
            fullWidth
          >
            <PreviewTestModal
              styleNum={
                this.state.modalTest ? this.state.modalTest.fldTemplate : 1
              }
              selectedTest={this.state.modalTest}
            />
            <DialogActions className="direction-right justify-content-start pr-5 mt-2">
              <Button
                autoFocus
                onClick={this.handleClose}
                outline
                color="primary"
                className="px-5"
              >
                بستن
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    Books: state.api.dashboard,
    TestBookChapter: state.api.loadTestBookChapter,
    BookChapter: state.api.loadBookChapter,
    SubBook: state.api.loadSubBook,
    Topic: state.api.loadTopic,
    Hashtags: state.api.loadHashtagQuiz,
    Tests:
      state.api.loadTest && state.api.loadTest.length
        ? state.api.loadTest.map(test => {
            return {
              pkTestMaster: test.pkTestMaster,
              name: test.name,
              rowNumber: test.rowNumber,
            };
          })
        : [],
    allTests:
      state.api.loadAllTests && state.api.loadAllTests.length
        ? state.api.loadAllTests.map(test => {
            return {
              pkTestMaster: test.pkTestMaster,
              name: test.name,
              rowNumber: test.rowNumber,
            };
          })
        : [],
    selectedQuiz: state.api.selectedQuiz,
    loadTest: state.api.loadTest,
  };
}
export default connect(mapStateToProps)(CreateQuizPage);
