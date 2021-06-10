import { Button } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import * as WORDS from "../../constants/words";
import { Category } from "../../types";

type DisplayCardProps = {
  addPointToPlayer: (userName: string, word: string) => void;
  userName: string;
  counter: number;
  category: Category;
  wordsSeen: Array<string>;
};

const DisplayCard = ({
  userName,
  counter,
  category,
  addPointToPlayer,
  wordsSeen,
}: DisplayCardProps): JSX.Element => {
  const [correctCount, setCorrectCount] = useState(0);
  const [indexOfLastCard, setIndexOfLastCard] = useState(-1);
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState(-1);
  const [words, setWords] = useState([] as string[]);
  // assumes that all categories have the same amount of words (they should)
  const lengthOfWordArray = WORDS.personWords.length;
  const skipped = useRef(false);

  useEffect(() => {
    const setWordsForPlayer = () => {
      switch (category) {
        case "action":
          setWords(WORDS.actionWords);
          break;
        case "nature":
          setWords(WORDS.natureWords);
          break;
        case "object":
          setWords(WORDS.objectsWords);
          break;
        case "random":
          setWords(WORDS.randomWords);
          break;
        case "person":
          setWords(WORDS.personWords);
          break;
        case "world":
          setWords(WORDS.worldWords);
          break;
        default:
          setWords([]);
      }
      setIndexOfCurrentCard(Math.floor(Math.random() * lengthOfWordArray));
    };
    setWordsForPlayer();
  }, [category, lengthOfWordArray]);

  const getNextCardNumber = (): number => {
    let randomNum = Math.floor(Math.random() * lengthOfWordArray);
    // will screw up the session if you run out of words (impossible with the score limit)
    while (wordsSeen.includes(words[randomNum])) {
      randomNum = Math.floor(Math.random() * lengthOfWordArray);
    }
    return randomNum;
  };

  const nextCard = () => {
    skipped.current = false;
    addPointToPlayer(userName, words[indexOfCurrentCard]);
    setCorrectCount(correctCount + 1);
    setIndexOfLastCard(indexOfCurrentCard);
    const nextCardNumber = getNextCardNumber();
    setIndexOfCurrentCard(nextCardNumber);
  };

  const lastCard = () => {
    // if you haven't skipped already, or you're just starting you get one new card
    // if you've skipped once already, you should cycle through the same two cards
    if (indexOfLastCard === -1 || skipped.current !== true) {
      setIndexOfLastCard(indexOfCurrentCard);
      setIndexOfCurrentCard(getNextCardNumber());
    } else {
      setIndexOfCurrentCard(indexOfLastCard);
      setIndexOfLastCard(indexOfCurrentCard);
    }
    skipped.current = true;
  };

  return (
    <div className="display-card-container">
      <div className="words-to-guess">
        <h1 className="card-word-styling">{words[indexOfCurrentCard]}</h1>
        <h4 className="card-word-styling">{words[indexOfLastCard]}</h4>
      </div>

      <div className="correct-card-count">
        <p className="card-word-styling" style={{ paddingLeft: "2px" }}>
          time left: {counter} | correct&nbsp;
        </p>
        <h4 className="card-word-styling" style={{ paddingRight: "2px" }}>
          {correctCount}
        </h4>
      </div>

      <div className="buttons">
        <div style={{ paddingRight: "15px" }}>
          <Button
            variant="outlined"
            style={{
              borderColor: "white",
              color: "white",
            }}
            onClick={lastCard}
          >
            skip
          </Button>
        </div>

        <div style={{ paddingLeft: "15px" }}>
          <Button
            variant="outlined"
            style={{
              borderColor: "white",
              color: "white",
            }}
            onClick={nextCard}
          >
            correct
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DisplayCard);
