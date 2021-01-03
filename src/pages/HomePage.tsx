import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const ENDPOINT = "http://127.0.0.1:3000";

function HomePage() {

    const [gameName, setGameName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [showingJoinGameOptions, setShowingJoinGameOptions] = React.useState(false);

    const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGameName(event.target.value);
    };

    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    //   useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on('message', (data: SocketIOClient.Socket) => {
    //       setResponse(data as unknown as string);   
    //       console.log(data);
    //     });
    //   }, []);

    const generateGameID = () => {
        return Math.floor(1000 + Math.random() * 9000) - 1;
    }

    return (
        <div className="App">
            <div className="Title">
                <header className="App-header">
                    <p>
                        welcome to pontificate
                    </p>
                </header>
            </div>
            {
                showingJoinGameOptions ?
                    <div>
                        <div className="RoomDetailsInputs">
                            <Input
                                color="primary"
                                type="text"
                                placeholder="username"
                                value={userName}
                                onChange={handleUserNameChange}
                                className="text-input-field"
                            />
                            <Input
                                color="primary"
                                type="text"
                                placeholder="room"
                                value={gameName}
                                onChange={handleRoomNameChange}
                                className="text-input-field"
                            />
                        </div>
                        <div className="RoomDetailsButtons">
                            <Button
                                component={Link}
                                to={{
                                    pathname: `/${gameName}`,
                                    state: {
                                        userName
                                    }
                                }}
                                variant="contained"
                                color="primary"
                                className="button">
                                join game
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => { setShowingJoinGameOptions(false) }}
                                className="button">
                                back
                            </Button>
                        </div>
                    </div>
                    :
                    <div className="GameOptions">
                        <Button 
                            component={Link} 
                            to={`/${generateGameID()}`} 
                            variant="contained" 
                            color="primary"
                            className="button">
                            create new game
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => { setShowingJoinGameOptions(true) }}
                            className="button">
                            join game
                        </Button>
                    </div>
            }
        </div>
    );
}

export default HomePage;
