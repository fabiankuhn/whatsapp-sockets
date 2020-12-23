import express, {Express} from 'express';
import router from "./controller/root.controller";
const http = require("http");
const socketIo = require("socket.io");


const port = process.env.PORT || 4001;

const app: Express = express()
app.use(router);

const server = http.createServer(app);

const io = socketIo(server);

const getApiAndEmit = "TODO";

server.listen(port, () => console.log(`Listening on port ${port}`));
