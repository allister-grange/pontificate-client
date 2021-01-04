import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const LOBBY_GAME_EVENT = "playerLobbyEvent"; 
const PLAYER_READY_EVENT = "playerReadyEvent"; // Name of the event
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
        socketRef.current.on(LOBBY_GAME_EVENT, (players: any) => {
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
        socketRef.current.emit(LOBBY_GAME_EVENT, {
            userName, 
            gameId
        });
    };

    const setPlayerReady = () => {  
        
        console.log("CAllinngg");
        
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

export default useLobby;