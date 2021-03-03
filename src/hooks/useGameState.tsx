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
const SET_PLAYER_TURN_STATUS_TO_ACTIVE = "setPlayerTurnStatusToActive"
const SET_PLAYER_TURN_STATUS_TO_WAITING = "setPlayerTurnStatusToWaiting"

const useGameState = (gameId: string) => {
  const [players, setPlayers] = useState([] as Player[]);
  const [turnIsActive, setTurnIsActive] = useState(false);
  const socketRef = useRef({} as SocketIOClient.Socket);
  const player = useRef({} as Player);

  useEffect(() => {
    // Creates a WebSocket connection
    // TODO make sure that the username is unique
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming players when a game is started
    socketRef.current.on(PLAYERS_IN_GAME_RESPONSE, (data: any) => {
      console.log("PLAYERS_IN_GAME triggered, setting players in game");
      const incomingPlayers = data.playersInGame as Player[];
      console.log(incomingPlayers);
      setPlayers(incomingPlayers);
    });

    // Listens for backend telling a player it's their turn to play, this is only sent to one socket
    // the other sockets will have the updated players with the new status come through playersInGame
    socketRef.current.on(CHANGE_TURN_STATUS_FOR_PLAYER, (data: any) => {
      const player = data.player as Player;
      const turnStatus = data.turnStatus;

      const playerToChange = players.find((toFind) => toFind.userName === player.userName);

      if (playerToChange) {
        console.log(`START_A_TURN_FOR_PLAYER triggered, changing ${player.userName}'s status to ${turnStatus}`);
        playerToChange.turnStatus = turnStatus
      }
      else {
        console.error(`Cannot find player ${player.userName}`);
        return;
      }

      if (turnStatus === 'active') {
        setTurnIsActive(true);
      }
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

  const addPointToPlayer = (points: number, userName: string) => {
    console.log(`Adding point to player ${userName} in game with id of ${gameId}`);

    socketRef.current.emit(ADD_POINT_TO_PLAYER_EVENT,
      { query: { points, userName } }
    );
  }

  const setPlayerTurnStatusActive = (player: Player) => {
    console.log(`Setting player ${player.userName} in game ${gameId}'s status active`);

    socketRef.current.emit(SET_PLAYER_TURN_STATUS_TO_ACTIVE,
      { query: { player, gameId } }
    );
  }

  const triggerTurnOverForUser = (userName: string) => {
    console.log(`Ending turn for ${userName} in game ${gameId}`);

    socketRef.current.emit(SET_PLAYER_TURN_STATUS_TO_WAITING,
      { query: { userName, gameId } }
    );
  }

  return { players, player, turnIsActive, getAllPlayersInGame, addPointToPlayer, setPlayerTurnStatusActive, triggerTurnOverForUser };
};

export default useGameState;