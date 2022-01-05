import { Server, Socket as IOSocket } from "socket.io";
import { Socket } from "./types";
import expressServer from "express";
import { createServer } from "http";
import logger from './lib/logger';
import login from "./events/login";
const IOOptions = {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
      methods: "GET, POST",
  }
}
const express = expressServer();
const httpServer = createServer(express);
const io = new Server(httpServer, IOOptions);

io.on("connection", (ioSocket: IOSocket) => {
  const socket = ioSocket as Socket;
  login(socket);
});

express.use(expressServer.json());

// * Start the server if its being run directly
if(require.main === module) {
  httpServer.listen(process.env.PORT || 3000, () => {
    logger.logInfo(`Server listening on port ${process.env.PORT || 3000}`);
  });
}
export default io;
