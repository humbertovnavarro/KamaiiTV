import { UserToken, UserTokenSignable } from "../types";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { isUserToken } from "./validators";
const TOKEN_SECRET = process.env.TOKEN_SECRET as string;
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES as string;

function signToken(signable: UserTokenSignable): string {
  const signOpts: jwt.SignOptions = {
    expiresIn: TOKEN_EXPIRES as string
  };
  return jwt.sign(signable, TOKEN_SECRET, signOpts);
}

function verifyToken(token: string): UserToken | null {
  const decoded = jwt.verify(token, TOKEN_SECRET);
  if(isUserToken(decoded)) {
    return decoded;
  }
  return null;
}

export { signToken, verifyToken };
