import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import '../../hooks/useLobby';
import './LobbyPage.css';
import useLobby from '../../hooks/useLobby';
import { Button, Input } from '@material-ui/core';

const ENDPOINT = "http://127.0.0.1:3000";

const LobbyPage = (props: any): any => {

  const { roomId } = props.match.params; // Gets roomId from URL
  const { userName } = props.location.state; // Gets username from props
  const { players, addPlayer, setPlayerReady } = useLobby(roomId, userName); // Creates a websocket and manages the lobby participants

  useEffect(() => {
    addPlayer(userName, roomId);
  }, []);

  return (
    <div>
      <h1>
        {roomId}
      </h1>
      <p>
        You are in the lobby page!!! I want to list all of the people waiting for the game in this class
        I then want a button to 'start the game'
     </p>
      <div>
        {
          players.map((player: any) => {
            return (
              <p>{player.userName + ' ' + player.isReady}</p>
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
    </div>
  );
}

export default LobbyPage;
