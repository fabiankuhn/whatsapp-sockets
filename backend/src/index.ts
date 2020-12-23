/* eslint-disable no-console */

import express, { Express } from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import router from './controller/rootController';

const port = process.env.PORT || 4001;
const app: Express = express();
const server = http.createServer(app);
// eslint-disable-next-line no-unused-vars
const io = new Server(server);
// eslint-disable-next-line no-unused-vars
const getApiAndEmit = 'TODO';

app.use(router);
server.listen(port, () => console.log(`Listening on port ${port}`));
