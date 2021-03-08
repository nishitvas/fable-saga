import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllStories } from '../api';
import { Story } from '../model';
import { Alert, Row, Col, Container } from 'react-bootstrap';
import { chunk } from 'lodash';
import { StoryPreview } from './story-preview';

const storiesInRowForSmallDevices = 1;

interface FlashMessageType {
  message: string,
  variant: 'info' | 'danger'
}
interface StoriesProps {
  useStaging?: boolean
}

interface StoriesParams {
  language?: string
}

export const Stories = (props: StoriesProps) => {

  const [flashMessage, setFlashMessage] = useState<FlashMessageType>();
  const [stories, setStories] = useState<Story[]>([]);
  const [storiesContainer, setStoriesContainer] = useState<JSX.Element>();
  const [storiesContainerSmallDevices, setStoriesContainerSmallDevices] = useState<JSX.Element[]>([]);

  const { language } = useParams<StoriesParams>();

  useEffect(() => {
    setStories([]);
    setFlashMessage(undefined);
    const getAllStories = async () => {
      const response = await fetchAllStories(props.useStaging, language);
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
  }, [language]);

  useEffect(() => {
    const leftStories: Story[] = [];
    const rightStories: Story[] = [];
    for (let i=0; i < stories.length; i++) {
      if (i % 2 === 0) {
        leftStories.push(stories[i]);
      } else {
        rightStories.push(stories[i]);
      }
    }
    const container = <Row>
      <Col>
        {
          leftStories.map((story, idx) =>
            <StoryPreview
              key={idx}
              story={story}
              useStaging={props.useStaging}
              language={language}
              variant={idx % 2 === 0 ? "left" : "right"}
            />
          )
        }
      </Col>
      <Col>
        {
          rightStories.map((story, idx) =>
            <StoryPreview
              key={idx}
              story={story}
              useStaging={props.useStaging}
              language={language}
              variant={idx % 2 === 0 ? "right" : "left"}
            />
          )
        }
      </Col>
    </Row>;
    setStoriesContainer(container);
  }, [stories]);

  useEffect(() => {
    const chunkedStories = chunk(stories, storiesInRowForSmallDevices);
    const container = chunkedStories.map((cols, row_idx) => (
      <Row key={row_idx}>
        {cols.map((col, col_idx) => (
          <Col className="story-preview-col" key={col_idx}>
            <StoryPreview story={col} useStaging={props.useStaging} language={language}/>
          </Col>
        ))}
      </Row>
    ));
    setStoriesContainerSmallDevices(container);
  }, [stories, language]);

  return (
    <div className="page-layout">
      {
        flashMessage ?
        <Alert variant={flashMessage.variant}>
          {flashMessage.message}
        </Alert> : ''
      }
      <Container className="d-none d-lg-block">
        {storiesContainer}
      </Container>
      <Container className="d-lg-none">
        {storiesContainerSmallDevices}
      </Container>
    </div>
  );
}
