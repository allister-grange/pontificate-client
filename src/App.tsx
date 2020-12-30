import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";


const ENDPOINT = "http://127.0.0.1:3000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data: SocketIOClient.Socket) => {
      setResponse(data as unknown as string);      
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {response}
        </p>
      </header>
    </div>
  );
}

export default App;
