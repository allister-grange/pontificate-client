import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import '../../styles/CardPage.css';
import useGameState from '../../hooks/useGameState';

const CardPage = (props: any): any => {

  const objectsCards = ['Suspension Bridge', 'Syringe', 'Paper Clip', 'Accessory',
    'Bill', 'Log', 'Camera', 'Flint', 'Signpost']

  const { gameId, userName } = props.location.state;

  const [indexOfLastCard, setIndexOfLastCard] = useState(-1);
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState(-1);
  const [correctCount, setCorrectCount] = useState(0);
  const [counter, setCounter] = useState(60);
  const { player, addPointToPlayer } = useGameState(gameId);

  useEffect(() => {
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }, []);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  const nextCard = () => {
    addPointToPlayer(correctCount + 1, userName);
    setCorrectCount(correctCount + 1);
    setIndexOfLastCard(indexOfCurrentCard);
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }

  const lastCard = () => {
    if (indexOfLastCard === -1) {
      setIndexOfLastCard(indexOfCurrentCard);
      setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
    }
    else {
      setIndexOfCurrentCard(indexOfLastCard);
      setIndexOfLastCard(indexOfCurrentCard);
    }
  }

  return (
    <div className="card-container">
      <div className="words-to-guess">
        <h1>
          {objectsCards[indexOfCurrentCard]}
        </h1>
        <h4>
          {objectsCards[indexOfLastCard]}
        </h4>
      </div>

      <div className="correct-card-count">
        <p style={{ paddingLeft: '2px' }}>time left: {counter} | correct&nbsp;</p>
        <h4 style={{ paddingRight: '2px' }}>{correctCount}</h4>
      </div>

      <div className="buttons">
        <div style={{ paddingRight: '15px' }}>
          <Button variant="outlined" onClick={lastCard}>
            skip
          </Button>
        </div>

        <div style={{ paddingLeft: '15px' }}>
          <Button variant="outlined" onClick={nextCard}>
            correct
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardPage;
