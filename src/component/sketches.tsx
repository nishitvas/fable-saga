import React, { useState, useEffect } from 'react';
import { Alert, Container, Row, Col, Carousel, Modal, Button } from 'react-bootstrap';
import { fetchAllSketches } from '../api';
import { Sketch } from '../model';
import { chunk } from 'lodash';

interface FlashMessageType {
  message: string,
  variant: 'info' | 'danger'
}

interface SketchesProps {
  useStaging?: boolean
}

const sketchesInRow = 3;

export const Sketches = (props: SketchesProps) => {

  const [flashMessage, setFlashMessage] = useState<FlashMessageType>();
  const [sketches, setSketches] = useState<Sketch[]>([]);
  const [sketchesContainer, setSketchesContainer] = useState<JSX.Element[]>([]);
  const [carouselItems, setCarouselItems] = useState<JSX.Element[]>([]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    const getAllSketches = async () => {
      const response = await fetchAllSketches(props.useStaging);
      const sketchesResponse: Sketch[] = [];
      if (response.objects) {
        for (let responseObject of response.objects) {
          sketchesResponse.push({
            slug: responseObject.slug,
            title: responseObject.title,
            content: responseObject.content,
            url: responseObject.metadata[""].url
          });
        }
        setSketches(sketchesResponse);
      } else {
        setFlashMessage({
          message: "No sketches found !!!",
          variant: "info"
        });
      }
    }
    getAllSketches();
  }, []);

  const showSketch = (e: any) => {
    const classList = e.target.classList[1];
    const index = parseInt(classList.split("-")[1]);
    setCarouselIndex(index);
    setShow(true);
  }

  const handleSelect = (selectedIndex: number, e: any) => {
    setCarouselIndex(selectedIndex);
  };

  useEffect(() => {
    const chunkedSketches = chunk(sketches, sketchesInRow);
    const container = chunkedSketches.map((cols, row_idx) => (
      <Row key={row_idx}>
        {cols.map((col, col_idx) => (
          <Col className="sketch-preview-col d-flex justify-content-center" key={col_idx}>
            <div className="img-hover-zoom d-flex align-items-center">
              <img
                src={col.url}
                key={col_idx}
                className={["img-thumbnail", "Index-" + ((row_idx * sketchesInRow) + col_idx).toString()].join(" ")}
                alt={col.title}
                onClick={showSketch}
              />
            </div>
          </Col>
        ))}
      </Row>
    ));
    setSketchesContainer(container);
    const carouselItemsContainer = sketches.map((sketch, idx) => (
      <Carousel.Item key={idx}>
        <img
          className="d-block w-100"
          src={sketch.url}
          alt={sketch.title}
        />
        <Carousel.Caption>
          <h3>{sketch.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ));
    setCarouselItems(carouselItemsContainer);
  }, [sketches]);

  return (
    <div className="page-layout">
      {
        flashMessage ?
        <Alert variant={flashMessage.variant}>
          {flashMessage.message}
        </Alert> : ''
      }
      <Container>
        {sketchesContainer}
      </Container>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Carousel className="carousel" activeIndex={carouselIndex} onSelect={handleSelect}>
          {carouselItems}
        </Carousel>
      </Modal>
    </div>
  );
}
