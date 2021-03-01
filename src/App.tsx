import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import PlayerLobbyPage from './pages/lobby/PlayerLobbyPage';
import HostLobbyPage from './pages/lobby/HostLobbyPage';
import CardPage from './pages/game/CardPage';
import BoardPage from './pages/game/BoardPage';
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './components/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/host-lobby/:gameId" component={HostLobbyPage} />
          <Route exact path="/player-lobby/:gameId" component={PlayerLobbyPage} />
          <Route exact path="/host-game/:gameId" component={BoardPage} />
          <Route exact path="/player-game/:gameId" component={CardPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
