import React, { Component } from 'react';
import Page from 'components/Page';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { apiActionsStudent } from '../../_actions';
import { allConstantsStudent } from '../../_constants';
import alertify from 'alertifyjs';
import DemoStyle from '../demo/DemoStyle';

class DemoPageStudent extends Component {
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
    this.props.dispatch(
      apiActionsStudent.demoAnswere(
        Number(this.props.location.state.ChapterId),
        null,
        this.props.location.state.Action,
      ),
    );
  }

  selectAnswere = (TestMasterId, Action) => {
    this.props.dispatch(
      apiActionsStudent.demoAnswere(
        Number(this.props.location.state.ChapterId),
        TestMasterId,
        Action,
      ),
    );
  };

  getResult = () => {
    this.props.dispatch(
      apiActionsStudent.quizResult(this.props.location.state.ChapterId),
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.Media !== this.props.Media) {
      this.props.dispatch({ type: allConstantsStudent.LOAD_FILE, data: null });
      this.props.Media.forEach(media => {
        this.props.dispatch(apiActionsStudent.loadFile(media.mediaAddress));
      });
    }
    if (prevProps.loadTestMasterStudent !== this.props.loadTestMasterStudent) {
      if (this.props.loadTestMasterStudent) {
        this.props.dispatch(
          apiActionsStudent.loadMediaStudy(
            this.props.loadTestMasterStudent[0].pkTestMaster,
          ),
        );
      }
    }
  }

  // Show Answere
  showAnswereHandler = testMasterId => {
    this.props.dispatch(apiActionsStudent.loadMediaStudy(testMasterId));
  };

  // Clear
  componentWillUnmount() {
    this.props.dispatch(apiActionsStudent.demoAnswere(0, 0, 0));
    sessionStorage.removeItem('demo');
  }
  render() {
    return (
      <Page>
        {this.props.loadTestMasterStudent &&
        this.props.loadTestMasterStudent !== null &&
        this.props.loadTestMasterStudent[0] ? (
          <Row className="d-flex justify-content-center align-items-center">
            <Col
              sm={10}
              md={12}
              className="d-flex justify-content-center align-items-center flex-column"
            >
              <DemoStyle
                styleNum={
                  this.props.loadTestMasterStudent
                    ? this.props.loadTestMasterStudent[0].template
                    : 0
                }
                test={this.props.loadTestMasterStudent}
                selectAnswere={this.selectAnswere}
                changeAnswere={this.changeAnswere}
                showAnswereHandler={this.showAnswereHandler}
                Media={this.props.Media}
                loadFile={this.props.loadFile}
                goDashboard={() => this.props.history.push('/dashboard')}
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
                onClick={() => this.props.history.push('/dashboard')}
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
    loadTestMasterStudent: state.apiStudent.loadTestDemo,
    Media: state.apiStudent.loadMediaStudy,
    loadFile: state.apiStudent.loadFile,
  };
}

export default connect(mapStateToProps)(DemoPageStudent);
