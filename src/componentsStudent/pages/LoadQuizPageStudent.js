import React, { Component } from 'react';
import Page from 'components/Page';
import { Container, Col, Row, Button } from 'reactstrap';
import LoadQuiz from 'componentsStudent/quiz/LoadQuiz';
// componentsStudent / testBookDetails / TestBookDetailsTable;
import { connect } from 'react-redux';
import { apiActionsStudent } from '../../_actions';

class LoadQuizPageStudent extends Component {
  componentDidMount() {
    // window.scrollTo(0, 0);
    const { dispatch } = this.props;
    console.log(this.props.location.state);
    if (this.props.location.state) {
      dispatch(apiActionsStudent.loadQuizDetails(this.props.location.state.id));
    }
  }

  // Start Test
  goToStartTest = data => {
    // this.props.dispatch(apiActionsStudent.LoadStartQuiz(data.QuizId));
    this.props.history.push({
      pathname: `/new-test/${data.name}`,
      state: data,
    });
  };
  componentWillUnmount() {
    this.props.dispatch(apiActionsStudent.loadQuizDetails(0));
  }
  render() {
    return (
      <Page className="CreateQuizPage" title="آزمون ها">
        <Container fluid className="my-3">
          {/* Show Created Quiz */}
          <Row className="px-3">
            {/* Quizes */}
            {this.props.Quiz && this.props.Quiz.length > 1 ? (
              <Col sm={12} md={12}>
                <LoadQuiz
                  Quiz={this.props.Quiz}
                  selectQuiz={this.selectQuiz}
                  goToStartTest={this.goToStartTest}
                  TestBookId={this.props.location.state.id}
                />
              </Col>
            ) : (
              <Col className="d-flex align-items-center w-100 mt-5 mb-3">
                <h3 className="m-0">فاقد آزمون میباشد !</h3>
              </Col>
            )}
          </Row>
          {/* Go TO CreatePageTest Button */}
          <Row className="px-3">
            <Col sm={12} md={11} lg={11} className="mb-0">
              <Button
                className="col-lg-3 col-md-5 col-sm-12"
                outline
                color="secondary"
                onClick={e => {
                  e.preventDefault();
                  this.props.history.goBack();
                }}
              >
                برو به داشبورد
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
    Quiz: state.apiStudent.loadQuizDetails,
  };
}
export default connect(mapStateToProps)(LoadQuizPageStudent);
