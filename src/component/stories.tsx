import React, { useState, useEffect } from 'react';
import { fetchAllStories } from '../api';
import { Story } from '../model';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import { chunk } from 'lodash';
import { StoryPreview } from './story-preview';
import './index.css';

const storiesInRow = 2;

interface FlashMessageType {
  message: string,
  variant: 'info' | 'danger'
}
interface StoriesProps {
  useStaging?: boolean
}

export const Stories = (props: StoriesProps) => {

  const [flashMessage, setFlashMessage] = useState<FlashMessageType>();
  const [stories, setStories] = useState<Story[]>([]);
  const [storiesContainer, setStoriesContainer] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const getAllStories = async () => {
      const response = await fetchAllStories(props.useStaging);
      const storiesResponse: Story[] = [];
      if (response.objects) {
        for (let responseObject of response.objects) {
          storiesResponse.push({
            slug: responseObject.slug,
            title: responseObject.title,
            thumbnail: responseObject.thumbnail,
            description: responseObject.metadata.description
          });
        }
        setStories(storiesResponse);
      } else {
        setFlashMessage({
          message: "No stories found !!!",
          variant: "info"
        });
      }
    }
    getAllStories();
  }, []);

  useEffect(() => {
    const chunkedStories = chunk(stories, storiesInRow);
    const container = chunkedStories.map((cols) => (
      <Row>
        {cols.map((col) => (
          <Col className="story-preview-col">
            <StoryPreview story={col} useStaging={props.useStaging}/>
          </Col>
        ))}
      </Row>
    ));
    setStoriesContainer(container);
  }, [stories]);

  return (
    <div className="page-layout">
      {
        flashMessage ?
        <Alert variant={flashMessage.variant}>
          {flashMessage.message}
        </Alert> : ''
      }
      <Container>
        {storiesContainer}
      </Container>
    </div>
  );
}
