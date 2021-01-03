import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_PLAYER_LOBBY_EVENT = "playerLobbyEvent"; // Name of the event
const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const useLobby = (gameId: string) => {
  const [players, setPlayers] = useState([] as any[]); // Sent and received messages
  const socketRef = useRef({} as SocketIOClient.Socket);

  useEffect(() => {
    console.log("here");

    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { gameId },
    });
    
    // Listens for incoming players
    socketRef.current.on(NEW_PLAYER_LOBBY_EVENT, (player: any) => {
      const incomingPlayer = {
        ...player,
        ownedByCurrentUser: player.senderId === socketRef.current.id,
      };

      console.log(incomingPlayer);
      setPlayers((players: any) => [...players, incomingPlayer]);
      
    //   setPlayers((players) => [...players, incomingPlayer]);
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, [gameId]);

  // Sends a message to the server that
  // forwards it to all users in the same game
  const addPlayer = (messageBody: any) => {
    socketRef.current.emit(NEW_PLAYER_LOBBY_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { players, addPlayer };
};

export default useLobby;
// export {};
