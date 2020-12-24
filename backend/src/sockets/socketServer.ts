/* eslint-disable no-console */
import { Server } from 'socket.io';
import { dateSocket } from './date/dateSocket';

const socketServer = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Socket Instances
    dateSocket(socket);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

export { socketServer };
