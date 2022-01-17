import { Socket as IOSocket } from "socket.io";
import { Request } from "express";
interface UserTokenSignable {
  userName: string,
  userId: number
}
interface UserToken extends UserTokenSignable {
  iat: number,
  exp: number
}
interface UserLogin {
  userName?: string,
  email?: string,
  password: string
}
interface UserRegistration {
  userName: string,
  email: string,
  password: string
}
interface Socket extends IOSocket {
  user? : UserToken
  publicRoom?: string | null,
  privateRoom?: string | null
}
interface AuthorizedRequest extends Request {
  user: UserToken
}
export { UserToken, UserTokenSignable, Socket, UserRegistration, UserLogin, AuthorizedRequest };
