import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import PlayerLobbyPage from './pages/lobby/PlayerLobbyPage';
import HostLobbyPage from './pages/lobby/HostLobbyPage';
import CardPage from './pages/game/CardPage';
import BoardPage from './pages/game/BoardPage';

const ENDPOINT = "http://127.0.0.1:3000";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/host-lobby/:gameId" component={HostLobbyPage} />
        <Route exact path="/player-lobby/:gameId" component={PlayerLobbyPage} />
        <Route exact path="/host-game/:gameId" component={BoardPage} />
        <Route exact path="/player-game/:gameId" component={CardPage} />
      </Switch>
    </Router>
  );
}

export default App;
