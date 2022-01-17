import { Socket } from "../types";
import { isUserToken } from "../lib/validators";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
export default function login(socket: Socket) {
  const token = socket.handshake.auth.token;
  if(token === "anonymous") {
    return;
  }
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET );
    if(!isUserToken(decoded)) {
      return socket.emit("login_error", { status: "internal server error"});
    }
    socket.user = decoded;
    return socket.emit("login_success", { status: "ok" });
  }
  catch (err) {
    socket.emit("login_error", { status: "unauthorized" });
    socket.disconnect();
    return;
  }
}
