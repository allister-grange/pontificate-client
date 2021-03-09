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
import useGameState from "../../hooks/useGameState";
import { Player } from "../../types";
import "../../styles/BoardPage.css";

const BoardPage = ({ match }: any): JSX.Element => {
  const { gameId } = match.params; // Gets roomId from URL
  const {
    players,
    getAllPlayersInGame,
    triggerChangeTurnStatusForUser,
  } = useGameState(gameId);

  useEffect(() => {
    document.title = `${gameId} | Pontificate`;
    getAllPlayersInGame();
  }, []);

  return (
    <div className="board-page-container">
      <div className="Title">
        <header className="App-header">
          <h1>game board</h1>
        </header>
      </div>

      <Card className="board-page-player-card">
        <div className="board-page-player-container">
          {players.length === 0 ? (
            <p>no one is in your game :( something must be wrong!</p>
          ) : (
            <Table className="board-page-player-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">player</TableCell>
                  <TableCell align="center">points</TableCell>
                  <TableCell align="center">category</TableCell>
                  <TableCell align="center">status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((player: Player) => (
                  <TableRow key={player.userName}>
                    <TableCell size="small" align="center">
                      {player.userName}
                    </TableCell>
                    <TableCell size="small" align="center">
                      {player.points}
                    </TableCell>
                    <TableCell size="small" align="center">
                      {player.category}
                    </TableCell>
                    {player.turnStatus === "ready" ? (
                      <TableCell size="small" align="center">
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
                          take turn
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell size="small" align="center">
                        <h4>{player.turnStatus}</h4>
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
