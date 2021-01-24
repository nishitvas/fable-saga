import React, { useState, useEffect } from 'react';
import { fetchAllStories } from '../api';
import { Story } from '../model';
import { Row, Col, Container } from 'react-bootstrap';
import { chunk } from 'lodash';
import { StoryPreview } from './story-preview';
import './index.css';

const storiesInRow = 2;

export const Stories = () => {

  const [stories, setStories] = useState<Story[]>([]);
  const [storiesContainer, setStoriesContainer] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const getAllStories = async () => {
      const response = await fetchAllStories();
      const storiesResponse: Story[] = [];
      for (let responseObject of response.objects) {
        storiesResponse.push({
          slug: responseObject.slug,
          title: responseObject.title,
          thumbnail: responseObject.thumbnail,
          description: responseObject.metadata.description
        });
      }
      setStories(storiesResponse);
    }
    getAllStories();
  }, []);

  useEffect(() => {
    const chunkedStories = chunk(stories, storiesInRow);
    const container = chunkedStories.map((cols) => (
      <Row>
        {cols.map((col) => (
          <Col>
            <StoryPreview story={col}/>
          </Col>
        ))}
      </Row>
    ));
    setStoriesContainer(container);
  }, [stories]);

  return (
    <div className="page-layout">
      <Container>
        {storiesContainer}
      </Container>
    </div>
  );
}
