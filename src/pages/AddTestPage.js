import Page from 'components/Page';
import React from 'react';
// import { AuthorCard } from 'components/Card';
import AddTestForm from '../components/AddTestPage/AddTestForm';
import AddTestSide from '../components/AddTestPage/AddTestSide';
import AddTestSideInfo from '../components/AddTestPage/AddTestSideInfo';
import AddTestModal from '../components/AddTestPage/AddTestModal';
import { connect } from 'react-redux';
import { allConstants } from '../_constants';
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { apiActions } from '../_actions';

class AddTestPage extends React.Component {
  state = {
    dropdownOpen: false,
    editMode: false,
    addNew: false,
    isEditing: false,
    openEditModal: false,
    disablePrev: false,
    disableNext: false,
    filteredTest: -1,
    filteredBook: null,
    filterdStatus: null,
    keepEditing: false,
    lastBookId: null,
    lastSubBookId: null,
  };
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.props.dispatch(apiActions.getDashboard());
    // this.props.dispatch(apiActions.loadTest(this.props.location.state.id));
    this.props.dispatch(
      apiActions.loadTestBookChapter(this.props.location.state.id),
    );
    this.props.dispatch(apiActions.loadGrade());
    this.props.dispatch(
      apiActions.loadGradeTestBook(this.props.location.state.id),
    );
    this.props.dispatch(apiActions.loadMajor());
    this.props.dispatch(apiActions.loadHashtagTrend());
  }

  loadAgain = () => {
    setTimeout(() => {
      this.props.dispatch(
        apiActions.loadTestBookChapter(this.props.selectedItem.fldPkTestBook),
      );
    }, 200);
  };
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
    this.loadAgain();
  };
  // Add A Book Chapter
  addBookChapter = addBookChapter => {
    const { id, BookName, FkTestBook, FkGrade, FkBookChapter } = addBookChapter;
    this.props.dispatch(
      apiActions.InsertOrUpdateChapter(
        id,
        BookName,
        FkTestBook,
        FkGrade,
        FkBookChapter,
      ),
    );
    this.setState({ addNew: true, openEditModal: false });
  };
  // Insert Or Update TestMater
  addTestMaster = testMaster => {
    const {
      id,
      FkTestBook,
      FkTestBookChapter,
      FkBookChapter,
      Level,
      Template,
      Name,
      HTML,
      Ans1,
      Ans2,
      Ans3,
      Ans4,
      TrueAns,
      Hashtag,
      FkSubBookChapter,
      FkTopic,
      files,
    } = testMaster;
    this.props.dispatch(
      apiActions.InsertOrUpdateTestMaster(
        id,
        FkTestBook,
        FkTestBookChapter,
        FkBookChapter,
        Level,
        Template,
        Name,
        HTML,
        Ans1,
        Ans2,
        Ans3,
        Ans4,
        TrueAns,
        Hashtag,
        FkSubBookChapter,
        FkTopic,
        files,
      ),
      setTimeout(() => {
        if (this.state.keepEditing === false) {
          // this.resetTest();
        }
      }, 200),
      // this.props.dispatch(apiActions.loadTest(this.props.location.state.id)),
    );
    this.setState({ filteredTest: FkTestBookChapter });
    setTimeout(() => {
      this.props.dispatch(
        apiActions.loadBookChapterSearch(Number(FkTestBookChapter)),
      );
      this.props.dispatch(
        apiActions.loadTest(
          this.props.location.state.id,
          FkTestBookChapter,
          null,
          this.state.filterdStatus,
        ),
      );
    }, 200);
    setTimeout(() => {
      if (this.state.keepEditing === true) {
        this.selectedTest(id);
      }
    }, 350);
    // setTimeout(() => {
    //   this.props.dispatch(apiActions.loadTest(-1));
    // }, 1000);
    // this.loadChapter({ target: { value: FkTestBookChapter } });
  };
  //
  selectedItem = () => {
    const data = this.props.getDashboard.find(filter => {
      return filter.testBookName === this.props.location.state.name;
    });
    this.props.dispatch(apiActions.selectedItem(data));
  };
  // Select A Test For Edit And...
  selectedTest = id => {
    let data = this.props.loadTest.find(filter => {
      return filter.pkTestMaster === id;
    });
    let mediaArray = this.props.loadTest.filter(filter => {
      return filter.pkTestMaster === id;
    });
    const media = [];
    mediaArray.forEach(test => {
      if (test.fldMediaAddress !== null && test.fldMediaAddress !== '') {
        media.push({
          id: test.fldPkAnswerMedia ? test.fldPkAnswerMedia : -1,
          fldPkAnswerMedia: test.fldPkAnswerMedia
            ? test.fldPkAnswerMedia
            : null,
          name: test.fldMediaName ? test.fldMediaName : null,
          fldMediaAddress: test.fldMediaAddress ? test.fldMediaAddress : null,
          fldMedia: test.fldMedia ? test.fldMedia : null,
          type: test.fldMediaType ? test.fldMediaType.trim() : null,
        });
      }
    });
    data = { ...data, media: media };
    console.log(this.props.loadTest);
    this.setState({ editMode: true });
    this.props.dispatch(apiActions.selectedTest(data));
    this.props.dispatch(apiActions.loadBookChapter(data.fldPkTestBookChapter));
    // Prev Next Test
    const index = this.props.loadTest.findIndex(filter => {
      return filter.pkTestMaster === id;
    });
    const disableData = this.props.loadTest[index - 1];
    const disableData2 = this.props.loadTest[index + 1];
    if (disableData === undefined) {
      this.setState({ disablePrev: true });
    } else {
      this.setState({ disablePrev: false });
    }
    if (disableData2 === undefined) {
      this.setState({ disableNext: true });
    } else {
      this.setState({ disableNext: false });
    }
    this.checkKeepEditing(true);
  };
  // Select Next and Previous Test
  selectedTestPrev = () => {
    const index = this.props.loadTest.findIndex(filter => {
      return filter.pkTestMaster === this.props.selectedTest.pkTestMaster;
    });
    let data = this.props.loadTest[index - 1];
    let mediaArray = this.props.loadTest.filter(filter => {
      return filter.pkTestMaster === data.pkTestMaster;
    });
    const media = [];
    mediaArray.forEach(test => {
      if (test.fldMediaAddress !== '' && test.fldMediaAddress !== null) {
        media.push({
          id: test.fldPkAnswerMedia ? test.fldPkAnswerMedia : -1,
          fldPkAnswerMedia: test.fldPkAnswerMedia
            ? test.fldPkAnswerMedia
            : null,
          name: test.fldMediaName ? test.fldMediaName : null,
          fldMediaAddress: test.fldMediaAddress ? test.fldMediaAddress : null,
          fldMedia: test.fldMedia ? test.fldMedia : null,
          type: test.fldMediaType ? test.fldMediaType.trimStart() : null,
        });
      }
    });
    data = { ...data, media: media.length !== 0 ? media : null };
    const disableData = this.props.loadTest[index - 2];
    if (data !== undefined) {
      this.props.dispatch(apiActions.selectedTest(data));
      this.props.dispatch(
        apiActions.loadBookChapter(data.fldPkTestBookChapter),
      );
      this.setState({ disablePrev: false });
      this.setState({ disableNext: false });
    }
    if (disableData === undefined) {
      this.setState({ disablePrev: true });
    }
  };
  selectedTestNext = () => {
    const index = this.props.loadTest.findIndex(filter => {
      return filter.pkTestMaster === this.props.selectedTest.pkTestMaster;
    });
    let data = this.props.loadTest[index + 1];
    let mediaArray = this.props.loadTest.filter(filter => {
      return filter.pkTestMaster === data.pkTestMaster;
    });
    const media = [];
    mediaArray.forEach(test => {
      if (test.fldMediaAddress !== '' && test.fldMediaAddress !== null) {
        media.push({
          id: test.fldPkAnswerMedia ? test.fldPkAnswerMedia : -1,
          fldPkAnswerMedia: test.fldPkAnswerMedia
            ? test.fldPkAnswerMedia
            : null,
          name: test.fldMediaName ? test.fldMediaName : null,
          fldMediaAddress: test.fldMediaAddress ? test.fldMediaAddress : null,
          fldMedia: test.fldMedia ? test.fldMedia : null,
          type: test.fldMediaType ? test.fldMediaType.trimStart() : null,
        });
      }
    });
    data = { ...data, media: media.length !== 0 ? media : null };
    const disableData = this.props.loadTest[index + 2];
    if (data !== undefined) {
      this.props.dispatch(apiActions.selectedTest(data));
      this.props.dispatch(
        apiActions.loadBookChapter(data.fldPkTestBookChapter),
      );
      this.setState({ disableNext: false });
      this.setState({ disablePrev: false });
    }
    if (disableData === undefined) {
      this.setState({ disableNext: true });
    }
  };

  // Add Test (Reset Form)
  resetTest = () => {
    let reset;
    if (this.props.selectedTest === undefined) {
      reset = null;
    } else if (this.props.selectedTest === null) {
      reset = undefined;
    }
    this.setState({ editMode: false });
    this.setState({ addNew: false });
    this.setState({ isEditing: false });
    this.props.dispatch(apiActions.selectedTest(reset));
    this.props.dispatch(apiActions.editBookChapterModal(null));
    this.props.dispatch(apiActions.loadBookChapter(-1));
    this.props.dispatch(
      apiActions.loadTestBookChapter(this.props.location.state.id),
    );
    this.props.dispatch(
      apiActions.loadTest(
        this.props.location.state.id,
        this.state.filteredTest,
        this.state.filteredBook,
        this.state.filterdStatus,
      ),
    );
    this.props.dispatch(apiActions.loadSubBook(-1));
    this.props.dispatch(apiActions.loadTopic(-1));
    this.props.dispatch({
      type: allConstants.UPLOAD_FILE,
      data: [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // Load Book Chapter
  loadChapter = id => {
    if (id.target.value !== '') {
      setTimeout(() => {
        this.props.dispatch(
          apiActions.loadBookChapter(Number(id.target.value)),
        );
        this.props.dispatch(
          apiActions.editBookChapterModal(Number(id.target.value)),
        );
      }, 300);
    } else {
      this.props.dispatch(apiActions.loadBookChapterModal(null));
    }
  };
  loadChapterModal = edit => {
    this.setState({ isEditing: edit, openEditModal: edit });
    this.props.dispatch(
      apiActions.loadBookChapterModal(Number(this.props.location.state.id)),
    );
  };
  // Delete Test
  deleteTest = id => {
    this.props.dispatch(apiActions.deleteTest(Number(id)));
    // Reset Without Scroll
    let reset;
    if (this.props.selectedTest === undefined) {
      reset = null;
    } else if (this.props.selectedTest === null) {
      reset = undefined;
    }
    this.setState({ editMode: false });
    this.setState({ addNew: false });
    this.setState({ isEditing: false });
    this.props.dispatch(apiActions.selectedTest(reset));
    this.props.dispatch(apiActions.editBookChapterModal(null));
    this.props.dispatch(apiActions.loadBookChapter(-1));
    this.props.dispatch(
      apiActions.loadTestBookChapter(this.props.location.state.id),
    );
    this.props.dispatch(
      apiActions.loadTest(
        this.props.location.state.id,
        this.state.filteredTest,
        this.state.filteredBook,
        this.state.filterdStatus,
      ),
    );
    setTimeout(() => {
      this.props.dispatch(
        apiActions.loadTest(
          this.props.location.state.id,
          this.state.filteredTest,
          this.state.filteredBook,
          this.state.filterdStatus,
        ),
      );
    }, 300);

    // this.resetTest();
  };
  // Search by Test Book Chapter
  filterTestBook = id => {
    if (id.target.value !== '') {
      this.setState({ filteredTest: id.target.value });
      setTimeout(() => {
        this.props.dispatch(
          apiActions.loadBookChapterSearch(Number(id.target.value)),
        );
        this.props.dispatch(
          apiActions.loadTest(
            this.props.location.state.id,
            id.target.value,
            null,
            id.target.status,
          ),
        );
      }, 300);
    } else {
      this.setState({ filteredTest: -1 });
      this.props.dispatch(apiActions.loadTest(-1, -1, null, null));
    }
  };
  // Search by Book Chapter
  filterBook = id => {
    this.setState({ filteredBook: id.target.value });
    if (id.target.value !== '') {
      setTimeout(() => {
        this.props.dispatch(
          apiActions.loadTest(
            this.props.location.state.id,
            this.state.filteredTest,
            id.target.value,
            id.target.status,
          ),
        );
      }, 300);
    } else {
      this.setState({ filteredBook: null });
      this.props.dispatch(
        apiActions.loadTest(
          this.props.location.state.id,
          this.state.filteredTest,
          null,
          id.target.status,
        ),
      );
    }
  };
  // Search by Tests Status
  filterTestStatus = status => {
    this.setState({ filterdStatus: status });
    setTimeout(() => {
      this.props.dispatch(
        apiActions.loadTest(
          this.props.location.state.id,
          this.state.filteredTest,
          this.state.filteredBook,
          status,
        ),
      );
    }, 300);
  };
  // Drag and Drop Update
  dragUpdate = (source, destination) => {
    this.props.dispatch(apiActions.changeRowTest(source.id, destination.id));
    setTimeout(() => {
      this.props.dispatch(
        apiActions.loadTest(
          this.props.location.state.id,
          this.state.filteredTest,
          this.state.filteredBook,
          this.state.filterdStatus,
        ),
      );
    }, 50);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.addNew !== this.state.addNew &&
      this.props.editBookChapterModal
    ) {
      this.loadChapter({
        target: {
          value: this.props.editBookChapterModal[0].pkTestBookChapter,
        },
      });
      this.setState({ addNew: false });
    }
    if (
      this.props.selectedTest &&
      prevProps.selectedTest !== this.props.selectedTest
    ) {
      this.props.dispatch(
        apiActions.editBookChapterModal(
          Number(this.props.selectedTest.fldPkTestBookChapter),
        ),
      );
      this.props.dispatch({
        type: allConstants.UPLOAD_FILE,
        data: null,
      });
    }
    if (
      prevProps.loadBookChapter !== this.props.loadBookChapter &&
      this.props.loadBookChapter &&
      this.props.loadBookChapter.length !== 0
    ) {
      if (this.props.selectedTest && this.state.editMode === true) {
        this.props.dispatch(
          apiActions.loadSubBook(this.props.selectedTest.fldPkBookChapter),
        );
        this.setState({
          lastBookId: this.props.selectedTest.fldPkBookChapter,
        });
      } else {
        this.props.dispatch(
          apiActions.loadSubBook(
            this.props.loadBookChapter[this.props.loadBookChapter.length - 1]
              .fldPkBookChapter,
          ),
        );
        this.setState({
          lastBookId: this.props.loadBookChapter[
            this.props.loadBookChapter.length - 1
          ].fldPkBookChapter,
        });
      }
    }
    if (
      prevProps.loadSubBookOptions !== this.props.loadSubBookOptions &&
      this.props.selectedTest
    ) {
      this.props.dispatch(
        apiActions.loadTopic(this.props.selectedTest.fldFkSubBookChapter),
      );
      this.setState({
        lastSubBookId: this.props.selectedTest.fldPkSubBookChapter,
      });
    }
    if (prevProps.uploadFile !== this.props.uploadFile) {
      this.props.dispatch(
        apiActions.loadTest(
          this.props.location.state.id,
          this.state.filteredTest,
          this.state.filteredBook,
          this.state.filterdStatus,
        ),
      );
    }
  }
  // Keep Editing
  checkKeepEditing = state => {
    this.setState({ keepEditing: state });
  };

  // Load SubBook
  loadSubBook = id => {
    if (id.target.value !== '') {
      setTimeout(() => {
        this.props.dispatch(apiActions.loadSubBook(Number(id.target.value)));
        // this.props.dispatch(
        //   apiActions.editBookChapterModal(Number(id.target.value)),
        // );
      }, 300);
    } else {
      this.props.dispatch(apiActions.loadSubBook(null));
    }
  };
  // Insert or UpdateSubBook
  addSubBook = addSubBookData => {
    const { id, BookChapterId, Name } = addSubBookData;
    this.props.dispatch(
      apiActions.InsertOrUpdateSubBook(
        id,
        BookChapterId === 0 ? this.state.lastBookId : BookChapterId,
        Name,
      ),
    );
    setTimeout(() => {
      this.props.dispatch(
        apiActions.loadSubBook(
          Number(BookChapterId === 0 ? this.state.lastBookId : BookChapterId),
        ),
      );
    }, 300);
  };
  // Delete subBook
  deleteSubBook = (pkSubBookChapter, bookChapterId) => {
    this.props.dispatch(apiActions.deleteSubBook(pkSubBookChapter));
    setTimeout(() => {
      this.props.dispatch(
        apiActions.loadSubBook(
          Number(bookChapterId === 0 ? this.state.lastBookId : bookChapterId),
        ),
      );
    }, 300);
  };

  // Load Topic
  loadTopic = id => {
    if (id.target.value !== '') {
      setTimeout(() => {
        this.props.dispatch(apiActions.loadTopic(Number(id.target.value)));
      }, 300);
    } else {
      this.props.dispatch(apiActions.loadTopic(null));
    }
  };
  // Insert or Update Topic
  addTopic = addSubBookData => {
    const { id, SubBookId, Name } = addSubBookData;
    this.props.dispatch(apiActions.InsertOrUpdateTopic(id, SubBookId, Name));
    setTimeout(() => {
      this.props.dispatch(apiActions.loadTopic(Number(SubBookId)));
    }, 300);
  };
  // Delete Topic
  deleteTopic = (pkTopic, subBookId) => {
    this.props.dispatch(apiActions.deleteTopic(pkTopic));
    setTimeout(() => {
      this.props.dispatch(apiActions.loadTopic(Number(subBookId)));
    }, 300);
  };

  componentWillUnmount() {
    this.props.dispatch(apiActions.editBookChapterModal(null));
    this.props.dispatch(apiActions.loadTest(-1));
    this.props.dispatch(apiActions.loadTestBookChapter(null));
    this.props.dispatch(apiActions.loadGradeTestBook(null));
    this.props.dispatch(apiActions.loadBookChapter(-1));
    this.props.dispatch(apiActions.loadBookChapterSearch(-1));
    this.props.dispatch(apiActions.selectedTest(null));
    this.props.dispatch(apiActions.loadSubBook(null));
    this.props.dispatch(apiActions.deleteTopic(null));
    this.props.dispatch({
      type: allConstants.UPLOAD_FILE,
      data: null,
    });
  }
  render() {
    if (this.props.getDashboard) {
      this.selectedItem();
    }
    return (
      <Page className="AddTestPage py-5">
        <Row className="flex-row-reverse px-3">
          {/* Modal */}
          <AddTestModal
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            GradeData={this.props.loadGradeTest}
            selectedItem={this.props.selectedItem}
            addBookChapter={this.addBookChapter}
            loadAgain={this.loadAgain}
            bookChapterData={this.props.loadBookChapterModal}
            isEditing={this.state.isEditing}
            editBookChapterModal={this.props.editBookChapterModal}
            openEditModal={this.state.openEditModal}
          />
          {/* Test Aside */}
          <Col
            className="positoin-relative text-right bg-white"
            sm={5}
            md={4}
            lg={3}
          >
            <AddTestSide
              loadTestData={this.props.loadTest}
              history={this.props.history}
              selectedTest={this.selectedTest}
              resetTest={this.resetTest}
              editMode={this.state.editMode}
              deleteTest={this.deleteTest}
              testBookChapterData={this.props.loadTestBookChapter}
              bookChapterData={this.props.loadBookChapterSearch}
              filterTestBook={this.filterTestBook}
              filterBook={this.filterBook}
              filterTestStatus={this.filterTestStatus}
              filteredTest={this.state.filteredTest}
              dragUpdate={this.dragUpdate}
            />
            {this.props.selectedTest ? (
              <AddTestSideInfo
                selectedTest={this.props.selectedTest}
                loadSubBookOptions={this.props.loadSubBookOptions}
                loadTopicOptions={this.props.loadTopicOptions}
              />
            ) : null}
          </Col>
          {/* Form Tests */}
          <Col
            className="positoin-relative bg-white border-left"
            sm={7}
            md={8}
            lg={9}
          >
            <AddTestForm
              selectedItem={this.props.selectedItem}
              selectedTest={this.props.selectedTest}
              editMode={this.state.editMode}
              addNew={this.state.addNew}
              dropdownOpen={this.state.dropdownOpen}
              toggle={this.toggle}
              bookChapterData={this.props.loadBookChapter}
              testBookChapterData={this.props.loadTestBookChapter}
              testName={this.props.loadTest}
              addTestMaster={this.addTestMaster}
              loadChapter={this.loadChapter}
              loadChapterModal={this.loadChapterModal}
              loadBookChapterModal={this.props.loadBookChapterModal}
              editBookChapterModal={this.props.editBookChapterModal}
              loadHashtagTrend={this.props.loadHashtagTrend}
              resetTest={this.resetTest}
              selectedTestPrev={this.selectedTestNext}
              selectedTestNext={this.selectedTestPrev}
              disablePrev={this.state.disableNext}
              disableNext={this.state.disablePrev}
              testNewNum={
                this.props.loadTest
                  ? this.props.loadTest[this.props.loadTest.length - 1]
                  : null
              }
              keepEditing={this.state.keepEditing}
              checkKeepEditing={this.checkKeepEditing}
              loadTopic={this.loadTopic}
              loadSubBook={this.loadSubBook}
              loadSubBookOptions={this.props.loadSubBookOptions}
              loadTopicOptions={this.props.loadTopicOptions}
              addSubBook={this.addSubBook}
              deleteSubBook={this.deleteSubBook}
              addTopic={this.addTopic}
              deleteTopic={this.deleteTopic}
            />
          </Col>
        </Row>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    getDashboard: state.api.dashboard,
    loadTest: state.api.loadTest,
    loadBookChapter: state.api.loadBookChapter,
    loadBookChapterSearch: state.api.loadBookChapterSearch,
    loadBookChapterModal: state.api.loadBookChapterModal,
    loadTestBookChapter: state.api.loadTestBookChapter,
    loadGrade: state.api.grade,
    loadGradeTest: state.api.gradeTest,
    loadMajor: state.api.major,
    selectedItem: state.api.selectedItem,
    selectedTest: state.api.selectedTest,
    editBookChapterModal: state.api.editBookChapterModal,
    loadHashtagTrend: state.api.loadHashtagTrend,
    loadSubBookOptions: state.api.loadSubBook,
    loadTopicOptions: state.api.loadTopic,
    uploadFile: state.api.uploadFile,
  };
}
export default connect(mapStateToProps)(AddTestPage);
