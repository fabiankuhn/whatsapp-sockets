/* eslint-disable no-console */
import express, { Express } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import rootController from './controller/rootController';
import { socketServer } from './sockets/socketServer';

const port = process.env.PORT || 4001;
const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: 'http://localhost:19006' } });
// Use Socket Server
socketServer(io);

// Use Controller
app.use(rootController);

server.listen(port, () => console.log(`Listening on port ${port}`));
export { server };
