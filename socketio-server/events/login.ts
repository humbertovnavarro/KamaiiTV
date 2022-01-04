import { Socket, User } from "../types";
import validateUser from "../lib/validateUser";
import jwt from "jsonwebtoken";
import config from "../config.json";
export default function login(socket: Socket) {
  const { token } = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, config.secret) as User;
    if(!validateUser(decoded)) {
      console.error("Invalid user token with good signature :", decoded);
      return socket.emit("login", { status: 'internal server error'});
    }
    socket.user = decoded;
    return socket.emit("login", { status: 'ok' });
  }
  catch (err) {
    return socket.emit("login", { status: 'unauthorized' });
  }
}
