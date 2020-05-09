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
    } else if (this.props.location.pathname.split('/')[2]) {
      this.props.dispatch(
        apiActionsAdmin.loadUsers(
          Number(this.props.location.pathname.split('/')[2]),
        ),
      );
      this.setState({
        type: Number(this.props.location.pathname.split('/')[2]),
      });
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
    this.props.dispatch(apiActionsAdmin.loadUsers(this.state.type));
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
    this.props.dispatch(apiActionsAdmin.loadUsers(this.state.type));
  };
  getBookModal = getBookModal => {
    const {
      id,
      name,
      lastName,
      userName,
      email,
      password,
      typeCo,
      phone,
      percentage,
    } = getBookModal;
    console.log(getBookModal);
    this.props.dispatch(
      apiActionsAdmin.insertOrUpdateTeacher(
        id,
        name,
        lastName,
        userName,
        email,
        password,
        typeCo,
        phone,
        percentage,
      ),
    );
  };
  ChangeActiveTeacher = (UserId, isActive) => {
    const Status = isActive ? 1 : 0;
    this.props.dispatch(apiActionsAdmin.ChangeActiveTeacher(UserId, Status));
    setTimeout(() => {
      this.props.dispatch(apiActionsAdmin.loadUsers(this.state.type));
    }, 500);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      if (this.props.location.pathname.split('/')[2]) {
        this.props.dispatch(
          apiActionsAdmin.loadUsers(
            Number(this.props.location.pathname.split('/')[2]),
          ),
        );
        this.setState({
          type: Number(this.props.location.pathname.split('/')[2]),
        });
      }
    }
  }
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
            getBookModal={this.getBookModal}
            isEditing={this.state.isEditing}
            reloadData={this.reloadData}
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
    users: state.apiAdmin.users,
  };
}
export default connect(mapStateToProps)(UsersPage);
