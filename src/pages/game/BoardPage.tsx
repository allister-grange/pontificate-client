import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import React, { useEffect } from 'react';
import useGameState from '../../hooks/useGameState';
import '../../styles/BoardPage.css';

const BoardPage = (props: any): any => {

  const { gameId } = props.match.params; // Gets roomId from URL
  const { players, getPlayersInGame } = useGameState(gameId);

  useEffect(() => {
    getPlayersInGame(gameId);
  }, []);

  return (
    <div className="board-page-container">
      <div className="Title">
        <header className="App-header">
          <h1>
            this is the game board
          </h1>
        </header>
      </div>

      <div className="board-page-player-container">
        {
          players.length === 0 ?
            <p>
              no one is in your game :( something must be wrong!
            </p>
            :
            <Table className="board-page-player-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">player</TableCell>
                  <TableCell align="center">points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  players.map((player: any, index: number) => {                    
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{player.userName}</TableCell>
                        <TableCell align="center">{player.points}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
        }
      </div>
    </div>
  );
}

export default BoardPage;