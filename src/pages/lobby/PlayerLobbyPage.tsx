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
    <div>
      <h1>
        PLAYER LOBBY GAMEID: {gameId}
      </h1>
      {
        players.length === 0 ?
          < p >
            You see this because there's no one in this lobby. 
            This is an ERROR
          </p>
          :
          null
      }

      <div>
        {
          players.map((player: any, index: number) => {
            return (
              <p key={index}>{player.userName + ' ' + player.isReady}</p>
            )
          })
        }
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => { setPlayerReady() }}
        className="button">
        ready
      </Button>

    </div >
  );
}

export default PlayerLobbyPage;
