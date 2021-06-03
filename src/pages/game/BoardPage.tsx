import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Card,
} from "@material-ui/core";
import React, { useEffect } from "react";
import Confetti from "react-confetti";
import useGameState from "../../hooks/useGameState";
import { Player } from "../../types";
import "../../styles/BoardPage.css";
import useWindowDimensions from "../../components/misc/WindowDimensions";
import Footer from "../../components/misc/Footer";
import GameBoard from "../../components/game/GameBoard";

const BoardPage = ({ match, location }: any): JSX.Element => {
  const { gameId } = match.params; // Gets roomId from URL
  const { pointsToWin } = location.state;
  const { height, width } = useWindowDimensions();
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

      <Footer />
    </div>
  );
};

export default BoardPage;
