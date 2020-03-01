import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { history } from '../_helpers';

class ServerErrorPage extends React.Component {
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
        <div class="notfound">
          <div class="notfound-404 server_error"></div>
          <h1>500</h1>
          <h2>Error</h2>
          <p>Sorry, something went wrong on our end. We are currently trying to fix the problem.</p>
          <a href="/500">Refresh the page</a>
          {/* <p>wait a few minutes</p> */}
        </div>
        </Col>
      </Row>
    );
  }
}

export default ServerErrorPage;
