import React, { Component } from 'react';
import Page from 'components/Page';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { apiActionsStudent } from '../../_actions';
import { allConstantsStudent } from '../../_constants';
import alertify from 'alertifyjs';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
// import MdAdd from '@material-ui/icons/add';
import CloseIcon from '@material-ui/icons/Close';
import Done from '@material-ui/icons/AssignmentTurnedIn';
import Later from '@material-ui/icons/AssignmentLate';
import Ignore from '@material-ui/icons/AssignmentReturn';
import Next from '@material-ui/icons/KeyboardBackspace';
import Tooltip from '@material-ui/core/Tooltip';
import { Button, ButtonGroup } from 'reactstrap';
import StudyStyle from '../study/StudyStyle';
import FilterTestsStudy from '../study/FilterTestsStudy';

class StudyPageStudent extends Component {
  state = {
    cameFromQuiz: false,
    isOpen: false,
    emojiSelected: null,
    selectedTestBook: null,
    selectedBookChapter: null,
    selectedSubBook: null,
    selectedTopic: null,
    selectedHashtag: null,
    selectedStudyStatus: null,
  };
  componentDidMount() {
    console.log(this.props.location.state);
    window.scrollTo(0, 0);
    if (this.props.location.state.cameFromQuiz === true) {
      this.setState({ cameFromQuiz: true });
    }
    this.props.dispatch(
      apiActionsStudent.selectedTest(this.props.location.state),
    );

    this.props.dispatch(
      apiActionsStudent.loadTestMasterStudent(
        this.props.location.state.MasterId,
        this.props.location.state.ChapterId,
        this.props.location.state.Action,
      ),
    );
    if (
      !this.props.location.state.cameFromQuiz &&
      this.state.cameFromQuiz === false
    ) {
      this.props.dispatch(
        apiActionsStudent.loadBookChapter(this.props.location.state.ChapterId),
      );
      this.props.dispatch(
        apiActionsStudent.loadHashtagStudy(this.props.location.state.ChapterId),
      );
    }
  }

  setEmojiSelected = (e, num) => {
    e.preventDefault();
    this.setState({ emojiSelected: num });
  };

  selectAnswere = (testId, num, Status, Comment, Hashtag, Emoji) => {
    this.props.dispatch(
      apiActionsStudent.testAnswere(
        testId,
        num,
        Status,
        Comment,
        Hashtag,
        Emoji,
      ),
    );
  };
  changeAnswere = (MasterId, Action) => {
    if (this.props.loadTestMasterStudent.message === 'Faild') {
      alertify.error(this.props.loadTestMasterStudent.showMessageToUser);
    }
    this.props.dispatch(
      apiActionsStudent.loadTestMasterStudent(
        MasterId,
        this.props.location.state.ChapterId,
        Action,
        this.state.selectedBookChapter,
        this.state.selectedSubBook,
        this.state.selectedTopic,
        this.state.selectedStudyStatus,
        this.state.selectedHashtag,
      ),
    );
  };
  getResult = () => {
    this.props.dispatch(
      apiActionsStudent.quizResult(this.props.location.state.ChapterId),
    );
  };
  /////////////////// Filter ///////////////////////////

