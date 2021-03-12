import React, { useEffect, useState } from 'react';
import { Spinner, Jumbotron } from 'react-bootstrap';
import { fetchFunFactsContent } from '../api';

interface FunFactsProps {
  useStaging?: boolean
}

export const FunFacts = (props: FunFactsProps) => {

  const [funFactsContent, setFunFactsContent] = useState<JSX.Element>(<Spinner animation="grow"/>);

  useEffect(() => {
    const getFunFactsContent = async () => {
      const response = await fetchFunFactsContent(props.useStaging);
      const responseObject = response.object;
      if (responseObject) {
        setFunFactsContent(
          <div dangerouslySetInnerHTML={{__html: responseObject.content}} />
        );
      }
    }
    getFunFactsContent();
  }, []);

  const prefix = props.useStaging ? "/staging" : "";

  return (
    <div className="page-layout">
      <Jumbotron>
        {funFactsContent}
      </Jumbotron>
    </div>
  );
}
