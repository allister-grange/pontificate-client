import { useCallback, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import SOCKET_SERVER_URL from "../constants";
import {
  PLAYERS_IN_GAME_RESPONSE,
  GAME_OVER_RES,
  CHANGE_TURN_STATUS_FOR_PLAYER,
  GET_CURRENT_PLAYERS_IN_GAME_EVENT,
  SKIP_WORD_EVENT,
  SWAPPED_SKIP_WORD_EVENT,
  ADD_POINT_TO_PLAYER_EVENT,
  SET_PLAYER_TURN_STATUS,
  PLAYERS_TURN_OVER,
} from "../constants/socketMessages";
import { Player, TurnStatusOptions } from "../types";

type UseGameState = {
  players: Player[];
  turnIsActive: boolean;
  getAllPlayersInGame: () => void;
  addPointToPlayer: (userName: string, word: string) => void;
  triggerChangeTurnStatusForUser: (
    userName: string,
    turnStatus: TurnStatusOptions
  ) => void;
  playerWhoWon: Player | undefined;
  rejoinExistingGame: (userName: string, gameIdToJoin: string) => void;
  skipWord: (userName: string) => void;
  endPlayersTurn: (userName: string) => void;
  swapSkippedWord: (userName: string, word: string) => void;
};

const useGameState = (gameId: string): UseGameState => {
  const [players, setPlayers] = useState([] as Player[]);
  const [playerWhoWon, setPlayerWhoWon] = useState<Player>();
  const [turnIsActive, setTurnIsActive] = useState(false);
  const socketRef = useRef({} as SocketIOClient.Socket);

  useEffect(() => {
    // Creates the websocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL);
  }, []);

  useEffect(() => {
    // Listens for incoming players when a game is started
    socketRef.current.once(PLAYERS_IN_GAME_RESPONSE, (data: any) => {
      console.log("PLAYERS_IN_GAME triggered, setting players in game");
      const incomingPlayers = data.playersInGame as Player[];
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
  }, [gameId, players]);

  const getAllPlayersInGame = useCallback(() => {
    console.log(`Getting players in game with id of ${gameId}`);

    socketRef.current.emit(GET_CURRENT_PLAYERS_IN_GAME_EVENT, {
      query: { gameId },
    });
  }, [gameId]);

  const skipWord = useCallback(
    (userName: string) => {
      console.log(`Skipping current word for ${userName}`);

      socketRef.current.emit(SKIP_WORD_EVENT, {
        query: { userName, gameId },
      });
    },
    [gameId]
  );

  const swapSkippedWord = useCallback(
    (userName: string, word: string) => {
      console.log(`Swapping skipped word for ${userName}`);

      socketRef.current.emit(SWAPPED_SKIP_WORD_EVENT, {
        query: { userName, word, gameId },
      });
    },
    [gameId]
  );

  const rejoinExistingGame = useCallback(
    (userName: string, gameIdToJoin: string) => {
      console.log(`Rejoining player ${userName} to ${gameIdToJoin}`);

      socketRef.current.emit("rejoinPlayer", {
        query: { gameId: gameIdToJoin, userName },
      });
    },
    []
  );

  // when a point is added to a player, that word is stored on the backend
  // so that it cannot come back again for that player
  const addPointToPlayer = useCallback(
    (userName: string, word: string) => {
      console.log(
        `Adding point to player ${userName} in game with id of ${gameId}`
      );

      socketRef.current.emit(ADD_POINT_TO_PLAYER_EVENT, {
        query: { userName, word },
      });
    },
    [gameId]
  );

  const triggerChangeTurnStatusForUser = useCallback(
    (userName: string, turnStatus: TurnStatusOptions) => {
      console.log(
        `Setting player ${userName} in game ${gameId}'s status ${turnStatus}`
      );

      socketRef.current.emit(SET_PLAYER_TURN_STATUS, {
        query: { userName, gameId, turnStatus },
      });
    },
    [gameId]
  );

  const endPlayersTurn = useCallback(
    (userName: string) => {
      console.log(`Ending player ${userName} in game ${gameId}'s turn`);

      socketRef.current.emit(PLAYERS_TURN_OVER, {
        query: { userName, gameId },
      });
    },
    [gameId]
  );

  return {
    players,
    playerWhoWon,
    turnIsActive,
    getAllPlayersInGame,
    addPointToPlayer,
    triggerChangeTurnStatusForUser,
    rejoinExistingGame,
    skipWord,
    endPlayersTurn,
    swapSkippedWord,
  };
};

export default useGameState;
