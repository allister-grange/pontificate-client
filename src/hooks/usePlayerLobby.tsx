import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Player } from "../types";
import * as ROUTES from '../constants/routes'

const NEW_PLAYER_IN_LOBBY_EVENT = "newPlayerLobbyEvent";
const PLAYER_READY_EVENT = "playerReadyEvent";
const GAME_STARTED_EVENT = "gameStartedEvent";

const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const usePlayerLobby = (gameId: string, userName: string) => {
  const [players, setPlayers] = useState([] as Player[]);
  const socketRef = useRef({} as SocketIOClient.Socket);
  const history = useHistory();

  useEffect(() => {
    // Creates a WebSocket connection
    // TODO make sure that the username is unique
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming players
    socketRef.current.on(NEW_PLAYER_IN_LOBBY_EVENT, (data: any) => {
      const incomingPlayers = data.playersInGame      
      setPlayers(incomingPlayers);
    });

    socketRef.current.on(GAME_STARTED_EVENT, () => {
      //send the client to the card screen
      console.log(`Received game start event for user ${userName} in game ${gameId}`);
      history.push({pathname: ROUTES.CARDPAGE.replace(":gameId", gameId).replace(":userName", userName), 
        state: {gameId, userName}});
    });

    socketRef.current.on(PLAYER_READY_EVENT, (players: any) => {
      const incomingPlayers = players.playersInGame
      console.log(incomingPlayers);
      setPlayers(incomingPlayers);
    });

    // Destroys the socket reference
    // when the connection is closed
    // return () => {
    //     socketRef.current.disconnect();
    // };
  }, [gameId]);

  // Sends a message to the server that
  // forwards it to all users in the same game
  const addPlayer = (userName: string, gameId: string) => {
    console.log(`adding new player ${userName} in game ${gameId}`);
    socketRef.current.emit(NEW_PLAYER_IN_LOBBY_EVENT, {
      query: { userName, gameId }
    });
  };

  const setPlayerReady = (isPlayerReady: boolean) => {
    console.log(`Setting ${userName}'s ready status to ${isPlayerReady}`);
    socketRef.current.emit(PLAYER_READY_EVENT,
      { query: { isPlayerReady } }
    );
  }

  return { players, addPlayer, setPlayerReady };
};

export default usePlayerLobby;