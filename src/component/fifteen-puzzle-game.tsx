import React, { useState, useEffect, useCallback } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { Fireworks } from './fireworks';
import { chunk } from 'lodash';
import './fifteen-puzzle-game.css';

interface GameStateType {
  gameState: number[],
  freePosition: number
}

const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
}

const findInversions = (gameState: number[]) => {
  let inversions = 0;
  for (let i=0; i < gameState.length-1; i++) {
    for (let j=i+1; j < gameState.length-1; j++) {
      if (gameState[i] > gameState[j]) {
        inversions++;
      }
    }
  }
  return inversions;
}

const isGameNotSolvable = (gameState: number[]) => {
  const inversions = findInversions(gameState);
  return inversions % 2 !== 0;
}

const randomizeGameState = (n: number): GameStateType => {
  const gameArray = Array.from(new Array(n), (val, index) => index);
  const gameState: number[] = [];
  let zeroPosition = n - 1;
  for (let i=0; i < n; i++) {
    let randomInt = 0;
    if (gameArray.length !== 1) {
      randomInt = getRandomInt(gameArray.length);
    }
    const numberToFill = gameArray.splice(randomInt, 1)[0];
    if (numberToFill === 0) {
      zeroPosition = i;
    }
    gameState[i] = numberToFill;
  }
  const numberAtLastPosition = gameState[n - 1];
  gameState[n - 1] = 0;
  gameState[zeroPosition] = numberAtLastPosition;
  if (isGameWon(gameState) || isGameNotSolvable(gameState)) {
    return randomizeGameState(n);
  } else {
    return {
      gameState: gameState,
      freePosition: n - 1
    };
  }
}

const isGameWon = (gameState: number[]) => {
  const n = gameState.length;
  if (gameState[n-1] !== 0) {
    return false;
  }
  let isWon = true;
  for (let i=0; i < n-1; i++) {
    if (gameState[i] !== i+1) {
      isWon = false;
      break;
    }
  }
  return isWon;
}

export const FifteenPuzzleGame = () => {

  const [difficulty, setDifficulty] = useState<number>(3);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [freePosition, setFreePosition] = useState<number>(0);
  const [gameState, setGameState] = useState<number[]>([]);
  const [gameContainer, setGameContainer] = useState<JSX.Element[]>();

  const moveIfPossible = useCallback((idx) => {
    if (gameWon) {
      return;
    }
    const movePossibility: number[] = [idx+difficulty, idx-difficulty];
    if ((idx+1) % difficulty !== 0) {
      movePossibility.push(idx+1);
    }
    if (idx % difficulty !== 0) {
      movePossibility.push(idx-1);
    }
    if (movePossibility.includes(freePosition)) {
      const numberAtIndex = gameState[idx];
      const newGameState = gameState.splice(0);
      newGameState[idx] = 0;
      newGameState[freePosition] = numberAtIndex;
      setFreePosition(idx);
      setGameState(newGameState);
    }
  }, [gameState, freePosition, gameWon]);

  useEffect(() => {
    setGameWon(isGameWon(gameState));
  }, [gameState, freePosition]);

  useEffect(() => {
    const chunkedGameState = chunk(gameState, difficulty);
    const container = chunkedGameState.map(
      (row, r_idx) => <div className={`grid grid-${difficulty} puzzle-game-row`} key={r_idx}>{row.map(
        (col, c_idx) => {
          const index = (r_idx * difficulty) + c_idx;
          const el = col === 0 ? <div></div> : <Button
            variant={index+1 === col ? "success" : "secondary"}
            onClick={() => moveIfPossible(index)}
            disabled={gameWon}
            className="puzzle-game-btn"
          >
            {col}
          </Button>;
          return <div className="puzzle-game-col" key={c_idx}>{el}</div>;
        }
      )}</div>
    );
    setGameContainer(container);
  }, [gameState, gameWon]);

  const resetGame = useCallback((size) => {
    const randomeGameState = randomizeGameState(size * size);
    setGameState(randomeGameState["gameState"]);
    setFreePosition(randomeGameState["freePosition"]);
  }, []);

  const changeDifficulty = useCallback((e) => {
    setDifficulty(parseInt(e.target.value));
    resetGame(parseInt(e.target.value));
  }, []);

  useEffect(() => {
    resetGame(difficulty);
  }, [difficulty]);

  return (
    <div className="puzzle-game-container">
      {
        gameWon ? 
        <React.Fragment>
          <Fireworks />
          <Alert className={`puzzle-game-form puzzle-game-form-${difficulty}`} variant="success">You've won !!!</Alert>
        </React.Fragment> : ''
      }
      <div className={`puzzle-game-form puzzle-game-form-${difficulty}`}>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label><b>Difficulty</b></Form.Label>
          <Form.Control as="select" defaultValue={difficulty} onChange={changeDifficulty} custom>
            <option value="3">3 x 3</option>
            <option value="4">4 x 4</option>
            <option value="5">5 x 5</option>
            <option value="6">6 x 6</option>
          </Form.Control>
        </Form.Group>
        <Button variant="warning" onClick={() => resetGame(difficulty)}>Reset Game</Button>
      </div>
      {gameContainer}
    </div>
  );
}
