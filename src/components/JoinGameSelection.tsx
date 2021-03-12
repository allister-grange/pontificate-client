import React from "react";
import {
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
} from "@material-ui/core";

type JoinGameSelectionProps = {
  userName: string;
  handleUserNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGameIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  gameId: string;
  setShowingJoinGameOptions: React.Dispatch<React.SetStateAction<boolean>>;
  isFormInValid: boolean;
  errorMessage: string;
};

const JoinGameSelection = ({
  userName,
  handleUserNameChange,
  handleGameIdChange,
  onSubmit,
  gameId,
  setShowingJoinGameOptions,
  isFormInValid,
  errorMessage,
}: JoinGameSelectionProps): JSX.Element => {
  return (
    <Card className="card-room-details" variant="outlined">
      <CardContent>
        <form className="room-details-form" onSubmit={onSubmit}>
          <TextField
            color="primary"
            id="username"
            label="username"
            variant="outlined"
            placeholder="username"
            value={userName}
            className="room-form-input"
            onChange={handleUserNameChange}
          />
          <div style={{ margin: "10px" }} />
          <TextField
            color="primary"
            id="game-id"
            label="game id"
            type="number"
            variant="outlined"
            placeholder="game id"
            className="room-form-input"
            value={gameId}
            onChange={handleGameIdChange}
          />
          <CardActions className="card-room-actions">
            <hr className="card-room-line" />
            <div className="card-room-buttons">
              <Button onClick={() => setShowingJoinGameOptions(false)}>
                back
              </Button>
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="outlined"
                className="button"
                disabled={isFormInValid}
              >
                join game
              </Button>
            </div>
            <div className="join-game-error-message">
              <p>{errorMessage}</p>
            </div>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default JoinGameSelection;
