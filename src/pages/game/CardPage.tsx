/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";
import "../../styles/CardPage.css";
import Confetti from "react-confetti";
import DisplayCard from "../../components/DisplayCard";
import useGameState from "../../hooks/useGameState";
import { Category } from "../../types";
import useWindowDimensions from "../../components/WindowDimensions";

const CardPage = ({ location }: any): JSX.Element => {
  const TURN_LENGTH = 30;
  const COUNTDOWN_LENGTH = 5;

  const { gameId, userName } = location.state;

  const [counter, setCounter] = useState(TURN_LENGTH);
  const [points, setPoints] = useState(0);
  const [countdownBeforePlaying, setCountDownBeforePlaying] = useState(
    COUNTDOWN_LENGTH
  );
  const {
    players,
    getPointsForPlayer,
    addPointToPlayer,
    playerWhoWon,
    getAllPlayersInGame,
    triggerChangeTurnStatusForUser,
  } = useGameState(gameId);
  const [turnIsActive, setTurnIsActive] = useState(false);
  const [category, setCategory] = useState("object" as Category);
  const [cardBackGroundColor, setCardBackGroundColor] = useState("");
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    document.title = `${userName} | Pontificate`;
    getAllPlayersInGame();
  }, []);

  useEffect(() => {
    switch (category) {
      case "action":
        setCardBackGroundColor("#C96567");
        break;
      case "object":
        setCardBackGroundColor("#5aB9EA");
        break;
      case "people":
        setCardBackGroundColor("#FFE400");
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
    console.log("called now because players was updated");
    console.log(players);

    players.forEach((player) => {
      if (player.userName === userName) {
        setTurnIsActive(player.turnStatus === "active");
        setCategory(player.category);
      }
    });

    setPoints(getPointsForPlayer(userName));
  }, [players]);

  useEffect(() => {
    if (counter > 0 && countdownBeforePlaying === 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    } else if (counter === 0) {
      triggerChangeTurnStatusForUser(userName, "waiting");
      setCounter(TURN_LENGTH);
      setCountDownBeforePlaying(COUNTDOWN_LENGTH);
    }
  }, [counter, countdownBeforePlaying]);

  useEffect(() => {
    if (countdownBeforePlaying > 0 && turnIsActive) {
      setTimeout(
        () => setCountDownBeforePlaying(countdownBeforePlaying - 1),
        1000
      );
    }
  }, [countdownBeforePlaying, turnIsActive]);

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
      ) : !turnIsActive ? (
        <div className="waiting-turn-message-container">
          <h1 className="card-word-styling">please wait your turn :)</h1>
          <h3 className="card-word-styling">{category}</h3>
        </div>
      ) : countdownBeforePlaying > 0 ? (
        <div className="waiting-turn-message-container">
          <h1 className="card-word-styling">{countdownBeforePlaying}</h1>
          <h4 className="card-word-styling">{category}</h4>
        </div>
      ) : (
        <DisplayCard
          addPointToPlayer={() => {
            addPointToPlayer(points + 1, userName);
            setPoints(points + 1);
          }}
          counter={counter}
          userName={userName}
          category={category}
        />
      )}
    </div>
  );
};

export default CardPage;
