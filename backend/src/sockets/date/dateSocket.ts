import { Socket } from 'socket.io';
import { setInterval } from 'timers';

const dateSocket = (socket: Socket) => {
  const interval = setInterval(() => {
    const response = new Date();
    socket.emit('dateTime', response);
  }, 100);

  socket.on('disconnect', () => {
    clearInterval(interval);
  });
};

export { dateSocket };
