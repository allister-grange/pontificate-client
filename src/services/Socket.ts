let socket: SocketIOClient.Socket;

export const initiateSocket = (room: string) => {
  socket = io('http://localhost:3000');
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('join', room);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const subscribeToChat = (callBack: any) => {
  if (!socket) return(true);
  socket.on('chat', (msg: any) => {
    console.log('Websocket event received!');
    return callBack(null, msg);
  });
}

export const sendMessage = (room: string, message: string) => {
  if (socket) socket.emit('chat', { message, room });
}
