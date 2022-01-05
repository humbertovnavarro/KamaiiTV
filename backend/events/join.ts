import { Socket } from "../types";
import { isPositiveInt } from "../lib/validators";
import logger from "lib/logger";
export default function join(socket: Socket) {
  socket.on("join", (req) => {
    if(req === 0 && socket.publicRoom) {
      socket.leave(socket.publicRoom);
      socket.publicRoom = null;
    }
    if(!isPositiveInt(req)) {
      logger.logWarning(`Invalid room id: ${req}`);
      return socket.emit("join_error", { status: "invalid room id" });
    }
    socket.join(req);
    socket.publicRoom = req;
    socket.emit("join_success", { status: "ok" });
  });
}
