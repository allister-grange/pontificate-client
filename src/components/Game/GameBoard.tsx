import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { Player, TurnStatusOptions } from "../../types";

type GameBoardProps = {
  players: Player[];
  triggerChangeTurnStatusForUser: (
    userName: string,
    turnStatus: TurnStatusOptions
  ) => void;
};

const GameBoard = ({
  players,
  triggerChangeTurnStatusForUser,
}: GameBoardProps): JSX.Element => {
  return (
    <Table className="board-page-player-table">
      <TableHead>
        <TableRow>
          <TableCell align="center">
            <h1 className="board-cell-title">player</h1>
          </TableCell>
          <TableCell align="center">
            <h1 className="board-cell-title">points</h1>
          </TableCell>
          <TableCell align="center">
            <h1 className="board-cell-title">category</h1>
          </TableCell>
          <TableCell align="center">
            <h1 className="board-cell-title">status</h1>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {players.map((player: Player) => (
          <TableRow key={player.userName}>
            <TableCell size="medium" align="center">
              <h2 className="board-cell">{player.userName}</h2>
            </TableCell>
            <TableCell size="medium" align="center">
              <h2 className="board-cell">{player.points}</h2>
            </TableCell>
            <TableCell size="medium" align="center">
              <h2 className="board-cell">{player.category}</h2>
            </TableCell>
            {player.turnStatus === "ready" ? (
              <TableCell size="medium" align="center">
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    triggerChangeTurnStatusForUser(player.userName, "active");
                  }}
                >
                  <h4 className="board-cell">take turn</h4>
                </Button>
              </TableCell>
            ) : (
              <TableCell size="medium" align="center">
                <h2 className="board-cell">{player.turnStatus}</h2>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GameBoard;
