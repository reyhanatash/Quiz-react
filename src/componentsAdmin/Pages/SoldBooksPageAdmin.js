import React from 'react';
import Page from 'components/Page';
import { Col, Row, Button } from 'reactstrap';
import { apiActionsAdmin } from '../../_actions';
import { connect } from 'react-redux';
import SoldBooksTable from './SoldBooksTable';
import BookPageModal from '../Teachers/BookPageModal';

class SoldBookPageAdmin extends React.Component {
  state = {
    modal: false,
    modalData: {},
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.dispatch(apiActionsAdmin.loadTestBookSold(''));
  }
  // Modal
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.props.dispatch(apiActionsAdmin.loadUsers(this.props.location.state));
  };
  toggleModalDetails = data => {
    const find = this.props.userBooks.find(
      item => item.fldPkTestBook === data.id,
    );
    console.log(find);
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalData: find,
    }));
  };

  // Clear
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActionsAdmin.loadTestBookSold(0));
  }
  render() {
    return (
      <Page className="SoldBookPageAdmin" title="کتاب های فروخته شده">
        <Row>
          <Col>
            <SoldBooksTable
              key={this.props.users}
              newdata={this.props.loadTestBookSold}
              openStudyModal={this.openStudyModal}
              goToBookPageUser={this.goToBookPageUser}
            />
          </Col>
          <BookPageModal
            isOpen={this.state.modal}
            toggle={this.toggle}
            modalData={this.state.modalData}
            getBookModal={this.getBookModal}
          />
        </Row>
        <Row className="px-2">
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
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadTestBookSold: state.apiAdmin.loadTestBookSold,
  };
}
export default connect(mapStateToProps)(SoldBookPageAdmin);
