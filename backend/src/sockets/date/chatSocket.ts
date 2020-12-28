/* eslint-disable no-console */
import { Socket } from 'socket.io';
import { MessageDto } from '../../model/Message';

const chatSocket = (socket: Socket) => {
  socket.on('chat message', (message: MessageDto) => {
    console.log(`client: ${socket.id}. wrote ${message.text}`);
    socket.broadcast.emit('chat message', message);
  });
};

export { chatSocket };
