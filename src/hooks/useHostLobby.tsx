import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const CREATE_NEW_LOBBY_EVENT = "createNewLobbyEvent";
const PLAYER_READY_EVENT = "playerReadyEvent"; // Name of the event
const SOCKET_SERVER_URL = "http://127.0.0.1:3000";
const NEW_PLAYER_IN_LOBBY_EVENT = "newPlayerLobbyEvent"; 

const useHostLobby = (gameId: string) => {
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
    // const addPlayer = (userName: string, gameId: string) => {
    //     socketRef.current.emit(LOBBY_GAME_EVENT, {
    //         userName, 
    //         gameId
    //     });
    // };

    const createNewGame = (gameId: string) => {

        console.log(`Creating new game with id of ${gameId}`);
        
        socketRef.current.emit(CREATE_NEW_LOBBY_EVENT, 
            { query: { gameId } }
        );
    }

    // const setPlayerReady = () => {  

    //     console.log("CAllinngg");

    //     socketRef.current.emit(PLAYER_READY_EVENT, {
    //         userName, 
    //         gameId
    //     });

    //     socketRef.current.on(PLAYER_READY_EVENT, (players: any) => {
    //         const incomingPlayers = players.playersInGame      
    //         console.log(JSON.stringify(incomingPlayers));
    //         setPlayers(incomingPlayers);
    //     });


    // }

    return { players, createNewGame };
};

export default useHostLobby;