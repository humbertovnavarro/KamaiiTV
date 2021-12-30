import { Socket, User } from "../types";
import jwt from "jsonwebtoken";
import config from "../config.json";
export default function login(socket: Socket) {
  socket.on("login", data => {
    if(typeof data != 'string') {
      return socket.emit("login", 400);
    }
    try {
      let decoded = jwt.verify(data, config.secret) as User;
      if(!decoded) {
        return socket.emit("login", 400);
      }
      socket.user = decoded;
      return socket.emit("login", 200);
    } catch (err) {
      return socket.emit("login", 400);
    }
  })
}
