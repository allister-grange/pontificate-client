import React, { useEffect, useState } from 'react';
import '../../hooks/usePlayerLobby';
import './PlayerLobbyPage.css';
import usePlayerLobby from '../../hooks/usePlayerLobby';
import { Button, Input } from '@material-ui/core';

const ENDPOINT = "http://127.0.0.1:3000";

const PlayerLobbyPage = (props: any): any => {

  const { gameId } = props.match.params; // Gets gameId from URL
  const { userName } = props.location.state; // Gets username from props
  const { players, addPlayer, setPlayerReady } = usePlayerLobby(gameId, userName); // Creates a websocket and manages the lobby participants

  useEffect(() => {
    addPlayer(userName, gameId);
    console.log(userName + ' ' + gameId);

  }, []);

  return (
    <div className="player-lobby-container">
      <div className="player-lobby-text">
        <h2>
          PLAYER LOBBY GAMEID: {gameId}
        </h2>
        {
          players.length === 0 ?
            <p>
              This is an error, if you'd like to start a new game
              head back to awardit.info
            </p>
            :
            <>
              <div>
                {
                  players.map((player: any, index: number) => {
                    return (
                      <p key={index}>{player.userName + ' ' + player.isReady}</p>
                    )
                  })
                }
              </div>
              <div className="player-ready-button">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { setPlayerReady() }}
                  className="button">
                  ready
                </Button>
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default PlayerLobbyPage;
