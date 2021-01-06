import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_PLAYER_IN_LOBBY_EVENT = "newPlayerLobbyEvent"; 
const PLAYER_READY_EVENT = "playerReadyEvent"; // Name of the event
const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const usePlayerLobby = (gameId: string, userName: string) => {
    const [players, setPlayers] = useState([] as any[]);
    const socketRef = useRef({} as SocketIOClient.Socket);

    useEffect(() => {
        // Creates a WebSocket connection
        // TODO make sure that the username is unique
        socketRef.current = socketIOClient(SOCKET_SERVER_URL);

        // Listens for incoming players
        socketRef.current.on(NEW_PLAYER_IN_LOBBY_EVENT, (players: any) => {
            const incomingPlayers = players.playersInGame      

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
        
        console.log(`adding new player ${userName} in game ${gameId}`);
        
        socketRef.current.emit(NEW_PLAYER_IN_LOBBY_EVENT, {
            query: { userName, gameId }
        });
    };

    const setPlayerReady = () => {  
                
        socketRef.current.emit(PLAYER_READY_EVENT, {
            userName, 
            gameId
        });

        socketRef.current.on(PLAYER_READY_EVENT, (players: any) => {
            const incomingPlayers = players.playersInGame      
            console.log(JSON.stringify(incomingPlayers));
            setPlayers(incomingPlayers);
        });
        
    }

    return { players, addPlayer, setPlayerReady };
};

export default usePlayerLobby;