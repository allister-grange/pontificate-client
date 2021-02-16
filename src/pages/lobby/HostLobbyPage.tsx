import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import './HostLobbyPage.css';
import useHostLobby from '../../hooks/useHostLobby';
import { Button, Input } from '@material-ui/core';

const ENDPOINT = "http://127.0.0.1:3000";

const HostLobbyPage = (props: any): any => {

  const { gameId } = props.match.params; // Gets roomId from URL
  const { players, createNewGame, startGame } = useHostLobby(gameId);

  useEffect(() => {
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

      <div className="roomCode">
        <h3>
          your room code is
        </h3>
        <h2 style={{ color: 'coral' }}>
          {" " + gameId}
        </h2>
      </div>

      <div className="playerList">
        {
          players.length === 0 ?
            <p>
              no one in the lobby yet g unit
					</p>
            :
            <div>
              {
                players.map((player: any, index: number) => {
                  return (
                    <p key={index}>{player.userName + ' ' + player.isReady}</p>
                  )
                })
              }
            </div>
        }
      </div>

      <div className="startGameButton">
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
