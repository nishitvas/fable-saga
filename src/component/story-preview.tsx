import React from 'react';
import { Story } from '../model';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface StoryPreviewProps {
  story: Story,
  useStaging?: boolean,
  language?: string
}

export const StoryPreview = (props: StoryPreviewProps) => {
  const prefix = props.useStaging ? "/staging/kids-stories" : "/kids-stories";
  const readText = props.language === "kn" ? "ಓದಿ" : "Read";
  return (
    <Card className="story-preview-card">
      <Card.Img variant="top" src={props.story.thumbnail} className="story-preview-img" />
      <Card.Body>
        <Card.Title>{props.story.title}</Card.Title>
        <Card.Text>
          {props.story.description}
        </Card.Text>
        <LinkContainer to={`${prefix}/story/${props.story.slug}`}>
          <Button variant="dark">{readText}</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}
