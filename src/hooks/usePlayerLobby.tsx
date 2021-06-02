import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { Player } from "../types";
import * as ROUTES from "../constants/routes";
import SOCKET_SERVER_URL from "../constants";

const NEW_PLAYER_IN_LOBBY_EVENT = "newPlayerLobbyEvent";
const PLAYER_READY_EVENT = "playerReadyEvent";
const GAME_STARTED_EVENT = "gameStartedEvent";

type UsePlayerLobbyState = {
  players: Player[];
  addPlayer: (userNameToAdd: string, gameIdToAddTo: string) => void;
  setPlayerReady: (isPlayerReady: boolean) => void;
};

const usePlayerLobby = (
  gameId: string,
  userName: string
): UsePlayerLobbyState => {
  const [players, setPlayers] = useState([] as Player[]);
  const socketRef = useRef({} as SocketIOClient.Socket);
  const history = useHistory();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    // Listens for incoming players
    socketRef.current.on(NEW_PLAYER_IN_LOBBY_EVENT, (data: any) => {
      const incomingPlayers = data.playersInGame;
      setPlayers(incomingPlayers);
    });

    socketRef.current.on(GAME_STARTED_EVENT, () => {
      // send the client to the card screen
      console.log(
        `Received game start event for user ${userName} in game ${gameId}`
      );
      history.push({
        pathname: ROUTES.CARDPAGE.replace(":gameId", gameId).replace(
          ":userName",
          userName
        ),
        state: { gameId, userName },
      });
    });

    socketRef.current.on(PLAYER_READY_EVENT, (data: any) => {
      const incomingPlayers = data.playersInGame;
      console.log(incomingPlayers);
      setPlayers(incomingPlayers);
    });
  }, [gameId, history, userName]);

  // Sends a message to the server that
  // forwards it to all users in the same game
  const addPlayer = useCallback(
    (userNameToAdd: string, gameIdToAddTo: string) => {
      console.log(`adding new player ${userNameToAdd} in game ${gameId}`);
      socketRef.current.emit(NEW_PLAYER_IN_LOBBY_EVENT, {
        query: { userName: userNameToAdd, gameId: gameIdToAddTo },
      });
    },
    [gameId]
  );

  const setPlayerReady = useCallback(
    (isPlayerReady: boolean) => {
      console.log(`Setting ${userName}'s ready status to ${isPlayerReady}`);
      socketRef.current.emit(PLAYER_READY_EVENT, {
        query: { userName, isPlayerReady },
      });
    },
    [userName]
  );

  return { players, addPlayer, setPlayerReady };
};

export default usePlayerLobby;
