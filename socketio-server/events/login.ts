import { Socket, User } from "../types";
import { validateUser } from "lib/validators";
import jwt from "jsonwebtoken";
import config from "../config.json";
import logger from '../lib/logger';
export default function login(socket: Socket) {
  const { token } = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, config.secret) as User;
    if(!validateUser(decoded)) {
      logger.logError(`Invalid user: ${JSON.stringify(decoded)}`);
      return socket.emit("login_error", { status: 'internal server error'});
    }
    socket.user = decoded;
    return socket.emit("login_success", { status: 'ok' });
  }
  catch (err) {
    return socket.emit("login_error", { status: 'unauthorized' });
  }
}
