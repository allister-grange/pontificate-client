/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from "react";
import "../../styles/CardPage.css";
import Confetti from "react-confetti";
import { Button } from "@material-ui/core";
import DisplayCard from "../../components/game/DisplayCard";
import useGameState from "../../hooks/useGameState";
import { Category, Player } from "../../types";
import useWindowDimensions from "../../components/misc/WindowDimensions";
import { COUNTDOWN_LENGTH, TURN_LENGTH } from "../../constants";

const CardPage = ({ location }: any): JSX.Element => {
  const { gameId, userName } = location.state;
  const [counter, setCounter] = useState(TURN_LENGTH);
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
  } = useGameState(gameId);
  const { height, width } = useWindowDimensions();
  document.title = `${userName} | Pontificate`;

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

    return "";
  };

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
    if (counter > 0 && countdownBeforePlaying === 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter === 0 && !playerWhoWon) {
      triggerChangeTurnStatusForUser(userName, "waiting");
      setCounter(TURN_LENGTH);
      setCountDownBeforePlaying(COUNTDOWN_LENGTH);
    }
  }, [
    counter,
    countdownBeforePlaying,
    playerWhoWon,
    triggerChangeTurnStatusForUser,
    userName,
  ]);

  useEffect(() => {
    if (countdownBeforePlaying > 0 && player?.turnStatus === "active") {
      setTimeout(
        () => setCountDownBeforePlaying(countdownBeforePlaying - 1),
        1000
      );
    }
  }, [countdownBeforePlaying, player?.turnStatus]);

  return (
    <div
      className="card-page-container"
      style={{ backgroundColor: cardBackGroundColor }}
    >
      {playerWhoWon ? (
        <div className="waiting-turn-message-container">
          {userName === playerWhoWon.userName ? (
            <Confetti width={width} height={height} />
          ) : null}
          <h3 className="card-word-styling">{`${playerWhoWon.userName} won!!!`}</h3>
        </div>
      ) : !(player?.turnStatus === "active") ? (
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
      ) : countdownBeforePlaying > 0 ? (
        <div className="waiting-turn-message-container">
          <h1 className="card-word-styling">{countdownBeforePlaying}</h1>
          <h4 className="card-word-styling">{player?.category}</h4>
        </div>
      ) : (
        <DisplayCard
          addPointToPlayer={addPointToPlayer}
          wordsSeen={player?.words}
          counter={counter}
          userName={userName}
          category={player?.category}
        />
      )}
    </div>
  );
};

export default CardPage;
