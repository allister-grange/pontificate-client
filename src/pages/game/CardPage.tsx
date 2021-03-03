import React, { useEffect, useState } from 'react';
import '../../styles/CardPage.css';
import useGameState from '../../hooks/useGameState';
import DisplayCard from '../../components/DisplayCard';

const CardPage = (props: any): any => {

  const { gameId, userName } = props.location.state;

  const [counter, setCounter] = useState(60);
  const { player, addPointToPlayer } = useGameState(gameId);

  useEffect(() => {
    document.title = `${userName} | Pontificate`
  }, []);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter]);

  return (
    <div className="card-page-container">
      <DisplayCard 
        addPointToPlayer={addPointToPlayer}
        counter={counter}
        userName={userName}
      />
    </div>
  );
}

export default CardPage;
