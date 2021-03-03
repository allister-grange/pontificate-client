import React, { useEffect, useState } from 'react';
import '../../styles/CardPage.css';
import DisplayCard from '../../components/DisplayCard';
import usePlayerGameState from '../../hooks/usePlayerGameState';

const CardPage = (props: any): any => {

  const { gameId, userName } = props.location.state;

  const [counter, setCounter] = useState(60);
  const [countdownBeforePlaying, setCountDownBeforePlaying] = useState(5);
  const { player, turnIsActive, addPointToPlayer } = usePlayerGameState(gameId);

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
        !turnIsActive ?
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
