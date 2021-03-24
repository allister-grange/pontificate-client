import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Select,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";

type StartNewGameSelectionProps = {
  newGameId: string;
  setShowingStartGameOptions: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartNewGameSelection = ({
  newGameId,
  setShowingStartGameOptions,
}: StartNewGameSelectionProps): JSX.Element => {
  const history = useHistory();
  const [pointsToWin, setPointsToWin] = useState(20);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pointsToWin <= 0) {
      return;
    }

    console.log(`Starting game with id of ${newGameId}`);

    history.push({
      pathname: ROUTES.HOSTLOBBY.replace(":gameId", newGameId),
      state: {
        gameId: newGameId,
        pointsToWin,
      },
    });
  };

  return (
    <Card className="card-room-details" variant="outlined">
      <CardContent>
        <form className="room-details-form" onSubmit={onSubmit}>
          <FormControl className="start-new-game-form">
            <Select
              native
              fullWidth
              value={pointsToWin}
              onChange={(e) => setPointsToWin(e.target.value as number)}
              inputProps={{
                name: "rounds",
                id: "round-pick-simple",
              }}
            >
              <option value={10}>20 points (short game)</option>
              <option value={100}>40 points (standard game)</option>
              <option value={200}>80 points (long game)</option>
            </Select>
            <FormHelperText>points required to win game</FormHelperText>
          </FormControl>
          <CardActions className="card-room-actions">
            <hr className="card-room-line" />
            <div className="card-room-buttons">
              <Button onClick={() => setShowingStartGameOptions(false)}>
                back
              </Button>
              <Button
                type="submit"
                variant="outlined"
                fullWidth
                color="primary"
                className="button"
              >
                start new game
              </Button>
            </div>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default StartNewGameSelection;
