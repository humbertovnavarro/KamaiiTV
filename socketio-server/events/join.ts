import { Socket } from "../types";
function join(socket: Socket) {
  socket.on("join", (req) => {
    if(!req.isSafeInteger() || req > 0) {
      return socket.emit("join_error", { status: "invalid room id" });
    }
  });
}
