import { Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useGameState from "../../hooks/useGameState";
import "../../styles/BoardPage.css";
import useWindowDimensions from "../../components/misc/WindowDimensions";
import Footer from "../../components/misc/Footer";
import GameBoard from "../../components/game/GameBoard";
import { Player } from "../../types";
import { COUNTDOWN_LENGTH, TURN_LENGTH } from "../../constants";

type BoardPageProps = {
  match: any;
  location: any;
};

const BoardPage = ({ match, location }: BoardPageProps): JSX.Element => {
  const { gameId } = match.params; // Gets roomId from URL
  const { pointsToWin } = location.state;
  const { height, width } = useWindowDimensions();
  const [timerCountdown, setTimerCountdown] = useState(0);
  document.title = `${gameId} | Pontificate`;
  const {
    players,
    triggerChangeTurnStatusForUser,
    playerWhoWon,
    getAllPlayersInGame,
  } = useGameState(gameId);

  useEffect(() => {
    getAllPlayersInGame();
  }, [getAllPlayersInGame]);

  useEffect(() => {
    if (players.find((player) => player.turnStatus === "active")) {
      setTimerCountdown(TURN_LENGTH + COUNTDOWN_LENGTH);
    }
  }, [players]);

  useEffect(() => {
    if (timerCountdown < 1) return;

    const intervalId = setInterval(() => {
      setTimerCountdown(timerCountdown - 1);
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [timerCountdown]);

  return (
    <div className="board-page-container">
      <div className="board-page-title">
        <h1>{`${pointsToWin} points to win!`}</h1>
      </div>

      {playerWhoWon && (
        <div>
          <Confetti width={width} height={height} />
        </div>
      )}

      <Card className="board-page-player-card">
        <div className="board-page-player-container">
          {playerWhoWon && <h1>{`player ${playerWhoWon.userName} won!!!!`}</h1>}
          {players.length === 0 && !playerWhoWon && (
            <p>no one is in your game :( something must be wrong!</p>
          )}
          {!playerWhoWon && players.length > 0 && (
            <GameBoard
              players={players}
              triggerChangeTurnStatusForUser={triggerChangeTurnStatusForUser}
            />
          )}
        </div>
      </Card>

      {timerCountdown > 0 && (
        <>
          <h1 className="board-page-countdown">{timerCountdown}</h1>
        </>
      )}

      <Footer />
    </div>
  );
};

export default BoardPage;
