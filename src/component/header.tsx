import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <LinkContainer to="/kids-stories">
        <Navbar.Brand><img src="assets/logo.png"/></Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to="/kids-stories/list">
          <Nav.Link>Kids Stories</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/about-us">
          <Nav.Link>About Us</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}
