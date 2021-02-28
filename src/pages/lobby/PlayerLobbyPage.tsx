import React, { useEffect, useState } from 'react';
import '../../hooks/usePlayerLobby';
import './PlayerLobbyPage.css';
import usePlayerLobby from '../../hooks/usePlayerLobby';
import { Button, Input, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const ENDPOINT = "http://127.0.0.1:3000";

const PlayerLobbyPage = (props: any): any => {

  const { gameId } = props.match.params; // Gets gameId from URL
  const { userName } = props.location.state; // Gets username from props
  const { players, addPlayer, setPlayerReady } = usePlayerLobby(gameId, userName); // Creates a websocket and manages the lobby participants
  const [ready, setReady] = useState(false);

  useEffect(() => {
    addPlayer(userName, gameId);
    console.log(userName + ' ' + gameId);
  }, []);

  return (
    <div className="player-lobby-container">
      <div className="player-lobby-text">
        <h2>
          you're in game: {gameId}
        </h2>
        {
          players.length === 0 ?
            <p>
              This is an error, if you'd like to start a new game
              head back to awardit.info
            </p>
            :
            <>
              <div className="player-list">
                {
                  players.length === 0 ?
                    <p>
                      no one in the lobby yet g unit
                    </p>
                    :
                    <Table className="player-table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">player</TableCell>
                          <TableCell align="center">status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          players.map((player: any, index: number) => {
                            console.log(player);
                            console.log(player.isReady);

                            return (
                              <TableRow key={index}>
                                <TableCell align="center">{player.userName}</TableCell>
                                <TableCell align="center">{player.isReady ? "ready" : "not ready"}</TableCell>
                              </TableRow>
                            )
                          })
                        }
                      </TableBody>
                    </Table>
                }
              </div>

              <div className="player-ready-button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { setPlayerReady(); setReady(!ready); }}
                  className="button">
                  {ready ? "not ready" : "ready"}
                </Button>
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default PlayerLobbyPage;
