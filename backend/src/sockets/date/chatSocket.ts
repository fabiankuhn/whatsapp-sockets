import { Server, Socket } from 'socket.io';

const chatSocket = (socket: Socket, io: Server) => {
  socket.on('chat message', (message: string) => {
    console.log(`client: ${socket.id}. wrote ${message}`);
    socket.broadcast.emit('chat message', message);
  });

  socket.on('disconnect', () => {

  });
};

export { chatSocket };