  ////////////// Load Book Chapter /////////////////
  loadBookChapter = data => {
    const { dispatch } = this.props;
    if (data.target.value !== '') {
      dispatch(apiActionsStudent.loadBookChapter(data.target.value));
      dispatch(apiActionsStudent.loadSubBook(0));
      dispatch(apiActionsStudent.loadTopic(0));
      this.setState({ selectedTestBook: data.target.value });
    } else {
      dispatch(apiActionsStudent.loadBookChapter(0));
      dispatch(apiActionsStudent.loadSubBook(0));
      dispatch(apiActionsStudent.loadTopic(0));
      this.setState({ selectedTestBook: null });
    }
  };
  //////////////// Load SubBook //////////////////
  loadSubBook = data => {
    const { dispatch } = this.props;
    if (data.target.value !== '') {
      dispatch(apiActionsStudent.loadSubBook(data.target.value));
      dispatch(apiActionsStudent.loadTopic(0));

      this.setState({ selectedBookChapter: data.target.value });
    } else {
      dispatch(apiActionsStudent.loadSubBook(0));
      dispatch(apiActionsStudent.loadTopic(0));
      this.setState({ selectedBookChapter: null });
    }
  };
  //////////////// Load Topic //////////////////
  loadTopic = data => {
    const { dispatch } = this.props;
    if (data.target.value !== '') {
      dispatch(apiActionsStudent.loadTopic(data.target.value));
      this.setState({ selectedSubBook: data.target.value });
    } else {
      dispatch(apiActionsStudent.loadTopic(0));
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
  // On Change Study Status
  onChangeStudyStatus = data => {
    if (data.target.value !== '') {
      this.setState({ selectedStudyStatus: data.target.value });
    } else {
      this.setState({ selectedStudyStatus: null });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props;
    console.log(this.props.loadFile);

    //     ,
    // BookChapterId,
    // SubBookChapterId,
    // TopicId,
    // StudyStatus,
    // HashTagId,
    // this.props.location.state.MasterId,
    // this.props.location.state.ChapterId,
    // this.props.location.state.Action,
    if (prevProps.loadTestMasterStudent !== this.props.loadTestMasterStudent) {
      this.props.dispatch(
        apiActionsStudent.loadHashtagStudy(this.props.location.state.ChapterId),
      );
      if (
        this.props.loadTestMasterStudent &&
        this.props.loadTestMasterStudent.length > 0
      ) {
        this.props.dispatch(
          apiActionsStudent.loadMediaStudy(
            this.props.loadTestMasterStudent[0].pkTestMaster,
          ),
        );
      }
    }
    if (prevProps.Media !== this.props.Media) {
      this.props.dispatch({ type: allConstantsStudent.LOAD_FILE, data: null });
      this.props.Media.forEach(media => {
        this.props.dispatch(apiActionsStudent.loadFile(media.mediaAddress));
      });
    }
    //////////////// Filter Test BookChapter ////////////////
    if (
      prevState.selectedBookChapter !== this.state.selectedBookChapter &&
      this.props.BookChapter
    ) {
      if (this.state.selectedBookChapter !== null) {
        dispatch(
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            null,
            null,
            this.state.selectedStudyStatus,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            null,
            null,
            null,
            this.state.selectedStudyStatus,
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
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            this.state.selectedSubBook,
            null,
            this.state.selectedStudyStatus,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            null,
            null,
            this.state.selectedStudyStatus,
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
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            this.state.selectedSubBook,
            this.state.selectedTopic,
            this.state.selectedStudyStatus,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            this.state.selectedSubBook,
            null,
            this.state.selectedStudyStatus,
            this.state.selectedHashtag,
          ),
        );
      }
    }
    //////////////// Filter Test Study Status ////////////////
    else if (
      prevState.selectedStudyStatus !== this.state.selectedStudyStatus &&
      this.props.Hashtags
    ) {
      if (this.state.selectedStudyStatus !== null) {
        dispatch(
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            this.state.selectedSubBook,
            this.state.selectedTopic,
            this.state.selectedStudyStatus,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            this.state.selectedSubBook,
            this.state.selectedTopic,
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
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            this.state.selectedSubBook,
            this.state.selectedTopic,
            this.state.selectedStudyStatus,
            this.state.selectedHashtag,
          ),
        );
      } else {
        dispatch(
          apiActionsStudent.loadTestMasterStudent(
            this.props.location.state.MasterId,
            this.props.location.state.ChapterId,
            this.props.location.state.Action,
            this.state.selectedBookChapter,
            this.state.selectedSubBook,
            this.state.selectedTopic,
            this.state.selectedStudyStatus,
            null,
          ),
        );
      }
    }

    ///// Select Quiz Edit MODE
    // if (prevProps.selectedQuiz !== this.props.selectedQuiz) {
    //   if (this.props.selectedQuiz) {
    //     this.setState({ isEditing: true });
    //   }
    // }
  }

  // Show Answere
  showAnswereHandler = testMasterId => {
    console.log(testMasterId);
    // this.props.dispatch(apiActionsStudent.loadMediaStudy(testMasterId));
  };

  // Clear
  componentWillUnmount() {
    this.props.dispatch(apiActionsStudent.selectedTest(null));
    this.props.dispatch(apiActionsStudent.loadTestMasterStudent(0, 0, 0));
    this.props.dispatch(apiActionsStudent.loadBookChapter(0));
    this.props.dispatch(apiActionsStudent.loadHashtagStudy(0));
  }
  render() {
    console.log(this.props.loadFile);
    return (
      <Page>
        {/* Filter Study */}
        {this.state.cameFromQuiz === false ? (
          <Row className="d-flex justify-content-center align-items-center">
            <Col sm={10} md={12}>
              <FilterTestsStudy
                Books={this.props.Books}
                loadTestBookChapter={
                  this.props.location.state
                    ? this.props.location.state.name
                    : ''
                }
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
                onChangeStudyStatus={this.onChangeStudyStatus}
              />
            </Col>
          </Row>
        ) : null}
        {this.props.loadTestMasterStudent &&
        this.props.loadTestMasterStudent !== null &&
        this.props.loadTestMasterStudent[0] ? (
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              sm={10}
              md={12}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <StudyStyle
                styleNum={
                  this.props.loadTestMasterStudent
                    ? this.props.loadTestMasterStudent[0].template
                    : 0
                }
                test={this.props.loadTestMasterStudent}
                selectAnswere={this.selectAnswere}
                changeAnswere={this.changeAnswere}
                getResult={this.getResult}
                quizResult={this.props.quizResult}
                goBack={this.props.history.goBack}
                showAnswereHandler={this.showAnswereHandler}
                Media={this.props.Media}
                loadFile={this.props.loadFile}
                cameFromQuiz={this.state.cameFromQuiz}
              />
            </Col>
          </Row>
        ) : (
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              sm={10}
              md={12}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <span>تستی وجود ندارد</span>
              <span
                className="btn btn-outline-primary cursor-pointer mt-2"
                onClick={() => this.props.history.goBack()}
              >
                بازگشت
              </span>
            </Col>
          </Row>
        )}
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadTestMasterStudent: state.apiStudent.loadTestMaster,
    BookChapter: state.apiStudent.loadBookChapter,
    SubBook: state.apiStudent.loadSubBook,
    Topic: state.apiStudent.loadTopic,
    Hashtags: state.apiStudent.loadHashtagStudy,
    Media: state.apiStudent.loadMediaStudy,
    loadFile: state.apiStudent.loadFile,
  };
}

export default connect(mapStateToProps)(StudyPageStudent);
