/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from "react";
import "../../styles/CardPage.css";
import Confetti from "react-confetti";
import { Button } from "@material-ui/core";
import { couldStartTrivia } from "typescript";
import DisplayCard from "../../components/game/DisplayCard";
import useGameState from "../../hooks/useGameState";
import { Category, Player } from "../../types";
import useWindowDimensions from "../../components/misc/WindowDimensions";
import { COUNTDOWN_LENGTH, TURN_LENGTH } from "../../constants";

const CardPage = ({ location }: any): JSX.Element => {
  const { gameId, userName } = location.state;
  const [counter, setCounter] = useState(TURN_LENGTH);
  // const [isThisPlayersTurn, setIsThisPlayersTurn] = useState(false);
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
  const [category, setCategory] = useState("object" as Category);
  const [cardBackGroundColor, setCardBackGroundColor] = useState("");
  const { height, width } = useWindowDimensions();
  document.title = `${userName} | Pontificate`;

  useEffect(() => {
    rejoinExistingGame(userName, gameId);
    getAllPlayersInGame();
  }, [gameId, getAllPlayersInGame, rejoinExistingGame, userName]);

  useEffect(() => {
    switch (category) {
      case "action":
        setCardBackGroundColor("#C96567");
        break;
      case "object":
        setCardBackGroundColor("#5aB9EA");
        break;
      case "person":
        setCardBackGroundColor("#C48B28");
        break;
      case "random":
        setCardBackGroundColor("#F79E02");
        break;
      case "world":
        setCardBackGroundColor("#5680E9");
        break;
      case "nature":
        setCardBackGroundColor("#3AAFA9");
        break;
      default:
        setCardBackGroundColor("");
    }
  }, [category]);

  useEffect(() => {
    const thisPlayer = players.find((toFind) => toFind.userName === userName);

    if (thisPlayer) {
      setCategory(thisPlayer.category);
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
          <h3 className="card-word-styling">{category}</h3>
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
          <h4 className="card-word-styling">{category}</h4>
        </div>
      ) : (
        <DisplayCard
          addPointToPlayer={addPointToPlayer}
          wordsSeen={player?.words}
          counter={counter}
          userName={userName}
          category={category}
        />
      )}
    </div>
  );
};

export default CardPage;
