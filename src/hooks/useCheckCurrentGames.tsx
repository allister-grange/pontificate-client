import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";
import { Player } from "../types";
import * as ROUTES from "../constants/routes";
import SOCKET_SERVER_URL from "../constants";

const DOES_GAME_EXIST_EVENT = "doesGameExistEvent";
const DOES_GAME_EXIST_RES = "doesGameExistRes";
const DOES_USERNAME_EXIST_EVENT = "doesUserNameExistEvent";
const DOES_USERNAME_EXIST_RES = "doesUserNameExistRes";

const useCheckCurrentGames = () => {
  const socketRef = useRef({} as SocketIOClient.Socket);
  // do not allow a user to join a game until it's proven that
  // no user in that game has the same username
  const [userNameIsFree, setuserNameIsFree] = useState();
  const [gameExists, setGameExists] = useState();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);

    socketRef.current.on(DOES_GAME_EXIST_RES, (data: any) => {
      console.log(`Received does game exist event for game`);

      if ("gameExists" in data) {
        setGameExists(data.gameExists);
      } else {
        console.error("No game exists status was returned from server");
      }
    });

    socketRef.current.on(DOES_USERNAME_EXIST_RES, (data: any) => {
      console.log(`Received does username exist event for game`);
      console.log(data);

      if ("userNameIsFree" in data) {
        setuserNameIsFree(data.userNameIsFree);
      } else {
        console.error("No userNameIsFree status was returned from server");
      }
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const doesGameExist = (newGameId: string) => {
    console.log(`Checking if game exists with id of ${newGameId}`);

    socketRef.current.emit(DOES_GAME_EXIST_EVENT, {
      query: { gameId: newGameId },
    });
  };

  const doesUserNameExistInGame = (newGameId: string, userName: string) => {
    console.log(`Checking if user ${newGameId} is in the game ${newGameId}`);

    socketRef.current.emit(DOES_USERNAME_EXIST_EVENT, {
      query: { userName, gameId: newGameId },
    });
  };

  return {
    userNameIsFree,
    gameExists,
    doesGameExist,
    doesUserNameExistInGame,
  };
};

export default useCheckCurrentGames;
