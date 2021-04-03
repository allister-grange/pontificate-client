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
import useWindowDimensions from "../../components/WindowDimensions";

const BoardPage = ({ match, location }: any): JSX.Element => {
  const { gameId } = match.params; // Gets roomId from URL
  const { pointsToWin } = location.state;
  const { height, width } = useWindowDimensions();
  const {
    players,
    getAllPlayersInGame,
    triggerChangeTurnStatusForUser,
    playerWhoWon,
  } = useGameState(gameId);

  useEffect(() => {
    document.title = `${gameId} | Pontificate`;
    getAllPlayersInGame();
  }, []);

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
            <Table className="board-page-player-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <h1 className="board-cell-title">player</h1>
                  </TableCell>
                  <TableCell align="center">
                    <h1 className="board-cell-title">points</h1>
                  </TableCell>
                  <TableCell align="center">
                    <h1 className="board-cell-title">category</h1>
                  </TableCell>
                  <TableCell align="center">
                    <h1 className="board-cell-title">status</h1>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player: Player) => (
                  <TableRow key={player.userName}>
                    <TableCell size="medium" align="center">
                      <h2 className="board-cell">{player.userName}</h2>
                    </TableCell>
                    <TableCell size="medium" align="center">
                      <h2 className="board-cell">{player.points}</h2>
                    </TableCell>
                    <TableCell size="medium" align="center">
                      <h2 className="board-cell">{player.category}</h2>
                    </TableCell>
                    {player.turnStatus === "ready" ? (
                      <TableCell size="medium" align="center">
                        <Button
                          color="primary"
                          variant="outlined"
                          onClick={() => {
                            triggerChangeTurnStatusForUser(
                              player.userName,
                              "active"
                            );
                          }}
                        >
                          <h4 className="board-cell">take turn</h4>
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell size="medium" align="center">
                        <h2 className="board-cell">{player.turnStatus}</h2>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BoardPage;
