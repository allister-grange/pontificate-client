import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Card, CardActions, CardContent, TextField } from "@material-ui/core";
import * as ROUTES from "../constants/routes";
import "../styles/HomePage.css";
import JoinGameSelection from "../components/JoinGameSelection";

function HomePage(): JSX.Element {
  const [gameId, setGameId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [showingJoinGameOptions, setShowingJoinGameOptions] = React.useState(
    false
  );
  const isFormInValid = userName === "" || gameId === "";

  // todo check if there's any games with that id
  const handleGameIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameId(event.target.value);
  };

  // todo check if there's any duplicate usernames in that game
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const generateGameID = (): string =>
    (Math.floor(1000 + Math.random() * 9000) - 1).toString();

  useEffect(() => {
    document.title = `Home | Pontificate`;
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="Title">
        <header className="App-header">
          <h1>welcome to pontificate</h1>
        </header>
      </div>
      {showingJoinGameOptions ? (
        <JoinGameSelection
          userName={userName}
          handleGameIdChange={handleGameIdChange}
          handleUserNameChange={handleUserNameChange}
          isFormInValid={isFormInValid}
          onSubmit={onSubmit}
          gameId={gameId}
          setShowingJoinGameOptions={setShowingJoinGameOptions}
        />
      ) : (
        <div className="GameOptions">
          <Button
            component={Link}
            style={{ marginRight: "5px" }}
            to={ROUTES.HOSTLOBBY.replace(":gameId", generateGameID())}
            variant="outlined"
            color="primary"
            className="button"
          >
            create new game
          </Button>
          <Button
            variant="outlined"
            style={{ marginLeft: "5px" }}
            color="primary"
            onClick={() => {
              setShowingJoinGameOptions(true);
            }}
            className="button"
          >
            join game
          </Button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
