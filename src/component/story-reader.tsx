import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStory } from '../api';
import { Story } from '../model';
import { Card, Spinner } from 'react-bootstrap';

interface StoryReaderParams {
  slug: string
}

export const StoryReader = () => {

  const [story, setStory] = useState<Story>();
  const { slug } = useParams<StoryReaderParams>();

  useEffect(() => {
    const getStory = async () => {
      const response = await fetchStory(slug);
      const storyObject = response.object;
      setStory({
        slug: storyObject.slug,
        title: storyObject.title,
        thumbnail: storyObject.thumbnail,
        description: storyObject.metadata.description,
        content: storyObject.content
      });
    }
    getStory();
  }, []);

  return (
    <div className="page-layout">
      <Card>
        {
          story === undefined ?
            <Spinner animation="grow">Loading...</Spinner> :
            <Fragment>
              <Card.Img variant="top" src={story.thumbnail} width="25%" height="25%" />
              <Card.Body>
                <Card.Title className="story-reader-title">{story.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{story.description}</Card.Subtitle>
                <br/>
                <Card.Text>
                  <div dangerouslySetInnerHTML={{__html: story.content === undefined ? "": story.content}} />
                </Card.Text>
              </Card.Body>
            </Fragment>
        }
      </Card>
    </div>
  );
}
