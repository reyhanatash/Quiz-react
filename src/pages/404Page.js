import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { history } from '../_helpers';

class NotFoundPage extends React.Component {
  render() {
    return (
      <Row
        style={{
          minHeight: '100vh',
          maxHeight: '106vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col md={6} lg={4} className="h-100">
          <div className="notfound">
            <div className="notfound-404"></div>
            <h1>404</h1>
            <h2>Oops! Page Not Be Found</h2>
            <p>
              Sorry but the page you are looking for does not exist, have been
              removed. name changed or is temporarily unavailable
            </p>
            <a href="/dashboard">Back to homepage</a>
          </div>
        </Col>
      </Row>
    );
  }
}

export default NotFoundPage;
