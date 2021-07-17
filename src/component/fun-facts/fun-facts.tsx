import React, { useEffect, useState } from 'react';
import { Spinner, Jumbotron } from 'react-bootstrap';
import { fetchFunFactsContent } from '../../api';
import { updateBackgroundForPath } from '../../util';

interface FunFactsProps {
  useStaging?: boolean
}

export const FunFacts = (props: FunFactsProps) => {

  updateBackgroundForPath(window.location.pathname);
  const [funFactsContent, setFunFactsContent] = useState<JSX.Element>(<Spinner animation="grow"/>);

  useEffect(() => {
    const getFunFactsContent = async () => {
      const response = await fetchFunFactsContent(props.useStaging);
      const responseObject = response.object;
      if (responseObject) {
        setFunFactsContent(
          <React.Fragment>
            <div className="fun-facts-image-div">
              <img className="fun-facts-image" src={responseObject.thumbnail} />
            </div>
            <div dangerouslySetInnerHTML={{__html: responseObject.content}} />
          </React.Fragment>
        );
      }
    }
    getFunFactsContent();
  }, []);

  const prefix = props.useStaging ? "/staging" : "";

  return (
    <div className="page-layout fun-facts">
      <Jumbotron>
        {funFactsContent}
      </Jumbotron>
    </div>
  );
}
