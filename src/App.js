import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import NotFoundPage from 'pages/404Page';
import ServerErrorPage from 'pages/500Page';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';
import './styles/CustomStyles/custom.css';
import './styles/CustomStyles/alertify.css';
import './styles/CustomStyles/rc-pagination.css';
import { connect } from 'react-redux';
import { PrivateRoute } from 'components/PrivateRoute';
import Cookies from 'universal-cookie';
import IdleTimer from 'react-idle-timer';
import { history } from './_helpers';
const cookies = new Cookies();

// Teacher
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const AddTestPage = React.lazy(() => import('pages/AddTestPage'));
const Template = React.lazy(() => import('pages/TemplatePage.js'));
const CreateQuizPage = React.lazy(() => import('pages/CreateQuizPage.js'));
const LoadQuizPage = React.lazy(() => import('pages/LoadQuizPage.js'));
const QuizResult = React.lazy(() =>
  import('componentsStudent/test/QuizResult.js'),
);
const QuizDetailResult = React.lazy(() =>
  import('componentsStudent/test/QuizDetailResult.js'),
);
// const TablePage = React.lazy(() => import('pages/TablePage'));
// const TypographyPage = React.lazy(() => import('pages/TypographyPage'));

// Students
const DashboardPageStudent = React.lazy(() =>
  import('componentsStudent/pages/DashboardPagesStudent'),
);
const TestPageStudent = React.lazy(() =>
  import('./componentsStudent/pages/TestPageStudent'),
);
const StudyPageStudent = React.lazy(() =>
  import('./componentsStudent/pages/StudyPageStudent'),
);
const DemoPageStudent = React.lazy(() =>
  import('./componentsStudent/pages/DemoPageStudent'),
);
const TestBookDetailsPageStudent = React.lazy(() =>
  import('./componentsStudent/pages/TestBookDetailsPageStudent'),
);
const LoadQuizPageStudent = React.lazy(() =>
  import('./componentsStudent/pages/LoadQuizPageStudent'),
);

