import { Socket as IOSocket } from "socket.io";
interface User {
  username: string;
  id: number,
  iat: number,
  exp: number
}
interface Socket extends IOSocket {
  user? : User
}
export { User, Socket }
