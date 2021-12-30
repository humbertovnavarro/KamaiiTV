import { Server, Socket } from "socket.io";
import login from "./events/login";
const io = new Server({});
io.on("connection", (socket: Socket) => {
  login(socket);
});
io.listen(3001);
export default io;