// Admin
const DashboardPageAdmin = React.lazy(() =>
  import('componentsAdmin/Pages/DashboardPagesAdmin'),
);
const UsersPageAdmin = React.lazy(() =>
  import('componentsAdmin/Pages/UsersPageAdmin'),
);
const BookPageAdmin = React.lazy(() =>
  import('componentsAdmin/Pages/BookPageAdmin'),
);
const TestPageAdmin = React.lazy(() =>
  import('componentsAdmin/Pages/TestPageAdmin'),
);
const ViewTestAdmin = React.lazy(() =>
  import('componentsAdmin/Pages/ViewTestAdmin'),
);
const QuizPageAdmin = React.lazy(() =>
  import('componentsAdmin/Pages/QuizPageAdmin'),
);
const SoldBooksPageAdmin = React.lazy(() =>
  import('componentsAdmin/Pages/SoldBooksPageAdmin'),
);
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  // For  React Idle Time
  constructor(props) {
    super(props);
    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
  }
  shouldComponentUpdate() {
    return true;
  }
  render() {
    if (window.location.href.includes('demo')) {
      const TestBookId = window.location.href.split('?id=')[1];
      sessionStorage.setItem(
        'demo',
        JSON.stringify({ status: true, id: TestBookId }),
      );
    }
    return (
      // For  React Idle Time
      <div>
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={1000 * 60 * 15}
        />
        {/* your app here */}
        <BrowserRouter basename={getBasename()}>
          <GAListener>
            <Switch>
              <LayoutRoute
                exact
                path="/404"
                layout={EmptyLayout}
                component={props => <NotFoundPage {...props} />}
              />
              <LayoutRoute
                exact
                path="/500"
                layout={EmptyLayout}
                component={props => <ServerErrorPage {...props} />}
              />
              <LayoutRoute
                exact
                path="/login"
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_LOGIN} />
                )}
              />
              <LayoutRoute
                exact
                path="/signup"
                layout={EmptyLayout}
                component={props => (
                  <AuthPage {...props} authState={STATE_SIGNUP} />
                )}
              />

              <MainLayout breakpoint={this.props.breakpoint}>
                <React.Suspense
                  fallback={<PageSpinner />}
                  notFound={<NotFoundPage />}
                >
                  <Route exact path="/login" component={AuthPage} />

                  {window.location.href.includes('demo') ? (
                    <Redirect
                      to={{
                        pathname: '/demo/:رایگان',
                        state: {
                          MasterId: 0,
                          ChapterId: `${Number(
                            JSON.parse(sessionStorage.getItem('demo')).id,
                          )}`,
                          Action: 1,
                          name: 'رایگان',
                        },
                      }}
                    />
                  ) : null}

                  {cookies.get('userInfo') &&
                  cookies.get('userInfo').role === '2' ? (
                    <>
                      <PrivateRoute
                        exact
                        path="/dashboard"
                        component={DashboardPage}
                      />
                      <PrivateRoute exact path="/" component={DashboardPage} />
                      <PrivateRoute
                        path="/add-test/:name"
                        component={AddTestPage}
                      />
                      <PrivateRoute
                        path="/CreateQuizPage"
                        component={CreateQuizPage}
                      />
                      <PrivateRoute
                        path="/EditQuizPage/:name"
                        component={CreateQuizPage}
                      />
                      <PrivateRoute
                        path="/LoadQuizPage"
                        component={LoadQuizPage}
                      />
                      <PrivateRoute path="/500" component={ServerErrorPage} />
                      <PrivateRoute
                        exact
                        path="/404"
                        component={NotFoundPage}
                        title={'PageNotFound'}
                      />
                    </>
                  ) : cookies.get('userInfo') &&
                    cookies.get('userInfo').role === '3' ? (
                    <>
                      <PrivateRoute
                        exact
                        path="/dashboard"
                        component={DashboardPageStudent}
                      />
                      <PrivateRoute
                        path="/new-test/:name"
                        component={TestPageStudent}
                      />
                      <PrivateRoute
                        path="/quiz-result"
                        component={QuizResult}
                      />
                      <PrivateRoute
                        path="/quiz-result-detailes"
                        component={QuizDetailResult}
                      />
                      <PrivateRoute
                        path="/study/:name"
                        component={StudyPageStudent}
                      />
                      <PrivateRoute
                        path="/demo/:name"
                        component={DemoPageStudent}
                      />
                      <PrivateRoute
                        path="/test-book-details/:name"
                        component={TestBookDetailsPageStudent}
                      />
                      <PrivateRoute
                        path="/load-quiz"
                        component={LoadQuizPageStudent}
                      />
                    </>
                  ) : cookies.get('userInfo') &&
                    cookies.get('userInfo').role === '1' ? (
                    <>
                      <PrivateRoute
                        exact
                        path="/dashboard"
                        component={DashboardPageAdmin}
                      />
                      <PrivateRoute
                        exact
                        path="/users"
                        component={UsersPageAdmin}
                      />
                      <PrivateRoute
                        exact
                        path="/users/:name"
                        component={UsersPageAdmin}
                      />
                      <PrivateRoute
                        exact
                        path="/books"
                        component={BookPageAdmin}
                      />
                      <PrivateRoute
                        exact
                        path="/books/:name"
                        component={BookPageAdmin}
                      />
                      <PrivateRoute
                        exact
                        path="/tests"
                        component={TestPageAdmin}
                      />
                      <PrivateRoute
                        exact
                        path="/view-test"
                        component={ViewTestAdmin}
                      />
                      <PrivateRoute
                        exact
                        path="/quiz"
                        component={QuizPageAdmin}
                      />
                      <PrivateRoute
                        exact
                        path="/soldBooks"
                        component={SoldBooksPageAdmin}
                      />
                    </>
                  ) : (
                    <Redirect to={{ pathname: '/login' }} />
                  )}
                </React.Suspense>
              </MainLayout>
              <Redirect to="/404" />
            </Switch>
          </GAListener>
        </BrowserRouter>
      </div>
    );
  }
  // For  React Idle Time
  _onAction(e) {
    // console.log('user did something', e);
  }

  _onActive(e) {
    // console.log('user is active', e);
    // console.log('time remaining', this.idleTimer.getRemainingTime());
  }
  _onIdle(e) {
    // console.log('user is idle', e);
    // console.log('last active', this.idleTimer.getLastActiveTime());
    cookies.remove('user', { path: '/' });
    cookies.remove('userInfo', { path: '/' });
    history.push('/login');
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query);

function mapStateToProps(state) {
  return {
    auth: state.authentication.user,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
