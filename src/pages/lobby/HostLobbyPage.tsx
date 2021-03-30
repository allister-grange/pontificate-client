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

const HostLobbyPage = ({ match, location }: any): JSX.Element => {
  const { gameId } = match.params; // Gets roomId from URL
  const { pointsToWin } = location.state; // Gets points to win from props
  const { players, createNewGame, startGame } = useHostLobby(
    gameId,
    pointsToWin
  );

  useEffect(() => {
    document.title = `${gameId} | Pontificate`;
    createNewGame(gameId, pointsToWin);
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
        <h2 style={{ color: "coral" }}>{" pontificate.click"}</h2>
      </div>

      <div className="host-player-list">
        {players.length === 0 && (
          <h3>no one has joined the game yet, get out your phones!</h3>
        )}
        {players.length === 1 && (
          <h3>there&apos;s only one player joined, it takes two to tango!</h3>
        )}
        {players.length >= 1 && (
          <Card>
            <CardContent>
              {players.map((player: Player) => (
                <div className="host-player-table">
                  <h2>{player.userName}</h2>
                  <h2>{player.isReady ? ": ready" : ": not ready"}</h2>
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
            fullWidth
            onClick={() => {
              startGame(gameId);
            }}
            style={{ height: "40px" }}
          >
            Start game
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default HostLobbyPage;
