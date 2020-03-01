import React from 'react';
import Page from 'components/Page';
import { Col, Row, Button } from 'reactstrap';
import { apiActionsAdmin } from '../../_actions';
import { connect } from 'react-redux';
import UsersTable from '../Users/UsersTable';
import TeachersTable from '../Teachers/TeachersTable';
import TeachersPageModal from '../Teachers/TeachersPageModal';

class UsersPage extends React.Component {
  state = {
    modal: false,
    type: 0,
    isEditing: false,
    editData: {},
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.location.state) {
      this.props.dispatch(apiActionsAdmin.loadUsers(this.props.location.state));
      this.setState({ type: this.props.location.state });
    } else {
      this.props.dispatch(apiActionsAdmin.loadUsers(null));
    }
  }

  // Go TO Book Page
  goToBookPage = (data, type) => {
    this.props.history.push({
      pathname: `/books`,
      state: { data: data, type: type },
    });
  };
  // Modal
  // Toogle Modal
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.props.dispatch(apiActionsAdmin.loadUsers(this.props.location.state));
  };
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      isEditing: false,
    }));
  };
  toggleModalEdit = data => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      isEditing: true,
      editData: data,
    }));
  };
  reloadData = () => {
    this.props.dispatch(apiActionsAdmin.loadUsers(this.props.location.state));
  };
  getBookModal = getBookModal => {
    const {
      id,
      name,
      lastName,
      userName,
      phone,
      email,
      password,
      status,
    } = getBookModal;
    console.log(getBookModal);
    // this.props.dispatch(
    //   apiActions.addBook(
    //     id,
    //     BookName,
    //     Author,
    //     FkMajor,
    //     FkGrade,
    //     FkBook,
    //     Description,
    //     numChapterTestBook,
    //   ),
    // );
  };
  ChangeActiveTeacher = (UserId, isActive) => {
    const Status = isActive ? 1 : 0;
    this.props.dispatch(apiActionsAdmin.ChangeActiveTeacher(UserId, Status));
    setTimeout(() => {
      this.props.dispatch(apiActionsAdmin.loadUsers(this.props.location.state));
    }, 500);
  };
  // Clear
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(apiActionsAdmin.loadUsers(0));
  }
  render() {
    console.log(this.state.editData);
    return (
      <Page
        className="UsersPage"
        title={this.state.type === 2 ? 'طراحان' : 'کاربران'}
      >
        <Row>
          <Col>
            {this.state.type === 2 ? (
              <TeachersTable
                key={this.props.users}
                newdata={this.props.users}
                openStudyModal={this.openStudyModal}
                goToBookPage={this.goToBookPage}
                toggleModal={this.toggleModal}
                toggleModalEdit={this.toggleModalEdit}
                ChangeActiveTeacher={this.ChangeActiveTeacher}
              />
            ) : this.state.type === 3 ? (
              <UsersTable
                key={this.props.users}
                newdata={this.props.users}
                openStudyModal={this.openStudyModal}
                goToBookPage={this.goToBookPage}
              />
            ) : (
              <h2>اررور</h2>
            )}
          </Col>
          <TeachersPageModal
            isOpen={this.state.modal}
            toggle={this.toggle}
            editData={this.state.editData}
            isEditing={this.state.isEditing}
            getBookModal={this.getBookModal}
            reloadData={this.reloadData}
          />
        </Row>
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.apiAdmin.users,
  };
}
export default connect(mapStateToProps)(UsersPage);
