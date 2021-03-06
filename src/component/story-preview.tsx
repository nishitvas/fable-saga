import React from 'react';
import { Story } from '../model';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

interface StoryPreviewProps {
  story: Story,
  useStaging?: boolean,
  language?: string,
  variant?: "left"|"right"
}

export const StoryPreview = (props: StoryPreviewProps) => {
  const prefix = props.useStaging ? "/staging/kids-stories" : "/kids-stories";
  const readText = props.language === "kn" ? "ಓದಿ" : "Read";
  let previewElement;
  if (props.variant === "right") {
    previewElement = <div className="card custom-card">
      <div className="custom-card-container">
        <h4>{props.story.title}</h4>
        <span>{props.story.description}</span>
        <br/><br/>
        <LinkContainer to={`${prefix}/story/${props.story.slug}`}>
          <Button variant="dark">{readText}</Button>
        </LinkContainer>
      </div>
      <img className="custom-card-img" src={props.story.thumbnail}/>
    </div>;
  } else {
    previewElement = <div className="card custom-card">
      <img className="custom-card-img" src={props.story.thumbnail}/>
      <div className="custom-card-container">
        <h4>{props.story.title}</h4>
        <span>{props.story.description}</span>
        <br/><br/>
        <LinkContainer to={`${prefix}/story/${props.story.slug}`}>
          <Button variant="dark">{readText}</Button>
        </LinkContainer>
      </div>
    </div>;
  }

  return (
    previewElement
  );
}
