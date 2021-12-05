import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";
import { Player } from "../types";
import * as ROUTES from "../constants/routes";
import SOCKET_SERVER_URL from "../constants";

const CREATE_NEW_LOBBY_EVENT = "createNewLobbyEvent";
const START_NEW_GAME_EVENT = "startNewGameEvent";
const PLAYER_READY_EVENT = "playerReadyEvent";
const GAME_STARTED_EVENT = "gameStartedEvent";
const NEW_PLAYER_IN_LOBBY_EVENT = "newPlayerLobbyEvent";

type UseHostLobbyRes = {
  players: Player[];
  createNewGame: (newGameId: string, pointsToWin: number) => void;
  startGame: (gameToStart: string) => void;
  gameId: string;
};

const useHostLobby = (gameId: string, pointsToWin: number): UseHostLobbyRes => {
  const [players, setPlayers] = useState([] as Player[]);
  const history = useHistory();
  const socketRef = useRef({} as SocketIOClient.Socket);

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming players
    socketRef.current.on(NEW_PLAYER_IN_LOBBY_EVENT, (data: any) => {
      const incomingPlayers = data.playersInGame as Player[];
      setPlayers(incomingPlayers);
    });

    socketRef.current.on(PLAYER_READY_EVENT, (data: any) => {
      const incomingPlayers = data.playersInGame as Player[];
      setPlayers(incomingPlayers);
    });

    socketRef.current.on(GAME_STARTED_EVENT, (data: any) => {
      // send the client to the card screen
      console.log(`Received game start event for game ${gameId}`);
      history.push({
        pathname: ROUTES.BOARDPAGE.replace(":gameId", gameId),
        state: { pointsToWin },
      });
    });
  }, [gameId, history, pointsToWin]);

  const createNewGame = useCallback(
    (newGameId: string, pointsRequiredToWin: number) => {
      console.log(
        `Creating new game with id of ${newGameId}, with pointsToWin: ${pointsToWin}, with socket url ${SOCKET_SERVER_URL}`
      );

      socketRef.current.emit(CREATE_NEW_LOBBY_EVENT, {
        query: { gameId: newGameId, pointsToWin: pointsRequiredToWin },
      });
    },
    [pointsToWin]
  );

  const startGame = useCallback((gameToStart: string) => {
    console.log(`Starting game with id of ${gameToStart},`);

    socketRef.current.emit(START_NEW_GAME_EVENT, {
      query: { gameId: gameToStart },
    });
  }, []);

  return { players, startGame, createNewGame, gameId };
};

export default useHostLobby;
