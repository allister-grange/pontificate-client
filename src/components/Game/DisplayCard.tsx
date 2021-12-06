import { Button } from "@material-ui/core";
import React, { useRef, useState } from "react";

type DisplayCardProps = {
  addPointToPlayer: (userName: string, word: string) => void;
  userName: string;
  counter: number;
  word: string;
  skippedWords: string[] | undefined;
  skipWord: (userName: string) => void;
};

const DisplayCard = ({
  userName,
  counter,
  addPointToPlayer,
  skippedWords,
  word,
  skipWord,
}: DisplayCardProps): JSX.Element => {
  const [correctCount, setCorrectCount] = useState(0);

  const nextCard = () => {
    addPointToPlayer(userName, word);
    setCorrectCount(correctCount + 1);
  };

  return (
    <div className="display-card-container">
      <div className="words-to-guess">
        <h1 className="card-word-styling">{word}</h1>
        {skippedWords && (
          <span>
            {" "}
            skipped words:
            {skippedWords?.map((skippedWord: string) => (
              <h4 key={skippedWord} className="card-word-styling">
                {skippedWord}
              </h4>
            ))}
          </span>
        )}
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
            onClick={() => skipWord(userName)}
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
