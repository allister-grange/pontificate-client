import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import usePlayerLobby from "../../hooks/usePlayerLobby";

import "../../styles/PlayerLobbyPage.css";
import { Player } from "../../types";

const PlayerLobbyPage = ({ match, location }: any): JSX.Element => {
  const { gameId } = match.params; // Gets gameId from URL
  const { userName } = location.state; // Gets username from props
  const { players, addPlayer, setPlayerReady } = usePlayerLobby(
    gameId,
    userName
  ); // Creates a websocket and manages the lobby participants
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.title = "Player Lobby | Pontificate";
    addPlayer(userName, gameId);
    console.log(`${userName} ${gameId}`);
  });

  const onReadyClick = (): void => {
    if (ready) {
      setReady(false);
      setPlayerReady(false);
    } else {
      setReady(true);
      setPlayerReady(true);
    }
  };

  return (
    <div className="player-lobby-container">
      <div className="player-lobby-text">
        <div className="player-lobby-title">
          <h2>you're in game:&nbsp;</h2>
          <h2 style={{ color: "coral" }}>{` ${gameId}`}</h2>
        </div>
        {players.length === 0 ? (
          <p>
            This is an error, if you'd like to start a new game head back to
            pontificate.tv
          </p>
        ) : (
          <>
            <div className="player-list">
              {players.length === 0 ? (
                <p>no one in the lobby yet g unit</p>
              ) : (
                <Table className="player-table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">player</TableCell>
                      <TableCell align="center">status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {players.map((player: Player) => (
                      <TableRow key={player.userName}>
                        <TableCell align="center">{player.userName}</TableCell>
                        <TableCell align="center">
                          {player.isReady ? "ready" : "not ready"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>

            <div className="player-ready-button">
              <Button
                variant="contained"
                color="primary"
                onClick={onReadyClick}
                className="button"
              >
                {ready ? "not ready" : "ready"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerLobbyPage;
