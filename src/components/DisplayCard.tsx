import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Player } from '../types/index';


type DisplayCardProps = {
  addPointToPlayer: (points: number, userName: string) => void,
  userName: string,
  counter: number
}

const DisplayCard = ({userName, counter, addPointToPlayer}: DisplayCardProps): any => {
  
  const objectsCards = ['Suspension Bridge', 'Syringe', 'Paper Clip', 'Accessory',
  'Bill', 'Log', 'Camera', 'Flint', 'Signpost']

  const [correctCount, setCorrectCount] = useState(0);
  const [indexOfLastCard, setIndexOfLastCard] = useState(-1);
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState(-1);

  useEffect(() => {
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }, [])

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
    <div className="display-card-container">
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

export default DisplayCard;