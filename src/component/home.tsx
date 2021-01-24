import React, { useEffect, useState } from 'react';
import { Spinner, Jumbotron, Button } from 'react-bootstrap';
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
      <LinkContainer to={`${prefix}/stories`}>
        <Button variant="dark">View stories</Button>
      </LinkContainer>
    </div>
  );
}
