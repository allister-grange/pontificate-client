import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import PlayerLobbyPage from './pages/lobby/PlayerLobbyPage';
import HostLobbyPage from './pages/lobby/HostLobbyPage';
import BoardPage from './pages/game/BoardPage';
import CardPage from './pages/game/CardPage';

const ENDPOINT = "http://127.0.0.1:3000";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/host-lobby/:gameId" component={HostLobbyPage} />
        <Route exact path="/player-lobby/:gameId" component={PlayerLobbyPage} />
      </Switch>
    </Router>
  );
}

export default App;
