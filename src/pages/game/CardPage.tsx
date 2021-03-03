import React, { useEffect, useState } from 'react';
import '../../styles/CardPage.css';
import DisplayCard from '../../components/DisplayCard';
import useGameState from '../../hooks/useGameState';

const CardPage = (props: any): any => {

  const { gameId, userName } = props.location.state;

  const [counter, setCounter] = useState(5);
  const [countdownBeforePlaying, setCountDownBeforePlaying] = useState(5);
  const {players, addPointToPlayer, getAllPlayersInGame, triggerChangeTurnStatusForUser} = useGameState(gameId);
  const [turnIsActive, setTurnIsActive] = useState(false);

  useEffect(() => {
    document.title = `${userName} | Pontificate`
    getAllPlayersInGame();
  }, []);

  useEffect(() => {
    console.log("called now because players was updated");
    console.log(players);

    players.map(player => {
      if (player.userName === userName) {
        setTurnIsActive(player.turnStatus === 'active');
      }
    });

  }, [players]);

  useEffect(() => {
    if (counter > 0 && countdownBeforePlaying === 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
    else if(counter === 0) {
      triggerChangeTurnStatusForUser(userName, "waiting");
    }
  }, [counter, countdownBeforePlaying]);

  useEffect(() => {
    if (countdownBeforePlaying > 0 && turnIsActive) {
      setTimeout(() => setCountDownBeforePlaying(countdownBeforePlaying - 1), 1000);
    }
  }, [countdownBeforePlaying, turnIsActive]);

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
