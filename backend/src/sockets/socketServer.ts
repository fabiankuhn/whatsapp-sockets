/* eslint-disable no-console */
import { Server } from 'socket.io';
import { dateSocket } from './date/dateSocket';
import { chatSocket } from './date/chatSocket';

const socketServer = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Socket Instances
    dateSocket(socket);
    chatSocket(socket);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

export { socketServer };
