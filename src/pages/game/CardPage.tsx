import React, { useEffect, useState } from 'react';

import './CardPage.css';
import { Button } from '@material-ui/core';

function CardPage() {

  const objectsCards = ['Suspension Bridge', 'Syringe', 'Paper Clip', 'Accessory',
    'Bill', 'Log', 'Camera', 'Flint', 'Signpost']

  const [indexOfLastCard, setIndexOfLastCard] = useState(-1);
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState(-1);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }, []);

  const nextCard = () => {
    setCorrectCount(correctCount + 1);
    setIndexOfLastCard(indexOfCurrentCard);
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }

  //use a stack?
  const lastCard = () => {
    setIndexOfCurrentCard(indexOfLastCard);
    setIndexOfLastCard(indexOfCurrentCard);
  }

  return (
    <div className="cardContainer">
      <div className="wordsToGuess">
        <h1>
          {objectsCards[indexOfCurrentCard]}
        </h1>
        <h4>
          {objectsCards[indexOfLastCard]}
        </h4>
      </div>

      <div className="correctCardCount">
        <h4 style={{ paddingRight: '2px'}}>{correctCount}</h4>
        <p style={{ paddingLeft: '2px'}}>correct cards</p>
      </div>

      <div className="buttons">
        <div style={{ paddingRight: '15px' }}>
          <Button variant="outlined" onClick={lastCard}>
            incorrect
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
