import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <LinkContainer to="/kids-stories">
        <Navbar.Brand>Fable Saga</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to="/kids-stories/list">
          <Nav.Link>Kids Stories</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/sketches">
          <Nav.Link>Sketches</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/about-us">
          <Nav.Link>About Us</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}
