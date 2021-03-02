import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import PlayerLobbyPage from './pages/lobby/PlayerLobbyPage';
import HostLobbyPage from './pages/lobby/HostLobbyPage';
import CardPage from './pages/game/CardPage';
import BoardPage from './pages/game/BoardPage';
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './components/theme';

import * as ROUTES from './constants/routes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path={ROUTES.HOMEPAGE} component={HomePage} />
          <Route exact path={ROUTES.HOSTLOBBY} component={HostLobbyPage} />
          <Route exact path={ROUTES.PLAYERLOBBY} component={PlayerLobbyPage} />
          <Route exact path={ROUTES.BOARDPAGE} component={BoardPage} />
          <Route exact path={ROUTES.CARDPAGE} component={CardPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
