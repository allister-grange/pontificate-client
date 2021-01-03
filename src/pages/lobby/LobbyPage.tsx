import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import socketIOClient from "socket.io-client";
import '../../hooks/useGame';
import './LobbyPage.css';

const ENDPOINT = "http://127.0.0.1:3000";

function LobbyPage() {

  return (
    <div>
      <h1>
        You are in the lobby page!!!
     </h1>
    </div>
  );
}

export default LobbyPage;
