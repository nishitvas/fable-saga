import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { chunk } from 'lodash';
import { updateBackgroundForPath } from '../../util';

interface Game {
  title: string,
  description: string,
  url: string
}

const gamesInRowForSmallDevices = 1;

const games: Game[] = [
  {
    title: "Fifteen Puzzle Game",
    description: "Arrange the numbers by moving the tiles around.",
    url: "/game/fifteen-puzzle-game"
  }
];

export const Games = () => {

  updateBackgroundForPath(window.location.pathname);
  const [gamesContainer, setGamesContainer] = useState<JSX.Element>();
  const [gamesContainerSmallDevices, setGamesContainerSmallDevices] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const leftGames: Game[] = [];
    const rightGames: Game[] = [];
    for (let i=0; i < games.length; i++) {
      if (i % 2 === 0) {
        leftGames.push(games[i]);
      } else {
        rightGames.push(games[i]);
      }
    }
    const container = <Row>
      <Col>
        {
          leftGames.map((game, idx) =>
            <div key={idx} className="card custom-card">
              <div className="custom-card-container">
                <h4>{game.title}</h4>
                <span>{game.description}</span>
                <br/><br/>
                <LinkContainer to={game.url}>
                  <Button variant="dark">Play</Button>
                </LinkContainer>
              </div>
            </div>
          )
        }
      </Col>
      <Col>
        {
          rightGames.map((game, idx) =>
            <div key={idx} className="card custom-card">
              <div className="custom-card-container">
                <h4>{game.title}</h4>
                <span>{game.description}</span>
                <br/><br/>
                <LinkContainer to={game.url}>
                  <Button variant="dark">Play</Button>
                </LinkContainer>
              </div>
            </div>
          )
        }
      </Col>
    </Row>;
    setGamesContainer(container);
  }, []);

  useEffect(() => {
    const chunkedGames = chunk(games, gamesInRowForSmallDevices);
    const container = chunkedGames.map((cols, row_idx) => (
      <Row key={row_idx}>
        {cols.map((col, col_idx) => (
          <Col className="story-preview-col" key={col_idx}>
            <div className="card custom-card">
              <div className="custom-card-container">
                <h4>{col.title}</h4>
                <span>{col.description}</span>
                <br/><br/>
                <LinkContainer to={col.url}>
                  <Button variant="dark">Play</Button>
                </LinkContainer>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    ));
    setGamesContainerSmallDevices(container);
  }, []);
  return (
    <div className="page-layout">
      <Container className="d-none d-lg-block">
        {gamesContainer}
      </Container>
      <Container className="d-lg-none">
        {gamesContainerSmallDevices}
      </Container>
    </div>
  );
}
