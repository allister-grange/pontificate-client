import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { Player } from "../types";

const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const GET_CURRENT_PLAYERS_IN_GAME_EVENT = "getCurrentPlayersInGameEvent";
const PLAYERS_IN_GAME = "playersInGame"
const ADD_POINT_TO_PLAYER_EVENT = "addPointToPlayerEvent"
const POINTS_ADDED_TO_PLAYER_RESPONSE = "pointsAddedToPlayerResponse"

const useGameState = (gameId: string) => {
  const [players, setPlayers] = useState([] as Player[]);
  const socketRef = useRef({} as SocketIOClient.Socket);
  const player = useRef({} as Player);

  useEffect(() => {
    // Creates a WebSocket connection
    // TODO make sure that the username is unique
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming players when a game is started
    socketRef.current.on(PLAYERS_IN_GAME, (data: any) => {
      console.log("PLAYERS_IN_GAME triggered, setting players in game");
      const incomingPlayers = data.playersInGame as Player[];
      console.log(incomingPlayers);
      setPlayers(incomingPlayers);
    });

    // Listens for incoming points update for a game, updates all players in game
    socketRef.current.on(POINTS_ADDED_TO_PLAYER_RESPONSE, (data: any) => {
      console.log("POINTS_ADDED_TO_PLAYER_RESPONSE triggered, setting players in game");
      const incomingPlayers = data.playersInGame as Player[];      
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

  const getCurrentPlayerInGame = (playerId: string) => {

    console.log(`Getting players in game with id of ${gameId}`);

    socketRef.current.emit(GET_CURRENT_PLAYERS_IN_GAME_EVENT,
      { query: { gameId, playerId } }
    );
  }

  const addPointToPlayer = (points: number, userName: string) => {
    console.log(`Adding point to player ${userName} in game with id of ${gameId}`);

    socketRef.current.emit(ADD_POINT_TO_PLAYER_EVENT,
      { query: { points, userName } }
    );
  }

  return { players, player, getAllPlayersInGame, addPointToPlayer };
};

export default useGameState;