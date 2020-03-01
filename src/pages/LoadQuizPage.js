import React, { Component } from 'react';
import Page from 'components/Page';
import { Container, Col, Row, Button } from 'reactstrap';
import LoadQuiz from '../components/CreateQuizPage/LoadQuiz';
import { connect } from 'react-redux';
import { apiActions } from '../_actions';

class LoadQuizPage extends Component {
  state = {
    testBookId: null,
  };
  componentDidMount() {
    // window.scrollTo(0, 0);
    const { dispatch } = this.props;
    dispatch(apiActions.loadQuiz(null));
    dispatch(apiActions.getDashboard());
  }
  // Select Quiz
  selectQuiz = data => {
    this.props.dispatch(apiActions.selectedQuiz(data));
    this.props.history.push(`/EditQuizPage/${data.name}`);
  };
  // Delete Quiz
  deleteQuiz = async data => {
    await this.props.dispatch(apiActions.deleteQuiz(data));
    setTimeout(() => {
      this.props.dispatch(apiActions.loadQuiz(this.state.testBookId));
    }, 500);
  };
  filterByTestBook = data => {
    this.props.dispatch(apiActions.loadQuiz(data.target.value));
  };
  render() {
    return (
      <Page className="CreateQuizPage" title="آزمون های من">
        <Container fluid className="my-3">
          {/* Show Created Quiz */}
          <Row className="px-3">
            {/* Quizes */}
            <Col sm={12} md={12}>
              <LoadQuiz
                Quiz={this.props.Quiz}
                selectQuiz={this.selectQuiz}
                deleteQuiz={this.deleteQuiz}
                Books={this.props.Books}
                filterByTestBook={this.filterByTestBook}
              />
            </Col>
          </Row>
          {/* Go TO CreatePageTest Button */}
          <Row className="px-3">
            <Col sm={12} md={11} lg={11} className="mb-0">
              <Button
                className="col-lg-3 col-md-5 col-sm-12"
                outline
                color="info"
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push('/CreateQuizPage');
                }}
              >
                برو به ساخت آزمون
              </Button>
            </Col>
          </Row>
        </Container>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    Quiz: state.api.loadQuiz,
    Books: state.api.dashboard,
  };
}
export default connect(mapStateToProps)(LoadQuizPage);
