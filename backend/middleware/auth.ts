import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/tokens";
export default function auth(req: Request, res: Response, next: NextFunction) {
  if(!req.headers.authorization) {
    return res.sendStatus(401);
  }
  try {
    verifyToken(req.headers.authorization);
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}
