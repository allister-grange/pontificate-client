import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import DisplayCard from "../../components/game/DisplayCard";
import useWindowDimensions from "../../components/misc/WindowDimensions";
import { COUNTDOWN_LENGTH } from "../../constants";
import useGameState from "../../hooks/useGameState";
import "../../styles/CardPage.css";
import { Category, Player } from "../../types";

const getCardBackgroundColor = (category: Category | undefined): string => {
  switch (category) {
    case "action":
      return "#C96567";

    case "object":
      return "#5aB9EA";

    case "person":
      return "#C48B28";

    case "random":
      return "#F79E02";

    case "world":
      return "#5680E9";

    case "nature":
      return "#3AAFA9";

    default:
      return "";
  }
};

const CardPage = ({ location }: any): JSX.Element => {
  const gameId = window.location.href.split("/")[4];
  const userName = window.location.href.split("/")[5];
  const [timeLeftInTurn, setTimeLeftInTurn] = useState(-1);
  const [player, setPlayer] = useState<Player>();
  const [countdownBeforePlaying, setCountDownBeforePlaying] = useState(
    COUNTDOWN_LENGTH
  );
  const {
    players,
    addPointToPlayer,
    playerWhoWon,
    getAllPlayersInGame,
    triggerChangeTurnStatusForUser,
    rejoinExistingGame,
    skipWord,
  } = useGameState(gameId);
  const { height, width } = useWindowDimensions();
  document.title = `${userName} | Pontificate`;

  const cardBackGroundColor = getCardBackgroundColor(player?.category);

  useEffect(() => {
    rejoinExistingGame(userName, gameId);
    getAllPlayersInGame();
  }, [gameId, getAllPlayersInGame, rejoinExistingGame, userName]);

  useEffect(() => {
    const thisPlayer = players.find((toFind) => toFind.userName === userName);

    if (thisPlayer) {
      setPlayer(thisPlayer);
    }
  }, [player, players, userName]);

  useEffect(() => {
    // sometimes the other useEffect triggers before this one and it resets the countdown timer
    if (player?.timeLeftInTurn === 0) {
      triggerChangeTurnStatusForUser(userName, "waiting");
    }

    // if the player is re-joining mid-turn
    if (
      player?.timeLeftInTurn &&
      player?.timeLeftInTurn < 45 &&
      player?.timeLeftInTurn > 0
    ) {
      setCountDownBeforePlaying(0);
      return;
    }

    if (countdownBeforePlaying > 0 && player?.turnStatus === "active") {
      setTimeout(
        () => setCountDownBeforePlaying(countdownBeforePlaying - 1),
        1000
      );
    }
  }, [
    countdownBeforePlaying,
    player?.timeLeftInTurn,
    player?.turnStatus,
    triggerChangeTurnStatusForUser,
    userName,
  ]);

  useEffect(() => {
    if (player?.turnStatus === "active" && countdownBeforePlaying === 0) {
      setTimeLeftInTurn(player.timeLeftInTurn);
      if (player.timeLeftInTurn <= 0) {
        triggerChangeTurnStatusForUser(userName, "waiting");
        setCountDownBeforePlaying(COUNTDOWN_LENGTH);
      }
    }
  }, [
    countdownBeforePlaying,
    player,
    triggerChangeTurnStatusForUser,
    userName,
  ]);

  const confettiDisplay = (): JSX.Element => (
    <div className="waiting-turn-message-container">
      {userName === playerWhoWon?.userName ? (
        <>
          <Confetti width={width} height={height} />
          <h3 className="card-word-styling">congratulations, you won!</h3>
        </>
      ) : (
        <h3 className="card-word-styling">better luck next time :)</h3>
      )}
    </div>
  );

  const playerWaiting = (): JSX.Element => (
    <div className="waiting-turn-message-container">
      <h1 className="card-word-styling">please wait your turn :)</h1>
      <h3 className="card-word-styling">{player?.category}</h3>
      {player?.turnStatus === "ready" && (
        <div className="card-start-button">
          <Button
            type="button"
            onClick={() => {
              triggerChangeTurnStatusForUser(userName, "active");
            }}
            fullWidth
            color="secondary"
            variant="outlined"
            className="button"
          >
            start turn
          </Button>
        </div>
      )}
    </div>
  );

  const countDown = (): JSX.Element => (
    <div className="waiting-turn-message-container">
      <h1 className="card-word-styling">{countdownBeforePlaying}</h1>
      <h4 className="card-word-styling">{player?.category}</h4>
    </div>
  );

  const displayCard = (): JSX.Element => {
    if (player) {
      return (
        <DisplayCard
          addPointToPlayer={addPointToPlayer}
          counter={timeLeftInTurn}
          userName={userName}
          word={player.currentWord}
          skippedWord={player.skippedWord}
          skipWord={skipWord}
        />
      );
    }
    return <div />;
  };

  return (
    <div
      className="card-page-container"
      style={{ backgroundColor: cardBackGroundColor }}
    >
      {playerWhoWon && confettiDisplay()}

      {!(player?.turnStatus === "active") && !playerWhoWon && playerWaiting()}

      {player?.turnStatus === "active" &&
        countdownBeforePlaying > 0 &&
        !playerWhoWon &&
        countDown()}

      {player?.turnStatus === "active" &&
        countdownBeforePlaying === 0 &&
        !playerWhoWon &&
        displayCard()}
    </div>
  );
};

export default CardPage;
