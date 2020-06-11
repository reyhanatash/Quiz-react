import Avatar from 'components/Avatar';
import ReactDOM from 'react-dom';
import Notifications from 'components/Notifications';
import { UserCard } from 'components/Card';
import SearchInput from 'components/SearchInput';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  MdClearAll,
  MdExitToApp,
  MdNotificationsActive,
  MdNotificationsNone,
} from 'react-icons/md';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { userActions, apiActions } from '../../_actions';
import { allConstants } from '../../_constants';
import Cookies from 'universal-cookie';
import ProfileModal from '../ProfileModal';

const cookies = new Cookies();

const bem = bn.create('header');

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    userInfo: {},
    notificationsData: [],
    modal: false,
  };
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setWrapperRef2 = this.setWrapperRef2.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({ userInfo: cookies.get('userInfo') });
    this.props.loadNotifications(null);
    this.props.NotificationCount();
    this.props.loadProfile();
    // this.props.loadNotifications(null);
  }
  toggleNotificationPopover = () => {
    this.props.NotificationCount();
    this.props.loadNotifications(null);
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
      notificationsData: this.props.loadNotificationsData,
    });
    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
    if (this.state.isOpenNotificationPopover) {
      this.props.SeenNotifications();
    }
  };
  // Toggle User Section
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  setWrapperRef2(node) {
    this.wrapperRef2 = node;
  }
  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.wrapperRef2 &&
      !this.wrapperRef2.contains(event.target)
    ) {
      this.setState({
        isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
      });
    }
  }
  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
    if (!this.state.isOpenUserCardPopover) {
      this.setState({
        modal: false,
      });
    }
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };
  logOut = () => {
    this.props.history.push('/login');
    this.props.logOut();
  };
  removeNotification = async id => {
    await this.props.deleteNotification(id);
    await this.props.NotificationCount();
    await this.props.loadNotifications(null);
    setTimeout(() => {
      this.setState({
        notificationsData: this.props.loadNotificationsData,
      });
    }, 350);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.NotificationCount();
    }
  }
  // Profile
  // Toogle Modal
  toggle = () => {
    if (this.state.modal === false) {
      this.setState({
        isOpenUserCardPopover: false,
      });
    }
    this.setState({
      modal: !this.state.modal,
    });

    // this.props.dispatch(apiActions.getDashboard());
  };
  getProfileModal = getProfileModal => {
    const {
      Name,
      LastName,
      Email,
      Password,
      PhoneNumber,
      BankAccountNumber,
    } = getProfileModal;
    this.props.updateProfile(
      Name,
      LastName,
      Email,
      Password,
      PhoneNumber,
      BankAccountNumber,
    );
  };
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  render() {
    const MdNotificationsActiveWithBadge = withBadge({
      size: 'md',
      color: 'primary',
      style: {
        top: -10,
        right: -10,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      children: (
        <small style={{ fontSize: 11 }} key={this.props.notificationsCount}>
          {this.props.notificationsCount
            ? this.props.notificationsCount[0].countNotSeen
            : null}
        </small>
      ),
    })(MdNotificationsActive);
    const { isNotificationConfirmed } = this.state;
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        {/* <Nav navbar>
          <SearchInput />
        </Nav> */}
        <Nav navbar className={bem.e('nav-right')}>
          {/* Notifications */}
          {cookies.get('userInfo') && cookies.get('userInfo').role === '2' ? (
            <NavItem className="d-inline-flex ml-1">
              <NavLink id="Popover1" className="position-relative">
                {isNotificationConfirmed ||
                (this.props.notificationsCount &&
                  this.props.notificationsCount[0].countNotSeen <= 0) ? (
                  <MdNotificationsNone
                    size={25}
                    className="text-secondary can-click"
                    onClick={this.toggleNotificationPopover}
                  />
                ) : (
                  <MdNotificationsActiveWithBadge
                    size={25}
                    className="text-secondary can-click animated swing infinite"
                    onClick={this.toggleNotificationPopover}
                  />
                )}
              </NavLink>
              <Popover
                placement="bottom"
                isOpen={this.state.isOpenNotificationPopover}
                toggle={this.toggleNotificationPopover}
                target="Popover1"
                className="notifications-wrapper"
              >
                <PopoverBody style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {this.state.notificationsData &&
                  this.state.notificationsData.length !== 0 ? (
                    <Notifications
                      key={this.state.notificationsData}
                      notificationsData={this.state.notificationsData}
                      countNew={this.props.notificationsCount}
                      deleteNotification={this.removeNotification}
                    />
                  ) : (
                    <span>اعلانی وجود ندارد</span>
                  )}
                </PopoverBody>
              </Popover>
            </NavItem>
          ) : null}

          {/* User Profile Avatar */}
          <NavItem className="ml-3 d-flex text-muted flex-wrap align-items-center">
            <span className="ml-1" style={{ fontSize: '0.9rem' }}>
              سلام{' '}
              {this.props.profileData ? this.props.profileData[0].fldName : ''}
            </span>
            <NavLink id="Popover2" innerRef={this.setWrapperRef2}>
              <Avatar
                onClick={this.toggleUserCardPopover}
                className="can-click"
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
              innerRef={this.setWrapperRef}
            >
              <PopoverBody className="border-light header">
                <UserCard
                  title={
                    this.props.profileData ? (
                      cookies.get('userInfo') &&
                      cookies.get('userInfo').role === '2' ? (
                        <p className="d-flex flex-column flex-wrap justify-content-center">
                          <span className="text-center">
                            {this.props.profileData[0].fldName}{' '}
                            {this.props.profileData[0].fldLastName}
                          </span>
                          <span className="text-center py-1">
                            سهم از فروش :{' '}
                            {this.props.profileData[0].fldPercentage}%
                          </span>
                          <span className="text-center">
                            تاریخ عضویت :{' '}
                            {this.props.profileData[0].registerDate}
                          </span>
                        </p>
                      ) : (
                        this.props.profileData[0].fldName
                      )
                    ) : (
                      ''
                    )
                  }
                  className="border-light bg-light"
                  style={{ backgroundColor: 'lightblue !important' }}
                >
                  <ListGroup className="custom_profile_border" flush>
                    {cookies.get('userInfo') &&
                    cookies.get('userInfo').role === '2' ? (
                      <ListGroupItem
                        tag="button"
                        action
                        className="border-bottom bg-light text-center rounded-0"
                        onClick={this.toggle}
                      >
                        <AccountCircleIcon style={{ fontSize: '17px' }} />{' '}
                        پروفایل
                      </ListGroupItem>
                    ) : null}
                    <ListGroupItem
                      tag="button"
                      action
                      className="border-light bg-light text-center rounded-0"
                      onClick={this.logOut}
                    >
                      <MdExitToApp /> خروج
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
        <ProfileModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          getProfileModal={this.getProfileModal}
          loadProfile={this.props.profileData}
          getProfile={this.props.loadProfile}
          checkBankNumber={this.props.checkBankNumber}
          clearBankCheck={this.props.clearBankCheck}
        />
      </Navbar>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    logOut: () => dispatch(userActions.logout()),
    loadNotifications: id => dispatch(apiActions.loadNotifications(id)),
    SeenNotifications: () => dispatch(apiActions.SeenNotifications()),
    NotificationCount: () => dispatch(apiActions.NotificationCount()),
    deleteNotification: id => dispatch(apiActions.deleteNotification(id)),
    checkBankNumber: bankNumber =>
      dispatch(apiActions.checkBankNumber(bankNumber)),
    loadProfile: () => dispatch(apiActions.loadProfile()),
    updateProfile: (
      Name,
      LastName,
      Email,
      Password,
      PhoneNumber,
      BankAccountNumber,
    ) =>
      dispatch(
        apiActions.updateProfile(
          Name,
          LastName,
          Email,
          Password,
          PhoneNumber,
          BankAccountNumber,
        ),
      ),
    clearBankCheck: () =>
      dispatch({
        type: allConstants.CHECK_BANK_NUMBER,
        data: null,
      }),
  };
};
function mapStateToProps(state) {
  return {
    loadNotificationsData: state.api.loadNotifications,
    notificationsCount: state.api.notificationsCount,
    profileData: state.api.loadProfile,
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(Header));
