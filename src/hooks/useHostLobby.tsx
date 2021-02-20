import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";
import { Player } from "../types";

const CREATE_NEW_LOBBY_EVENT = "createNewLobbyEvent";
const START_NEW_GAME_EVENT = "startNewGameEvent";
const PLAYER_READY_EVENT = "playerReadyEvent"; 
const GAME_STARTED_EVENT = "gameStartedEvent"; 
const NEW_PLAYER_IN_LOBBY_EVENT = "newPlayerLobbyEvent"; 

const SOCKET_SERVER_URL = "http://127.0.0.1:3000";

const useHostLobby = (gameId: string) => {
    const [players, setPlayers] = useState([] as Player[]);
    const history = useHistory();
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

        socketRef.current.on(PLAYER_READY_EVENT, (players: any) => {
            const incomingPlayers = players.playersInGame      
            setPlayers(incomingPlayers);
        });

        socketRef.current.on(GAME_STARTED_EVENT, (players: any) => {
            //send the client to the card screen
            console.log(`Received game start event for game ${gameId}`);
            history.push(`/host-game/${gameId}`);
        });

        // Destroys the socket reference
        // when the connection is closed
        // return () => {
        //     socketRef.current.disconnect();
        // };
    }, [gameId]);

    const createNewGame = (gameId: string) => {

        console.log(`Creating new game with id of ${gameId}`);
        
        socketRef.current.emit(CREATE_NEW_LOBBY_EVENT, 
            { query: { gameId } }
        );
    }

    const startGame = (gameId: string) => {

        console.log(`Starting game with id of ${gameId}`);

        socketRef.current.emit(START_NEW_GAME_EVENT, 
            { query: { gameId } }
        );
    }

    return { players, createNewGame, startGame };
};

export default useHostLobby;