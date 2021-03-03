import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import useHostGameState from '../../hooks/useHostGameState';
import { Player } from '../../types';
import '../../styles/BoardPage.css';

const BoardPage = (props: any): any => {

  const { gameId } = props.match.params; // Gets roomId from URL
  const { players, getAllPlayersInGame } = useHostGameState(gameId);

  useEffect(() => {
    document.title = `${gameId} | Pontificate`
    getAllPlayersInGame();
  }, []);

  return (
    <div className="board-page-container">
      <div className="Title">
        <header className="App-header">
          <h1>
            game board
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
                  <TableCell align="center">status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  players.map((player: Player, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell size="small" align="center">{player.userName}</TableCell>
                        <TableCell size="small" align="center">{player.points}</TableCell>
                        {
                          player.turnStatus === "ready" ?
                            <TableCell size="small" align="center">
                              <Button
                                color="primary"
                                variant="outlined"
                              >
                                take turn
                              </Button>
                            </TableCell>
                            :
                            <TableCell size="small" align="center">
                              <h4>
                                {player.turnStatus}
                              </h4>
                            </TableCell>

                        }
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