import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import '../../hooks/useLobby';
import './LobbyPage.css';
import useLobby from '../../hooks/useLobby';

const ENDPOINT = "http://127.0.0.1:3000";

const LobbyPage = (props: any): any => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { players, addPlayer } = useLobby(roomId); // Creates a websocket and manages the lobby participants


  return (
    <div>
      <h1>
        {roomId}
      </h1>
      <p>
        You are in the lobby page!!! I want to list all of the people waiting for the game in this class
        I then want a button to 'start the game'
     </p>
      {

        // players.map((player: any) => {
        //   return (
        //     <p>{player}</p>
        //   )
        // })
        players.length
      }
    </div>
  );
}

export default LobbyPage;
