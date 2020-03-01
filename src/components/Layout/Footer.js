import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

// import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <Navbar className="bg-dark justify-content-center">
      <Nav navbar>
        <NavItem className="text-light footer-text">
          تمام حقوق برای JabizParda © 2019 محفوظ است
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
