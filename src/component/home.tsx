import React, { useEffect, useState } from 'react';
import { Spinner, Jumbotron, DropdownButton, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { fetchHomeContent } from '../api';

interface HomeProps {
  useStaging?: boolean
}

export const Home = (props: HomeProps) => {

  const [homeContent, setHomeContent] = useState<JSX.Element>(<Spinner animation="grow"/>);

  useEffect(() => {
    const getHomeContent = async () => {
      const response = await fetchHomeContent(props.useStaging);
      const responseObject = response.object;
      if (responseObject) {
        setHomeContent(
          <div dangerouslySetInnerHTML={{__html: responseObject.content}} />
        );
      }
    }
    getHomeContent();
  }, []);

  const prefix = props.useStaging ? "/staging" : "";

  return (
    <div className="page-layout">
      <Jumbotron>
        {homeContent}
      </Jumbotron>
      <DropdownButton
        variant="dark"
        id="dropdown-button-drop-right"
        title="View Stories"
        drop="right"
      >
        <Dropdown.Item>
          <LinkContainer to={`${prefix}/kids-stories/list/en`}>
            <Dropdown.Item>English</Dropdown.Item>
          </LinkContainer>
        </Dropdown.Item>
        <Dropdown.Item>
          <LinkContainer to={`${prefix}/kids-stories/list/kn`}>
            <Dropdown.Item>ಕನ್ನಡ</Dropdown.Item>
          </LinkContainer>
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
