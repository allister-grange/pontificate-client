import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import './CardPage.css';

function CardPage() {

  const objectsCards = ['Suspension Bridge', 'Syringe', 'Paper Clip', 'Accessory', 
        'Bill', 'Log', 'Camera', 'Flint', 'Signpost']

  const [indexOfLastCard, setIndexOfLastCard] = useState(-1);
  const [indexOfCurrentCard, setIndexOfCurrentCard] = useState(-1);

  useEffect(() => {
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }, []);
  
  const changeCards = () => {
    setIndexOfLastCard(indexOfCurrentCard);
    setIndexOfCurrentCard(Math.floor(Math.random() * objectsCards.length));
  }

  return (
    <div onClick={changeCards}>
      <h1>
        {objectsCards[indexOfCurrentCard]}
      </h1>
      <h4>
        {objectsCards[indexOfLastCard]}
      </h4>
    </div>
  );
}

export default CardPage;
