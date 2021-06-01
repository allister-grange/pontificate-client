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
import * as ROUTES from "../../constants/routes";

type StartNewGameSelectionProps = {
  newGameId: string;
  setShowingStartGameOptions: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartNewGameSelection = ({
  newGameId,
  setShowingStartGameOptions,
}: StartNewGameSelectionProps): JSX.Element => {
  const history = useHistory();
  const [pointsToWin, setPointsToWin] = useState(-1);
  const invalidPoints = pointsToWin < 0;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pointsToWin < 0) {
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
              <option value={-1}>points to win</option>
              <option value={20}>20 points (short game)</option>
              <option value={40}>40 points (standard game)</option>
              <option value={80}>80 points (long game)</option>
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
                disabled={invalidPoints}
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
