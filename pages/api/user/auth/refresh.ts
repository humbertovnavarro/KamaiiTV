import requestIp from "request-ip";
import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "../../_types.d.";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
interface Token {
  username: string;
  email: string;
  ip: string;
  iat: number;
  exp: number;
}
dotenv.config();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<string>>
) {
  const ip = requestIp.getClientIp(req);
  const SECRET = process.env.JWT_SECRET;
  if (!SECRET) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
  const validToken = jwt.verify(req.cookies.token, SECRET) as Token;
  if (!validToken) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  if (typeof validToken !== "object" || !validToken.ip) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  if (validToken.ip !== ip) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }
  const payload = {
    username: validToken.username,
    ip,
    email: validToken.email,
  };
  const signedPayload = jwt.sign(payload, SECRET, { expiresIn: "14d" });
  return res.status(200).json({
    error: "ok",
    data: signedPayload,
  });
}
