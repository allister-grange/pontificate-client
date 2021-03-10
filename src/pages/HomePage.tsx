import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Card, CardContent } from "@material-ui/core";
import boyPlaying from "../assets/boy-playing.svg";
import * as ROUTES from "../constants/routes";
import "../styles/HomePage.css";
import JoinGameSelection from "../components/JoinGameSelection";

function HomePage(): JSX.Element {
  const history = useHistory();
  const [gameId, setGameId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [showingJoinGameOptions, setShowingJoinGameOptions] = React.useState(
    false
  );
  const isFormInValid =
    userName === "" ||
    gameId === "" ||
    gameId.length !== 4 ||
    userName.length < 3;

  const handleGameIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 4) {
      return;
    }
    setGameId(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const generateGameID = (): string =>
    (Math.floor(1000 + Math.random() * 9000) - 1).toString();

  useEffect(() => {
    document.title = `Home | Pontificate`;
  });

  // todo check if there's any games with that id
  // todo check if there's any duplicate usernames in that game
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    history.push({
      pathname: ROUTES.PLAYERLOBBY.replace(":gameId", gameId),
      state: {
        userName,
      },
    });
  };

  return (
    <div className="App">
      <div className="instructions-slideshow">
        <img src={boyPlaying} alt="boy playing" />
      </div>
      <div className="welcome-header-and-options">
        {showingJoinGameOptions ? (
          <div className="join-game-options">
            <JoinGameSelection
              userName={userName}
              handleGameIdChange={handleGameIdChange}
              handleUserNameChange={handleUserNameChange}
              isFormInValid={isFormInValid}
              onSubmit={onSubmit}
              gameId={gameId}
              setShowingJoinGameOptions={setShowingJoinGameOptions}
            />
          </div>
        ) : (
          <div className="game-options">
            <Card variant="outlined" className="home-page-card">
              <CardContent>
                <div className="home-page-button-container">
                  <h1 style={{ textAlign: "center" }}>pontificate</h1>
                  <Button
                    component={Link}
                    to={ROUTES.HOSTLOBBY.replace(":gameId", generateGameID())}
                    variant="outlined"
                    color="primary"
                    className="button"
                  >
                    start new game
                  </Button>
                  <div style={{ margin: "10px" }} />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setShowingJoinGameOptions(true);
                    }}
                    className="button"
                  >
                    join game
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
