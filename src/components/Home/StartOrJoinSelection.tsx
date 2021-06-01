import { Button, Card, CardContent } from "@material-ui/core";
import React from "react";

type StartOrJoinSelectionProps = {
  setShowingStartGameOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setShowingJoinGameOptions: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartOrJoinSelection = ({
  setShowingStartGameOptions,
  setShowingJoinGameOptions,
}: StartOrJoinSelectionProps): JSX.Element => {
  return (
    <div className="game-options">
      <Card variant="outlined" className="home-page-card">
        <CardContent>
          <div className="home-page-button-container">
            <h1 style={{ textAlign: "center" }}>pontificate</h1>
            <Button
              onClick={() => setShowingStartGameOptions(true)}
              variant="outlined"
              color="primary"
              className="button"
            >
              start new game
            </Button>
            <div style={{ margin: "10px" }} />
            <Button
              variant="outlined"
              onClick={() => {
                setShowingJoinGameOptions(true);
              }}
              className="button"
            >
              join game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartOrJoinSelection;
