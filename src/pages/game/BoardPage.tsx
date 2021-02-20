import { useEffect, useState } from 'react';
import useGameState from '../../hooks/useGameState';

import './BoardPage.css';

const BoardPage = (props: any): any => {

  const { gameId } = props.match.params; // Gets roomId from URL
  const { players, getPlayersInGame } = useGameState(gameId);

  useEffect(() => {
    getPlayersInGame(gameId);
  }, []);

  useEffect(() => {
    console.log(players);
    
  }, [players]);

  return (
    <div>
      <div className="Title">
        <header className="App-header">
          <h1>
            this is the game board
          </h1>
        </header>
      </div>

      <div>
        {players.map((player, idx) => (
          <p>{player.userName}</p>
        ))}
      </div>
    </div>
  );
}

export default BoardPage;