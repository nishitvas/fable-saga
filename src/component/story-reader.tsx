import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchStory } from '../api';
import { Story } from '../model';
import { Alert, Card, Spinner } from 'react-bootstrap';

interface StoryReaderParams {
  slug: string
}

interface StoryReaderProps {
  useStaging?: boolean
}

interface FlashMessageType {
  message: string,
  variant: 'info' | 'danger'
}

export const StoryReader = (props: StoryReaderProps) => {

  const [flashMessage, setFlashMessage] = useState<FlashMessageType>();
  const [story, setStory] = useState<Story>();
  const { slug } = useParams<StoryReaderParams>();

  useEffect(() => {
    const getStory = async () => {
      const response = await fetchStory(slug, props.useStaging);
      const storyObject = response.object;
      if (storyObject) {
        setStory({
          slug: storyObject.slug,
          title: storyObject.title,
          thumbnail: storyObject.thumbnail,
          description: storyObject.metadata.description,
          content: storyObject.content
        });
      } else {
        setFlashMessage({
          message: "Sorry !!! This story does not exist.",
          variant: "danger"
        });
      }
    }
    getStory();
  }, []);

  return (
    <div className="page-layout">
      {
        flashMessage ?
          <Alert variant={flashMessage.variant}>
            {flashMessage.message}
          </Alert> : story === undefined ?
        <Spinner animation="grow" /> :
        <Card>
          <Card.Img variant="top" className="story-img" src={story.thumbnail} />
          <Card.Body>
            <Card.Title className="story-reader-title">{story.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{story.description}</Card.Subtitle>
            <br/>
            <Card.Text>
              <div dangerouslySetInnerHTML={{__html: story.content === undefined ? "": story.content}} />
            </Card.Text>
          </Card.Body>
        </Card>
      }
    </div>
  );
}
