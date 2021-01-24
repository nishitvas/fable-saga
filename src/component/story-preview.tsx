import React from 'react';
import { Story } from '../model';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface StoryPreviewProps {
  story: Story,
  useStaging?: boolean
}

export const StoryPreview = (props: StoryPreviewProps) => {
  const prefix = props.useStaging ? "staging/" : "";
  return (
    <Card>
      <Card.Img variant="top" src={props.story.thumbnail} width="25%" height="25%" />
      <Card.Body>
        <Card.Title>{props.story.title}</Card.Title>
        <Card.Text>
          {props.story.description}
        </Card.Text>
        <LinkContainer to={`/${prefix}story/${props.story.slug}`}>
          <Button variant="dark">Read</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}
