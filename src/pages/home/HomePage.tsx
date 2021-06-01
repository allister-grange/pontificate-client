import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Card, CardContent } from "@material-ui/core";
import cardsSVG from "../../assets/cards-svg.svg";
import * as ROUTES from "../../constants/routes";
import "../../styles/HomePage.css";
import JoinGameSelection from "../../components/home/JoinGameSelection";
import useCheckCurrentGames from "../../hooks/useCheckCurrentGames";
import StartNewGameSelection from "../../components/home/StartNewGameSelection";
import Footer from "../../components/misc/Footer";

const generateGameID = (): string =>
  Math.floor(1000 + Math.random() * 9000).toString();

function HomePage(): JSX.Element {
  const history = useHistory();
  const newGameId = generateGameID();
  const {
    userNameIsFree,
    gameExists,
    doesGameExistEmit,
    doesUserNameExistInGameEmit,
  } = useCheckCurrentGames();
  const [gameIdToJoin, setGameIdToJoin] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showingJoinGameOptions, setShowingJoinGameOptions] = React.useState(
    false
  );
  const [showingStartGameOptions, setShowingStartGameOptions] = React.useState(
    false
  );
  const [hasSearched, setHasSearched] = React.useState(false);

  useEffect(() => {
    // to avoid the initial setting of the values triggering error messages
    if (!hasSearched) {
      return;
    }

    // once we've received a response from the socket backend we can
    // stop the spinner
    setIsLoading(false);

    if (userNameIsFree && gameExists) {
      history.push({
        pathname: ROUTES.PLAYERLOBBY.replace(":gameId", gameIdToJoin),
        state: {
          userName,
        },
      });
    }

    if (!userNameIsFree && gameExists) {
      setErrorMessage("that username already exists in that game");
    } else if (!gameExists) {
      setErrorMessage("that game doesn't exist yet");
    }
  }, [
    userNameIsFree,
    gameExists,
    gameIdToJoin,
    hasSearched,
    history,
    userName,
  ]);

  const handleGameIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 4) {
      return;
    }
    setGameIdToJoin(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  useEffect(() => {
    document.title = `Home | Pontificate`;
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // used to check if the player can proceed
    setHasSearched(true);
    setIsLoading(true);
    doesGameExistEmit(gameIdToJoin);
    doesUserNameExistInGameEmit(gameIdToJoin, userName);
  };

  return (
    <div className="home-page-container">
      <div className="instructions-slideshow">
        <img className="cards-svg" src={cardsSVG} alt="cards stacked" />
      </div>
      <div className="welcome-header-and-options">
        {showingJoinGameOptions && (
          <div className="join-game-options">
            <JoinGameSelection
              userName={userName}
              handleGameIdChange={handleGameIdChange}
              handleUserNameChange={handleUserNameChange}
              onSubmit={onSubmit}
              gameId={gameIdToJoin}
              isLoading={isLoading}
              errorMessage={errorMessage}
              setShowingJoinGameOptions={setShowingJoinGameOptions}
            />
          </div>
        )}
        {showingStartGameOptions && (
          <div className="join-game-options">
            <StartNewGameSelection
              newGameId={newGameId}
              setShowingStartGameOptions={setShowingStartGameOptions}
            />
          </div>
        )}
        {!showingJoinGameOptions && !showingStartGameOptions && (
          // TODO extract this into component
          <div className="game-options">
            <Card variant="outlined" className="home-page-card">
              <CardContent>
                <div className="home-page-button-container">
                  <h1 style={{ textAlign: "center" }}>pontificate</h1>
                  <Button
                    onClick={() => setShowingStartGameOptions(true)}
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
      <Footer />
    </div>
  );
}

export default HomePage;