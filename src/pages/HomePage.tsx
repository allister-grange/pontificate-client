import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import * as ROUTES from '../constants/routes'
import '../styles/HomePage.css';

function HomePage() {

  const [gameId, setGameId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [showingJoinGameOptions, setShowingJoinGameOptions] = React.useState(false);

  const handleRoomNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameId(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const generateGameID = (): string => {
    return (Math.floor(1000 + Math.random() * 9000) - 1).toString();
  }

  return (
    <div className="App">
      <div className="Title">
        <header className="App-header">
          <h1>
            welcome to pontificate
          </h1>
        </header>
      </div>
      {
        showingJoinGameOptions ?
          <div className="RoomDetails">
            <div className="RoomDetailsInputs">
              <Input
                color="primary"
                type="text"
                style={{ marginRight: '10px'}}
                placeholder="username"
                value={userName}
                onChange={handleUserNameChange}
                className="text-input-field"
              />
              <Input
                color="primary"
                type="text"
                style={{ marginLeft: '10px'}}
                placeholder="room"
                value={gameId}
                onChange={handleRoomNameChange}
                className="text-input-field"
              />
            </div>
            <div className="RoomDetailsButtons">
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: '5px'}}
                onClick={() => { setShowingJoinGameOptions(false) }}
                className="button">
                back
              </Button>
              <Button
                component={Link}
                style={{ marginLeft: '5px'}}
                to={{
                  pathname: ROUTES.PLAYERLOBBY.replace(":gameId", gameId),
                  state: {
                    userName
                  }
                }}
                color="primary"
                variant="outlined"
                className="button">
                join game
              </Button>
            </div>
          </div>
          :
          <div className="GameOptions">
            <Button
              component={Link}
              style={{ marginRight: '5px'}}
              to={ROUTES.HOSTLOBBY.replace(":gameId", generateGameID())}
              variant="outlined"
              color="primary"
              className="button">
              create new game
            </Button>
            <Button
              variant="outlined"
              style={{ marginLeft: '5px'}}
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
