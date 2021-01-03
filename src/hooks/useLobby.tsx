import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const LOBBY_GAME_EVENT = "playerLobbyEvent"; // Name of the event
const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const useLobby = (gameId: string, userName: string) => {
    const [players, setPlayers] = useState([] as any[]);
    const socketRef = useRef({} as SocketIOClient.Socket);

    useEffect(() => {
        // Creates a WebSocket connection
        // TODO make sure that the username is unique
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { gameId: gameId, userName: userName },
        });

        // Listens for incoming players
        socketRef.current.on(LOBBY_GAME_EVENT, (player: any) => {
            const incomingPlayers = player.playersInGame      

            setPlayers(incomingPlayers);
        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [gameId]);

    // Sends a message to the server that
    // forwards it to all users in the same game
    const addPlayer = (userName: string, gameId: string) => {
        socketRef.current.emit(LOBBY_GAME_EVENT, {
            userName, 
            gameId
        });
    };

    return { players, addPlayer };
};

export default useLobby;