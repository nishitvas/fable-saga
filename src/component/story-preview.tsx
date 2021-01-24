import React from 'react';
import { Story } from '../model';
import { Card, Button } from 'react-bootstrap';

interface StoryPreviewProps {
  story: Story
}

export const StoryPreview = (props: StoryPreviewProps) => {
  return (
    <Card>
      <Card.Img variant="top" src={props.story.thumbnail} width="25%" height="25%" />
      <Card.Body>
        <Card.Title>{props.story.title}</Card.Title>
        <Card.Text>
          {props.story.description}
        </Card.Text>
        <Button variant="dark">Read</Button>
      </Card.Body>
    </Card>
  );
}
