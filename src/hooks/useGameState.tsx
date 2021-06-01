import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import SOCKET_SERVER_URL from "../constants";
import { Player, TurnStatusOptions } from "../types";

const GET_CURRENT_PLAYERS_IN_GAME_EVENT = "getCurrentPlayersInGameEvent";
const PLAYERS_IN_GAME_RESPONSE = "playersInGame";
const ADD_POINT_TO_PLAYER_EVENT = "addPointToPlayerEvent";
const CHANGE_TURN_STATUS_FOR_PLAYER = "changeTurnStatusForPlayer";
const SET_PLAYER_TURN_STATUS = "setPlayerTurnStatus";
const GAME_OVER_RES = "gameOverRes";

type UseGameState = {
  players: Player[];
  turnIsActive: boolean;
  getAllPlayersInGame: () => void;
  addPointToPlayer: (points: number, userName: string) => void;
  triggerChangeTurnStatusForUser: (
    userName: string,
    turnStatus: TurnStatusOptions
  ) => void;
  getPointsForPlayer: (userName: string) => number;
  playerWhoWon: Player | undefined;
  rejoinExistingGame: (userName: string, gameIdToJoin: string) => void;
};

const useGameState = (gameId: string): UseGameState => {
  const [players, setPlayers] = useState([] as Player[]);
  const [playerWhoWon, setPlayerWhoWon] = useState<Player>();
  const [turnIsActive, setTurnIsActive] = useState(false);
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

    // Listens for a game ended event when a player reaches max points
    socketRef.current.on(GAME_OVER_RES, (data: any) => {
      console.log("GAME_OVER_RES triggered, GAME IS OVER");
      const incomingPlayer = data.player as Player;
      if (incomingPlayer) {
        console.log(incomingPlayer);
        setPlayerWhoWon(incomingPlayer);
      }
    });

    // Listens for backend telling a player it's their turn to play, this is only sent to one socket
    // the other sockets will have the updated players with the new status come through playersInGame
    socketRef.current.on(CHANGE_TURN_STATUS_FOR_PLAYER, (data: any) => {
      const incomingPlayer = data.player as Player;
      const { turnStatus } = data;

      const playerToChange = players.find(
        (toFind) => toFind.userName === incomingPlayer.userName
      );

      if (playerToChange) {
        console.log(
          `START_A_TURN_FOR_PLAYER triggered, changing ${playerToChange.userName}'s status to ${turnStatus}`
        );
        playerToChange.turnStatus = turnStatus;
      } else {
        console.error(`Cannot find player ${incomingPlayer.userName}`);
        return;
      }

      if (turnStatus === "active") {
        setTurnIsActive(true);
      }
    });

    // Destroys the socket reference when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [gameId, players]);

  const getAllPlayersInGame = () => {
    console.log(`Getting players in game with id of ${gameId}`);

    socketRef.current.emit(GET_CURRENT_PLAYERS_IN_GAME_EVENT, {
      query: { gameId },
    });
  };

  const rejoinExistingGame = (userName: string, gameIdToJoin: string) => {
    console.log(`Rejoining player ${userName} to ${gameIdToJoin}`);

    socketRef.current.emit("rejoin-player", {
      query: { gameId: gameIdToJoin, userName },
    });
  };

  const addPointToPlayer = (points: number, userName: string) => {
    console.log(
      `Setting points ${points} to player ${userName} in game with id of ${gameId}`
    );

    socketRef.current.emit(ADD_POINT_TO_PLAYER_EVENT, {
      query: { points, userName },
    });
  };

  const triggerChangeTurnStatusForUser = (
    userName: string,
    turnStatus: TurnStatusOptions
  ) => {
    console.log(
      `Setting player ${userName} in game ${gameId}'s status ${turnStatus}`
    );

    socketRef.current.emit(SET_PLAYER_TURN_STATUS, {
      query: { userName, gameId, turnStatus },
    });
  };

  const getPointsForPlayer = (userName: string): number => {
    const playerToGetPointsFor = players.find(
      (toFind) => toFind.userName === userName
    );
    if (playerToGetPointsFor) {
      return playerToGetPointsFor.points;
    }

    return -1;
  };

  return {
    players,
    playerWhoWon,
    turnIsActive,
    getAllPlayersInGame,
    addPointToPlayer,
    triggerChangeTurnStatusForUser,
    getPointsForPlayer,
    rejoinExistingGame,
  };
};

export default useGameState;
