import React, { useEffect, useState } from 'react';
import '../../styles/CardPage.css';
import useGameState from '../../hooks/useGameState';
import DisplayCard from '../../components/DisplayCard';

const CardPage = (props: any): any => {

  const { gameId, userName } = props.location.state;

  const [counter, setCounter] = useState(60);
  const [countdownBeforePlaying, setCountDownBeforePlaying] = useState(5);
  const { player, addPointToPlayer } = useGameState(gameId);

  //to come from game state later
  const isTurn = true;

  useEffect(() => {
    document.title = `${userName} | Pontificate`
  }, []);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  useEffect(() => {
    if (countdownBeforePlaying > 0) {
      setTimeout(() => setCountDownBeforePlaying(countdownBeforePlaying - 1), 1000);
    }
  }, [countdownBeforePlaying]);

  return (
    <div className="card-page-container">
      {
        !isTurn ?
          <div className="waiting-turn-message-container">
            <h3>
              please wait your turn :)
            </h3>
          </div>
          :
          countdownBeforePlaying > 0 ?
            <div className="waiting-turn-message-container">
              <h1>
                {countdownBeforePlaying}
              </h1>
            </div>
            :
            <DisplayCard
              addPointToPlayer={addPointToPlayer}
              counter={counter}
              userName={userName}
            />
      }
    </div>
  );
}

export default CardPage;
