import { httpServer  } from "./expressServer";
import { Server, Socket as IOSocket } from "socket.io";
import { Socket } from "./types";
import login from "./events/login";
import join from "./events/join";
export default function setup(server: typeof httpServer) {
  const IOOptions = {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: "GET, POST",
    }
  };
  const io = new Server(server, IOOptions);
  io.on("connection", (ioSocket: IOSocket) => {
    const socket = ioSocket as Socket;
    login(socket);
    join(socket);
  });
}
