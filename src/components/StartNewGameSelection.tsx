import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  CircularProgress,
  Select,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";

type StartNewGameSelectionProps = {
  gameId: string;
  setShowingStartGameOptions: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartNewGameSelection = ({
  gameId,
  setShowingStartGameOptions,
}: StartNewGameSelectionProps): JSX.Element => {
  const history = useHistory();
  const [gameLength, setGameLength] = useState(50);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (gameLength <= 0) {
      return;
    }

    console.log(`Starting game with id of ${gameId}`);

    history.push({
      pathname: ROUTES.HOSTLOBBY.replace(":gameId", gameId),
      state: {
        gameId,
        gameLength,
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
              value={gameLength}
              onChange={(e) => setGameLength(e.target.value as number)}
              inputProps={{
                name: "rounds",
                id: "round-pick-simple",
              }}
            >
              <option value={50}>50 points (10 minutes)</option>
              <option value={100}>100 points (20 minutes)</option>
              <option value={200}>200 points (40 minutes)</option>
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
