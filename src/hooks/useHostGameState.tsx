import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { isGetAccessorDeclaration } from "typescript";
import { Player } from "../types";

const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const GET_CURRENT_PLAYERS_IN_GAME_EVENT = "getCurrentPlayersInGameEvent";
const PLAYERS_IN_GAME_RESPONSE = "playersInGame"
const ADD_POINT_TO_PLAYER_EVENT = "addPointToPlayerEvent"
const POINTS_ADDED_TO_PLAYER_RESPONSE = "pointsAddedToPlayerResponse"
const CHANGE_TURN_STATUS_FOR_PLAYER = "changeTurnStatusForPlayer"

const useGameState = (gameId: string) => {
  const [players, setPlayers] = useState([] as Player[]);
  const socketRef = useRef({} as SocketIOClient.Socket);

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming players when a game is started
    socketRef.current.on(PLAYERS_IN_GAME_RESPONSE, (data: any) => {
      console.log("PLAYERS_IN_GAME triggered, setting players in game");
      const incomingPlayers = data.playersInGame as Player[];
      console.log(incomingPlayers);
      setPlayers(incomingPlayers);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [gameId]);

  const getAllPlayersInGame = () => {

    console.log(`Getting players in game with id of ${gameId}`);

    socketRef.current.emit(GET_CURRENT_PLAYERS_IN_GAME_EVENT,
      { query: { gameId } }
    );
  }

  return { players, getAllPlayersInGame };
};

export default useGameState;