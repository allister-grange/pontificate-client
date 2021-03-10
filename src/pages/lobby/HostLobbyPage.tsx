import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import useHostLobby from "../../hooks/useHostLobby";
import "../../styles/HostLobbyPage.css";
import { Player } from "../../types";

const HostLobbyPage = ({ match }: any): JSX.Element => {
  const { gameId } = match.params; // Gets roomId from URL
  const { players, createNewGame, startGame } = useHostLobby(gameId);

  useEffect(() => {
    document.title = `${gameId} | Pontificate`;
    createNewGame(gameId);
  }, []);

  const allPlayersAreReady = (): boolean => {
    let allReady = true;
    players.forEach((player: Player) => {
      if (!player.isReady) {
        allReady = false;
      }
    });
    return allReady;
  };

  return (
    <div className="container">
      <div className="room-code">
        <h1>your room code is</h1>
        <h1 style={{ color: "coral" }}>{` ${gameId}`}</h1>
      </div>

      <div className="title">
        <h2>join on your at phone at</h2>
        <h2 style={{ color: "coral" }}>{" pontificate.tv"}</h2>
      </div>

      <div className="host-player-list">
        {players.length === 0 ? (
          <h3>no one has joined the game yet, get out your phones!</h3>
        ) : (
          <Card>
            <CardContent>
              {/* <Table className="host-player-table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <h3 className="table-cell">player</h3>
                    </TableCell>
                    <TableCell align="center">
                      <h3 className="table-cell">status</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map((player: Player) => (
                    <TableRow key={player.userName}>
                      <TableCell align="center">
                        <p className="table-cell">{player.userName}</p>
                      </TableCell>
                      <TableCell align="center">
                        <p className="table-cell">
                          {player.isReady ? "ready" : "not ready"}
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
              {players.map((player: Player) => (
                <div className="host-player-table">
                  <p>{player.userName}</p>
                  <p>{player.isReady ? ": ready" : ": not ready"}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      <div className="start-game-button">
        {allPlayersAreReady() && players.length > 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              startGame(gameId);
            }}
            className="button"
          >
            Start game
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default HostLobbyPage;
