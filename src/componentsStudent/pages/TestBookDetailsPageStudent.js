import React, { Component } from 'react';
import Page from 'components/Page';
import { Col, Row, Button } from 'reactstrap';
import { apiActionsStudent } from '../../_actions';
import { connect } from 'react-redux';
import TestBookDetailsTable from 'componentsStudent/testBookDetails/TestBookDetailsTable';

class TestBookDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.props.location.state);
    if (this.props.location.state) {
      const { dispatch } = this.props;
      dispatch(
        apiActionsStudent.LoadTestBookDetails(this.props.location.state.id),
      );
    }
  }
  // Go TO Study Page
  goToStudyPage = selectedTestBook => {
    const data = {
      MasterId: 0,
      ChapterId: selectedTestBook.id,
      Action: 6,
      name: selectedTestBook.name,
    };
    this.props.history.push({
      pathname: `/study/${data.name}`,
      state: data,
    });
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActionsStudent.LoadTestBookDetails(0));
  }
  render() {
    return (
      <Page
        className="DashboardPage"
        title={'جزئیات ' + this.props.location.state.name}
      >
        <Row>
          <Col>
            <div className="d-flex flex-column justify-content-start align-items-start">
              {/* Table */}
              <Col sm={11} md={12}>
                <TestBookDetailsTable
                  key={this.props.getDashboard}
                  newdata={this.props.loadTestBookDetails}
                  goToStudyPage={this.goToStudyPage}
                />
              </Col>
              {/* Go Back Button */}
              <Col sm={12} md={11} lg={11} className="mb-0">
                <Button
                  className="col-lg-3 col-md-5 col-sm-12"
                  outline
                  color="info"
                  onClick={e => {
                    e.preventDefault();
                    this.props.history.goBack();
                  }}
                >
                  بازگشت به داشبورد
                </Button>
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
    loadTestBookDetails: state.apiStudent.loadTestBookDetails,
  };
}
export default connect(mapStateToProps)(TestBookDetails);
