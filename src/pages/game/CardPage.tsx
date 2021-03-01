import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import '../../styles/CardPage.css';
import useGameState from '../../hooks/useGameState';

const CardPage = (props: any): any => {

  const objectsCards = ['Suspension Bridge', 'Syringe', 'Paper Clip', 'Accessory',
    'Bill', 'Log', 'Camera', 'Flint', 'Signpost']
    
  const { gameId, userId } = props.location.state;

  const [indexOfLastCard, setIndexOfLastCard] = useState(-1);
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState(-1);
  const [correctCount, setCorrectCount] = useState(0);
  const { players, getPlayersInGame, addPointToPlayer } = useGameState(gameId);

  useEffect(() => {
    console.log(userId);
    
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }, []);

  const nextCard = () => {
    addPointToPlayer(correctCount + 1, userId);
    setCorrectCount(correctCount + 1);
    setIndexOfLastCard(indexOfCurrentCard);
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }

  const lastCard = () => {
    if(indexOfLastCard === -1){      
      setIndexOfLastCard(indexOfCurrentCard);
      setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
    }
    else{
      setIndexOfCurrentCard(indexOfLastCard);
      setIndexOfLastCard(indexOfCurrentCard);  
    }
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
        <p style={{ paddingLeft: '2px'}}>correct</p>
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
