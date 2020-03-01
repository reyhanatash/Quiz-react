import logo200Image from 'assets/img/logo/logo_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  MdAccountCircle,
  MdBorderAll,
  MdDashboard,
  MdExtension,
  MdKeyboardArrowDown,
  MdPages,
  MdSend,
  MdTextFields,
  MdViewCarousel,
  MdBook,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import QuizIcon from '@material-ui/icons/Ballot';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  // { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  // { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
  // {
  //   to: '/dropdowns',
  //   name: 'dropdowns',
  //   exact: false,
  //   Icon: MdArrowDropDownCircle,
  // },
  // { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
  // { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
  // { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
  // { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
];

const navContents = [
  // { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
  // { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
];

//  Login

// const pageContents = [
//   { to: '/login', name: 'ورود / ثبت نام', exact: false, Icon: MdAccountCircle },
//   // {
//   //   to: '/login-modal',
//   //   name: 'login modal',
//   //   exact: false,
//   //   Icon: MdViewCarousel,
//   // },
// ];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
    navItems: [],
    azmon: [],
  };
  componentDidMount() {
    if (cookies.get('userInfo') && cookies.get('userInfo').role === '2') {
      this.setState({
        navItems: [
          { to: '/dashboard', name: 'داشبورد', exact: true, Icon: MdDashboard },
          // {
          //   to: '/CreateQuizPage',
          //   name: 'ساخت آزمون',
          //   exact: false,
          //   Icon: QuizIcon,
          // },
          // { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
          // { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
        ],
        azmon: [
          {
            to: '/CreateQuizPage',
            name: 'ساخت آزمون',
            exact: false,
            Icon: QuizIcon,
          },
          {
            to: '/LoadQuizPage',
            name: 'آزمون های من',
            exact: false,
            Icon: QuizIcon,
          },
        ],
      });
    } else if (
      cookies.get('userInfo') &&
      cookies.get('userInfo').role === '3'
    ) {
      this.setState({
        navItems: [
          { to: '/dashboard', name: 'داشبورد', exact: true, Icon: MdDashboard },
        ],
      });
    } else if (
      cookies.get('userInfo') &&
      cookies.get('userInfo').role === '1'
    ) {
      this.setState({
        navItems: [
          { to: '/dashboard', name: 'داشبورد', exact: true, Icon: MdDashboard },
        ],
      });
    }
  }
  componentWillUnmount() {
    this.setState({ navItems: [] });
  }
  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <div className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">TamBook</span>
            </div>
          </Navbar>
          <Nav vertical>
            {this.state.navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            {/* Login */}
            {cookies.get('userInfo') && cookies.get('userInfo').role === '2' ? (
              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('Pages')}
              >
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="d-flex">
                    <MdPages className={bem.e('nav-item-icon')} />
                    <span className="">آزمون</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenPages
                        ? 'rotate(0deg)'
                        : 'rotate(90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem>
            ) : (
              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('Pages')}
              >
                <BSNavLink className={bem.e('nav-item-collapse')}>
                  <div className="d-flex">
                    <MdPages className={bem.e('nav-item-icon')} />
                    <span className="">صفحه ها</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenPages
                        ? 'rotate(0deg)'
                        : 'rotate(90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                    }}
                  />
                </BSNavLink>
              </NavItem>
            )}
            {/* Azmon */}
            <Collapse isOpen={this.state.isOpenPages}>
              {this.state.azmon.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
