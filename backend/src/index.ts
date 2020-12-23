/* eslint-disable no-console */

import express, { Express } from 'express';
import * as http from 'http';
import rootController from './controller/rootController';

const port = process.env.PORT || 4001;
const app: Express = express();
const server = http.createServer(app);
// const io = new Server(server);

app.use(rootController);
server.listen(port, () => console.log(`Listening on port ${port}`));
