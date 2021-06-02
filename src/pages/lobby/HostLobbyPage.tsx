import React, { useEffect } from "react";
import { Button, Card, CardContent } from "@material-ui/core";
import useHostLobby from "../../hooks/useHostLobby";
import "../../styles/HostLobbyPage.css";
import { Player } from "../../types";
import Footer from "../../components/misc/Footer";

const HostLobbyPage = ({ match, location }: any): JSX.Element => {
  const { gameId } = match.params; // Gets roomId from URL
  document.title = `${gameId} | Pontificate`;
  const { pointsToWin } = location.state; // Gets points to win from props
  const { players, startGame, createNewGame } = useHostLobby(
    gameId,
    pointsToWin
  );

  useEffect(() => {
    createNewGame(gameId, pointsToWin);
  }, [createNewGame, gameId, pointsToWin]);

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
        {players.length === 0 && (
          <h3>no one has joined the game yet, get out your phones!</h3>
        )}
        {players.length === 1 && (
          <h3>there&apos;s only one player joined, it takes two to tango!</h3>
        )}
      </div>

      <div className="host-player-list">
        {players.length >= 1 && (
          <Card style={{ width: "90%" }}>
            <CardContent>
              {players.map((player: Player) => (
                <div className="host-player-table">
                  <h3 style={{ color: player.isReady ? "green" : "red" }}>
                    {player.userName}
                  </h3>
                  <h3>
                    {player.isReady
                      ? " is ready to go!"
                      : " isn't ready just yet"}
                  </h3>
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
            style={{ height: "100%" }}
          >
            Start game
          </Button>
        ) : null}
      </div>

      <Footer />
    </div>
  );
};

export default HostLobbyPage;
