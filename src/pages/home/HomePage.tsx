import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import cardsSVG from "../../assets/cards-svg.svg";
import * as ROUTES from "../../constants/routes";
import "../../styles/HomePage.css";
import JoinGameSelection from "../../components/home/JoinGameSelection";
import useCheckCurrentGames from "../../hooks/useCheckCurrentGames";
import StartNewGameSelection from "../../components/home/StartNewGameSelection";
import Footer from "../../components/misc/Footer";
import StartOrJoinSelection from "../../components/home/StartOrJoinSelection";
import useInput from "../../hooks/useInput";

const generateGameID = (): string =>
  Math.floor(1000 + Math.random() * 9000).toString();

function HomePage(): JSX.Element {
  document.title = `Home | Pontificate`;
  const history = useHistory();
  const newGameId = generateGameID();
  const {
    userNameIsFree,
    gameExists,
    doesGameExistEmit,
    doesUserNameExistInGameEmit,
  } = useCheckCurrentGames();
  const [isLoading, setIsLoading] = React.useState(false);
  const [joiningGameErrorMessage, setJoiningGameErrorMessage] = React.useState(
    ""
  );
  const [showingJoinGameOptions, setShowingJoinGameOptions] = React.useState(
    false
  );
  const [showingStartGameOptions, setShowingStartGameOptions] = React.useState(
    false
  );

  const {
    value: gameIdToJoin,
    hasError: gameIdHasError,
    valueChangeHandler: gameIdChangeHandler,
    inputBlurHandler: gameIdBlurHandler,
  } = useInput((value) => value.trim().length === 4);

  const {
    value: userName,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
  } = useInput((value) => value.trim().length >= 3);

  useEffect(() => {
    // to avoid the initial setting of the values triggering error messages
    console.log(isLoading);

    if (!isLoading) {
      return;
    }

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
      setJoiningGameErrorMessage("that username already exists in that game");
    } else if (!gameExists) {
      setJoiningGameErrorMessage("that game doesn't exist yet");
    }
  }, [userNameIsFree, gameExists, gameIdToJoin, history, userName, isLoading]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // used to check if the player can proceed
    // setHasSearched(true);
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
          <JoinGameSelection
            userName={userName}
            gameId={gameIdToJoin}
            handleGameIdChange={gameIdChangeHandler}
            userNameBlurHandler={userNameBlurHandler}
            gameIdBlurHandler={gameIdBlurHandler}
            handleUserNameChange={userNameChangeHandler}
            onSubmit={onSubmit}
            isLoading={isLoading}
            userNameHasError={userNameHasError}
            gameIdHasError={gameIdHasError}
            errorMessage={joiningGameErrorMessage}
            setShowingJoinGameOptions={setShowingJoinGameOptions}
          />
        )}
        {showingStartGameOptions && (
          <StartNewGameSelection
            newGameId={newGameId}
            setShowingStartGameOptions={setShowingStartGameOptions}
          />
        )}
        {!showingJoinGameOptions && !showingStartGameOptions && (
          <StartOrJoinSelection
            setShowingStartGameOptions={setShowingStartGameOptions}
            setShowingJoinGameOptions={setShowingJoinGameOptions}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
