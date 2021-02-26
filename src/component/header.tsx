import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faPinterest,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  return (
    <Navbar bg="light" variant="light">
      <LinkContainer to="/kids-stories">
        <Navbar.Brand><img src="/assets/logo.png"/></Navbar.Brand>
      </LinkContainer>
      <Nav className="m-auto">
        <LinkContainer to="/kids-stories/list">
          <Nav.Link>Kids Stories</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/about-us">
          <Nav.Link>About Us</Nav.Link>
        </LinkContainer>
      </Nav>
      <Nav>
        <Nav.Link href="https://www.facebook.com/sharer/sharer.php?u=https://fablesaga.com">
          <FontAwesomeIcon icon={faFacebook} size="2x"/>
        </Nav.Link>
        <Nav.Link href="https://twitter.com/intent/tweet?url=https://fablesaga.com&text=Check%20out%20FableSaga%20for%20kids%20stories">
          <FontAwesomeIcon icon={faTwitter} size="2x"/>
        </Nav.Link>
        <Nav.Link href="https://pinterest.com/pin/create/button/?url=https://fablesaga.com&media=&description=Check%20out%20FableSaga%20for%20kids%20stories">
          <FontAwesomeIcon icon={faPinterest} size="2x"/>
        </Nav.Link>
        <Nav.Link href="https://www.linkedin.com/shareArticle?mini=true&url=https://fablesaga.com">
          <FontAwesomeIcon icon={faLinkedin} size="2x"/>
        </Nav.Link>
        <Nav.Link href="mailto:info@example.com?&subject=&cc=&bcc=&body=https://fablesaga.com%0ACheck%20out%20FableSaga%20for%20kids%20stories">
          <FontAwesomeIcon icon={faEnvelope} size="2x"/>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
