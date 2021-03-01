import React, { useEffect, useState } from 'react';
import './HostLobbyPage.css';
import useHostLobby from '../../hooks/useHostLobby';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const ENDPOINT = "http://127.0.0.1:3000";

const HostLobbyPage = (props: any): any => {

  const { gameId } = props.match.params; // Gets roomId from URL
  const { players, createNewGame, startGame } = useHostLobby(gameId);

  useEffect(() => {
    //TODO, if someone refreshes the host page, it will create a new game and kick people off
    createNewGame(gameId);
  }, []);

  const allPlayersAreReady = (): boolean => {
    let allReady = true;
    players.map((player: any) => {
      if (!player.isReady) {
        allReady = false;
      }
    });
    return allReady;
  }

  return (
    <div className="container">
      <div className="title">
        <h1>
          join on your at phone at
        </h1>
        <h1 style={{ color: 'coral' }}>
          {" " + "pontificate.tv"}
        </h1>
      </div>

      <div className="room-code">
        <h3>
          your room code is
        </h3>
        <h2 style={{ color: 'coral' }}>
          {" " + gameId}
        </h2>
      </div>

      <div className="host-player-list">
        {
          players.length === 0 ?
            <p>
              no one has joined the game yet, get out your phones!
            </p>
            :
            <Table className="host-player-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">player</TableCell>
                  <TableCell align="center">status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  players.map((player: any, index: number) => {                    
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

      <div className="start-game-button">
        {
          allPlayersAreReady() && players.length > 0 ?
            <Button
              variant="contained"
              color="primary"
              onClick={() => { startGame(gameId); }}
              className="button">
              Start game
						</Button>
            :
            null
        }
      </div>

    </div >
  );
}

export default HostLobbyPage;
