import React, { Component } from 'react';
import Page from 'components/Page';
import { Container, Col, Row, Button } from 'reactstrap';
// componentsStudent / testBookDetails / TestBookDetailsTable;
import { connect } from 'react-redux';
import { apiActionsAdmin } from '../../_actions';
import ViewQuizAdmin from './ViewQuizAdmin';

class QuizPageAdmin extends Component {
  componentDidMount() {
    // window.scrollTo(0, 0);
    const { dispatch } = this.props;
    console.log(this.props.location.state);
    if (this.props.location.state) {
      dispatch(apiActionsAdmin.loadUserQuiz(this.props.location.state.id));
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

  render() {
    return (
      <Page className="CreateQuizPage" title="آزمون ها">
        <Container fluid className="my-3">
          {/* Show Created Quiz */}
          <Row className="px-3">
            {/* Quizes */}
            <Col sm={12} md={12}>
              <ViewQuizAdmin
                Quiz={this.props.Quiz}
                selectQuiz={this.selectQuiz}
                goToStartTest={this.goToStartTest}
                TestBookId={this.props.location.state.id}
              />
            </Col>
          </Row>
          <Row className="px-3">
            <Col sm={12} md={11} lg={11} className="mb-0">
              <Button
                className="col-lg-2 col-md-5 col-sm-12"
                outline
                color="secondary"
                onClick={e => {
                  e.preventDefault();
                  this.props.history.goBack();
                }}
              >
                بازگشت
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
    Quiz: state.apiAdmin.loadUserQuiz,
  };
}
export default connect(mapStateToProps)(QuizPageAdmin);
