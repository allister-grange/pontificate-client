import React, { useEffect, useState } from 'react';
import '../../styles/CardPage.css';
import DisplayCard from '../../components/DisplayCard';
import useGameState from '../../hooks/useGameState';

const CardPage = (props: any): any => {

  const TURN_LENGTH = 5;
  const COUNTDOWN_LENGTH = 5;

  const { gameId, userName } = props.location.state;

  const [counter, setCounter] = useState(TURN_LENGTH);
  const [points, setPoints] = useState(0);
  const [countdownBeforePlaying, setCountDownBeforePlaying] = useState(COUNTDOWN_LENGTH);
  const { players, getPointsForPlayer, addPointToPlayer, getAllPlayersInGame, triggerChangeTurnStatusForUser } = useGameState(gameId);
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
        // setPoints(player.points);
      }
    });

    setPoints(getPointsForPlayer(userName));

  }, [players]);

  useEffect(() => {
    if (counter > 0 && countdownBeforePlaying === 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
    else if (counter === 0) {
      triggerChangeTurnStatusForUser(userName, "waiting");
      setCounter(TURN_LENGTH);
      setCountDownBeforePlaying(COUNTDOWN_LENGTH);
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
              addPointToPlayer={() => {
                addPointToPlayer(points + 1, userName);
                setPoints(points + 1);
              }}
              counter={counter}
              userName={userName}
            />
      }
    </div>
  );
}

export default CardPage;
