import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as WORDS from '../constants/words';
import { Category } from '../types';


type DisplayCardProps = {
  addPointToPlayer: (points: number, userName: string) => void,
  userName: string,
  counter: number,
  category: Category
}

const DisplayCard = ({ userName, counter, category, addPointToPlayer }: DisplayCardProps): any => {

  const [correctCount, setCorrectCount] = useState(0);
  const [indexOfLastCard, setIndexOfLastCard] = useState(-1);
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState(-1);
  const [words, setWords] = useState([] as string[]);
  // assumes that all categories have the same amount of words (they should)
  const lengthOfWordArray = WORDS.actionWords.length;

  useEffect(() => {
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
      case "people":
        setWords(WORDS.peopleWords);
        break;
      case "world":
        setWords(WORDS.worldWords);
        break;
    }
    setIndexOfCurrentCard(Math.floor(Math.random() * lengthOfWordArray));
  }, [])

  const nextCard = () => {
    addPointToPlayer(correctCount + 1, userName);
    setCorrectCount(correctCount + 1);
    setIndexOfLastCard(indexOfCurrentCard);
    setIndexOfCurrentCard(Math.floor(Math.random() * lengthOfWordArray));
  }

  const lastCard = () => {
    if (indexOfLastCard === -1) {
      setIndexOfLastCard(indexOfCurrentCard);
      setIndexOfCurrentCard(Math.floor(Math.random() * lengthOfWordArray));
    }
    else {
      setIndexOfCurrentCard(indexOfLastCard);
      setIndexOfLastCard(indexOfCurrentCard);
    }
  }

  return (
    <div className="display-card-container">
      <div className="words-to-guess">
        <h1>
          {words[indexOfCurrentCard]}
        </h1>
        <h4>
          {words[indexOfLastCard]}
        </h4>
      </div>

      <div className="correct-card-count">
        <p style={{ paddingLeft: '2px' }}>time left: {counter} | correct&nbsp;</p>
        <h4 style={{ paddingRight: '2px' }}>{correctCount}</h4>
      </div>

      <div className="buttons">
        <div style={{ paddingRight: '15px' }}>
          <Button variant="outlined" onClick={lastCard}>
            skip
          </Button>
        </div>

        <div style={{ paddingLeft: '15px' }}>
          <Button variant="outlined" onClick={nextCard}>
            correct
          </Button>
        </div>
      </div>
    </div>
  );

}

export default DisplayCard;