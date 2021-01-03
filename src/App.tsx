import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LobbyPage from './pages/lobby/LobbyPage';
import BoardPage from './pages/game/BoardPage';
import CardPage from './pages/game/CardPage';

const ENDPOINT = "http://127.0.0.1:3000";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:roomId" component={LobbyPage} />
      </Switch>
    </Router>
  );
}

export default App;
