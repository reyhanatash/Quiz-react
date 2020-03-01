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
import { userActions } from '../../_actions';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const bem = bn.create('header');

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
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    userInfo: {},
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
  }

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });
    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
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
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  render() {
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
          {/* <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
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
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem> */}
          <NavItem className="ml-3 d-flex text-muted flex-wrap align-items-center">
            <span className="ml-1" style={{ fontSize: '0.9rem' }}>
              سلام {this.state.userInfo ? this.state.userInfo.firstName : ''}
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
                    this.state.userInfo ? this.state.userInfo.firstName : ''
                  }
                  className="border-light bg-light"
                  style={{ backgroundColor: 'lightblue !important' }}
                >
                  <ListGroup className="custom_profile_border" flush>
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
      </Navbar>
    );
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    logOut: () => dispatch(userActions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchtoProps)(Header));
